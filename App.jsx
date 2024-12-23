import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainNavigator from './App/Navigator/MainNavigator';
import {Provider} from 'react-redux';
import {store} from './App/Redux/Store';

const App = () => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    return () => clearTimeout(timeOut);
  }, []);
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <MainNavigator />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
