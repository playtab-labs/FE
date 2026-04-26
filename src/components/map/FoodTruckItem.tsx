import { typo } from "@/styles/typography";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FoodTruckItemProps {
  name: string;
  description?: string;
  onPress?: () => void;
}

export default function FoodTruckItem({
  name,
  description = "저희꺼 맛있어요",
  onPress,
}: FoodTruckItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconCircle} />
      <Text className={typo.B3_Sb} style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 136,
    padding: 16,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#FFF",
  },
  iconCircle: {
    width: 40,
    height: 40,
    paddingTop: 10,
    paddingRight: 6,
    paddingBottom: 8,
    paddingLeft: 6,
    borderRadius: 100,
    backgroundColor: "#E4E4E4",
  },
  name: {
    color: "#1A1A1A",
    textAlign: "center",
    letterSpacing: -0.14,
  },
  description: {
    height: 24,
    alignSelf: "stretch",
    color: "#1A1A1A",
    textAlign: "center",
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 15.6,
    letterSpacing: -0.12,
  },
});
