import KbBankIcon from "@/assets/svgs/KbBank.svg";
import Layout from "@/components/Layout";
import HostLinker from "@/components/more/host/HostLinker";
import { ScrollView, Text, View } from "react-native";

const SPONSOR_ITEMS = [
  {
    name: "PLAYTAP",
    logo: require("@/assets/pngs/logo.png"),
    url: "https://www.sogang.ac.kr",
  },
  {
    name: "KB국민은행",
    logo: KbBankIcon,
    url: "https://www.kbstar.com",
  },
  {
    name: "협찬사 2",
    logo: require("@/assets/pngs/sponsor.png"),
    url: "https://www.sogang.ac.kr",
  },
  {
    name: "협찬사 2",
    logo: require("@/assets/pngs/sponsor.png"),
    url: "https://www.sogang.ac.kr",
  },
];

export default function Sponsor() {
  return (
    <Layout title="후원 및 협찬" showBack showCamera={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 24,
          paddingBottom: 32,
          gap: 16,
        }}
      >
        <View className="gap-2 mb-10">
          <Text className="text-h1 font-eb text-gray-black">
            후원 및 협찬사
          </Text>
          <Text className="text-b3 font-sb text-dark-gray">
            대동제와 함께하는 파트너사입니다.{"\n"}클릭 시 웹사이트로
            연결됩니다.
          </Text>
        </View>

        {SPONSOR_ITEMS.map((item, index) => (
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
