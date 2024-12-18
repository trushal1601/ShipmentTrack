import {
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {getImageSource} from '../../../Helper/ImageUri';
import {Colors, Fonts, Images} from '../../../Assets/Assets';
import Scale from '../../../Helper/Responsive';
import {CountryData} from '../../../Helper/JsonData';
import {Button} from '../../../Components/Component';
import {Labels} from '../../../Assets/Labels';
import {useNavigation} from '@react-navigation/native';
import ChooseLanguageStyle from './ChooseLanguageStyle';

const ChooseLanguage = () => {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(CountryData[0]?.id);

  const handlePress = item => {
    setSelectedItem(item.id);
  };
  const Footer = () => {
    return (
      <View style={ChooseLanguageStyle.listContainer}>
        {/* <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'}/> */}
        <FlatList
          data={CountryData}
          contentContainerStyle={{paddingBottom: Scale(15)}}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableWithoutFeedback onPress={() => handlePress(item)}>
              <View style={ChooseLanguageStyle.listItem}>
                <View style={ChooseLanguageStyle.itemContent}>
                  <Image
                    source={getImageSource(item.icon)}
                    style={ChooseLanguageStyle.itemIcon}
                  />
                  <Text style={ChooseLanguageStyle.itemText}>{item.name}</Text>
                </View>
                <Image
                  source={
                    selectedItem === item.id ? Images.sradio : Images.UnSradio
                  }
                  style={ChooseLanguageStyle.radioIcon}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        />
        <Button
          value={Labels.continue}
          onPress={() => navigation.navigate('loginScreen')}
        />
      </View>
    );
  };

  return (
    <View style={ChooseLanguageStyle.container}>
      <ImageBackground
        source={getImageSource(Images.bg_img)}
        resizeMode="cover"
        style={ChooseLanguageStyle.background}>
        <View style={ChooseLanguageStyle.overlay} />
        <View style={ChooseLanguageStyle.content}>
          <Text style={ChooseLanguageStyle.title}>{Labels.language}</Text>
          {Footer()}
        </View>
      </ImageBackground>
    </View>
  );
};

export default ChooseLanguage;
