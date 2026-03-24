import BottomBar from "@/components/BottomBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ArtistScreen from "@/pages/Artist";
import HomeScreen from "@/pages/Home";
import MapScreen from "@/pages/Map";
import FAQ from "@/pages/more/FAQ";
import MoreScreen from "@/pages/more/More";
import PersonalChange from "@/pages/more/Personal";
import PasswordChange from "@/pages/more/Personal/PasswordChange";
import ServiceWithdrawal from "@/pages/more/Personal/ServiceWithdrawal";
import PersonalScreen from "@/pages/Personal";

const Tab = createBottomTabNavigator();
const MoreStack = createNativeStackNavigator();

function MoreNavigator() {
  return (
    <MoreStack.Navigator>
      <MoreStack.Screen
        name="MoreMain"
        component={MoreScreen}
        options={{ headerShown: false }}
      />
      <MoreStack.Screen
        name="PersonalChange"
        component={PersonalChange}
        options={{ headerShown: false }}
      />
      <MoreStack.Screen
        name="PasswordChange"
        component={PasswordChange}
        options={{ headerShown: false }}
      />
      <MoreStack.Screen
        name="ServiceWithdrawal"
        component={ServiceWithdrawal}
        options={{ headerShown: false }}
      />
      <MoreStack.Screen
        name="FAQ"
        component={FAQ}
        options={{ headerShown: false }}
      />
    </MoreStack.Navigator>
  );
}

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
        component={MoreNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
