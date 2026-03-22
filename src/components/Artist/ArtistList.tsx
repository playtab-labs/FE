import Layout from "../Layout";
import ArtistCard from "./ArtistCard";
import { View } from "react-native";

const ArtistList = () => {
  return (
    <View>
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
};

export default ArtistList;
