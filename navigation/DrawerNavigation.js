import React from "react";
import { Dimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import SavedNews from "../Screens/SavedNews";
import { Ionicons } from "@expo/vector-icons";
import StackNavigation from "./StackNavigation";
import CustomDrawer from "./CustomDrawer";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../firebase/LoginScreen";
import SignupScreen from "../firebase/SignUp";

const windowWidth = Dimensions.get("window").width;

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: "#ad0194",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#808080",
          drawerLabelStyle: {
            marginLeft: -25,
            fontFamily: "Fira Code iScript",
            fontSize: 15,
          },
          drawerStyle: {
            width: windowWidth - 20,
            backgroundColor: "#fff",
          },
        }}
      >
        <Drawer.Screen
          name="Home"
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

export const LogOutNavigation = () => {
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignupScreen} />
    </Stack.Navigator>
  </NavigationContainer>;
};
