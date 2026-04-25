import Layout from "@/components/Layout";
import { getMyWristbands, linkWristband } from "@/api/personal";
import type { RootStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image as ExpoImage } from "expo-image";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function Tag() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isPlaying, setIsPlaying] = useState(false);

  // hand_with_band 페이드 인
  const bandOpacity = useSharedValue(0);

  // hand_with_phone: X — 프레임 밖에서 진입/퇴장, Y — 살짝 위아래
  const phoneTranslateX = useSharedValue(500);
  const phoneTranslateY = useSharedValue(0);

  useEffect(() => {
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const startNfc = async () => {
      try {
        await NfcManager.start();
        await NfcManager.requestTechnology(NfcTech.NfcA);
        const tag = await NfcManager.getTag();
        if (!tag?.id || cancelled) return;

        const detectedRfid = tag.id.toUpperCase();

        // 기존 팔찌 조회
        const res = await getMyWristbands();
        const existing: { rfid: string }[] = res.data?.myWristbands ?? [];
        const alreadyLinked = existing.some((w) => w.rfid === detectedRfid);

        // 다른 팔찌일 때만 등록
        if (!alreadyLinked) {
          await linkWristband(detectedRfid);
        }

        if (!cancelled) navigation.navigate("Success");
      } catch (e) {
        // NFC 미지원 기기이거나 취소된 경우 무시
      } finally {
        NfcManager.cancelTechnologyRequest();
      }
    };

    startNfc();
    return () => {
      cancelled = true;
      NfcManager.cancelTechnologyRequest();
    };
  }, []);

  useEffect(() => {
    // 팔찌 손: 천천히 페이드 인
    bandOpacity.value = withTiming(1, {
      duration: 900,
      easing: Easing.out(Easing.ease),
    });

    // X: 1.5초 후 시작 → 프레임 밖(300) → 진입(0) → 정지 → 퇴장(300) 반복
    phoneTranslateX.value = withDelay(
      1500,
      withRepeat(
        withSequence(
          withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) }),
          withDelay(
            500,
            withTiming(200, { duration: 200, easing: Easing.in(Easing.ease) }),
          ),
        ),
        -1,
        false,
      ),
    );

    // Y: 10px 살짝 위아래 반복
    // phoneTranslateY.value = withRepeat(
    //   withTiming(20, { duration: 700, easing: Easing.inOut(Easing.ease) }),
    //   -1,
    //   true,
    // );
  }, []);

  const bandStyle = useAnimatedStyle(() => ({
    opacity: bandOpacity.value,
  }));

  const phoneStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: phoneTranslateX.value },
      //   { translateY: phoneTranslateY.value },
      { rotate: "-37.21deg" },
    ],
  }));

  return (
    <Layout title="PERSONAL" showBack={true} showBottomBar={false}>
      <View className="flex-1 flex-col justify-start">
        {/* 문구 */}
        <View className="mt-2 gap-4 py-4 px-5" style={{ zIndex: 1 }}>
          <View className="flex-row items-center">
            <Text className="text-h1 font-eb text-gray-black">휴대폰에 </Text>
            <Text className="text-h1 font-eb text-text-salmon">
              팔찌를 태그
            </Text>
            <Text className="text-h1 font-eb text-gray-black">해주세요</Text>
          </View>
          <Text className="text-b3 font-sb text-dark-gray">
            퍼스널라이징을 위해서는 팔찌를 연동해야 해요.
          </Text>
        </View>

        {/* 이미지 영역 */}
        <View className="flex-1 items-center justify-center">
          {/* 배경 GIF (인식 효과) */}
          <ExpoImage
            source={require("@/assets/personal/recognizing.gif")}
            style={{ position: "absolute", width: 649, height: 649 }}
            contentFit="contain"
            autoplay={isPlaying}
          />

          {/* 손 이미지 레이어 */}
          <View style={{ width: 280, height: 280 }}>
            {/* 팔찌 낀 손 — 페이드 인 */}
            <AnimatedImage
              source={require("@/assets/personal/hand_with_band.png")}
              style={[
                {
                  position: "absolute",
                  bottom: 0,
                  left: -100,
                  width: 510,
                  height: 293,
                  resizeMode: "contain",
                },
                bandStyle,
              ]}
            />

            {/* 폰 든 손 — 기울어진 채로 반복 접근 */}
            <AnimatedImage
              source={require("@/assets/personal/hand_with_phone.png")}
              style={[
                {
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 236,
                  height: 400,
                  resizeMode: "contain",
                },
                phoneStyle,
              ]}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("SerialInput")}
        activeOpacity={0.7}
      >
        <Text className="text-b4 font-bd items-center text-center justify-center mb-6 font-rg text-dark-gray underline">
          태그 인식에 문제가 있나요?
        </Text>
      </TouchableOpacity>
    </Layout>
  );
}
