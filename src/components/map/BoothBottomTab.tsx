import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import TabBar from "@/components/common/TabBar";
import { typo } from "@/styles/typography";
import BoothLayout from "./BoothLayout";
import BoothList from "./BoothList";
import type { MarkerData } from "@/data/mockMarkers";

interface BoothBottomTabProps {
  marker: MarkerData;
  onClose: () => void;
}

const SHEET_HEIGHT_RATIO = 0.8;

const BoothBottomTab = ({ marker, onClose }: BoothBottomTabProps) => {
  const { height } = useWindowDimensions();
  const sheetHeight = height * SHEET_HEIGHT_RATIO;
  const [activeTab, setActiveTab] = useState<"booth" | "list">("list");

  const translateY = useSharedValue(sheetHeight);

  useEffect(() => {
    translateY.value = withSpring(0, { damping: 1000, stiffness: 200 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleClose = () => {
    translateY.value = withSpring(
      sheetHeight,
      { damping: 1000, stiffness: 200 },
      () => {
        runOnJS(onClose)();
      },
    );
  };

  return (
    <View className="absolute inset-0">
      {/* 딤 오버레이 */}
      <TouchableOpacity
        className="flex-1 bg-black/40"
        activeOpacity={1}
        onPress={handleClose}
      />

      {/* 바텀시트 패널 */}
      <Animated.View
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl overflow-hidden"
        style={[{ height: sheetHeight }, animatedStyle]}
      >
        {/* 헤더 */}
        <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100">
          <Text className={`${typo.T2_Sb} text-black`}>{marker.label}</Text>
          <TouchableOpacity onPress={handleClose} hitSlop={8}>
            <AntDesign name="close" size={20} color="#888" />
          </TouchableOpacity>
        </View>

        {/* 탭바 */}
        <TabBar type="map" activeTab={activeTab} onTabChange={setActiveTab} />

        {/* 콘텐츠 */}
        <View className="flex-1">
          {activeTab === "booth" ? (
            <BoothLayout />
          ) : (
            <BoothList marker={marker} />
          )}
        </View>
      </Animated.View>
    </View>
  );
};

export default BoothBottomTab;
