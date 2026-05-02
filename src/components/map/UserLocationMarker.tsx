import * as Location from "expo-location";
import { useEffect } from "react";
import { Image } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

// 맵 GPS 경계
const MAP_BOUNDS = {
  north: 37.55285, // 좌상단
  south: 37.550011, // 우하단
  west: 126.937762, // 좌상단
  east: 126.944128, // 우하단
};

const gpsToFraction = (lat: number, lng: number) => ({
  fx: (lng - MAP_BOUNDS.west) / (MAP_BOUNDS.east - MAP_BOUNDS.west),
  fy: (MAP_BOUNDS.north - lat) / (MAP_BOUNDS.north - MAP_BOUNDS.south),
});

// SVG viewBox 56x77 기준
const ICON_W = 56;
const ICON_H = 77;

interface UserLocationMarkerProps {
  scale: SharedValue<number>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  containerWidth: SharedValue<number>;
  containerHeight: SharedValue<number>;
}

const UserLocationMarker = ({
  scale,
  translateX,
  translateY,
  containerWidth,
  containerHeight,
}: UserLocationMarkerProps) => {
  const fx = useSharedValue(-1);
  const fy = useSharedValue(-1);

  useEffect(() => {
    let sub: Location.LocationSubscription | null = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("[GPS] 권한 상태:", status);
      if (status !== "granted") return;

      sub = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 2 },
        (loc) => {
          const { latitude, longitude } = loc.coords;
          const pos = gpsToFraction(latitude, longitude);
          console.log(
            `[GPS] lat=${latitude}, lng=${longitude} → fx=${pos.fx.toFixed(3)}, fy=${pos.fy.toFixed(3)}`,
          );
          fx.value = pos.fx;
          fy.value = pos.fy;
        },
      );
    })();

    return () => {
      sub?.remove();
    };
  }, []);

  const markerStyle = useAnimatedStyle(() => {
    if (fx.value < 0) return { opacity: 0 };

    const W = containerWidth.value;
    const H = containerHeight.value;
    const s = scale.value;
    const tx = translateX.value;
    const ty = translateY.value;
    const cx = W / 2;
    const cy = H / 2;

    const left = (fx.value * W - cx) * s + cx + tx - ICON_W / 2;
    const top = (fy.value * H - cy) * s + cy + ty - ICON_H;

    return { position: "absolute", left, top, opacity: 1 };
  });

  return (
    <Animated.View style={markerStyle}>
      <Image
        source={require("@/assets/map_current_loc.png")}
        style={{ width: ICON_W, height: ICON_H }}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

export default UserLocationMarker;
