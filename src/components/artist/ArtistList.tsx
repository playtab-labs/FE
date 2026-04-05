import { ScrollView, Text, View } from "react-native";
import { typo } from "@/styles/typography";
import { ArtistCategory, groupByDay, MOCK_ARTISTS } from "@/data/mockArtists";
import ArtistCard from "./ArtistCard";

interface ArtistListProps {
  category?: ArtistCategory | null;
  favOnly?: boolean;
  favorites?: Set<string>;
  onFavoriteToggle?: (id: string, fav: boolean) => void;
}

const ArtistList = ({
  category = null,
  favOnly = false,
  favorites = new Set(),
  onFavoriteToggle,
}: ArtistListProps) => {
  const dayGroups = groupByDay(MOCK_ARTISTS, category).map((group) => ({
    ...group,
    artists: favOnly
      ? group.artists.filter((a) => favorites.has(a.id))
      : group.artists,
  }));

  return (
    <ScrollView contentContainerClassName=" py-6 gap-8">
      {dayGroups.map(({ day, label, artists }) => (
        <View key={day} className="gap-6">
          <Text className={`${typo.T3_Eb} text-black`}>{label}</Text>

          {artists.length === 0 ? (
            <View className="py-8 items-center">
              <Text className={`${typo.B3_Rg} text-dark-gray`}>
                {favOnly
                  ? "해당 날짜에 즐겨찾기한 아티스트가 없습니다."
                  : `📢    DAY 1은 아티스트 무대가 없습니다.   📢`}
              </Text>
            </View>
          ) : (
            <View className="gap-4">
              {artists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  name={artist.name}
                  imageUri={artist.imageUri}
                  initialFavorited={favorites.has(artist.id)}
                  onFavoriteToggle={(fav) => onFavoriteToggle?.(artist.id, fav)}
                />
              ))}
            </View>
          )}

          <View className="h-[1px] bg-gray my-6" />
        </View>
      ))}
    </ScrollView>
  );
};

export default ArtistList;
