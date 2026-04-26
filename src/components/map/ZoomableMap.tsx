import MapDay1 from "@/assets/map_day1svg.svg";
import MapDay23 from "@/assets/map_day23.svg";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import type { SharedValue } from "react-native-reanimated";
import Animated, { runOnJS, useAnimatedStyle } from "react-native-reanimated";

const today = new Date();
const isDay1 = today.getMonth() === 4 && today.getDate() === 13; // 5/13
const MapImage = isDay1 ? MapDay1 : MapDay23;

const MIN_SCALE = 1;
const MAX_SCALE = 5;

const clamp = (value: number, min: number, max: number) => {
  "worklet";
  return Math.min(max, Math.max(min, value));
};

interface ZoomableMapProps {
  scale: SharedValue<number>;
  savedScale: SharedValue<number>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  savedTranslateX: SharedValue<number>;
  savedTranslateY: SharedValue<number>;
  onTap?: (x: number, y: number) => void;
  children?: React.ReactNode;
}

const ZoomableMap = ({
  scale,
  savedScale,
  translateX,
  translateY,
  savedTranslateX,
  savedTranslateY,
  onTap,
  children,
}: ZoomableMapProps) => {
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = clamp(savedScale.value * e.scale, MIN_SCALE, MAX_SCALE);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .activeOffsetY([-10, 10])
    .onUpdate((e) => {
      translateX.value = savedTranslateX.value + e.translationX;
      translateY.value = savedTranslateY.value + e.translationY;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  // const tapGesture = Gesture.Tap()
  //   .maxDistance(10)
  //   .onEnd((e) => {
  //     if (onTap) runOnJS(onTap)(e.x, e.y);
  //   });

  const tapGesture = Gesture.Tap()
    .maxDistance(50) // 👈 10px에서 50px로 대폭 상향 (웹 클릭 환경 최적화)
    .onEnd((e) => {
      if (onTap) runOnJS(onTap)(e.x, e.y);
    });

  // Race: 탭(maxDistance 10px) vs 패닝(activeOffset 10px) 자연 분리
  const composed = onTap
    ? Gesture.Exclusive(
        tapGesture,
        Gesture.Simultaneous(pinchGesture, panGesture),
      ) // 👈 Race 대신 Exclusive
    : Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={composed}>
      <View style={{ flex: 1 }}>
        {/* 1. 지도 이미지 */}
        <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
          <MapImage width="100%" height="100%" />
        </Animated.View>

        {/* 2. 마커 레이어 */}
        <View style={[StyleSheet.absoluteFill, { pointerEvents: "box-none" }]}>
          {children}
        </View>
      </View>
    </GestureDetector>
  );
};

export default ZoomableMap;
