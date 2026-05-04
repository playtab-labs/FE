import MoreButton from "@/components/common/MoreButton";
import { typo } from "@/styles/typography";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DrinkBoothItem from "./DrinkBoothItem";

interface DrinkBoothData {
  id: string | number;
  name: string;
  thumbnailImageUrl?: string;
}

interface DrinkBoothListSectionProps {
  items: DrinkBoothData[];
  onMorePress?: () => void;
  onItemPress?: (id: string | number) => void;
}

export default function DrinkBoothListSection({
  items,
  onMorePress,
  onItemPress,
}: DrinkBoothListSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text className={typo.T3_Eb} style={styles.sectionTitle}>
          주점 리스트
        </Text>
        <MoreButton onPress={onMorePress} />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.list}
      >
        {items.map((item) => (
          <DrinkBoothItem
            key={item.id}
            name={item.name}
            thumbnailImageUrl={item.thumbnailImageUrl}
            onPress={() => onItemPress?.(item.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#1A1A1A",
    letterSpacing: -0.16,
  },
  scroll: {
    marginHorizontal: -17,
  },
  list: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 17,
  },
});
