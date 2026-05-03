import type { MarkerData } from "@/data/mockMarkers";
import { ScrollView, View } from "react-native";
import FoodTruckListSection from "./FoodTruckListSection";
import PubListSection from "./PubListSection";

interface BoothListProps {
  marker?: MarkerData;
}

const BoothList = ({ marker }: BoothListProps) => {
  const label = marker?.label ?? "";
  const showPub = !marker || label === "주점";
  const showFoodTruck = !marker || label === "푸드";

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="px-4 py-4"
      showsVerticalScrollIndicator={false}
    >
      <View className="gap-8">
        {showFoodTruck && <FoodTruckListSection />}
        {showPub && <PubListSection />}
      </View>
    </ScrollView>
  );
};

export default BoothList;
