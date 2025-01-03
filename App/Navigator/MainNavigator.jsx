import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ChooseLanguage from '../Screens/AuthFlow/ChooseLanguage';
import Login from '../Screens/AuthFlow/Login';
import OTPVerify from '../Screens/AuthFlow/OTPVerify';
import TabNavigator from './TabNavigator';
import Notification from '../Screens/AppFlow/Notification';
import DeliveryDetails from '../Screens/AppFlow/DeliveryDetails';
import SplashScreen from '../Screens/AuthFlow/SplashScreen/SplashScreen';
import messaging from '@react-native-firebase/messaging';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  // useEffect(() => {
  //   requestUserPermission();
  //   gettoken();
  // }, []);
  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }

  // const gettoken = async () => {
  //   try {
  //     const token = await messaging().getToken();
  //     console.log('FCM Token:', token);
  //   } catch (error) {
  //     console.error('Error getting FCM token:', error);
  //   }
  // };
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="chooseLanguage" component={ChooseLanguage} />
        <Stack.Screen name="loginScreen" component={Login} />
        <Stack.Screen name="OTPVerify" component={OTPVerify} />
        <Stack.Screen name="home" component={TabNavigator} />
        <Stack.Screen name="notification" component={Notification} />
        <Stack.Screen name="deliveryDetails" component={DeliveryDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});

// import {StyleSheet, Text, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {NavigationContainer} from '@react-navigation/native';
// import ChooseLanguage from '../Screens/AuthFlow/ChooseLanguage';
// import Login from '../Screens/AuthFlow/Login';
// import OTPVerify from '../Screens/AuthFlow/OTPVerify';
// import TabNavigator from './TabNavigator';
// import Notification from '../Screens/AppFlow/Notification';
// import DeliveryDetails from '../Screens/AppFlow/DeliveryDetails';
// import SplashScreen from '../Screens/AuthFlow/SplashScreen/SplashScreen';
// import {useSelector} from 'react-redux';

// const MainNavigator = () => {
//   const Stack = createNativeStackNavigator();
//   const [initialRoute, setInitialRoute] = useState(null);
//   const {emails} = useSelector(state => state.email);

//   useEffect(() => {
//     if (emails) {
//       setInitialRoute('home');
//     } else {
//       setInitialRoute('splash');
//     }
//   }, [emails]);

//   // Render nothing until the initial route is determined
//   if (initialRoute === null) {
//     return null;
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName={initialRoute}
//         screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
//         <Stack.Screen name="splash" component={SplashScreen} />
//         <Stack.Screen name="chooseLanguage" component={ChooseLanguage} />
//         <Stack.Screen name="loginScreen" component={Login} />
//         <Stack.Screen name="OTPVerify" component={OTPVerify} />
//         <Stack.Screen name="home" component={TabNavigator} />
//         <Stack.Screen name="notification" component={Notification} />
//         <Stack.Screen name="deliveryDetails" component={DeliveryDetails} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default MainNavigator;

// const styles = StyleSheet.create({});
