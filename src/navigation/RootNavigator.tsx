import PersonalBand from "@/components/personal/PersonalBand";
import SerialInput from "@/components/personal/SerialInput";
import Success from "@/components/personal/Success";
import Tag from "@/components/personal/Tag";
import EmailVerify from "@/pages/auth/EmailVerify";
import FindPassword from "@/pages/auth/FindPassword";
import Login from "@/pages/auth/Login";
import PersonalInfo from "@/pages/auth/PersonalInfo";
import Register from "@/pages/auth/Register";
import ResetPassword from "@/pages/auth/ResetPassword";
import SetPassword from "@/pages/auth/SetPassword";
import SignUpComplete from "@/pages/auth/SignUpComplete";
import Terms from "@/pages/auth/Terms";
import MD from "@/pages/MD";
import MDDetail from "@/pages/MDDetail";
import StampTour from "@/pages/StampTour";
import Tag from "@/components/personal/Tag";
import SerialInput from "@/components/personal/SerialInput";
import Success from "@/components/personal/Success";
import PersonalBand from "@/components/personal/PersonalBand";
import { useAuthStore } from "@/stores/authStore";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { View } from "react-native";
import TabNavigator from "./TabNavigator";

import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { loadTokens, accessToken } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTokens().finally(() => setLoading(false));
  }, []);

  if (loading) return <View style={{ flex: 1 }} />;

  return (
    <Stack.Navigator initialRouteName={accessToken ? "Tabs" : "Login"}>
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
        name="SerialInput"
        component={SerialInput}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalBand"
        component={PersonalBand}
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
      <Stack.Screen name="MD" component={MD} options={{ headerShown: false }} />
      <Stack.Screen
        name="MDDetail"
        component={MDDetail}
        options={{ headerShown: false, contentStyle: { borderRadius: 0 } }}
      />
    </Stack.Navigator>
  );
}
