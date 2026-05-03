import { typo } from "@/styles/typography";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface PubItemProps {
  name: string;
  thumbnailImageUrl?: string;
  menu?: string;
  description?: string;
  onPress?: () => void;
}

export default function PubItem({
  name,
  thumbnailImageUrl,
  menu,
  description,
  onPress,
}: PubItemProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center gap-4 px-4 py-3 rounded-xl bg-soft-gray-white"
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* 썸네일 */}
      <View className="w-12 h-12 rounded-lg bg-[#E4E4E4] overflow-hidden">
        {thumbnailImageUrl ? (
          <Image
            source={{ uri: thumbnailImageUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : null}
      </View>

      {/* 텍스트 */}
      <View className="flex-1 gap-0.5">
        <View className="flex-row items-center gap-3">
          <Text className={`${typo.T3_Eb} text-black`} numberOfLines={1}>
            {name}
          </Text>
          {/* {menu ? (
            <Text className="text-b4 font-rg text-dark-gray flex-shrink" numberOfLines={1}>
              {menu}
            </Text>
          ) : null} */}
        </View>
        {/* {description ? (
          <Text className="text-b4 font-rg text-dark-gray" numberOfLines={1}>
            {description}
          </Text>
        ) : null} */}
      </View>
    </TouchableOpacity>
  );
}
