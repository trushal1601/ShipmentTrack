import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ChooseLanguage from '../Screens/AuthFlow/ChooseLanguage';
import Login from '../Screens/AuthFlow/Login';
import OTPVerify from '../Screens/AuthFlow/OTPVerify';
import TabNavigator from './TabNavigator';
import Notification from '../Screens/AppFlow/Notification';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="chooseLanguage" component={ChooseLanguage} />
        <Stack.Screen name="loginScreen" component={Login} />
        <Stack.Screen name="OTPVerify" component={OTPVerify} />
        <Stack.Screen name="home" component={TabNavigator} />
        <Stack.Screen name="notification" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
