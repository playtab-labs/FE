import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text>Home 화면 입니다.</Text>
      <TouchableOpacity
        style={styles.tempButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.tempButtonText}>임시 - 로그인으로 이동</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tempButton: {
    marginTop: 12,
    height: 44,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  tempButtonText: {
    fontSize: 14,
    color: "#aaa",
  },
});
