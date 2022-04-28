import AppLoading from "expo-app-loading";
import React, { Component } from "react";
import { DrawerNavigation } from "./navigation/DrawerNavigation";
import * as Font from "expo-font";

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    "Fira Code iScript": require("./assets/fonts/FiraCodeiScript-Italic.ttf"),
    "Chango-Regular": require("./assets/fonts/Chango-Regular.ttf"),
    "Lobster-Regular": require("./assets/fonts/Lobster-Regular.ttf"),
    "Tangerine-Regular": require("./assets/fonts/Tangerine-Regular.ttf"),
    "Tangerine-Bold": require("./assets/fonts/Tangerine-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <DrawerNavigation />;
}
