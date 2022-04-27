import React, { Component } from "react";
import { StatusBar, Image, StyleSheet, Platform } from "react-native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import ExploreScreen from "../Screens/ExploreScreen";
import NewsScreen from "../Screens/NewsScreen";
import { RFValue } from "react-native-responsive-fontsize";
import tw from "twrnc"
import LoginScreen from "../firebase/LoginScreen";

const Tab = createMaterialTopTabNavigator()

export default class TopTabNavigation extends Component {
    render() {
        return (
            <Tab.Navigator
                initialRouteName="LogIn"
                screenOptions={({ route }) => ({
                    tabBarIconStyle: {
                        width: 50,
                        height: 40,
                        borderRadius: 10,
                    },
                    tabBarStyle: {
                        paddingTop: StatusBar.currentHeight + 15,
                        marginTop: -35,
                        borderRadius: 10,
                        backgroundColor: "#fff",
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: '#444eaf'
                    },
                    tabBarShowLabel: true,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName
                        if (route.name === 'Home') {
                            iconName = 'ios-home'
                            color = focused ? '#008000' : '#B22222'
                        } else if (route.name === 'All News') {
                            iconName = 'md-newspaper'
                           color = focused ? '#008000' : '#B22222'
                        }else if (route.name === 'Login') {
                            iconName = 'ios-log-in'
                           color = focused ? '#008000' : '#B22222'
                        }
                        return <Ionicons name={iconName} size={30} color={color} />
                    },
                })}
            >
                <Tab.Screen name="Login" component={LoginScreen} />
                <Tab.Screen name="Home" component={ExploreScreen} />
                <Tab.Screen name="All News" component={NewsScreen} />
            </Tab.Navigator>
        )
    }
}
