import SparkleParticles from "@/components/SparkleParticles";
import KbLogo from "@/assets/svgs/kblogo.svg";
import { typo } from "@/styles/typography";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function LoadingScreen() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({ index: 0, routes: [{ name: "Tabs" }] });
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        source={require("@/assets/pngs/loadingposter.png")}
        style={styles.poster}
        resizeMode="cover"
      />
      <SparkleParticles />
      <View style={styles.bottomRow}>
        <Image
          source={require("@/assets/pngs/goto.png")}
          style={styles.gotoLogo}
          resizeMode="contain"
        />
        <Text
          className={typo.T3_Eb}
          style={styles.playtapText}
        >
          PLAYTAP
        </Text>
        <KbLogo width={96} height={18} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  poster: {
    width: 375,
    height: 812,
    marginTop: -60,
  },
  bottomRow: {
    position: "absolute",
    bottom: 70,
    left: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  gotoLogo: {
    height: 18,
  },
  playtapText: {
    color: "#FFF",
    letterSpacing: -0.16,
    marginLeft: 9,
    marginRight: 17,
  },
});
