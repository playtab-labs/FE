import Layout from "@/components/Layout";
import NoticeCard from "@/components/more/notice/NoticeCard";
import { BadgeType } from "@/components/more/notice/NoticeBadge";
import { ScrollView } from "react-native";

const NOTICE_ITEMS: { title: string; date: string; content: string; badge?: BadgeType }[] = [
  {
    title: "[안내] 플레이탭 2026 공지사항 제목",
    date: "2026.04.01",
    content:
      "공지사항 내용이 들어가는 자리입니다. 자세한 내용은 본문을 확인해 주세요.. 자세한 내용은 본문을 확인해 주세요. 자세한 내용은 본문을 확인해 주세요",
    badge: "NEW",
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
  return (
    <Layout title="공지사항" showBack showCamera={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: -17 }}
        contentContainerStyle={{
          paddingHorizontal: 17,
          paddingTop: 24,
          paddingBottom: 32,
          gap: 16,
        }}
      >

        {NOTICE_ITEMS.map((item, index) => (
          <NoticeCard
            key={index}
            title={item.title}
            date={item.date}
            content={item.content}
            badge={item.badge}
          />
        ))}
      </ScrollView>
    </Layout>
  );
}
