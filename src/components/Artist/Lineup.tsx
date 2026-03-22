import { View, Text } from "react-native";
import ArtistFilterBar from "./ArtistFilterBar";
import ArtistList from "./ArtistList";

const Lineup = () => {
  return (
    <View>
      <ArtistFilterBar type="Lineup" />
      <ArtistList />
    </View>
  );
};

export default Lineup;
