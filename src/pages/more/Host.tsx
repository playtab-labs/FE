import HangHaeIcon from "@/assets/svgs/HangHae.svg";
import SogangIcon from "@/assets/svgs/Sogang.svg";
import Layout from "@/components/Layout";
import HostLinker from "@/components/more/host/HostLinker";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

export default function Host() {
  const { t } = useTranslation();

  const HOST_ITEMS = [
    {
      name: t("host.sogang"),
      logo: SogangIcon,
      url: "https://www.sogang.ac.kr",
    },
    {
      name: t("host.hanghae"),
      logo: HangHaeIcon,
      url: "https://student.sogang.ac.kr",
    },
  ];

  return (
    <Layout title={t("host.title")} showBack showCamera={false}>
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
            {t("host.title")}
          </Text>
          <Text className="text-b3 font-sb text-dark-gray">
            {t("host.subtitle")}
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
