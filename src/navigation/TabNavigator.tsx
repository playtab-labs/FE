import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ArtistScreen from '@/pages/Artist';
import PersonalScreen from '@/pages/Personal';
import HomeScreen from '@/pages/Home';
import MapScreen from '@/pages/Map';
import MoreScreen from '@/pages/More';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Artist" component={ArtistScreen} options={{ title: 'ARTIST', headerShown: false }} />
      <Tab.Screen name="Personal" component={PersonalScreen} options={{ title: 'PERSONAL', headerShown: false }} />
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'HOME', headerShown: false }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ title: 'MAP', headerShown: false }} />
      <Tab.Screen name="More" component={MoreScreen} options={{ title: 'MORE', headerShown: false }} />
    </Tab.Navigator>
  );
}
