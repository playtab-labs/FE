import Layout from "@/components/Layout";
import HostLinker from "@/components/more/host/HostLinker";
import { ScrollView, Text, View } from "react-native";

const HOST_ITEMS = [
  {
    name: "서강대학교",
    logo: require("@/assets/pngs/soganghost.png"),
    url: "https://www.sogang.ac.kr",
  },
  {
    name: "서강대학교 총학생회 '항해'",
    logo: require("@/assets/pngs/goto.png"),
    url: "https://student.sogang.ac.kr/student/",
  },
  {
    name: "서강대학교 어쩌구저쩌구",
    logo: require("@/assets/pngs/goto.png"),
    url: "https://www.sogang.ac.kr",
  },
  {
    name: "서강대학교 어쩌구저쩌구",
    logo: require("@/assets/pngs/goto.png"),
    url: "https://www.sogang.ac.kr",
  },
];

export default function Host() {
  return (
    <Layout title="주최 주관 정보" showBack showCamera={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: -17 }}
        contentContainerStyle={{
          paddingHorizontal: 17,
          paddingTop: 24,
          paddingBottom: 32,
          gap: 16,
        }}
        className="px-4"
      >
        <View className="gap-2 mb-10">
          <Text className="text-h1 font-eb text-gray-black">
            주최 및 주관 정보
          </Text>
          <Text className="text-b3 font-sb text-dark-gray">
            클릭 시 웹사이트로 연결됩니다.
          </Text>
        </View>

        {HOST_ITEMS.map((item, index) => (
          <HostLinker
            key={index}
            name={item.name}
            logo={item.logo}
            url={item.url}
          />
        ))}
      </ScrollView>
    </Layout>
  );
}
