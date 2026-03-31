import { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Image as ExpoImage } from "expo-image";
import Layout from "@/components/Layout";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/types";
import Band from "@/assets/personal/band_default.png";

export default function Success() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("PersonalBand");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout title="PERSONAL" showBack={true} showBottomBar={true}>
      <View className="flex-1 flex-col">
        {/* 문구 */}
        <View className="py-4 mt-2 gap-4 px-5">
          <Text className="text-h1 font-eb text-text-salmon">인식 성공!</Text>

          <Text className="text-b3 font-sb text-dark-gray">
            3초 뒤에 다음 화면으로 넘어갈게요.
          </Text>
        </View>

        {/* 이미지 + 텍스트 오버레이 + confetti */}
        <View className="flex-1" style={{ position: "relative" }}>
          <Image
            source={Band}
            style={{ width: "120%", height: "100%", left: -40 }}
            resizeMode="contain"
          />

          {/* 이미지 위 "인식 성공!" 텍스트 */}
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
              인식 성공!
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
