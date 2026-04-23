import Layout from "@/components/Layout";
import AdBanner from "@/components/home/AdBanner";
import HomeNoticeSection from "@/components/home/HomeNoticeSection";
import MDBanner from "@/components/home/MDBanner";
import StampTourBanner from "@/components/home/StampTourBanner";
import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, useWindowDimensions, View } from "react-native";

const AD_BANNERS = [1, 2, 3, 4, 5];

const SAMPLE_NOTICES = [
  { id: 1, title: '2025 서강대학교 축제 공지사항입니다.', date: '25.04.23', badge: 'NEW' as const },
  { id: 2, title: '스탬프 투어 운영 안내', date: '25.04.22' },
  { id: 3, title: 'MD 굿즈 판매 관련 안내사항', date: '25.04.21', badge: '필독' as const },
];

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
        <MDBanner onPress={() => navigation.navigate('MD')} />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 24, marginHorizontal: -17 }}
        contentContainerStyle={{ paddingHorizontal: 17, gap: 16 }}
      >
        {AD_BANNERS.map((id) => (
          <AdBanner key={id} />
        ))}
      </ScrollView>
      <View style={{ marginTop: 24 }}>
        <HomeNoticeSection
          items={SAMPLE_NOTICES}
          onMorePress={() => navigation.navigate('More', { screen: 'Notice' })}
        />
      </View>
    </Layout>
  );
}

