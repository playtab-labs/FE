import Layout from "@/components/Layout";
import NoticeDetailBody from "@/components/more/notice/NoticeDetailBody";
import NoticeDetailHeader from "@/components/more/notice/NoticeDetailHeader";
import NoticeNavItem from "@/components/more/notice/NoticeNavItem";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { NOTICE_ITEMS } from "./Notice";

type NoticeDetailParams = {
  NoticeDetail: {
    index: number;
  };
};

export default function NoticeDetail() {
  const route = useRoute<RouteProp<NoticeDetailParams, "NoticeDetail">>();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { index } = route.params;

  const item = NOTICE_ITEMS[index];
  const prev = NOTICE_ITEMS[index - 1];
  const next = NOTICE_ITEMS[index + 1];

  return (
    <Layout title="공지사항" showBack showCamera={false}>
      <View style={styles.container}>
        <NoticeDetailHeader
          title={item.title}
          date={item.date}
          badge={item.badge}
        />
        <View style={styles.dividerWrap}>
          <View style={styles.divider} />
        </View>
        <NoticeDetailBody content={item.content} image={item.image} />
        <View style={styles.navContainer}>
          {prev && (
            <NoticeNavItem
              type="prev"
              title={prev.title}
              date={prev.date}
              onPress={() =>
                navigation.replace("NoticeDetail", { index: index - 1 })
              }
            />
          )}
          <View style={styles.navDivider} />
          {next && (
            <NoticeNavItem
              type="next"
              title={next.title}
              date={next.date}
              onPress={() =>
                navigation.replace("NoticeDetail", { index: index + 1 })
              }
            />
          )}
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 11,
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
  },
  navDivider: {
    height: 1,
    backgroundColor: "#BFBFBF",
  },
});
