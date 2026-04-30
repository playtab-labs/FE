import CloseWhiteIcon from "@/assets/close-white.svg";
import type { MarkerData } from "@/data/mockMarkers";
import { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BoothList from "./BoothList";

interface BoothBottomTabProps {
  marker: MarkerData;
  onClose: () => void;
}

const OPEN_SPRING = { damping: 5000, stiffness: 200 };
const SWIPE_THRESHOLD = 30;
const VELOCITY_THRESHOLD = 500;

const BoothBottomTab = ({ marker, onClose }: BoothBottomTabProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const { height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  // safe area 아래부터 화면 바닥까지의 높이
  const visibleHeight = height - top;

  const [activeTab, setActiveTab] = useState<"booth" | "list">("booth");

  // 시작: 화면 아래로 숨김 / 열림: 0
  const translateY = useSharedValue(visibleHeight);

  useEffect(() => {
    translateY.value = withSpring(0, OPEN_SPRING);
  }, []);

  // 패널: translateY만 적용 (위치는 top/bottom으로 고정)
  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    shadow: {
      shadowColor: "#000",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 4,
    },
  }));

  // 딤: 패널이 내려갈수록 페이드아웃
  const dimStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [0, visibleHeight],
      [1, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const triggerClose = () => {
    setIsClosing(true);
    translateY.value = withTiming(
      visibleHeight,
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
    <View className="absolute inset-0">
      {/* 바텀시트 패널: shadow 외층 + overflow-hidden 내층 분리 */}
      <Animated.View
        className="absolute left-0 right-0 bottom-0 rounded-t-3xl"
        style={[
          { top },
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
        <View className="flex-1 bg-white overflow-hidden rounded-t-3xl">
          {/* 드래그 핸들 영역 */}
          <GestureDetector gesture={panGesture}>
            <View>
              <View className="items-center pt-3">
                <View className="w-10 h-1 rounded-full bg-soft-gray" />
              </View>
              <View className="relative items-center justify-center py-5 rounded-t-xl">
                <Text className="text-t2 font-eb">{marker.label}</Text>
                <TouchableOpacity
                  className="absolute right-5"
                  onPress={triggerClose}
                  hitSlop={8}
                >
                  <CloseWhiteIcon width={20} height={20} />
                </TouchableOpacity>
              </View>
            </View>
          </GestureDetector>

          {/* 콘텐츠 */}
          <View className="flex-1">
            <BoothList marker={marker} />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default BoothBottomTab;
