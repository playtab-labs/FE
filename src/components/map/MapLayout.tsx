import { Image, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import ZoomableMap from "./ZoomableMap";
import MapMarkerLayer from "./MapMarkerLayer";
import { MOCK_MARKERS, type MarkerData } from "@/data/mockMarkers";


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
    const PAD = 12;

    const today = new Date();
    const isDay1 = today.getMonth() === 4 && today.getDate() === 13;

    for (const marker of MOCK_MARKERS) {
      if (marker.day1Only && !isDay1) continue;

      const asset = Image.resolveAssetSource(marker.image);
      const w = asset.width / 2;
      const h = asset.height / 2;

      // 앵커: 이미지 하단 중앙 (MapMarker의 useAnimatedStyle과 동일)
      const anchorX = (marker.fx * W - cx) * s + cx + tx;
      const anchorY = (marker.fy * H - cy) * s + cy + ty;

      if (
        tapX >= anchorX - w / 2 - PAD &&
        tapX <= anchorX + w / 2 + PAD &&
        tapY >= anchorY - h - PAD &&
        tapY <= anchorY + PAD
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
