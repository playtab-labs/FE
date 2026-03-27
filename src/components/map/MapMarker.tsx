import { View, Text, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import type { MarkerData } from "@/data/mockMarkers";

const MARKER_CLASSNAME: Record<MarkerData["type"], string> = {
  main: "bg-text-salmon min-w-20 h-10  px-4 rounded-[16px] border-white",
  sub: "bg-secondary-salmon min-w-14 h-8  px-4 rounded-[16px] border-white",
  facility: "bg-white w-10 aspect-square rounded-full border-text-salmon",
};

const MARKER_TYPO: Record<MarkerData["type"], string> = {
  main: "text-t3 font-eb ",
  sub: "text-b4 font-eb ",
  facility: "text-t3 font-eb text text-center",
};

interface MapMarkerProps {
  marker: MarkerData;
  scale: SharedValue<number>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  containerWidth: SharedValue<number>;
  containerHeight: SharedValue<number>;
}

const FACILITY_VISIBLE_SCALE = 2;

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

    const left = (x - cx) * scale.value + cx + translateX.value;
    const top = (y - cy) * scale.value + cy + translateY.value;

    const opacity =
      marker.type === "facility"
        ? scale.value >= FACILITY_VISIBLE_SCALE
          ? 1
          : 0
        : 1;

    return { left, top, opacity };
  });

  return (
    <Animated.View
      style={[{ position: "absolute", pointerEvents: "none" }, animatedStyle]}
    >
      <View
        collapsable={false}
        className={` border-[1px] items-center justify-center text-gray-black ${MARKER_CLASSNAME[marker.type]}`}
        style={[styles.shadow, { pointerEvents: "none" }]}
      >
        <Text className={MARKER_TYPO[marker.type]}>{marker.label}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default MapMarker;
