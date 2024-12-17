import {
  FlatList,
  Image,
  ImageBackground,
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

const ChooseLanguage = () => {
  const navigationSSS = useNavigation();
  const [selectedItem, setSelectedItem] = useState(CountryData[0]?.id);

  const handlePress = item => {
    setSelectedItem(item.id);
  };

  const Footer = () => {
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={CountryData}
          contentContainerStyle={{paddingBottom: Scale(15)}}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableWithoutFeedback onPress={() => handlePress(item)}>
              <View style={styles.listItem}>
                <View style={styles.itemContent}>
                  <Image source={getImageSource(item.icon)} style={styles.itemIcon} />
                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
                <Image
                  source={
                    selectedItem === item.id ? Images.sradio : Images.UnSradio
                  }
                  style={styles.radioIcon}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        />
        <Button
          value={Labels.continue}
          onPress={() => navigationSSS.navigate('loginScreen')}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={getImageSource(Images.bg_img)}
        resizeMode="cover"
        style={styles.background}>
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text style={styles.title}>{Labels.language}</Text>
          {Footer()}
        </View>
      </ImageBackground>
    </View>
  );
};

export default ChooseLanguage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: '#36393c',
    flex: 1,
    opacity: 0.7,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    padding: Scale(20),
    width: '100%',
  },
  title: {
    fontFamily: Fonts.proximanova_bold,
    color: Colors.White,
    fontSize: Scale(28),
    paddingBottom: Scale(20),
  },
  listContainer: {
    backgroundColor: Colors.White,
    borderRadius: Scale(10),
    padding: Scale(10),
    paddingHorizontal: Scale(18),
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: Scale(1),
    borderRadius: Scale(10),
    // margin: Scale(10),
    marginVertical: Scale(10),
    borderColor: Colors.Grey100,
    padding: Scale(8),
    paddingHorizontal: Scale(15),
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    height: Scale(25),
    width: Scale(25),
    marginRight: Scale(10),
  },
  itemText: {
    fontSize: Scale(15),
    color: Colors.Black,
    fontFamily: Fonts.proximanova_regular,
  },
  radioIcon: {
    height: Scale(25),
    width: Scale(25),
    marginLeft: Scale(10),
  },
});
