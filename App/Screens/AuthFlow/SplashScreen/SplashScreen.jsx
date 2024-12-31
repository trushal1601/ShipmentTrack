import {Alert, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Images} from '../../../Assets/Assets';
import ChooseLanguage from '../ChooseLanguage';
import {useDispatch, useSelector} from 'react-redux';
import {language_id} from '../../../Redux/Features/LanguageSlice';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Loader from '../../../Helper/Loader';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const selectedLanguage = useSelector(
    state => state.language.selectedLanguage,
  );
  // console.log('selectedLanguage', selectedLanguage);
  const {emails} = useSelector(state => state.email);

  useFocusEffect(() => {
    const checkEmail = async () => {
      try {
        if (emails) {
          navigation.navigate('home', {email: emails});
        } else if (isLoggingOut) {
          navigation.navigate('loginScreen');
          setIsLoggingOut(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    checkEmail();
  }, [emails, navigation]);

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
  }, [selectedLanguage]);

  if (!isVisible) {
    return <ChooseLanguage />;
  }

  if (loading) {
    return <Loader />;
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
