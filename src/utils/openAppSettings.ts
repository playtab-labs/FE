import * as IntentLauncher from "expo-intent-launcher";
import { Linking, Platform } from "react-native";

export const openAppSettings = () => {
  if (Platform.OS === "android") {
    IntentLauncher.startActivityAsync(
      IntentLauncher.ActivityAction.APPLICATION_DETAILS_SETTINGS,
      { data: "package:com.playtap.app" }
    );
  } else {
    Linking.openSettings();
  }
};
