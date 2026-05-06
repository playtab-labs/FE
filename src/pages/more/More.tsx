import client from "@/api/client";
import FaqIcon from "@/assets/svgs/faq.svg";
import HostIcon from "@/assets/svgs/host.svg";
import LanguageIcon from "@/assets/svgs/language.svg";
import ProfileIcon from "@/assets/svgs/profile.svg";
import RingIcon from "@/assets/svgs/ring.svg";
import SponsorIcon from "@/assets/svgs/sponsor.svg";
import TermIcon from "@/assets/svgs/term.svg";
import Layout from "@/components/Layout";
import IdCard from "@/components/more/IdCard";
import TabList from "@/components/more/TabList";
import Ticket from "@/components/more/Ticket";
import { useAuthStore } from "@/stores/authStore";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TAB_ITEMS = [
  {
    key: "editPersonalInfo",
    screen: "PersonalChange",
    icon: <ProfileIcon width={24} height={24} />,
  },
  {
    key: "notices",
    screen: "Notice",
    icon: <RingIcon width={24} height={24} />,
  },
  {
    key: "language",
    screen: "Language",
    icon: <LanguageIcon width={24} height={24} />,
  },
  { key: "faq", screen: "FAQ", icon: <FaqIcon width={24} height={24} /> },
  {
    key: "hostOrganizerInfo",
    screen: "Host",
    icon: <HostIcon width={24} height={24} />,
  },
  {
    key: "sponsors",
    screen: "Sponsor",
    icon: <SponsorIcon width={24} height={24} />,
  },
  {
    key: "termsOfUse",
    screen: "Terms",
    icon: <TermIcon width={24} height={24} />,
  },
];

const LANG_NAMES: Record<string, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  zh: "中文(简体)",
  "zh-TW": "中文(繁體)",
};

const PEEK = 50; // 뒤 티켓이 앞 티켓 아래로 보이는 높이
const GAP = 8; // 펼쳐졌을 때 두 티켓 사이 간격

const MY_WRISTBANDS = gql`
  query MyWristbands {
    myWristbands {
      rfid
      activeDate
      linkedAt
    }
  }
`;

export default function More() {
  const { t, i18n } = useTranslation();

  const TICKETS: React.ComponentProps<typeof Ticket>[] = (
    [
      {
        day: 3,
        status: "available",
        date: "26.05.14",
        time: "18:00~22:00",
        location: t("more.youthPlaza"),
      },
      {
        day: 2,
        status: "expired",
        date: "26.05.14",
        time: "18:00~22:00",
        location: t("more.youthPlaza"),
      },
    ] as React.ComponentProps<typeof Ticket>[]
  ).sort((a, b) => {
    const dayA = "day" in a ? a.day : 0;
    const dayB = "day" in b ? b.day : 0;
    return dayB - dayA;
  });

  const navigation = useNavigation<any>();
  const { accessToken /*, clearTokens, refreshToken */ } = useAuthStore();
  const { data: wristbandData, refetch: refetchWristbands } = useQuery<{
    myWristbands: { rfid: string; activeDate: string; linkedAt: string }[];
  }>(MY_WRISTBANDS);
  const [me, setMe] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    const fetchMe = async () => {
      try {
        const token = await SecureStore.getItemAsync("accessToken").catch(
          () => null,
        );
        const res = await client.post(
          "/graphql",
          { query: `query { me { name email } }` },
          { headers: token ? { Authorization: `Bearer ${token}` } : {} },
        );
        setMe(res.data?.data?.me ?? null);
      } catch {}
    };
    fetchMe();
    refetchWristbands();
  }, [accessToken]);

  const isSogang = me?.email?.endsWith("@sogang.ac.kr") ?? false;
  const [expanded, setExpanded] = useState(false);
  const [ticketHeight, setTicketHeight] = useState(0);
  const animValue = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    Animated.spring(animValue, {
      toValue: expanded ? 0 : 1,
      useNativeDriver: false,
      tension: 60,
      friction: 12,
    }).start();
    setExpanded((prev) => !prev);
  };

  const hasMultiple = TICKETS.length > 1;

  // 앞 티켓 marginTop: PEEK(뒤 티켓 상단만 노출) → 펼쳐지면 아래로
  const frontMarginTop = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [PEEK, ticketHeight > 0 ? ticketHeight + GAP : PEEK],
  });

  // 뒤 티켓 opacity: 접혔을 때 흐릿 → 펼쳐지면 선명
  const backOpacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  return (
    <Layout
      title={t("more.appBar")}
      showBack={false}
      showCamera={false}
      noPadding
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 16,
          gap: 16,
        }}
      >
        {/* ID 카드 */}
        <IdCard
          name={me?.name ?? "-"}
          email={me?.email ?? "-"}
          isSogang={isSogang}
        />

        {/* 티켓 */}
        {!wristbandData || wristbandData.myWristbands.length === 0 ? (
          <Ticket noticket />
        ) : !hasMultiple ? (
          <Ticket {...TICKETS[0]} />
        ) : (
          <View style={{ width: "100%" }}>
            {/* 뒤 티켓 — absolute, 상단 PEEK만 노출, 흐릿 → 선명 */}
            <Animated.View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                opacity: backOpacity,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.4)",
              }}
            >
              <TouchableOpacity onPress={toggle} activeOpacity={0.9}>
                <Ticket {...TICKETS[1]} />
              </TouchableOpacity>
            </Animated.View>

            {/* 앞 티켓 — marginTop으로 자연스럽게 높이 확보, 뒤 티켓을 덮음 */}
            <Animated.View
              style={{
                marginTop: frontMarginTop,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 8,
              }}
              onLayout={(e) => {
                if (ticketHeight === 0) {
                  setTicketHeight(e.nativeEvent.layout.height);
                }
              }}
            >
              <Ticket {...TICKETS[0]} />
            </Animated.View>
          </View>
        )}

        {/*
        로그아웃 버튼 (디자인에서 빠짐)
        <TouchableOpacity
          onPress={async () => {
            const { clearTokens } = useAuthStore.getState();
            await clearTokens();
            navigation.reset({ index: 0, routes: [{ name: "Login" }] });
          }}
          className="py-3 px-4 bg-red-100 rounded-lg"
        >
          <Text className="text-b4 font-sb text-red-600 text-center">
            {t("more.logout")}
          </Text>
        </TouchableOpacity>
        */}

        {/* 탭 리스트 */}
        <View className="w-full">
          {TAB_ITEMS.map((item) => (
            <TabList
              key={item.key}
              icon={item.icon}
              label={t(`more.${item.key}`)}
              onPress={() => navigation.navigate(item.screen)}
              rightElement={
                item.key === "language" ? (
                  <Text className="text-b4 font-rg text-[#656565] text-right">
                    {LANG_NAMES[i18n.language] ?? i18n.language}
                  </Text>
                ) : undefined
              }
            />
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
}
