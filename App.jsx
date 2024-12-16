import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    return () => clearTimeout(timeOut);
  }, []);
  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;
