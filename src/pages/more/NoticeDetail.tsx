import Layout from "@/components/Layout";
import NoticeDetailBody from "@/components/more/notice/NoticeDetailBody";
import NoticeDetailHeader from "@/components/more/notice/NoticeDetailHeader";
import NoticeNavItem from "@/components/more/notice/NoticeNavItem";
import { getNoticeDetail, NoticeDetail as NoticeDetailType, NoticeSummary } from "@/api/notice";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

type NoticeDetailParams = {
  NoticeDetail: {
    noticeId: string;
    notices: NoticeSummary[];
  };
};

const formatDate = (postedAt: string) => postedAt.split("T")[0].replace(/-/g, ".");

export default function NoticeDetail() {
  const route = useRoute<RouteProp<NoticeDetailParams, "NoticeDetail">>();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { noticeId, notices } = route.params;

  const [detail, setDetail] = useState<NoticeDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getNoticeDetail(noticeId)
      .then((res) => setDetail(res.data.noticeDetail))
      .finally(() => setLoading(false));
  }, [noticeId]);

  const currentIndex = notices.findIndex((n) => n.id === noticeId);
  const prev = notices[currentIndex - 1];
  const next = notices[currentIndex + 1];

  return (
    <Layout title="공지사항" showBack showCamera={false}>
      {loading || !detail ? (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={styles.container}>
          <NoticeDetailHeader
            title={detail.title}
            date={formatDate(detail.postedAt)}
            badge={detail.isPinned ? "필독" : undefined}
          />
          <View style={styles.dividerWrap}>
            <View style={styles.divider} />
          </View>
          <NoticeDetailBody content={detail.content} />
          <View style={styles.navContainer}>
            {prev && (
              <NoticeNavItem
                type="prev"
                title={prev.title}
                date={formatDate(prev.postedAt)}
                onPress={() => navigation.replace("NoticeDetail", { noticeId: prev.id, notices })}
              />
            )}
            <View style={styles.navDivider} />
            {next && (
              <NoticeNavItem
                type="next"
                title={next.title}
                date={formatDate(next.postedAt)}
                onPress={() => navigation.replace("NoticeDetail", { noticeId: next.id, notices })}
              />
            )}
          </View>
        </View>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 5,
  },
  dividerWrap: {
    marginTop: 24,
    marginBottom: 24,
  },
  divider: {
    height: 1,
    alignSelf: "stretch",
    backgroundColor: "#BFBFBF",
  },
  navContainer: {
    marginTop: "auto",
    marginBottom: 10,
  },
  navDivider: {
    height: 1,
    backgroundColor: "#BFBFBF",
  },
});
