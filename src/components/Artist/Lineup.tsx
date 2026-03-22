import { useState } from "react";
import { View } from "react-native";
import { ArtistCategory } from "@/data/mockArtists";
import ArtistFilterBar from "./ArtistFilterBar";
import ArtistList from "./ArtistList";

const Lineup = () => {
  const [category, setCategory] = useState<ArtistCategory | null>(null);

  return (
    <View className="flex-1">
      <ArtistFilterBar
        type="Lineup"
        onFilterChange={(cat) => setCategory(cat as ArtistCategory | null)}
      />
      <ArtistList category={category} />
    </View>
  );
};

export default Lineup;
