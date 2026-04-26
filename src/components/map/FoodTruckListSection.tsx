import { getFoodTrucks, type FoodTruck } from "@/api/booth";
import { typo } from "@/styles/typography";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FoodTruckItem from "./FoodTruckItem";

export default function FoodTruckListSection() {
  const [items, setItems] = useState<FoodTruck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFoodTrucks()
      .then((res) => {
        const data: FoodTruck[] = res.data?.foodTrucks ?? [];
        setItems(data.sort((a, b) => a.displayOrder - b.displayOrder));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.section}>
      <Text className={typo.T3_Eb} style={styles.sectionTitle}>
        푸드트럭
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
            <FoodTruckItem
              key={item.id}
              name={item.name}
              description={item.shortDescription}
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
