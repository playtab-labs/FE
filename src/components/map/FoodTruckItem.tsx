import { typo } from "@/styles/typography";
import { Text, TouchableOpacity } from "react-native";

interface FoodTruckItemProps {
  name: string;
  description?: string;
  onPress?: () => void;
}

export default function FoodTruckItem({
  name,
  description = "저희꺼 맛있어요",
  onPress,
}: FoodTruckItemProps) {
  return (
    <TouchableOpacity
      className="flex-1 basis-[40%] gap-1 p-4 rounded-xl bg-soft-gray-white"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text className={`${typo.T3_Eb} text-black`} numberOfLines={1}>
        {name}
      </Text>
      <Text className="text-b4 font-rg text-black" numberOfLines={2}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}
