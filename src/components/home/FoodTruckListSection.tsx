import { typo } from "@/styles/typography";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FoodTruckItem from "./FoodTruckItem";

interface FoodTruckData {
  id: string | number;
  name: string;
  menu?: string;
}

interface FoodTruckListSectionProps {
  items: FoodTruckData[];
  onItemPress?: (id: string | number) => void;
}

export default function FoodTruckListSection({
  items,
  onItemPress,
}: FoodTruckListSectionProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text className={typo.T3_Eb} style={styles.sectionTitle}>
          {t("home.foodTruckList")}
        </Text>
      </View>
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
            menu={item.menu}
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
