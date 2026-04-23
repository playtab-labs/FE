import Layout from "@/components/Layout";
import AdBanner from "@/components/home/AdBanner";
import MDBanner from "@/components/home/MDBanner";
import StampTourBanner from "@/components/home/StampTourBanner";
import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, useWindowDimensions, View } from "react-native";

const AD_BANNERS = [1, 2, 3, 4, 5]; //광고 수

export default function Home() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();
  return (
    <Layout
      scrollable
      title={
        <Image
          source={require("@/assets/pngs/soganglogo.png")}
          style={{ width: 135, height: 38, aspectRatio: 135 / 38 }}
          resizeMode="contain"
        />
      }
      fullBleedHeader={
        <Image
          source={require("@/assets/pngs/homeposter.png")}
          style={{ width, aspectRatio: 122 / 163, alignSelf: "center" }}
          resizeMode="cover"
        />
      }
    >
      <View style={{ marginTop: 16, flexDirection: "column", gap: 16 }}>
        <StampTourBanner onPress={() => navigation.navigate('StampTour')} />
        <MDBanner onPress={() => navigation.navigate('MD')}/>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 16, marginHorizontal: -17 }}
        contentContainerStyle={{ paddingHorizontal: 17, gap: 16 }}
      >
        {AD_BANNERS.map((id) => (
          <AdBanner key={id} />
        ))}
      </ScrollView>
    </Layout>
  );
}

