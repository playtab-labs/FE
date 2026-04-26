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
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { authApi } from "@/api/auth";
import { useAuthStore } from "@/stores/authStore";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";

const GET_ME = gql`
  query GetMe {
    me {
      name
      email
    }
  }
`;
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const TAB_ITEMS = [
  { label: "개인정보 변경", icon: <ProfileIcon width={24} height={24} /> },
  { label: "공지사항", icon: <RingIcon width={24} height={24} /> },
  { label: "언어", icon: <LanguageIcon width={24} height={24} /> },
  { label: "FAQ", icon: <FaqIcon width={24} height={24} /> },
  { label: "주최 주관 정보", icon: <HostIcon width={24} height={24} /> },
  { label: "후원 협찬", icon: <SponsorIcon width={24} height={24} /> },
  { label: "이용약관", icon: <TermIcon width={24} height={24} /> },
];

// day 내림차순 정렬 (3>2>1)
const TICKETS: React.ComponentProps<typeof Ticket>[] = (
  [
    {
      day: 3,
      status: "available",
      date: "26.05.14",
      time: "18:00~22:00",
      location: "청년광장",
    },
    {
      day: 2,
      status: "expired",
      date: "26.05.14",
      time: "18:00~22:00",
      location: "청년광장",
    },
  ] as React.ComponentProps<typeof Ticket>[]
).sort((a, b) => {
  const dayA = "day" in a ? a.day : 0;
  const dayB = "day" in b ? b.day : 0;
  return dayB - dayA;
});

const PEEK = 50; // 뒤 티켓이 앞 티켓 아래로 보이는 높이
const GAP = 8; // 펼쳐졌을 때 두 티켓 사이 간격

export default function More() {
  const navigation = useNavigation<any>();
  const { clearTokens, refreshToken } = useAuthStore();
  const { data } = useQuery<{ me: { name: string; email: string } }>(GET_ME);
  const isSogang = data?.me?.email?.endsWith("@sogang.ac.kr") ?? false;
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
    <Layout title="MORE" showBack={false} showCamera={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: -17 }}
        contentContainerStyle={{
          paddingHorizontal: 17,
          paddingVertical: 16,
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* ID 카드 */}
        <IdCard name={data?.me?.name ?? "-"} email={data?.me?.email ?? "-"} isSogang={isSogang} />

        {/* 티켓 */}
        {TICKETS.length === 0 ? null : !hasMultiple ? (
          <Ticket {...TICKETS[0]} />
        ) : (
          <View style={{ width: 329 }}>
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

        {/* 탭 리스트 */}
        <View className="w-[329px]">
          {TAB_ITEMS.map((item) => (
            <TabList
              key={item.label}
              icon={item.icon}
              label={item.label}
              onPress={
                item.label === "개인정보 변경"
                  ? () => navigation.navigate("PersonalChange")
                  : item.label === "공지사항"
                    ? () => navigation.navigate("Notice")
                    : item.label === "FAQ"
                    ? () => navigation.navigate("FAQ")
                    : item.label === "주최 주관 정보"
                      ? () => navigation.navigate("Host")
                      : item.label === "후원 협찬"
                        ? () => navigation.navigate("Sponsor")
                        : item.label === "언어"
                          ? () => navigation.navigate("Language")
                          : item.label === "이용약관"
                            ? () => navigation.navigate("Terms")
                            : undefined
              }
              rightElement={
                item.label === "언어" ? (
                  <Text className="text-b4 font-rg text-[#656565] text-right">
                    한국어
                  </Text>
                ) : undefined
              }
            />
          ))}
        </View>

        {/* 임시 로그아웃 버튼 */}
        <TouchableOpacity
          onPress={async () => {
            try {
              if (refreshToken) await authApi.logout(refreshToken);
            } catch {}
            await clearTokens();
            navigation.reset({ index: 0, routes: [{ name: "Login" }] });
          }}
          className="w-[329px] h-11 border border-gray-300 rounded-lg items-center justify-center"
        >
          <Text className="text-sm text-gray-400">임시 - 로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
}
