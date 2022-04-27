import React from 'react';
import {Dimensions} from "react-native"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import ExploreScreen from '../Screens/ExploreScreen';
import SavedNews from '../Screens/SavedNews';
import { Ionicons } from '@expo/vector-icons';
import TopTabNavigation from './TopTabNavigation';
import StackNavigation from './StackNavigation';
import CustomDrawer from './CustomDrawer';
import LoginScreen from '../firebase/LoginScreen';

const windowWidth = Dimensions.get('window').width;

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={props => <CustomDrawer {...props} />}
                screenOptions={{
                    headerShown: false,
                    drawerActiveBackgroundColor: '#ad0194',
                    drawerActiveTintColor: '#fff', // active tint color
                    drawerInactiveTintColor: '#808080',
                    drawerLabelStyle: {
                        marginLeft: -25,
                        fontFamily: 'Fira Code iScript',
                        fontSize: 15,
                    },
                    drawerStyle: {
                        width: windowWidth - 20,
                        backgroundColor: '#fff',
                    },
                }}>
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
}