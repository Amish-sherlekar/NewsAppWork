import React from "react";
import { Dimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import SavedNews from "../Screens/SavedNews";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawer from "./CustomDrawer";
import { createStackNavigator } from "@react-navigation/stack";
import NewsScreen from "../Screens/NewsScreen";
import StackNavigation from "./StackNavigation";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: true,
          headerTitle: "News Insight",
          headerTitleStyle: {
            fontFamily: "SigmarOne-Regular",
          },
          drawerItemStyle: {
            fontFamily: "SigmarOne-Regular",
            borderRadius: 10,
          },
          drawerActiveBackgroundColor: "#000",
          drawerActiveTintColor: "#F10086",
          // drawerActiveTintColor: "#2D31FA",
          drawerInactiveTintColor: "#2D31FA",
          // drawerInactiveTintColor: "#F10086",
          drawerLabelStyle: {
            marginLeft: -25,
            fontFamily: "SigmarOne-Regular",
            fontSize: 15,
          },
          drawerStyle: {
            width: windowWidth - 20,
            backgroundColor: "#fff",
          },
        }}
      >
        <Drawer.Screen
          name="All News"
          component={NewsScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="newspaper" size={35} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Explore"
          component={StackNavigation}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="home" size={35} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="SavedNews"
          component={SavedNews}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="ios-save" size={35} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
