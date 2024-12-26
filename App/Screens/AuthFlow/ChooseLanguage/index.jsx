import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { getImageSource } from '../../../Helper/ImageUri';
import { Colors, Images } from '../../../Assets/Assets';
import Scale from '../../../Helper/Responsive';
import { ActionButton } from '../../../Components/Component';
import { Labels } from '../../../Assets/Labels';
import { useNavigation } from '@react-navigation/native';
import ChooseLanguageStyle from './ChooseLanguageStyle';
import { language } from '../../../Redux/Actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useLabels } from '../../../Helper/ReduxLabels';
import Loader from '../../../Helper/Loader';

const ChooseLanguage = () => {
  const label = useLabels();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { emails } = useSelector(state => state.email);
  const navigation = useNavigation(); 
 

  const [selectedItem, setSelectedItem] = useState();
  const [selected, setSelected] = useState();

  // useEffect(() => {
  //   StatusBar.setBarStyle('dark-content');
  //   StatusBar.setBackgroundColor('transparent');
  //   StatusBar.setTranslucent(true);
  //   return () => {
  //     StatusBar.setBarStyle('default');
  //     StatusBar.setBackgroundColor(Colors.White);
  //     StatusBar.setTranslucent(false);
  //   };
  // }, []);

  const handlePress = (item, setFieldValue) => {
    setSelectedItem(item.id);
    setSelected(item);
    setFieldValue('language', item.id);
  };

  const validationSchema = Yup.object().shape({
    language: Yup.string().required('Please select a language'),
  });

  const CountryData = [
    { id: 1, name: Labels.english, icon: Images.uk_icon },
    { id: 2, name: Labels.french, icon: Images.france_icon },
  ];

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <Formik
      initialValues={{ language: '' }}
      validationSchema={validationSchema}
      onSubmit={values => {
        dispatch(language(selected));
        navigation.navigate('loginScreen');
      }}
    >
      {({ handleSubmit, setFieldValue, errors, touched }) => (
        <View style={ChooseLanguageStyle.container}>
          {/* <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          /> */}
          <ImageBackground
            source={getImageSource(Images.bg_img)}
            resizeMode="cover"
            style={ChooseLanguageStyle.background}
          >
            <View style={ChooseLanguageStyle.overlay} />
            <View style={ChooseLanguageStyle.content}>
              <Text style={ChooseLanguageStyle.title}>{Labels.language}</Text>
              <View style={ChooseLanguageStyle.listContainer}>
                <FlatList
                  data={CountryData}
                  contentContainerStyle={{ paddingBottom: Scale(10) }}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableWithoutFeedback
                      onPress={() => handlePress(item, setFieldValue)}
                    >
                      <View style={ChooseLanguageStyle.listItem}>
                        <View style={ChooseLanguageStyle.itemContent}>
                          <Image
                            source={getImageSource(item.icon)}
                            style={ChooseLanguageStyle.itemIcon}
                          />
                          <Text style={ChooseLanguageStyle.itemText}>
                            {item.name}
                          </Text>
                        </View>
                        <Image
                          source={
                            selectedItem === item.id
                              ? Images.sradio
                              : Images.UnSradio
                          }
                          style={ChooseLanguageStyle.radioIcon}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                />
                {errors.language && touched.language && (
                  <Text style={ChooseLanguageStyle.errorText}>
                    {errors.language}
                  </Text>
                )}
                <ActionButton value={Labels.continue} onPress={handleSubmit} />
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    </Formik>
  );
};

export default ChooseLanguage;
