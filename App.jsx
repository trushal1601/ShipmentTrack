import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainNavigator from './App/Navigator/MainNavigator';
import {Provider} from 'react-redux';
import {persistor, store} from './App/Redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

const App = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );

        console.log('Notification Permission Status:', granted);

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const authStatus = await messaging().requestPermission();
          console.log('Authorization Status:', authStatus);
          const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
          if (enabled) {
            const token = await messaging().getToken();
            console.log('FCM Token:', token);
          } else {
            console.log('Notification permission not granted.');
          }
        } else {
          console.log('POST_NOTIFICATIONS permission not granted.');
        }
      } catch (error) {
        console.error('Permission error:', error);
      }
    };

    requestPermission();
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      SplashScreen.hide();
    }, 10);
    return () => clearTimeout(timeOut);
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView>
          <MainNavigator />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;
