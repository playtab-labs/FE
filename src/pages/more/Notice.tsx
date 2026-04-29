import Layout from "@/components/Layout";
import NoticeCard from "@/components/more/notice/NoticeCard";
import { getNotices, NoticeSummary } from "@/api/notice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

const formatDate = (postedAt: string) => postedAt.split("T")[0].replace(/-/g, ".");

export default function Notice() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [notices, setNotices] = useState<NoticeSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotices()
      .then((res) => setNotices(res.data.notices.notices))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout title="공지사항" showBack showCamera={false}>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="px-3"
          contentContainerStyle={{ paddingTop: 24, paddingBottom: 32, gap: 16 }}
        >
          {notices.map((item) => (
            <NoticeCard
              key={item.id}
              title={item.title}
              date={formatDate(item.postedAt)}
              content={item.contentPreview}
              badge={item.isPinned ? "필독" : undefined}
              onPress={() => navigation.navigate("NoticeDetail", { noticeId: item.id, notices })}
            />
          ))}
        </ScrollView>
      )}
    </Layout>
  );
}
