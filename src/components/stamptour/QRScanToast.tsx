import { typo } from "@/styles/typography";
import { Text, View } from "react-native";

export default function QRScanToast() {
  return (
    <View
      style={{
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      <Text
        className={typo.B2_Sb}
        style={{ color: "#1A1A1A", textAlign: "center", letterSpacing: -0.16 }}
      >
        인식완료!
      </Text>
    </View>
  );
}
