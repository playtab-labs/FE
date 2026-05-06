import { getFestivalDays, getSchedulesByDay, type FestivalDay } from "@/api/artist";
import { typo } from "@/styles/typography";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import ArtistFilterBar from "./ArtistFilterBar";

const HOUR_HEIGHT = 100;
const TIME_COL_W = 36;
const BLOCK_PAD = 8;
const SECONDARY_SALMON = "#FFAD96";
const PRIMARY_SALMON = "#FF7654";

// stageType (stage.name.ko 기준): "아티스트"=주황, "학생무대"=초록, "DJ Stage"=보라, 기타=회색
const getGradientColors = (stageType: string | null): [string, string] => {
  if (stageType === "아티스트") return [PRIMARY_SALMON, SECONDARY_SALMON];
  if (stageType === "학생무대") return ["#7FD4A4", SECONDARY_SALMON];
  if (stageType === "DJ Stage") return ["#A78FD4", SECONDARY_SALMON];
  return ["#BFBFBF", SECONDARY_SALMON]; // 총장님: 회색
};

const getHour = (iso: string) => {
  const d = new Date(iso);
  return d.getHours() + d.getMinutes() / 60;
};

const formatTime = (iso: string) => {
  const d = new Date(iso);
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
};

// stage.name은 객체 / JSON 문자열 / 일반 문자열 모두 올 수 있음
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

const TimeTable = () => {
  // festivalDays 목록 (dayNumber 기준 정렬)
  const [festivalDays, setFestivalDays] = useState<FestivalDay[]>([]);
  // dayId → StageSchedule[]
  const [schedules, setSchedules] = useState<Record<string, any[]>>({});
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [favFilterOn, setFavFilterOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchAll = async () => {
        setLoading(true);
        try {
          const daysRes = await getFestivalDays();
          const days: FestivalDay[] = (daysRes.data?.festivalDays ?? []).sort(
            (a: FestivalDay, b: FestivalDay) => a.dayNumber - b.dayNumber,
          );
          setFestivalDays(days);

          const results = await Promise.all(
            days.map((d) => getSchedulesByDay(d.id)),
          );

          const newSchedules: Record<string, any[]> = {};
          days.forEach((d, i) => {
            newSchedules[d.id] = results[i].data?.schedulesByDay ?? [];
          });
          setSchedules(newSchedules);

          // 첫 진입 시 dayNumber 1로 초기화
          if (days.length > 0) setSelectedDayNumber(days[0].dayNumber);
        } catch (e: any) {
          setError(e?.message ?? "오류가 발생했습니다.");
        } finally {
          setLoading(false);
        }
      };
      fetchAll();
    }, []),
  );

  // 선택된 dayNumber에 해당하는 festivalDay 찾기
  const currentDay = festivalDays.find((d) => d.dayNumber === selectedDayNumber);
  const currentStages: any[] = currentDay ? (schedules[currentDay.id] ?? []) : [];

  // 현재 day의 모든 스테이지 아티스트를 합쳐서 표시 (stageType 포함)
  const artists = currentStages.flatMap((s) => {
    const stageType = getStageType(s.stage?.name);
    return (s.artists ?? []).map((a: any) => ({ ...a, stageType }));
  });

  const startHour = 16;
  const endHour = 22;
  const hours = Array.from(
    { length: endHour - startHour + 1 },
    (_, i) => startHour + i,
  );
  const totalHeight = hours.length * HOUR_HEIGHT;

  // ArtistFilterBar용: "Day 1" / "Day 2" / "Day 3" 형태로 매핑
  const filterDayLabel = `Day ${selectedDayNumber}`;

  return (
    <View className="flex-1">
      {favFilterOn && (
        <View
          className="absolute top-0 bottom-0 bg-secondary-salmon"
          style={{ left: -20, right: -20, opacity: 0.5 }}
        />
      )}
      <ArtistFilterBar
        type="TimeTable"
        initialCategory={filterDayLabel as any}
        onFilterChange={(category, favOnly) => {
          if (category) {
            // "Day 1" → 1, "Day 2" → 2, ...
            const num = Number(String(category).replace("Day ", ""));
            if (!isNaN(num)) setSelectedDayNumber(num);
          }
          setFavFilterOn(favOnly);
        }}
      />

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className={`${typo.B3_Rg} text-text-salmon text-center`}>
            {error}
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{ height: totalHeight, flexDirection: "row" }}
            className="mt-5"
          >
            {/* 시간 라벨 컬럼 */}
            <View style={{ width: TIME_COL_W }}>
              {hours.map((hour, i) => (
                <View
                  key={hour}
                  style={{ position: "absolute", top: i * HOUR_HEIGHT - 8 }}
                >
                  <Text
                    className={`${typo.B4_Rg} text-dark-gray text-right`}
                    style={{ width: TIME_COL_W - 8 }}
                  >
                    {hour}
                  </Text>
                </View>
              ))}
            </View>

            {/* 그리드 + 블록 */}
            <View style={{ flex: 1, position: "relative" }}>
              {/* 시간 선 */}
              {hours.map((hour, i) => (
                <View
                  key={hour}
                  style={{
                    position: "absolute",
                    top: i * HOUR_HEIGHT,
                    left: 0,
                    right: 0,
                  }}
                >
                  <View style={{ height: 1, backgroundColor: "#D0D0D0" }} />
                  <View
                    style={{
                      position: "absolute",
                      top: HOUR_HEIGHT / 2,
                      left: 0,
                      right: 0,
                      height: 1,
                      borderStyle: "dashed",
                      borderWidth: 0.5,
                      borderColor: "#E0E0E0",
                    }}
                  />
                </View>
              ))}

              {/* 퍼포머 블록 */}
              {artists.map((artist) => {
                const top = (getHour(artist.startAt) - startHour) * HOUR_HEIGHT;
                const height =
                  (getHour(artist.endAt) - getHour(artist.startAt)) *
                  HOUR_HEIGHT;
                const name = artist.performer.name?.ko ?? "-";
                const isFav = !!artist.performer.isFavorited;

                const blockStyle = {
                  position: "absolute" as const,
                  top: top + 2,
                  left: BLOCK_PAD,
                  right: BLOCK_PAD,
                  height: height - 4,
                  borderRadius: 8,
                  flexDirection: "row" as const,
                  alignItems: "center" as const,
                  justifyContent: "space-between" as const,
                  paddingHorizontal: 12,
                };

                if (!favFilterOn) {
                  return (
                    <LinearGradient
                      key={artist.scheduleId}
                      colors={getGradientColors(artist.stageType)}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={blockStyle}
                    >
                      <Text
                        className={typo.T3_Eb}
                        numberOfLines={1}
                        style={{ color: "#fff", flex: 1 }}
                      >
                        {name}
                      </Text>
                      <Text className={typo.B4_Rg} style={{ color: "#fff" }}>
                        {formatTime(artist.startAt)}-{formatTime(artist.endAt)}
                      </Text>
                    </LinearGradient>
                  );
                }

                return (
                  <View
                    key={artist.scheduleId}
                    style={{
                      ...blockStyle,
                      backgroundColor: isFav ? "#FF7654" : "#FFFFFF",
                      borderWidth: isFav ? 0 : 1,
                      borderColor: "#E4E4E4",
                    }}
                  >
                    <Text
                      className={typo.B3_Eb}
                      numberOfLines={1}
                      style={{ color: isFav ? "#fff" : "#BFBFBF", flex: 1 }}
                    >
                      {name}
                    </Text>
                    <Text
                      className={typo.B4_Rg}
                      style={{ color: isFav ? "#fff" : "#BFBFBF" }}
                    >
                      {formatTime(artist.startAt)}-{formatTime(artist.endAt)}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default TimeTable;
