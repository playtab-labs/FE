import { getFoodTrucks, getPubs } from "@/api/booth";
import { getNotices, NoticeSummary } from "@/api/notice";
import { getMyStamps } from "@/api/stamp";
import Layout from "@/components/Layout";
import AdBanner from "@/components/home/AdBanner";
import DrinkBoothListSection from "@/components/home/DrinkBoothListSection";
import FoodTruckListSection from "@/components/home/FoodTruckListSection";
import HomeNoticeSection from "@/components/home/HomeNoticeSection";
import HomePoster from "@/components/home/HomePoster";
import MDBanner from "@/components/home/MDBanner";
import StampTourBanner from "@/components/home/StampTourBanner";
import { useAuthStore } from "@/stores/authStore";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Linking, ScrollView, View } from "react-native";

import adbanner1 from "@/assets/pngs/adbanner1.png";

const AD_BANNERS = [1, 2];

const formatDate = (postedAt: string) => postedAt.split("T")[0].replace(/-/g, ".");

const getNoticeBadge = (isPinned: boolean, postedAt: string): "필독" | "NEW" | undefined => {
  if (isPinned) return "필독";
  const diff = Date.now() - new Date(postedAt).getTime();
  if (diff >= 0 && diff < 24 * 60 * 60 * 1000) return "NEW";
  return undefined;
};

export default function Home() {
  const navigation = useNavigation<any>();
  const { loadEmail } = useAuthStore();
  const [isSogang, setIsSogang] = useState(false);
  const [stampProgress, setStampProgress] = useState(0);
  const [drinkBooths, setDrinkBooths] = useState<
    { id: string; name: string; thumbnailImageUrl?: string }[]
  >([]);
  const [homeNotices, setHomeNotices] = useState<
    { id: string; title: string; date: string; badge?: "NEW" | "필독" }[]
  >([]);
  const [rawNotices, setRawNotices] = useState<NoticeSummary[]>([]);
  const [foodTrucks, setFoodTrucks] = useState<{ id: string; name: string; menu?: string }[]>([]);

  useEffect(() => {
    loadEmail().then((email) =>
      setIsSogang(email?.endsWith("@sogang.ac.kr") ?? false),
    );
  }, [loadEmail]);

  useEffect(() => {
    getMyStamps()
      .then(({ visitedCount }) =>
        setStampProgress(Math.round((visitedCount / 9) * 100)),
      )
      .catch(() => {});
  }, []);

  useEffect(() => {
    getPubs()
      .then((res) =>
        setDrinkBooths(
          [...res.data.pubs]
            .sort((a: { displayOrder: number }, b: { displayOrder: number }) => a.displayOrder - b.displayOrder)
            .map((p: { id: string; collegeName: string; thumbnailImageUrl: string }) => ({
              id: p.id,
              name: p.collegeName,
              thumbnailImageUrl: p.thumbnailImageUrl,
            }))
        )
      )
      .catch(() => {});
  }, []);

  useEffect(() => {
    getFoodTrucks()
      .then((res) =>
        setFoodTrucks(
          [...res.data.foodTrucks]
            .sort((a: { displayOrder: number }, b: { displayOrder: number }) => a.displayOrder - b.displayOrder)
            .map((t: { id: string; name: string; shortDescription?: string }) => ({ id: t.id, name: t.name, menu: t.shortDescription }))
        )
      )
      .catch(() => {});
  }, []);

  useEffect(() => {
    getNotices()
      .then((res) => {
        const sliced = res.data.notices.notices.slice(0, 3);
        setRawNotices(sliced);
        setHomeNotices(
          sliced.map((n) => ({
            id: n.id,
            title: n.title,
            date: formatDate(n.postedAt),
            badge: getNoticeBadge(n.isPinned, n.postedAt),
          }))
        );
      })
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
          onPress={() => navigation.navigate("StampTour")}
          disabled={!isSogang}
          progress={stampProgress}
        />
        <MDBanner onPress={() => navigation.navigate("MD")} />
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
            onPress={
              id === 1
                ? () =>
                    Linking.openURL(
                      "https://obank.kbstar.com/quics?page=C041244&scheme=kbbank&pageid=D001352&urlparam=%EC%9D%B4%EB%B2%A4%ED%8A%B8%EC%9D%BC%EB%A0%A8%EB%B2%88%ED%98%B8:351412",
                    )
                : undefined
            }
          />
        ))}
      </ScrollView>
      <View style={{ marginTop: 24 }}>
        <HomeNoticeSection
          items={homeNotices}
          onMorePress={() => navigation.navigate("Notice")}
          onItemPress={(id) => navigation.navigate("NoticeDetail", { noticeId: id, notices: rawNotices })}
        />
      </View>
      <View style={{ marginTop: 24 }}>
        <DrinkBoothListSection items={drinkBooths} />
      </View>
      <View style={{ marginTop: 24, marginBottom: 50 }}>
        <FoodTruckListSection items={foodTrucks} />
      </View>
    </Layout>
  );
}
