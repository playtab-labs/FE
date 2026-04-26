import { MOCK_MARKERS } from "@/data/mockMarkers";
import { View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import MapMarker from "./MapMarker";
import UserLocationMarker from "./UserLocationMarker";

interface MapMarkerLayerProps {
  scale: SharedValue<number>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  containerWidth: SharedValue<number>;
  containerHeight: SharedValue<number>;
  onMarkerClick?: (id: number | string) => void;
}

const MapMarkerLayer = (props: MapMarkerLayerProps) => {
  return (
    <View className="absolute inset-0" style={{ pointerEvents: "box-none" }}>
      {MOCK_MARKERS.map((marker) => (
        <MapMarker key={marker.id} marker={marker} {...props} />
      ))}
      <UserLocationMarker {...props} />
    </View>
  );
};

export default MapMarkerLayer;
