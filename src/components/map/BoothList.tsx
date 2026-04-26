import { ScrollView, View } from "react-native";
import FoodTruckListSection from "./FoodTruckListSection";
import PubListSection from "./PubListSection";

const BoothList = () => {
  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="px-4 py-4"
      showsVerticalScrollIndicator={false}
    >
      <View className="gap-8">
        <FoodTruckListSection />
        <PubListSection />
      </View>
    </ScrollView>
  );
};

export default BoothList;
