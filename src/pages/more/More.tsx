import Layout from "@/components/Layout";
import IdCard from "@/components/more/IdCard";
import TabList from "@/components/more/TabList";
import Ticket from "@/components/more/Ticket";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const TAB_ITEMS = [
  { label: "개인정보 변경", icon: require("@/assets/pngs/personlity.png") },
  { label: "공지사항", icon: require("@/assets/pngs/ring.png") },
  { label: "언어", icon: require("@/assets/pngs/language.png") },
  {
    label: "오프라인 데이터 다운",
    icon: require("@/assets/pngs/download.png"),
  },
  { label: "FAQ", icon: require("@/assets/pngs/faq.png") },
  { label: "주최 주관 정보", icon: require("@/assets/pngs/host.png") },
  { label: "후원 협찬", icon: require("@/assets/pngs/sponsor.png") },
  { label: "이용약관", icon: require("@/assets/pngs/term.png") },
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
).sort((a, b) => b.day - a.day);

export default function More() {
  const navigation = useNavigation<any>();
  const [expanded, setExpanded] = useState(false);
  const hasMultiple = TICKETS.length > 1;
  const visibleTickets = hasMultiple && !expanded ? [TICKETS[0]] : TICKETS;

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
        <IdCard name="홍길동" email="gildong1234@gmail.com" isSogang />

        {/* 티켓 */}
        {visibleTickets.map((ticket) => (
          <Ticket key={ticket.day} {...ticket} />
        ))}

        {/* 펼치기/접기 버튼 */}
        {hasMultiple && (
          <TouchableOpacity
            onPress={() => setExpanded((prev) => !prev)}
            activeOpacity={0.7}
            className="items-center justify-center rounded-lg bg-white"
            style={{
              width: 326,
              height: 24,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.25,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Svg width="16" height="8" viewBox="0 0 16 8" fill="none">
              <Path
                d={expanded ? "M1 7L8 1.5L15 7" : "M15 1L8 6.5L1 1"}
                stroke="#656565"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
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
                  : item.label === "FAQ"
                  ? () => navigation.navigate("FAQ")
                  : item.label === "주최 주관 정보"
                  ? () => navigation.navigate("Host")
                  : item.label === "후원 협찬"
                  ? () => navigation.navigate("Sponsor")
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
      </ScrollView>
    </Layout>
  );
}
