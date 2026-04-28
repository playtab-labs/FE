import NoticeExample from "@/assets/svgs/noticeexample.svg";
import Layout from "@/components/Layout";
import { BadgeType } from "@/components/more/notice/NoticeBadge";
import NoticeCard from "@/components/more/notice/NoticeCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView } from "react-native";
import { SvgProps } from "react-native-svg";

export const NOTICE_ITEMS: {
  title: string;
  date: string;
  content: string;
  badge?: BadgeType;
  image?: string | React.FC<SvgProps>;
}[] = [
  {
    title: "[안내] 플레이탭 2026 공지사항 제목",
    date: "2026.04.01",
    content:
      "공지사항 내용이 들어가는 자리입니다. 자세한 내용은 본문을 확인해 주세요.. 자세한 내용은 본문을 확인해 주세요. 자세한 내용은 본문을 확인해 주세요",
    badge: "NEW",
    image: NoticeExample,
  },
  {
    title: "[안내] 플레이탭 2026 공지사항 제목",
    date: "2026.03.25",
    content:
      "공지사항 내용이 들어가는 자리입니다. 자세한 내용은 본문을 확인해 주세요.",
    badge: "필독",
  },
  {
    title: "[안내] 플레이탭 2026 공지사항 제목",
    date: "2026.03.10",
    content:
      "공지사항 내용이 들어가는 자리입니다. 자세한 내용은 본문을 확인해 주세요.",
  },
  {
    title: "[안내] 플레이탭 2026 공지사항 제목",
    date: "2026.02.28",
    content:
      "공지사항 내용이 들어가는 자리입니다. 자세한 내용은 본문을 확인해 주세요.",
  },
  {
    title: "[안내] 플레이탭 2026 공지사항 제목",
    date: "2026.02.14",
    content:
      "공지사항 내용이 들어가는 자리입니다. 자세한 내용은 본문을 확인해 주세요.",
  },
];

export default function Notice() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <Layout title="공지사항" showBack showCamera={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 32,
          gap: 8,
        }}
      >
        {NOTICE_ITEMS.map((item, index) => (
          <NoticeCard
            key={index}
            title={item.title}
            date={item.date}
            content={item.content}
            badge={item.badge}
            onPress={() => navigation.navigate("NoticeDetail", { index })}
          />
        ))}
      </ScrollView>
    </Layout>
  );
}
