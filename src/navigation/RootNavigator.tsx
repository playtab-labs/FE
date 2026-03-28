import EmailVerify from "@/pages/auth/EmailVerify";
import FindPassword from "@/pages/auth/FindPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import Login from "@/pages/auth/Login";
import PersonalInfo from "@/pages/auth/PersonalInfo";
import Register from "@/pages/auth/Register";
import SetPassword from "@/pages/auth/SetPassword";
import SignUpComplete from "@/pages/auth/SignUpComplete";
import Terms from "@/pages/auth/Terms";
import StampTour from "@/pages/StampTour";
import Tag from "@/pages/Personal/Tag";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";

import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailVerify"
        component={EmailVerify}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SetPassword"
        component={SetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpComplete"
        component={SignUpComplete}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StampTour"
        component={StampTour}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tag"
        component={Tag}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FindPassword"
        component={FindPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
