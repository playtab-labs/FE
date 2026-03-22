import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import FavoriteButton from "./FavoriteButton";

type Category =
  | "아티스트"
  | "버스킹"
  | "DJ"
  | "동아리"
  | "Day 1"
  | "Day 2"
  | "Day 3";

const LINEUP_CATEGORIES: Category[] = ["아티스트", "버스킹", "DJ", "동아리"];
const TIMETABLE_CATEGORIES: Category[] = ["Day 1", "Day 2", "Day 3"];

interface ArtistFilterBarProps {
  onFilterChange?: (
    categories: Category[],
    auto: boolean,
    favOnly: boolean,
  ) => void;
  type: "Lineup" | "TimeTable";
}

const ArtistFilterBar = ({ type, onFilterChange }: ArtistFilterBarProps) => {
  const [selected, setSelected] = useState<Category[]>([]);
  const [auto, setAuto] = useState(false);
  const [favOnly, setFavOnly] = useState(false);

  const notify = (
    nextSelected: Category[],
    nextAuto: boolean,
    nextFavOnly: boolean,
  ) => {
    onFilterChange?.(nextSelected, nextAuto, nextFavOnly);
  };

  const toggleCategory = (cat: Category) => {
    const next = selected.includes(cat)
      ? selected.filter((c) => c !== cat)
      : [...selected, cat];
    setSelected(next);
    notify(next, auto, favOnly);
  };

  const toggleAuto = () => {
    const next = !auto;
    setAuto(next);
    notify(selected, next, favOnly);
  };

  const toggleFav = () => {
    const next = !favOnly;
    setFavOnly(next);
    notify(selected, auto, next);
  };

  return (
    <View className="flex-row items-center px-4 py-2 gap-2 border-b border-soft-gray">
      {/* 카테고리 칩 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="flex-row gap-2"
        className="flex-1"
      >
        {(type === "Lineup" ? LINEUP_CATEGORIES : TIMETABLE_CATEGORIES).map(
          (cat) => {
            const isActive = selected.includes(cat);
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => toggleCategory(cat)}
                activeOpacity={0.8}
                className={`h-8 w-fit px-3 rounded-full items-center justify-center ${
                  isActive ? "bg-secondary-salmon" : "bg-white"
                }`}
              >
                <Text className={`text-b3 font-sb text-black`}>{cat}</Text>
              </TouchableOpacity>
            );
          },
        )}
      </ScrollView>

      {/* 자동 버튼
      <TouchableOpacity
        onPress={toggleAuto}
        activeOpacity={0.8}
        className={`h-9 px-3 rounded-full items-center justify-center ${
          auto ? "bg-blue-500" : "bg-white"
        }`}
      >
        <Text
          className={`text-b3 font-sb ${auto ? "text-white" : "text-dark-gray"}`}
        >
          자동
        </Text>
      </TouchableOpacity> */}

      {/* 즐겨찾기 필터 버튼 */}
      <FavoriteButton type="FILTER" />
    </View>
  );
};

export default ArtistFilterBar;
