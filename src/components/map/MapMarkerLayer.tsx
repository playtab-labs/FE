import { View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import { MOCK_MARKERS } from "@/data/mockMarkers";
import MapMarker from "./MapMarker";

interface MapMarkerLayerProps {
  scale: SharedValue<number>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  containerWidth: SharedValue<number>;
  containerHeight: SharedValue<number>;
}

const MapMarkerLayer = (props: MapMarkerLayerProps) => {
  return (
    <View className="absolute inset-0" style={{ pointerEvents: "box-none" }}>
      {MOCK_MARKERS.map((marker) => (
        <MapMarker key={marker.id} marker={marker} {...props} />
      ))}
    </View>
  );
};

export default MapMarkerLayer;
