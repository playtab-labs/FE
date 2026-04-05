import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
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
    category: Category | null,
    auto: boolean,
    favOnly: boolean,
  ) => void;
  type: "Lineup" | "TimeTable";
}

const ArtistFilterBar = ({ type, onFilterChange }: ArtistFilterBarProps) => {
  const [selected, setSelected] = useState<Category | null>(null);
  const [auto, setAuto] = useState(false);
  const [favOnly, setFavOnly] = useState(false);

  const notify = (
    nextSelected: Category | null,
    nextAuto: boolean,
    nextFavOnly: boolean,
  ) => {
    onFilterChange?.(nextSelected, nextAuto, nextFavOnly);
  };

  const toggleCategory = (cat: Category) => {
    const next = selected === cat ? null : cat;
    setSelected(next);
    notify(next, auto, favOnly);
  };

  const toggleFav = () => {
    const next = !favOnly;
    setFavOnly(next);
    notify(selected, auto, next);
  };

  return (
    <View className="mx-[-17px]">
      <View className="flex-row items-center py-2 gap-2 px-[17px]">
        {/* 카테고리 칩 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="flex-row gap-2"
          className="flex-1"
        >
          {(type === "Lineup" ? LINEUP_CATEGORIES : TIMETABLE_CATEGORIES).map(
            (cat) => {
              const isActive = selected === cat;
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

        {/* 즐겨찾기 필터 버튼 */}
        <FavoriteButton type="FILTER" onToggle={() => toggleFav()} />
      </View>
      <View className="h-[1px] bg-gray" />
    </View>
  );
};

export default ArtistFilterBar;
