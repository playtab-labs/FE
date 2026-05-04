import { addFavorite, removeFavorite } from "@/api/artist";
import { useState } from "react";
import { View } from "react-native";
import ArtistFilterBar from "./ArtistFilterBar";
import ArtistList from "./ArtistList";

const Lineup = () => {
  const [favOnly, setFavOnly] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = async (id: string, fav: boolean) => {
    // 낙관적 업데이트
    setFavorites((prev) => {
      const next = new Set(prev);
      fav ? next.add(id) : next.delete(id);
      return next;
    });
    try {
      if (fav) await addFavorite(id);
      else await removeFavorite(id);
    } catch {
      // 실패 시 롤백
      setFavorites((prev) => {
        const next = new Set(prev);
        fav ? next.delete(id) : next.add(id);
        return next;
      });
    }
  };

  return (
    <View className="flex-1">
      <ArtistFilterBar
        type="Lineup"
        onFilterChange={(_cat, fav) => setFavOnly(fav)}
      />
      <ArtistList
        favOnly={favOnly}
        favorites={favorites}
        onFavoriteToggle={toggleFavorite}
      />
    </View>
  );
};

export default Lineup;
