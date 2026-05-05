import {
  getSchedulesByDay,
  type ArtistSchedule,
  type StageSchedule,
} from "@/api/artist";
import NoFavIcon from "@/assets/artist_nofav.svg";
import { typo } from "@/styles/typography";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import ArtistCard from "./ArtistCard";

type ArtistCategory = string;

interface ArtistListProps {
  category?: ArtistCategory | null;
  favOnly?: boolean;
  favorites?: Set<string>;
  onFavoriteToggle?: (id: string, fav: boolean) => void;
}

const DAY_LABELS: Record<number, string> = {
  1: "DAY 1",
  2: "DAY 2",
  3: "DAY 3",
};

const ArtistList = ({
  category = null,
  favOnly = false,
  favorites = new Set(),
  onFavoriteToggle,
}: ArtistListProps) => {
  const { t } = useTranslation();
  // stage > artists 중첩 구조를 ArtistSchedule[] flat 리스트로 변환
  const flattenArtists = (stageSchedules: StageSchedule[]): ArtistSchedule[] =>
    stageSchedules.flatMap((s) => s.artists);

  const [artists, setArtists] = useState<Record<string, ArtistSchedule[]>>({
    "1": [],
    "2": [],
    "3": [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [r1, r2, r3] = await Promise.all([
          getSchedulesByDay("1"),
          getSchedulesByDay("2"),
          getSchedulesByDay("3"),
        ]);
        console.log("r1:", JSON.stringify(r1));
        console.log("r2:", JSON.stringify(r2));
        console.log("r3:", JSON.stringify(r3));
        setArtists({
          "1": flattenArtists(r1.data?.schedulesByDay ?? []),
          "2": flattenArtists(r2.data?.schedulesByDay ?? []),
          "3": flattenArtists(r3.data?.schedulesByDay ?? []),
        });
      } catch (e: any) {
        console.error("schedulesByDay 요청 실패:", e);
        setError(e?.message ?? "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const dayGroups = ["1", "2", "3"].map((dayId) => {
    const filtered = (artists[dayId] ?? []).filter((s) => {
      // TODO: 백엔드 카테고리 필드 추가 후 활성화
      // if (category && s.performer.stageNames?.length > 0 && !s.performer.stageNames.some((sn) => sn.ko === category))
      //   return false;
      if (favOnly && !favorites.has(s.performer.id)) return false;
      return true;
    });
    return { dayNumber: Number(dayId), schedules: filtered };
  });

  const hasNoFav =
    favOnly && !loading && dayGroups.every((g) => g.schedules.length === 0);

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
      {dayGroups.map(({ dayNumber, schedules }, index) => (
        <View key={dayNumber} className="gap-6">
          <Text className={`${typo.T3_Eb} text-black`}>
            {DAY_LABELS[dayNumber]}
          </Text>

          {schedules.length === 0 ? (
            <View className="py-8 items-center">
              <Text className={`${typo.B3_Rg} text-dark-gray`}>
                {favOnly
                  ? t("artist.noFavoritesOnDate")
                  : t("artist.noPerformance", { day: dayNumber })}
              </Text>
            </View>
          ) : (
            <View className="gap-4">
              {schedules.map((s) => (
                <ArtistCard
                  key={s.scheduleId}
                  performerId={s.performer.id}
                  name={s.performer.name.ko}
                  imageUri={s.performer.imageUrl}
                  initialFavorited={
                    favorites.has(s.performer.id) || s.performer.isFavorited
                  }
                  onFavoriteToggle={(fav) =>
                    onFavoriteToggle?.(s.performer.id, fav)
                  }
                />
              ))}
            </View>
          )}

          {index < dayGroups.length - 1 && (
            <View className="h-[1px] bg-gray my-6" />
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default ArtistList;
