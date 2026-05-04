import { typo } from "@/styles/typography";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DrinkBoothItemProps {
  name: string;
  onPress?: () => void;
}

export default function DrinkBoothItem({ name, onPress }: DrinkBoothItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconCircle} />
      <Text className={typo.B4_Rg} style={styles.name} numberOfLines={2}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 88,
    height: 88,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
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
    backgroundColor: "#F5F5F5",
  },
  name: {
    color: "#1A1A1A",
    textAlign: "center",
    letterSpacing: -0.12,
  },
});
