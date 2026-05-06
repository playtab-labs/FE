import { getFestivalDays, getSchedulesByDay, type ArtistWithStage } from "@/api/artist";
import NoFavIcon from "@/assets/artist_nofav.svg";
import { typo } from "@/styles/typography";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import ArtistCard from "./ArtistCard";

// 총장님 축사 등 라인업에서 제외할 performer 이름
const EXCLUDED_PERFORMERS = ["총장님 축사"];

// 카테고리 → stageType 매핑 (API stage.name.ko 실제값 기준)
const CATEGORY_STAGE_MAP: Record<string, string> = {
  아티스트: "아티스트",
  동아리: "학생무대",
  DJ: "DJ Stage",
};

interface ArtistListProps {
  category?: string | null;
  favOnly?: boolean;
  favorites?: Set<string>;
  onFavoriteToggle?: (id: string, fav: boolean) => void;
}

const getStageType = (stageName: any): string => {
  if (!stageName) return "";
  if (typeof stageName === "object") return stageName?.ko ?? "";
  try {
    const parsed = JSON.parse(stageName);
    return parsed?.ko ?? stageName;
  } catch {
    return stageName;
  }
};

const flattenDay = (stages: any[]): ArtistWithStage[] =>
  stages.flatMap((s) => {
    const stageType = getStageType(s.stage?.name);
    return (s.artists ?? [])
      .filter(
        (a: any) => !EXCLUDED_PERFORMERS.includes(a.performer.name?.ko ?? ""),
      )
      .map((a: any) => ({ ...a, stageType }));
  });

const ArtistList = ({
  category = null,
  favOnly = false,
  favorites = new Set(),
  onFavoriteToggle,
}: ArtistListProps) => {
  const { t } = useTranslation();
  // { dayNumber: number, stages: any[] }[] 형태로 저장
  const [dayGroups, setDayGroups] = useState<
    { dayNumber: number; stages: any[] }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const daysRes = await getFestivalDays();
        const festivalDays: { id: string; dayNumber: number }[] =
          (daysRes.data?.festivalDays ?? []).sort(
            (a: any, b: any) => a.dayNumber - b.dayNumber,
          );

        const results = await Promise.all(
          festivalDays.map((d) => getSchedulesByDay(d.id)),
        );

        setDayGroups(
          festivalDays.map((d, i) => ({
            dayNumber: d.dayNumber,
            stages: results[i].data?.schedulesByDay ?? [],
          })),
        );
      } catch (e: any) {
        setError(e?.message ?? "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const targetStageType = category ? CATEGORY_STAGE_MAP[category] : null;

  const CATEGORY_LABELS: Record<string, string> = {
    아티스트: t("artist.filterArtist"),
    동아리: t("artist.filterClub"),
    DJ: t("artist.filterDJ"),
  };
  const categoryLabel = category
    ? (CATEGORY_LABELS[category] ?? category)
    : null;

  const filteredDayGroups = dayGroups.map(({ dayNumber, stages }) => {
    const allArtists: ArtistWithStage[] = flattenDay(stages);

    const filtered = allArtists.filter((a) => {
      if (targetStageType && a.stageType !== targetStageType) return false;
      if (favOnly && !favorites.has(a.performer.id) && !a.performer.isFavorited)
        return false;
      return true;
    });

    return { dayNumber, schedules: filtered };
  });

  const hasNoFav =
    favOnly &&
    !loading &&
    filteredDayGroups.every((g) => g.schedules.length === 0);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <Text className={`${typo.B3_Rg} text-text-salmon text-center`}>
          {error}
        </Text>
      </View>
    );
  }

  if (hasNoFav) {
    return (
      <View className="flex-1 items-center justify-center gap-6">
        <NoFavIcon width={100} height={110} />
        <Text className={`${typo.B3_Rg} text-dark-gray`}>
          {t("artist.noFavorites")}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerClassName="py-6 gap-8">
      {filteredDayGroups.map(({ dayNumber, schedules }, index) => (
        <View key={dayNumber} className="gap-6">
          <Text className={`${typo.T3_Eb} text-black`}>
            {`DAY ${dayNumber}`}
          </Text>

          {schedules.length === 0 ? (
            <View className="py-8 items-center">
              <Text className={`${typo.B3_Rg} text-dark-gray`}>
                {favOnly
                  ? t("artist.noFavoritesOnDate")
                  : categoryLabel
                    ? t("artist.noPerformanceCategory", {
                        category: categoryLabel,
                      })
                    : t("artist.noPerformance", { day: dayNumber })}
              </Text>
            </View>
          ) : (
            <View className="gap-4">
              {schedules.map((s) => (
                <ArtistCard
                  key={s.scheduleId}
                  performerId={s.performer.id}
                  name={s.performer.name?.ko ?? "-"}
                  imageUri={s.performer.imageUrl}
                  initialFavorited={
                    favorites.has(s.performer.id) || !!s.performer.isFavorited
                  }
                  onFavoriteToggle={(fav) =>
                    onFavoriteToggle?.(s.performer.id, fav)
                  }
                />
              ))}
            </View>
          )}

          {index < filteredDayGroups.length - 1 && (
            <View className="h-[1px] bg-gray my-6" />
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default ArtistList;
