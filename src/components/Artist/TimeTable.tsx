import Layout from "../Layout";
import ArtistFilterBar from "./ArtistFilterBar";
import { View, Text } from "react-native";

const TimeTable = () => {
  return (
    <View>
      <ArtistFilterBar type="TimeTable" />
      <Text>타임테이블</Text>
    </View>
  );
};

export default TimeTable;
