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
import {CountryData} from '../../../Helper/JsonData';
import {ActionButton} from '../../../Components/Component';
import {getImageSource} from '../../../Helper/ImageUri';
import HomeScreenStyle from './HomeScreenStyle';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {language} from '../../../Redux/Actions/authAction';
import {useLabels} from '../../../Helper/ReduxLabels';
import Loader from '../../../Helper/Loader';
import {language_id} from '../../../Redux/Features/LanguageSlice';
import RNRestart from 'react-native-restart';
import {homeCount} from '../../../Redux/Features/HomeSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const label = useLabels();
  const navigation = useNavigation();
  const selectedLanguage = useSelector(
    state => state.language.selectedLanguage,
  );
  const {loading} = useSelector(state => ({
    languageId: state.language_id,
    home: state.home,
  }));

  useEffect(() => {
    dispatch(homeCount());
  }, [dispatch]);

  const {homeCounts} = useSelector(state => state.home);
  // console.log('count', homeCounts);

  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(selectedLanguage?.icon);
  const [selected, setSelected] = useState(selectedLanguage?.icon);
  const refCountryRBSheet = useRef(null);
  const refLogoutRBSheet = useRef(null);

  const ShipmentData = [
    {
      id: 1,
      label: label?.deliveriesAssigned,
      count: homeCounts?.assigned_Deliveries,
      status: Images.icon1,
      bgColor: '#DBF2FF',
    },
    {
      id: 2,
      label: label?.completedDeliveries,
      count: homeCounts?.completed_Deliveries,
      status: Images.icon2,
      bgColor: '#DDF3E6',
    },
    {
      id: 3,
      label: label?.pendingDeliveries,
      count: homeCounts?.pending_Deliveries,
      status: Images.icon3,
      bgColor: '#FFF6D8',
    },
    {
      id: 4,
      label: label?.delayedDeliveries,
      count: homeCounts?.delayed_Deliveries,
      status: Images.icon4,
      bgColor: '#FFEDED',
    },
  ];

  const handleLogout = () => {
    RNRestart.Restart();
  };

  useEffect(() => {
    if (countryModalVisible) {
      refCountryRBSheet.current?.open();
    } else {
      refCountryRBSheet.current?.close();
    }
  }, [countryModalVisible]);

  useEffect(() => {
    if (logoutModalVisible) {
      refLogoutRBSheet.current?.open();
    } else {
      refLogoutRBSheet.current?.close();
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
    setSelected(item);
  };
  const handlePressDone = () => {
    setSelectedItem(selected.id);
    dispatch(language(selected));
    setCountryModalVisible(false);
  };

  const Header = () => {
    return (
      <View style={HomeScreenStyle.headerContainer}>
        <Image source={Images.logo} style={HomeScreenStyle.logo} />
        <View style={HomeScreenStyle.headerRightContainer}>
          <TouchableOpacity onPress={() => setCountryModalVisible(true)}>
            <Image
              source={selectedLanguage?.icon}
              style={HomeScreenStyle.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={HomeScreenStyle.notificationButton}
            onPress={() => navigation.navigate('notification')}>
            <Image source={Images.notification} style={HomeScreenStyle.icon} />
            <Text style={HomeScreenStyle.notificationText}>
              {homeCounts?.notification_count}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const HomeCard = () => {
    return (
      <View style={HomeScreenStyle.homeCardContainer}>
        <Text style={HomeScreenStyle.shipmentLabel}>{label.shipmentData}</Text>
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
        <Text style={HomeScreenStyle.logoutText}>{label?.logout}</Text>
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
              {label.logout}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: Colors.Grey300,
                fontFamily: Fonts.proximanova_regular,
                fontSize: Scale(16),
                marginTop: Scale(5),
              }}>
              {label.alertMessage}
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
                value={label.yesLogout}
                style={{width: '50%'}}
                onPress={handleLogout}
              />
            </View>
          </View>
        </View>
      </RBSheet>
    );
  };

  return loading ? (
    <Loader />
  ) : (
    <View style={{backgroundColor: Colors.White, flex: 1}}>
      <StatusBar
        backgroundColor={
          countryModalVisible || logoutModalVisible ? '#36393C99' : Colors.White
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
