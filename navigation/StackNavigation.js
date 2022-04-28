import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewsScreen from '../Screens/NewsScreen';
import BusinessScreen from '../NewsScreen/Business';
import EntertainmentScreen from '../NewsScreen/Entertainment';
import HealthScreen from '../NewsScreen/Health';
import ScienceScreen from '../NewsScreen/Science';
import SportsScreen from '../NewsScreen/Sports';
import TechnologyScreen from '../NewsScreen/Technology';
import TopTabNavigation from './TopTabNavigation';
import BBCNews from '../NewsScreen/Source/BBCNews';
import CNNNews from '../NewsScreen/Source/CNNNews';
import FoxNews from '../NewsScreen/Source/FoxNews';
import GoogleNews from '../NewsScreen/Source/GoogleNews';
import LoginScreen from '../firebase/LoginScreen';
import SignupScreen from '../firebase/SignUp';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='HomeScreen'
      screenOptions={({ route }) => ({ headerShown: false })}>
      <Stack.Screen name="HomeScreen" component={TopTabNavigation} />
      <Stack.Screen name="NewsScreen" component={NewsScreen} />
      <Stack.Screen name="General" component={NewsScreen} />
      <Stack.Screen name="Business" component={BusinessScreen} />
      <Stack.Screen name="Entertainment" component={EntertainmentScreen} />
      <Stack.Screen name="Technology" component={TechnologyScreen} />
      <Stack.Screen name="Health" component={HealthScreen} />
      <Stack.Screen name="Science" component={ScienceScreen} />
      <Stack.Screen name="Sports" component={SportsScreen} />
      <Stack.Screen name="BBC" component={BBCNews} />
      <Stack.Screen name="CNN" component={CNNNews} />
      <Stack.Screen name="FoxNews" component={FoxNews} />
      <Stack.Screen name="GoogleNews" component={GoogleNews} />
      <Stack.Screen name="LogInScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignupScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigation;