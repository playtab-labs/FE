import { View, Text, TouchableOpacity } from "react-native";

type Tab = "lineup" | "timetable";

interface ArtistTabBarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TABS: { key: Tab; label: string }[] = [
  { key: "lineup", label: "라인업" },
  { key: "timetable", label: "타임테이블" },
];

const ArtistTabBar = ({ activeTab, onTabChange }: ArtistTabBarProps) => {
  return (
    <View className="flex-row g-gray-100">
      {TABS.map(({ key, label }) => {
        const isActive = activeTab === key;
        return (
          <TouchableOpacity
            key={key}
            onPress={() => onTabChange(key)}
            activeOpacity={0.8}
            className={`flex-1 h-14 items-center justify-center ${
              isActive ? "bg-secondary-salmon" : "bg-soft-gray-white"
            }`}
          >
            <Text
              className={`text-b2-16 font-semibold ${
                isActive ? "text-black" : "text-dark-gray"
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ArtistTabBar;
