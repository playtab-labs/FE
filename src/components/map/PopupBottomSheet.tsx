import CloseWhiteIcon from "@/assets/close-white.svg";
import type { MarkerData } from "@/data/mockMarkers";
import { typo } from "@/styles/typography";
import { useEffect } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PopupBottomSheetProps {
  marker: MarkerData;
  onClose: () => void;
}

const OPEN_SPRING = { damping: 5000, stiffness: 200 };
const SWIPE_THRESHOLD = 30;
const VELOCITY_THRESHOLD = 500;

const PopupBottomSheet = ({ marker, onClose }: PopupBottomSheetProps) => {
  const { height } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();
  const sheetHeight = height * 0.45;

  const translateY = useSharedValue(sheetHeight);

  useEffect(() => {
    translateY.value = withSpring(0, OPEN_SPRING);
  }, []);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const triggerClose = () => {
    translateY.value = withTiming(
      sheetHeight,
      { duration: 250, easing: Easing.in(Easing.quad) },
      (finished) => {
        if (finished) runOnJS(onClose)();
      },
    );
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (
        e.translationY > SWIPE_THRESHOLD ||
        e.velocityY > VELOCITY_THRESHOLD
      ) {
        runOnJS(triggerClose)();
      } else {
        translateY.value = withSpring(0, OPEN_SPRING);
      }
    });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        className="absolute left-0 right-0 bottom-0 rounded-t-3xl bg-white"
        style={[
          { height: sheetHeight, paddingBottom: bottom },
          sheetStyle,
          {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 16,
          },
        ]}
      >
        {/* 상단 핸들 바 */}
        <View className="items-center pt-3 pb-2">
          <View className="w-10 h-1 rounded-full bg-gray-200" />
        </View>

        {/* 헤더 영역: 제목과 닫기 버튼 */}
        <View className="flex-row items-center justify-between px-5 py-3">
          <Text className={`${typo.T2_Eb} text-gray-black flex-1`}>
            {marker.desc}
          </Text>
          <TouchableOpacity
            onPress={triggerClose}
            hitSlop={15}
            className="ml-2"
          >
            <CloseWhiteIcon width={24} height={24} />
          </TouchableOpacity>
        </View>

        {/* 이미지 영역: flex-1을 주어 남은 공간을 채우도록 수정 */}
        <View className="flex-1 mx-5 mb-5 rounded-2xl overflow-hidden bg-gray-100">
          <Image
            source={{ uri: marker.photo }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default PopupBottomSheet;
