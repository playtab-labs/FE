import { ScrollView, View, Text } from "react-native";
import { typo } from "@/styles/typography";
import { MOCK_BOOTH_ITEMS, type MarkerData } from "@/data/mockMarkers";

interface BoothListProps {
  marker: MarkerData;
}

const BoothList = ({ marker }: BoothListProps) => {
  const items = MOCK_BOOTH_ITEMS[marker.id] ?? [];

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="px-4 py-3 gap-2"
      showsVerticalScrollIndicator={false}
    >
      {items.length === 0 ? (
        <View className="py-12 items-center">
          <Text className={`${typo.B3_Rg} text-dark-gray`}>
            등록된 부스가 없습니다.
          </Text>
        </View>
      ) : (
        items.map((item) => (
          <View
            key={item.id}
            className="flex-row items-center gap-4 bg-white rounded-2xl px-4 py-4"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 1,
            }}
          >
            {/* 아이콘 placeholder */}
            <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
              <Text className="text-lg">🍴</Text>
            </View>
            <View className="flex-1">
              <Text className={`${typo.B2_Sb} text-black`}>{item.name}</Text>
              <Text className={`${typo.B4_Rg} text-dark-gray`}>
                {item.description}
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default BoothList;
