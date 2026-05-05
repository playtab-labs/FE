import Band from "@/assets/personal/band_default.png";
import Layout from "@/components/Layout";
import type { RootStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image as ExpoImage } from "expo-image";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function Success() {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("PersonalBand");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout title="PERSONAL" showBack={true} showBottomBar={false}>
      <View className="flex-1 flex-col">
        {/* 문구 */}
        <View className="py-4 mt-2 gap-4 ">
          <Text className="text-h1 font-eb text-text-salmon">
            {t("personal.scanSuccess")}
          </Text>
          <Text className="text-b3 font-sb text-dark-gray">
            {t("personal.scanSuccessSubtitle")}
          </Text>
        </View>

        {/* 이미지 + 텍스트 오버레이 + confetti */}
        <View className="flex-1" style={{ position: "relative" }}>
          <Image
            source={Band}
            style={{ width: "120%", height: "100%", left: -40 }}
            resizeMode="contain"
          />

          {/* 이미지 위 텍스트 */}
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text className="text-b12 font-sb text-dark-gray/60">
              {t("personal.scanSuccess")}
            </Text>
          </View>

          {/* confetti GIF (1회 재생, 최상단) */}
          <ExpoImage
            source={require("@/assets/personal/confetti_burst.gif")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            contentFit="cover"
            autoplay={true}
          />
        </View>
      </View>
    </Layout>
  );
}
