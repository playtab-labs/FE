import { MOCK_MARKERS, type MarkerData } from "@/data/mockMarkers";

const TYPE_ORDER: Record<MarkerData["type"], number> = {
  facility: 0,
  sub: 1,
  main: 2,
};

const SORTED_MARKERS = [...MOCK_MARKERS].sort(
  (a, b) => TYPE_ORDER[a.type] - TYPE_ORDER[b.type],
);
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
      {SORTED_MARKERS.map((marker) => (
        <MapMarker key={marker.id} marker={marker} {...props} />
      ))}
      <UserLocationMarker {...props} />
    </View>
  );
};

export default MapMarkerLayer;
