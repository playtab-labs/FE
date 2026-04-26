import { getPubs, type Pub } from "@/api/booth";
import DrinkBoothItem from "@/components/home/DrinkBoothItem";
import { typo } from "@/styles/typography";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function PubListSection() {
  const [items, setItems] = useState<Pub[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPubs()
      .then((res) => {
        const data: Pub[] = res.data?.pubs ?? [];
        setItems(data.sort((a, b) => a.displayOrder - b.displayOrder));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.section}>
      <Text className={typo.T3_Eb} style={styles.sectionTitle}>
        주점
      </Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}
          contentContainerStyle={styles.list}
        >
          {items.map((item) => (
            <DrinkBoothItem
              key={item.id}
              name={item.isNameConfirmed ? item.collegeName : "미공개"}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 8 },
  sectionTitle: { color: "#1A1A1A", letterSpacing: -0.16 },
  scroll: { marginHorizontal: -17 },
  list: { flexDirection: "row", gap: 8, paddingHorizontal: 17 },
});
