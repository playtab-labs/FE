import Layout from "@/components/Layout";
import Lineup from "@/components/artist/Lineup";
import TimeTable from "@/components/artist/TimeTable";
import TabBar from "@/components/common/TabBar";
import { useState } from "react";
import { View } from "react-native";

export default function Artist() {
  const [activeTab, setActiveTab] = useState<"lineup" | "timetable">("lineup");

  return (
    <Layout
      title="ARTIST"
      showBack={true}
      fullBleedHeader={
        <TabBar
          type="artist"
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      }
    >
      <View className="flex-1">
        {activeTab === "lineup" ? <Lineup /> : <TimeTable />}
      </View>
    </Layout>
  );
}
