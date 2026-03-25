import { View, Text, TouchableOpacity } from "react-native";

const TAB_CONFIG = {
  artist: [
    { key: "lineup", label: "라인업" },
    { key: "timetable", label: "타임테이블" },
  ],
  map: [
    { key: "booth", label: "부스 배치도" },
    { key: "list", label: "리스트" },
  ],
} as const;

type TabType = keyof typeof TAB_CONFIG;
type TabKey<T extends TabType> = (typeof TAB_CONFIG)[T][number]["key"];

interface TabBarProps<T extends TabType> {
  type: T;
  activeTab: TabKey<T>;
  onTabChange: (tab: TabKey<T>) => void;
}

const TabBar = <T extends TabType>({
  type,
  activeTab,
  onTabChange,
}: TabBarProps<T>) => {
  const tabs = TAB_CONFIG[type];

  return (
    <View className="flex-row">
      {tabs.map(({ key, label }) => {
        const isActive = activeTab === key;
        return (
          <TouchableOpacity
            key={key}
            onPress={() => onTabChange(key as TabKey<T>)}
            activeOpacity={0.8}
            className={`flex-1 h-14 items-center justify-center ${
              isActive
                ? "bg-secondary-salmon border-b-2 border-text-salmon"
                : "bg-soft-gray-white"
            }`}
          >
            <Text
              className={`text-b2 font-sb ${
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

export default TabBar;
