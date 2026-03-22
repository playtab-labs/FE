import { useState } from "react";
import { View } from "react-native";
import { ArtistCategory, MOCK_ARTISTS } from "@/data/mockArtists";
import ArtistFilterBar from "./ArtistFilterBar";
import ArtistList from "./ArtistList";

const Lineup = () => {
  const [category, setCategory] = useState<ArtistCategory | null>(null);
  const [favOnly, setFavOnly] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(MOCK_ARTISTS.filter((a) => a.isFavorite).map((a) => a.id)),
  );

  const toggleFavorite = (id: string, fav: boolean) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      fav ? next.add(id) : next.delete(id);
      return next;
    });
  };

  return (
    <View className="flex-1">
      <ArtistFilterBar
        type="Lineup"
        onFilterChange={(cat, _, fav) => {
          setCategory(cat as ArtistCategory | null);
          setFavOnly(fav);
        }}
      />
      <ArtistList
        category={category}
        favOnly={favOnly}
        favorites={favorites}
        onFavoriteToggle={toggleFavorite}
      />
    </View>
  );
};

export default Lineup;
