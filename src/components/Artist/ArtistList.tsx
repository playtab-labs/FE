import { ScrollView, Text, View } from "react-native";
import { typo } from "@/styles/typography";
import { ArtistCategory, groupByDay, MOCK_ARTISTS } from "@/data/mockArtists";
import ArtistCard from "./ArtistCard";

interface ArtistListProps {
  category?: ArtistCategory | null;
}

const ArtistList = ({ category = null }: ArtistListProps) => {
  const dayGroups = groupByDay(MOCK_ARTISTS, category);

  return (
    <ScrollView contentContainerClassName="p-4 gap-8">
      {dayGroups.map(({ day, label, artists }) => (
        <View key={day} className="gap-3">
          {/* DAY 헤더 */}
          <Text className={`${typo.T3_Eb} text-black text-t3 font-eb`}>
            {label}
          </Text>

          {/* 아티스트 없을 때 */}
          {artists.length === 0 ? (
            <View className="py-8 items-center">
              <Text className={`${typo.B3_Rg} text-dark-gray`}>
                📢 {label.split(" - ")[0]}은 {category ?? "아티스트"} 무대가
                없습니다. 📢
              </Text>
            </View>
          ) : (
            <View className="gap-6">
              {artists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  name={artist.name}
                  imageUri={artist.imageUri}
                />
              ))}
            </View>
          )}

          {/* 구분선 */}
          <View className="h-[1px] bg-gray my-8" />
        </View>
      ))}
    </ScrollView>
  );
};

export default ArtistList;
