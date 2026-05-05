import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

const TAB_CONFIG = {
  artist: ["lineup", "timetable"],
  map: ["booth", "list"],
} as const;

type TabType = keyof typeof TAB_CONFIG;
type TabKey<T extends TabType> = (typeof TAB_CONFIG)[T][number];

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
  const { t } = useTranslation();
  const keys = TAB_CONFIG[type];

  return (
    <View className="flex-row">
      {keys.map((key) => {
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
              {t(`${type}.${key}`)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
