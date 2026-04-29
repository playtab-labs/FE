import type { MarkerData } from "@/data/mockMarkers";
import { Image } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

const today = new Date();
const isDay1 = today.getMonth() === 4 && today.getDate() === 13; // 5/13

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
  if (marker.day1Only && !isDay1) return null;

  const asset = Image.resolveAssetSource(marker.image);
  const w = asset.width / 2;
  const h = asset.height / 2;

  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    const cx = containerWidth.value / 2;
    const cy = containerHeight.value / 2;
    const x = marker.fx * containerWidth.value;
    const y = marker.fy * containerHeight.value;

    const left = (x - cx) * scale.value + cx + translateX.value - w / 2;
    const top = (y - cy) * scale.value + cy + translateY.value - h;

    return { position: "absolute", left, top };
  });

  return (
    <Animated.View style={[animatedStyle, { pointerEvents: "none" }]}>
      <Image
        source={marker.image}
        style={{ width: w, height: h }}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

export default MapMarker;
