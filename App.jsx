import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainNavigator from './App/Navigator/MainNavigator';
import {Provider} from 'react-redux';
import {persistor, store} from './App/Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';


const App = () => {
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
