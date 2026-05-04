import apolloClient from "@/api/apolloClient";
import RootNavigator from "@/navigation/RootNavigator";
import { ApolloProvider } from "@apollo/client/react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Pretendard-Regular": require("./assets/fonts/Pretendard-Regular.otf"),
    "Pretendard-SemiBold": require("./assets/fonts/Pretendard-SemiBold.otf"),
    "Pretendard-ExtraBold": require("./assets/fonts/Pretendard-ExtraBold.otf"),
  });

  if (!fontsLoaded) return null;

  return (
    <ApolloProvider client={apolloClient}>
      <GestureHandlerRootView className="flex-1">
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ApolloProvider>
  );
}
