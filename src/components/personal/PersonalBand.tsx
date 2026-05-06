import { getMyWristbands, type Wristband } from "@/api/personal";
import Layout from "@/components/Layout";
import BandCard from "@/components/personal/BandCard";
import type { RootStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function PersonalBand() {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [bands, setBands] = useState<Wristband[]>([]);

  useEffect(() => {
    getMyWristbands().then((res) => {
      setBands(res.data?.myWristbands ?? []);
    }).catch(console.error);
  }, []);

  return (
    <Layout
      title="PERSONAL"
      showBack={false}
      showBottomBar={true}
      activeTab="Personal"
      noPadding
    >
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 40,
          gap: 32,
        }}
      >
        <View className="gap-[33px] flex-1">
          {/* 팔찌 카드 리스트 */}
          {bands.map((band) => (
            <BandCard
              key={band.rfid}
              serialNumber={band.rfid}
              isExpired={new Date(band.activeDate) < new Date(new Date().toDateString())}
              isLarge
            />
          ))}
        </View>

        {/* 새 팔찌 추가 버튼 */}
        <View className="items-center px-5">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Tag")}
            className="bg-secondary-salmon p-3 rounded-md shadow-sm"
          >
            <Text className="text-b3 font-sb text-gray-black">
              {t("personal.addBand")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 스페이서 — 안내사항을 하단으로 밀어냄 */}
        <View style={{ flex: 1 }} />

        {/* 안내사항 */}
        <View className="bg-extra-white px-4 py-6 rounded-[8px] mx-[17px]">
          <Text className="text-b2 font-bd text-gray-black text-center">
            {t("personal.importantNotes")}
          </Text>
          <View style={{ gap: 6 }}>
            <Text className="text-b3 font-rg text-dark-gray">
              • {t("personal.notice1")}
            </Text>
            <Text className="text-b3 font-rg text-dark-gray">
              • {t("personal.notice2")}
            </Text>
            <Text className="text-b3 font-rg text-dark-gray">
              • {t("personal.notice3")}
            </Text>
          </View>
        </View>
      </ScrollView>

    </Layout>
  );
}
