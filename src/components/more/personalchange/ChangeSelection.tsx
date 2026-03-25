import { Text, TouchableOpacity, View } from "react-native";

interface ChangeSelectionProps {
  label: string;
  value: string;
  onChangePress?: () => void;
  onRowPress?: () => void;
  dimmed?: boolean;
}

export default function ChangeSelection({
  label,
  value,
  onChangePress,
  onRowPress,
  dimmed = false,
}: ChangeSelectionProps) {
  return (
    <TouchableOpacity
      className="px-[12px] py-2 self-stretch"
      onPress={onRowPress}
      activeOpacity={onRowPress ? 0.7 : 1}
      disabled={!onRowPress}
    >
      <Text className="text-b4 font-sb text-[#BFBFBF]">{label}</Text>
      <View className="flex-row items-center justify-between mt-[4px]">
        <Text className={`text-b3 font-sb ${dimmed ? "text-[#BFBFBF]" : "text-gray-black"}`}>{value}</Text>
        {onChangePress && (
          <TouchableOpacity
            onPress={onChangePress}
            activeOpacity={0.7}
            className="flex-row bg-extra-white rounded-2xl items-center justify-center px-[8px] py-[6px]"
          >
            <Text className="text-b4 font-sb text-dark-gray">변경하기</Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="border-b border-[rgba(191,191,191,0.30)] mt-4" />
    </TouchableOpacity>
  );
}
