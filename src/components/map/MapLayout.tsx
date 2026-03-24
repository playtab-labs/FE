import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import ZoomableMap from "./ZoomableMap";
import MapMarkerLayer from "./MapMarkerLayer";

const MapLayout = () => {
  // 제스처 shared values
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  // 마커 위치 계산용 컨테이너 크기
  const containerWidth = useSharedValue(0);
  const containerHeight = useSharedValue(0);

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
      />
      <MapMarkerLayer
        scale={scale}
        translateX={translateX}
        translateY={translateY}
        containerWidth={containerWidth}
        containerHeight={containerHeight}
      />
    </View>
  );
};

export default MapLayout;
