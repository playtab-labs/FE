import Layout from "@/components/Layout";
import AdBanner from "@/components/home/AdBanner";
import DrinkBoothListSection from "@/components/home/DrinkBoothListSection";
import HomeNoticeSection from "@/components/home/HomeNoticeSection";
import HomePoster from "@/components/home/HomePoster";
import MDBanner from "@/components/home/MDBanner";
import StampTourBanner from "@/components/home/StampTourBanner";
import FoodTruckListSection from "@/components/map/BoothList";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";

const AD_BANNERS = [1, 2, 3, 4, 5];

const SAMPLE_NOTICES = [
  {
    id: 1,
    title: "2025 서강대학교 축제 공지사항입니다.",
    date: "25.04.23",
    badge: "NEW" as const,
  },
  { id: 2, title: "스탬프 투어 운영 안내", date: "25.04.22" },
  {
    id: 3,
    title: "MD 굿즈 판매 관련 안내사항",
    date: "25.04.21",
    badge: "필독" as const,
  },
];

const SAMPLE_DRINK_BOOTHS = [
  { id: 1, name: "국어국문학과" },
  { id: 2, name: "영어영문학과" },
  { id: 3, name: "사학과" },
  { id: 4, name: "철학과" },
  { id: 5, name: "경제학과" },
  { id: 6, name: "경영학과" },
];

const SAMPLE_FOOD_TRUCKS = [
  { id: 1, name: "맛있는 트럭", description: "저희꺼 맛있어요" },
  { id: 2, name: "버거킹 트럭", description: "수제버거 전문점" },
  { id: 3, name: "달콤한 트럭", description: "디저트 & 음료" },
  { id: 4, name: "타코 트럭", description: "멕시칸 푸드" },
];

export default function Home() {
  const navigation = useNavigation<any>();
  return (
    <Layout
      scrollable
      fullBleedTop
      statusBarStyle="light-content"
      fullBleedHeader={<HomePoster />}
    >
      <View style={{ marginTop: 24, flexDirection: "column", gap: 16 }}>
        <StampTourBanner onPress={() => navigation.navigate("StampTour")} />
        <MDBanner onPress={() => navigation.navigate("MD")} />
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
          onMorePress={() => navigation.navigate("More", { screen: "Notice" })}
        />
      </View>
      <View style={{ marginTop: 24 }}>
        <DrinkBoothListSection items={SAMPLE_DRINK_BOOTHS} />
      </View>
      <View style={{ marginTop: 24, marginBottom: 50 }}>
        <FoodTruckListSection items={SAMPLE_FOOD_TRUCKS} />
      </View>
    </Layout>
  );
}
