import { getNotices } from "@/api/notice";
import { getMyStamps } from "@/api/stamp";
import Layout from "@/components/Layout";
import AdBanner from "@/components/home/AdBanner";
import DrinkBoothListSection from "@/components/home/DrinkBoothListSection";
import HomeNoticeSection from "@/components/home/HomeNoticeSection";
import HomePoster from "@/components/home/HomePoster";
import MDBanner from "@/components/home/MDBanner";
import StampTourBanner from "@/components/home/StampTourBanner";
import FoodTruckListSection from "@/components/map/BoothList";
import { useAuthStore } from "@/stores/authStore";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Linking, ScrollView, View } from "react-native";

import adbanner1 from '@/assets/pngs/adbanner1.png';

// const SAMPLE_NOTICES = [
//   {
//     id: 1,
//     title: "2025 서강대학교 축제 공지사항입니다.",
//     date: "25.04.23",
//     badge: "NEW" as const,
//   },
//   { id: 2, title: "스탬프 투어 운영 안내", date: "25.04.22" },
//   {
//     id: 3,
//     title: "MD 굿즈 판매 관련 안내사항",
//     date: "25.04.21",
//     badge: "필독" as const,
//   },
// ];
const AD_BANNERS = [1, 2];

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

const formatDate = (postedAt: string) => postedAt.split("T")[0].replace(/-/g, ".");

export default function Home() {
  const navigation = useNavigation<any>();
  const { loadEmail } = useAuthStore();
  const [isSogang, setIsSogang] = useState(false);
  const [stampProgress, setStampProgress] = useState(0);
  const [homeNotices, setHomeNotices] = useState<{ id: string; title: string; date: string; badge?: "NEW" | "필독" }[]>([]);

  useEffect(() => {
    loadEmail().then((email) => setIsSogang(email?.endsWith("@sogang.ac.kr") ?? false));
  }, []);

  useEffect(() => {
    getMyStamps()
      .then(({ visitedCount }) => setStampProgress(Math.round((visitedCount / 9) * 100)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    getNotices()
      .then((res) =>
        setHomeNotices(
          res.data.notices.notices.slice(0, 3).map((n) => ({
            id: n.id,
            title: n.title,
            date: formatDate(n.postedAt),
            badge: n.isPinned ? ("필독" as const) : undefined,
          }))
        )
      )
      .catch(() => {});
  }, []);


  return (
    <Layout
      scrollable
      fullBleedTop
      statusBarStyle="light-content"
      fullBleedHeader={<HomePoster />}
    >
      <View style={{ marginTop: 24, flexDirection: "column", gap: 16 }}>
        <StampTourBanner
          onPress={() => navigation.navigate('StampTour')}
          disabled={!isSogang}
          progress={stampProgress}
        />
        <MDBanner onPress={() => navigation.navigate('MD')} />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 24, marginHorizontal: -17 }}
        contentContainerStyle={{ paddingHorizontal: 17, gap: 16 }}
      >
        {AD_BANNERS.map((id) => (
          <AdBanner
            key={id}
            image={id === 1 ? adbanner1 : undefined}
            onPress={id === 1 ? () => Linking.openURL('https://obank.kbstar.com/quics?page=C041244&scheme=kbbank&pageid=D001352&urlparam=%EC%9D%B4%EB%B2%A4%ED%8A%B8%EC%9D%BC%EB%A0%A8%EB%B2%88%ED%98%B8:351412') : undefined}
          />
        ))}
      </ScrollView>
      <View style={{ marginTop: 24 }}>
        <HomeNoticeSection
          items={homeNotices}
          onMorePress={() => navigation.navigate('More', { screen: 'Notice' })}
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
