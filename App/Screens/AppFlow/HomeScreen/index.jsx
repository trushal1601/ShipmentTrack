import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  Alert,
  BackHandler,
  StatusBar,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Colors, Fonts, Images} from '../../../Assets/Assets';
import Scale from '../../../Helper/Responsive';
import {Labels} from '../../../Assets/Labels';
import {CountryData, ShipmentData} from '../../../Helper/JsonData';
import {ActionButton} from '../../../Components/Component';
import {getImageSource} from '../../../Helper/ImageUri';
import HomeScreenStyle from './HomeScreenStyle';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {language} from '../../../Redux/Actions/authAction';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selectedLanguage = useSelector(
    state => state.language.selectedLanguage,
  );
  console.log('selectedLanguage', selectedLanguage);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(selectedLanguage.icon);
  const refCountryRBSheet = useRef();
  const refLogoutRBSheet = useRef();

  useEffect(() => {
    if (countryModalVisible) {
      refCountryRBSheet.current.open();
    } else {
      refCountryRBSheet.current.close();
    }
  }, [countryModalVisible]);

  useEffect(() => {
    if (logoutModalVisible) {
      refLogoutRBSheet.current.open();
    } else {
      refLogoutRBSheet.current.close();
    }
  }, [logoutModalVisible]);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Do you want to exit the app?', [
          {text: 'Cancel', onPress: () => null, style: 'cancel'},
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  const handlePress = item => {
    setSelectedItem(item.id);
    dispatch(language(item));
  };
  const handlePressDone = () => {
    setCountryModalVisible(false);
  };

  const Header = () => {
    return (
      <View style={HomeScreenStyle.headerContainer}>
        <Image source={Images.logo} style={HomeScreenStyle.logo} />
        <View style={HomeScreenStyle.headerRightContainer}>
          <TouchableOpacity onPress={() => setCountryModalVisible(true)}>
            <Image
              source={selectedLanguage.icon}
              style={HomeScreenStyle.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={HomeScreenStyle.notificationButton}
            onPress={() => navigation.navigate('notification')}>
            <Image source={Images.notification} style={HomeScreenStyle.icon} />
            <Text style={HomeScreenStyle.notificationText}>1</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const HomeCard = () => {
    return (
      <View style={HomeScreenStyle.homeCardContainer}>
        <Text style={HomeScreenStyle.shipmentLabel}>{Labels.ShipmentData}</Text>
        <FlatList
          data={ShipmentData}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={HomeScreenStyle.shipmentList}
          renderItem={({item, index}) => {
            return (
              <View
                key={index}
                style={[
                  HomeScreenStyle.shipmentItem,
                  {backgroundColor: item.bgColor},
                ]}>
                <View style={HomeScreenStyle.shipmentHeader}>
                  <Text style={HomeScreenStyle.shipmentCount}>
                    {item.count}
                  </Text>
                  <View
                    style={{
                      padding: Scale(8),
                      backgroundColor: Colors.White,
                      borderRadius: Scale(9),
                    }}>
                    <Image
                      source={item.status}
                      style={HomeScreenStyle.shipmentStatus}
                    />
                  </View>
                </View>
                <Text style={HomeScreenStyle.shipmentText}>{item.label}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  };
  const Footer = () => {
    return (
      <View style={HomeScreenStyle.listContainer}>
        <Text style={HomeScreenStyle.title}>{Labels.language}</Text>
        <FlatList
          data={CountryData}
          contentContainerStyle={{paddingBottom: Scale(15)}}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <View style={HomeScreenStyle.listItem}>
                <View style={HomeScreenStyle.itemContent}>
                  <Image
                    source={getImageSource(item.icon)}
                    style={HomeScreenStyle.itemIcon}
                  />
                  <Text style={HomeScreenStyle.itemText}>{item.name}</Text>
                </View>
                <Image
                  source={
                    selectedItem === item.id ? Images.sradio : Images.UnSradio
                  }
                  style={HomeScreenStyle.radioIcon}
                />
              </View>
            </TouchableOpacity>
          )}
        />
        <ActionButton
          value={Labels.Done}
          style={{marginBottom: 25}}
          onPress={handlePressDone}
        />
      </View>
    );
  };
  const CountryModal = () => {
    return (
      <RBSheet
        openDuration={250}
        ref={refCountryRBSheet}
        draggable={true}
        draggableIcon={true}
        height={Scale(310)}
        dragFromTopOnly={true}
        closeOnDragDown={true}
        customStyles={{
          container: {
            backgroundColor: 'white',
            borderTopRightRadius: Scale(19),
            borderTopLeftRadius: Scale(19),
          },
          draggableIcon: {backgroundColor: Colors.Grey100, width: Scale(60)},
        }}
        onClose={() => setCountryModalVisible(false)}>
        <View style={HomeScreenStyle.content}>{Footer()}</View>
      </RBSheet>
    );
  };
  const LogOut = () => {
    return (
      <TouchableOpacity
        style={HomeScreenStyle.logoutButton}
        onPress={() => {
          setLogoutModalVisible(true);
        }}>
        <Text style={HomeScreenStyle.logoutText}>{Labels.logout}</Text>
      </TouchableOpacity>
    );
  };
  const LogOutModel = () => {
    return (
      <RBSheet
        openDuration={250}
        ref={refLogoutRBSheet}
        draggable={true}
        draggableIcon={true}
        height={Scale(210)}
        dragFromTopOnly={true}
        closeOnDragDown={true}
        customStyles={{
          container: {
            backgroundColor: 'white',
            borderTopRightRadius: Scale(19),
            borderTopLeftRadius: Scale(19),
          },
          draggableIcon: {backgroundColor: Colors.Grey100, width: Scale(60)},
        }}
        onClose={() => setLogoutModalVisible(false)}>
        <View style={HomeScreenStyle.content}>
          <View style={HomeScreenStyle.listContainer}>
            <Text
              style={{
                textAlign: 'center',
                color: Colors.Grey400,
                fontFamily: Fonts.proximanova_bold,
                fontSize: Scale(18),
              }}>
              {Labels.logout}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: Colors.Grey300,
                fontFamily: Fonts.proximanova_regular,
                fontSize: Scale(16),
                marginTop: Scale(5),
              }}>
              {Labels.Are_you_sure_you_want_to_logout}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                gap: Scale(10),
                marginTop: Scale(30),
                marginBottom: Scale(25),
              }}>
              <ActionButton
                value={'Back'}
                style={{
                  borderColor: Colors.Primary,
                  backgroundColor: Colors.White,
                  borderWidth: 1,
                  width: '50%',
                }}
                textStyle={{color: Colors.Primary}}
                onPress={() => setLogoutModalVisible(false)}
              />
              <ActionButton
                value={'Yes, Logout'}
                style={{width: '50%'}}
                onPress={() => navigation.navigate('chooseLanguage')}
              />
            </View>
          </View>
        </View>
      </RBSheet>
    );
  };

  return (
    <View
      style={{backgroundColor: Colors.White, flex: 1, marginTop: Scale(20)}}>
      <StatusBar
        backgroundColor={
          countryModalVisible || logoutModalVisible === true
            ? '#36393C99'
            : Colors.White
        }
        barStyle={'dark-content'}
      />
      {LogOut()}
      {Header()}
      {HomeCard()}
      {CountryModal()}
      {LogOutModel()}
    </View>
  );
};

export default HomeScreen;
