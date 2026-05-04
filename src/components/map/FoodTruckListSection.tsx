import { getFoodTrucks, type FoodTruck } from "@/api/booth";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import FoodTruckItem from "./FoodTruckItem";

export default function FoodTruckListSection() {
  const [items, setItems] = useState<FoodTruck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFoodTrucks()
      .then((res) => {
        const data: FoodTruck[] = res.data?.foodTrucks ?? [];
        setItems(data.sort((a, b) => a.displayOrder - b.displayOrder));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <View className="gap-2">
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View className="flex-row flex-wrap gap-4">
          {items.map((item) => (
            <FoodTruckItem
              key={item.id}
              name={item.name}
              description={item.shortDescription}
            />
          ))}
        </View>
      )}
    </View>
  );
}
