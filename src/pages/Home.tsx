import Layout from "@/components/Layout";
import AdBanner from "@/components/home/AdBanner";
import MDBanner from "@/components/home/MDBanner";
import StampTourBanner from "@/components/home/StampTourBanner";
import { Image, useWindowDimensions, View } from "react-native";

export default function Home() {
  const { width } = useWindowDimensions();

  return (
    <Layout showBack={true} title={
        <Image
          source={require("@/assets/pngs/soganglogo.png")}
          style={{ width: 135, height: 38, aspectRatio: 135 / 38 }}
          resizeMode="contain"
        />
      }>
      <Image
        source={require("@/assets/pngs/homeposter.png")}
        style={{ width, aspectRatio: 122 / 163, marginHorizontal: -17 }}
        resizeMode="cover"
      />
      <View style={{ marginTop: 16, flexDirection: "row", gap: 16 }}>
        <StampTourBanner />
        <MDBanner />
      </View>
      <View style={{ marginTop: 16 }}>
        <AdBanner />
      </View>
    </Layout>
  );
}

