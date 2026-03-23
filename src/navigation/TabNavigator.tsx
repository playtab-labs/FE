import BottomBar from "@/components/BottomBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ArtistScreen from "@/pages/Artist";
import HomeScreen from "@/pages/Home";
import MapScreen from "@/pages/Map";
import MoreScreen from "@/pages/more/More";
import PersonalScreen from "@/pages/Personal";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomBar {...props} />}>
      <Tab.Screen
        name="Artist"
        component={ArtistScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Personal"
        component={PersonalScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
