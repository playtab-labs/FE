import { useState } from "react";
import { View } from "react-native";
import Layout from "@/components/Layout";
import ArtistTabBar from "@/components/artist/ArtistTabBar";
import Lineup from "@/components/artist/Lineup";
import TimeTable from "@/components/artist/TimeTable";

type Tab = "lineup" | "timetable";

export default function Artist() {
  const [activeTab, setActiveTab] = useState<Tab>("lineup");

  return (
    <Layout title="ARTIST" showBack={true}>
      <ArtistTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <View className="flex-1">
        {activeTab === "lineup" ? <Lineup /> : <TimeTable />}
      </View>
    </Layout>
  );
}
