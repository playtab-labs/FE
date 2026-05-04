import { Text, TouchableOpacity, View } from "react-native";
import Svg, { Polyline } from "react-native-svg";

interface ChangeSelectionProps {
  label: string;
  value: string;
  onChangePress?: () => void;
  onRowPress?: () => void;
  dimmed?: boolean;
  showChevron?: boolean;
  rightLabel?: string;
}

export default function ChangeSelection({
  label,
  value,
  onRowPress,
  dimmed = false,
  showChevron = false,
  rightLabel,
}: ChangeSelectionProps) {
  return (
    <TouchableOpacity
      className="px-2 py-4 self-stretch"
      onPress={onRowPress}
      activeOpacity={onRowPress ? 0.7 : 1}
      disabled={!onRowPress}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-b4 font-sb text-[#BFBFBF]">{label}</Text>
        {rightLabel && (
          <Text className="text-b4 font-rg text-[#656565]">{rightLabel}</Text>
        )}
      </View>
      <View className="flex-row items-center justify-between mt-4">
        <Text
          className={`text-b3 font-rg ${dimmed ? "text-[#BFBFBF]" : "text-gray-black"}`}
        >
          {value}
        </Text>
        {showChevron && (
          <Svg width="7" height="14" viewBox="0 0 7 14" fill="none">
            <Polyline
              points="1,1 6,7 1,13"
              stroke="#656565"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        )}
      </View>
      <View className="border-b border-[rgba(191,191,191,0.30)] mt-4" />
    </TouchableOpacity>
  );
}
