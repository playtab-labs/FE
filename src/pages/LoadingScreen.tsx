import SparkleParticles from "@/components/SparkleParticles";
import GotoLogo from "@/assets/svgs/goto.svg";
import KbLogo from "@/assets/svgs/kblogo.svg";
import { typo } from "@/styles/typography";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const { width: SW, height: SH } = Dimensions.get("window");

export default function LoadingScreen() {
  const navigation = useNavigation<any>();
  const [imageLoaded, setImageLoaded] = useState(false);

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
        style={[styles.poster, { opacity: imageLoaded ? 1 : 0 }]}
        resizeMode="cover"
        onLoad={() => setImageLoaded(true)}
      />
      {imageLoaded && (
        <View style={styles.particleLayer}>
          <SparkleParticles />
        </View>
      )}
      {imageLoaded && (
        <View style={styles.bottomRow}>
          <GotoLogo width={61} height={61} />
          <Text
            className={typo.T3_Eb}
            style={styles.playtapText}
          >
            PLAYTAP
          </Text>
          <KbLogo width={96} height={18} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  particleLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },
  poster: {
    position: "absolute",
    width: 375,
    height: 812,
    top: (SH - 812) / 2 - 60,
    left: (SW - 375) / 2,
  },
  bottomRow: {
    position: "absolute",
    bottom: 70,
    left: 60,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 100,
  },
  playtapText: {
    color: "#FFF",
    letterSpacing: -0.16,
    marginLeft: 9,
    marginRight: 17,
  },
});
