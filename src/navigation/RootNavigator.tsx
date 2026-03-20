import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Terms from '@/pages/auth/Terms';
import TermsDetail from '@/pages/auth/TermsDetail';
import PersonalInfo from '@/pages/auth/PersonalInfo';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Terms" component={Terms} options={{ headerShown: false }} />
      <Stack.Screen name="TermsDetail" component={TermsDetail} options={{ headerShown: false }} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} options={{ headerShown: false }} />
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
