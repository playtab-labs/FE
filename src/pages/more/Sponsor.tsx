import BoseIcon from "@/assets/svgs/BOSE.svg";
import HwainIcon from "@/assets/svgs/HWAIN.svg";
import InterojoIcon from "@/assets/svgs/INTEROJO.svg";
import KbBankIcon from "@/assets/svgs/KbBank.svg";
import MigorengIcon from "@/assets/svgs/MIGORENG.svg";
import NiveaOioi from "@/assets/svgs/NIVEAXOIOI.svg";
import SheinIcon from "@/assets/svgs/SHEIN.svg";
import SsgtaroIcon from "@/assets/svgs/SSGTARO.svg";
import VardakIcon from "@/assets/svgs/VARDAK.svg";
import Layout from "@/components/Layout";
import HostLinker from "@/components/more/host/HostLinker";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

export default function Sponsor() {
  const { t } = useTranslation();

  const SPONSOR_ITEMS = [
    {
      name: t("sponsor.kbBank"),
      logo: KbBankIcon,
      url: "https://www.kbstar.com",
    },
    {
      name: "PLAYTAP",
      logo: require("@/assets/pngs/playtaplogo.png"),
      url: "https://www.sogang.ac.kr",
    },
    {
      name: "SHEIN",
      logo: SheinIcon,
      url: "https://kr.shein.com/",
    },
    {
      name: "바르닭",
      logo: VardakIcon,
      url: "https://barudak.co.kr/",
    },
    {
      name: "화인",
      logo: HwainIcon,
      url: "https://fineent.co.kr/",
    },
    {
      name: "니베아 X OIOI",
      logo: NiveaOioi,
      url: "https://www.nivea.co.kr/",
    },
    {
      name: "신세계타로",
      logo: SsgtaroIcon,
      url: "http://0317513923.tshome.co.kr/index.php",
    },
    {
      name: "미고랭",
      logo: MigorengIcon,
      url: "https://www.indomie.com/homepage",
    },
    {
      name: "인터로조",
      logo: InterojoIcon,
      url: "https://www.interojo.com/",
    },
    {
      name: "BOSE",
      logo: BoseIcon,
      url: "https://www.bose.co.kr/",
    },
  ];

  return (
    <Layout title={t("sponsor.title")} showBack showCamera={false}>
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
            {t("sponsor.title")}
          </Text>
          <Text className="text-b3 font-sb text-dark-gray">
            {t("sponsor.subtitle")}
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
