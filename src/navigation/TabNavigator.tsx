import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomBar from "@/components/BottomBar";

import ArtistScreen from "@/pages/Artist";
import PersonalScreen from "@/pages/Personal";
import HomeScreen from "@/pages/Home";
import MapScreen from "@/pages/Map";
import MoreScreen from "@/pages/More";

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
