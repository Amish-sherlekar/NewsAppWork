import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../firebase/LoginScreen';
import SignupScreen from '../firebase/SignUp';

const Stack = createStackNavigator();

export const NotSignInStackNavigation = () => {
    return (
      <Stack.Navigator
        initialRouteName='LogInScreen'
        screenOptions={({ route }) => ({ headerShown: true })}>
        <Stack.Screen name="LogInScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignupScreen} />
      </Stack.Navigator>
    );
  }
  