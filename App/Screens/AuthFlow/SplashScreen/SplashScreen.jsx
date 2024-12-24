import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Images} from '../../../Assets/Assets';
import ChooseLanguage from '../ChooseLanguage';
import {useDispatch, useSelector} from 'react-redux';
import {language_id} from '../../../Redux/Features/LanguageSlice';

const SplashScreen = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);
  const selectedLanguage = useSelector(
    state => state.language.selectedLanguage,
  );
  console.log('selectedLanguage', selectedLanguage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedLanguage && selectedLanguage.id) {
      dispatch(language_id({language_id: selectedLanguage.id}));
    } else {
      dispatch(language_id({language_id: 1}));
    }
  });

  if (!isVisible) {
    return <ChooseLanguage />;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.White} barStyle={'dark-content'} />
      <Image source={Images.splash} style={styles.image} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
});
