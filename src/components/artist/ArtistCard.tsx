import { ImageBackground, Text, View } from "react-native";
import { typo } from "@/styles/typography";
import FavoriteButton from "@/components/artist/FavoriteButton";

interface ArtistCardProps {
  name: string;
  imageUri: string;
  initialFavorited?: boolean;
  onFavoriteToggle?: (favorited: boolean) => void;
}

const ArtistCard = ({
  name,
  imageUri,
  initialFavorited,
  onFavoriteToggle,
}: ArtistCardProps) => {
  return (
    <ImageBackground
      source={{ uri: imageUri }}
      className="w-full aspect-[16/7] rounded-2xl overflow-hidden justify-end"
    >
      <View className="flex-row items-end justify-between p-4">
        <Text className={`${typo.B3_Eb} text-white`}>{name}</Text>
        <FavoriteButton
          initialFavorited={initialFavorited}
          onToggle={onFavoriteToggle}
          type="SET"
        />
      </View>
    </ImageBackground>
  );
};

export default ArtistCard;
