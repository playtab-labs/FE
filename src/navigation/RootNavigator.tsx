import EmailVerify from "@/pages/auth/EmailVerify";
import Login from "@/pages/auth/Login";
import PersonalInfo from "@/pages/auth/PersonalInfo";
import Register from "@/pages/auth/Register";
import SetPassword from "@/pages/auth/SetPassword";
import SignUpComplete from "@/pages/auth/SignUpComplete";
import Terms from "@/pages/auth/Terms";
import TermsDetail from "@/pages/auth/TermsDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

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
        name="TermsDetail"
        component={TermsDetail}
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
    </Stack.Navigator>
  );
}
