import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      {/* 탭 메인 화면 */}
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      {/* 보딩/모달 등 전체화면 페이지는 여기에 추가 */}
    </Stack.Navigator>
  );
}
