import { useState, useCallback, useRef, useEffect } from "react";
import { View } from "react-native";
import { useFocusEffect, useRoute, type RouteProp } from "@react-navigation/native";
import Layout from "@/components/Layout";
import MapLayout from "@/components/map/MapLayout";
import BoothBottomTab from "@/components/map/BoothBottomTab";
import PopupBottomSheet from "@/components/map/PopupBottomSheet";
import { MOCK_MARKERS, type MarkerData } from "@/data/mockMarkers";
import type { TabParamList } from "@/navigation/types";

export default function Map() {
  const route = useRoute<RouteProp<TabParamList, "Map">>();
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

  useEffect(() => {
    const markerId = route.params?.preselectedMarkerId;
    if (markerId) {
      setSelectedMarker(MOCK_MARKERS.find((m) => m.id === markerId) ?? null);
    }
  }, [route.params?.preselectedMarkerId, route.params?.openTabTimestamp]);
  // 다른 탭 갔다가 돌아올 때만 재마운트 (첫 로드 시 건너뜀 → cold-start 방지)
  const [gestureKey, setGestureKey] = useState(0);
  const isFirstFocus = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (isFirstFocus.current) {
        isFirstFocus.current = false;
        return;
      }
      setGestureKey((k) => k + 1);
    }, []),
  );

  return (
    <View className="flex-1">
      <Layout title="MAP">
        <MapLayout key={gestureKey} onMarkerSelect={setSelectedMarker} />
      </Layout>
      {selectedMarker && (
        selectedMarker.label === "🎈" ? (
          <PopupBottomSheet
            marker={selectedMarker}
            onClose={() => setSelectedMarker(null)}
          />
        ) : (
          <BoothBottomTab
            marker={selectedMarker}
            onClose={() => setSelectedMarker(null)}
          />
        )
      )}
    </View>
  );
}
