import { View, Text } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import type { MarkerData } from "@/data/mockMarkers";

const MARKER_COLORS: Record<MarkerData["type"], string> = {
  stage: "bg-red-500",
  facility: "bg-purple-400",
  food: "bg-orange-300",
  md: "bg-green-400",
};

interface MapMarkerProps {
  marker: MarkerData;
  scale: SharedValue<number>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  containerWidth: SharedValue<number>;
  containerHeight: SharedValue<number>;
}

const MapMarker = ({
  marker,
  scale,
  translateX,
  translateY,
  containerWidth,
  containerHeight,
}: MapMarkerProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    const cx = containerWidth.value / 2;
    const cy = containerHeight.value / 2;
    const x = marker.fx * containerWidth.value;
    const y = marker.fy * containerHeight.value;

    // 지도의 scale/translate 변환을 마커 위치에만 적용 (크기는 고정)
    const left = (x - cx) * scale.value + cx + translateX.value;
    const top = (y - cy) * scale.value + cy + translateY.value;

    return { left, top };
  });

  return (
    <Animated.View
      className="absolute"
      style={animatedStyle}
    >
      <View
        className={`px-3 py-1 rounded-full items-center justify-center ${MARKER_COLORS[marker.type]}`}
      >
        <Text className="text-white text-xs font-bold">{marker.label}</Text>
      </View>
    </Animated.View>
  );
};

export default MapMarker;
