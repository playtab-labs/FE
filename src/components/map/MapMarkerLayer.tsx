import { View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import { MOCK_MARKERS, type MarkerData } from "@/data/mockMarkers";
import MapMarker from "./MapMarker";

interface MapMarkerLayerProps {
  scale: SharedValue<number>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  containerWidth: SharedValue<number>;
  containerHeight: SharedValue<number>;
  onMarkerClick: (marker: MarkerData) => void;
}

const MapMarkerLayer = ({ onMarkerClick, ...props }: MapMarkerLayerProps) => {
  return (
    <View className="absolute inset-0">
      {MOCK_MARKERS.map((marker) => (
        <MapMarker
          key={marker.id}
          marker={marker}
          onClick={() => onMarkerClick(marker)}
          {...props}
        />
      ))}
    </View>
  );
};

export default MapMarkerLayer;
