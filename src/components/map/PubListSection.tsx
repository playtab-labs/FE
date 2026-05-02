import { getPubs, type Pub } from "@/api/booth";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import PubItem from "./PubItem";

export default function PubListSection() {
  const [items, setItems] = useState<Pub[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPubs()
      .then((res) => {
        const data: Pub[] = res.data?.pubs ?? [];
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
        <View className="gap-2">
          {items.map((item) => (
            <PubItem
              key={item.id}
              name={item.isNameConfirmed ? item.collegeName : "미공개"}
              thumbnailImageUrl={item.thumbnailImageUrl}
            />
          ))}
        </View>
      )}
    </View>
  );
}
