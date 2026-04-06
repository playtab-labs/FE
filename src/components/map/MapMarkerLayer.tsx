import { View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import MapMarker from "./MapMarker";
import { useEffect, useState } from "react";

interface MapMarkerLayerProps {
  scale: SharedValue<number>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  containerWidth: SharedValue<number>;
  containerHeight: SharedValue<number>;
  onMarkerClick?: (id: number | string) => void;
}

// 마커의 타입을 정의합니다.
interface Marker {
  id: number | string;
  type: "RESTAURANT" | "CAFE" | "PARK"; // 실제 사용하는 타입들로 제한
  label: string;
  iconUrl: string;
  latitude: number;
  longitude: number;
}

const MapMarkerLayer = (props: MapMarkerLayerProps) => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    // 2. fetch를 사용하여 목데이터(JSON) 가져오기
    // 파일 경로(예: /data/markers.json)나 API URL을 입력하세요.
    fetch("/data/markers.json")
      .then((response) => response.json())
      .then((data) => {
        setMarkers(data);
      })
      .catch((error) => {
        console.error("마커 데이터를 가져오는데 실패했습니다:", error);
      });
  }, []);

  return (
    <View className="absolute inset-0" style={{ pointerEvents: "box-none" }}>
      {markers.map((marker) => (
        <MapMarker key={marker.id} marker={marker} {...props} />
      ))}
    </View>
  );
};

export default MapMarkerLayer;
