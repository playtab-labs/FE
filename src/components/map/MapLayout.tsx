import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import ZoomableMap from "./ZoomableMap";
import MapMarkerLayer from "./MapMarkerLayer";
import { MOCK_MARKERS, type MarkerData } from "@/data/mockMarkers";

const FACILITY_VISIBLE_SCALE = 2;

interface MapLayoutProps {
  onMarkerSelect: (marker: MarkerData) => void;
}

const MapLayout = ({ onMarkerSelect }: MapLayoutProps) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  const containerWidth = useSharedValue(0);
  const containerHeight = useSharedValue(0);

  const handleTap = (tapX: number, tapY: number) => {
    const W = containerWidth.value;
    const H = containerHeight.value;
    const s = scale.value;
    const tx = translateX.value;
    const ty = translateY.value;
    const cx = W / 2;
    const cy = H / 2;

    console.log(tapX, tapY);

    for (const marker of MOCK_MARKERS) {
      if (marker.type === "facility" && s < FACILITY_VISIBLE_SCALE) continue;

      const left = (marker.fx * W - cx) * s + cx + tx;
      const top = (marker.fy * H - cy) * s + cy + ty;

      // 마커 타입별 근사 크기: main=128x40, sub=80x40, facility=40x40
      const w = marker.type === "main" ? 128 : marker.type === "sub" ? 80 : 40;
      const h = 40;
      const PAD = 8;

      if (
        tapX >= left - PAD &&
        tapX <= left + w + PAD &&
        tapY >= top - PAD &&
        tapY <= top + h + PAD
      ) {
        onMarkerSelect(marker);
        return;
      }
    }
  };

  return (
    <View
      className="flex-1 overflow-hidden"
      onLayout={(e) => {
        containerWidth.value = e.nativeEvent.layout.width;
        containerHeight.value = e.nativeEvent.layout.height;
      }}
    >
      <ZoomableMap
        scale={scale}
        savedScale={savedScale}
        translateX={translateX}
        translateY={translateY}
        savedTranslateX={savedTranslateX}
        savedTranslateY={savedTranslateY}
        onTap={handleTap}
      >
        <MapMarkerLayer
          scale={scale}
          translateX={translateX}
          translateY={translateY}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
        />
      </ZoomableMap>
    </View>
  );
};

export default MapLayout;
