import { typo } from "@/styles/typography";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface FoodTruckItemProps {
  name: string;
  menu?: string;
  onPress?: () => void;
}

export default function FoodTruckItem({
  name,
  menu,
  onPress,
}: FoodTruckItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text className={typo.B3_Sb} style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      {menu && (
        <Text style={styles.menu} numberOfLines={1}>
          {menu}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 104,
    height: 80,
    padding: 16,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: "#FFF",
  },
  name: {
    color: "#1A1A1A",
    textAlign: "center",
    letterSpacing: -0.14,
  },
  menu: {
    color: "#1A1A1A",
    textAlign: "center",
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 15.6,
    letterSpacing: -0.12,
  },
});
