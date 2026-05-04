import * as Location from "expo-location";
import { useEffect } from "react";
import { Image } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

// 2점 GPS 캘리브레이션
// 기준점 A: 정문 (GPS → 이미지 내 픽셀 비율)
const REF_A = { lat: 37.551617, lng: 126.937870, fx: 0.116, fy: 0.479 };
// 기준점 B: 스타벅스 서강대프라자점 (곤자가플라자)
const REF_B = { lat: 37.551056, lng: 126.943058, fx: 0.786, fy: 0.543 };

const SCALE_X = (REF_B.fx - REF_A.fx) / (REF_B.lng - REF_A.lng);
const SCALE_Y = (REF_B.fy - REF_A.fy) / (REF_A.lat - REF_B.lat);

const gpsToFraction = (lat: number, lng: number) => ({
  fx: REF_A.fx + (lng - REF_A.lng) * SCALE_X,
  fy: REF_A.fy + (REF_A.lat - lat) * SCALE_Y,
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
          fx.value = withSpring(pos.fx, { damping: 20, stiffness: 80 });
          fy.value = withSpring(pos.fy, { damping: 20, stiffness: 80 });
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
