import {
  getSchedulesByDay,
  type ArtistSchedule,
  type StageSchedule,
} from "@/api/artist";
import { typo } from "@/styles/typography";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ArtistFilterBar from "./ArtistFilterBar";

const DAY_ID: Record<string, string> = {
  "Day 1": "1",
  "Day 2": "2",
  "Day 3": "3",
};

const HOUR_HEIGHT = 100;
const TIME_COL_W = 36;
const BLOCK_PAD = 8;

const getHour = (iso: string) => {
  const d = new Date(iso);
  return d.getHours() + d.getMinutes() / 60;
};

const formatTime = (iso: string) => {
  const d = new Date(iso);
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
};

const TimeTable = () => {
  const [selectedDay, setSelectedDay] = useState("Day 1");
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);
  const [schedules, setSchedules] = useState<Record<string, StageSchedule[]>>({
    "1": [],
    "2": [],
    "3": [],
  });
  const [favFilterOn, setFavFilterOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchAll = async () => {
        setLoading(true);
        try {
          const [r1, r2, r3] = await Promise.all([
            getSchedulesByDay("1"),
            getSchedulesByDay("2"),
            getSchedulesByDay("3"),
          ]);
          setSchedules({
            "1": r1.data?.schedulesByDay ?? [],
            "2": r2.data?.schedulesByDay ?? [],
            "3": r3.data?.schedulesByDay ?? [],
          });
        } catch (e: any) {
          setError(e?.message ?? "오류가 발생했습니다.");
        } finally {
          setLoading(false);
        }
      };
      fetchAll();
    }, []),
  );

  const currentDayId = DAY_ID[selectedDay] ?? "1";
  const currentStages: StageSchedule[] = schedules[currentDayId] ?? [];

  useEffect(() => {
    if (currentStages.length > 0) {
      setSelectedStageId(currentStages[0].stage.id);
    }
  }, [selectedDay, currentStages.length]);

  const selectedStage = currentStages.find(
    (s) => s.stage.id === selectedStageId,
  );
  const artists: ArtistSchedule[] = selectedStage?.artists ?? [];

  const startHour = 16;
  const endHour = 22;
  const hours = Array.from(
    { length: endHour - startHour + 1 },
    (_, i) => startHour + i,
  );
  const totalHeight = hours.length * HOUR_HEIGHT;

  return (
    <View className="flex-1">
      {/* Day 탭 + 즐겨찾기 버튼 (ArtistFilterBar에 내장) */}
      <ArtistFilterBar
        type="TimeTable"
        onFilterChange={(category, favOnly) => {
          if (category) setSelectedDay(category as string);
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
        <>
          {/* 스테이지 탭 */}
          {currentStages.length > 1 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingVertical: 10,
                gap: 8,
              }}
            >
              {currentStages.map((s) => {
                const stageName =
                  typeof s.stage.name === "object"
                    ? (s.stage.name as { ko: string }).ko
                    : (s.stage.name as string);
                const isSelected = s.stage.id === selectedStageId;
                return (
                  <TouchableOpacity
                    key={s.stage.id}
                    onPress={() => setSelectedStageId(s.stage.id)}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      backgroundColor: isSelected ? "#FF7654" : "#FFFFFF",
                      borderWidth: 1,
                      borderColor: isSelected ? "#FF7654" : "#E4E4E4",
                    }}
                  >
                    <Text
                      className={typo.B3_Sb}
                      style={{ color: isSelected ? "#fff" : "#888" }}
                    >
                      {stageName}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}

          {/* 타임라인 */}
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
                  const top =
                    (getHour(artist.startAt) - startHour) * HOUR_HEIGHT;
                  const height =
                    (getHour(artist.endAt) - getHour(artist.startAt)) *
                    HOUR_HEIGHT;
                  const name =
                    artist.performer.name?.ko ?? artist.performer.name ?? "-";
                  const isFav = artist.performer.isFavorited;

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
                        colors={["#7BAFD4", "#F0937E"]}
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
                          {formatTime(artist.startAt)}-
                          {formatTime(artist.endAt)}
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
        </>
      )}
    </View>
  );
};

export default TimeTable;
