import "react-native-gesture-handler";
import React from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoadingScreen from "./Screens/LoadingScreen";
import DashBoardScreen from "./Screens/DashBoardScreen";
import SignupScreen from "./firebase/SignUp";
import LoginScreen from "./firebase/LoginScreen";

export default function App() {
  const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen: LoadingScreen,
    LoginScreen: LoginScreen,
    SignupScreen: SignupScreen,
    DashboardScreen: DashBoardScreen,
  });

  const AppNavigator = createAppContainer(AppSwitchNavigator);

  const [fontsLoaded] = Font.useFonts({
    "Fira Code iScript": require("./assets/fonts/FiraCodeiScript-Italic.ttf"),
    "Chango-Regular": require("./assets/fonts/Chango-Regular.ttf"),
    "Lobster-Regular": require("./assets/fonts/Lobster-Regular.ttf"),
    "Tangerine-Regular": require("./assets/fonts/Tangerine-Regular.ttf"),
    "Tangerine-Bold": require("./assets/fonts/Tangerine-Bold.ttf"),
    "OrelegaOne-Regular": require("./assets/fonts/OrelegaOne-Regular.ttf"),
    "SigmarOne-Regular": require("./assets/fonts/SigmarOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <AppNavigator />;
}
