import ArtistCard from "@/components/Artist/ArtistCard";
import { View, Text } from "react-native";

export default function Artist() {
  return (
    <View className="items-center mt-12">
      <Text>Artist</Text>
      <View className="p-4 gap-4">
        <ArtistCard
          name="드래곤포니"
          imageUri="https://upload.wikimedia.org/wikipedia/commons/f/f8/Dragon_Pony_Round_Festival_2025.png"
        />
        <ArtistCard
          name="드래곤포니"
          imageUri="https://upload.wikimedia.org/wikipedia/commons/f/f8/Dragon_Pony_Round_Festival_2025.png"
        />
        <ArtistCard
          name="드래곤포니"
          imageUri="https://upload.wikimedia.org/wikipedia/commons/f/f8/Dragon_Pony_Round_Festival_2025.png"
        />
      </View>
    </View>
  );
}
