import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Images} from '../../../Assets/Assets';
import Scale from '../../../Helper/Responsive';
import {Labels} from '../../../Assets/Labels';
import {CountryData, ShipmentData} from '../../../Helper/JsonData';
import {Button} from '../../../Components/Component';
import {getImageSource} from '../../../Helper/ImageUri';
import HomeScreenStyle from './HomeScreenStyle';

const HomeScreen = () => {
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(CountryData[0]?.id);

  const handlePress = item => {
    setSelectedItem(item.id);
  };
  const Header = () => {
    return (
      <View style={HomeScreenStyle.headerContainer}>
        <Image source={Images.logo} style={HomeScreenStyle.logo} />
        <View style={HomeScreenStyle.headerRightContainer}>
          <TouchableOpacity onPress={() => setCountryModalVisible(true)}>
            <Image source={Images.uk_icon} style={HomeScreenStyle.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={HomeScreenStyle.notificationButton}
            onPress={() => console.log('Notification Pressed')}>
            <Image source={Images.notification} style={HomeScreenStyle.icon} />
            <Text style={HomeScreenStyle.notificationText}>0</Text>
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
                  <Image
                    source={item.status}
                    style={HomeScreenStyle.shipmentStatus}
                  />
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
            <TouchableWithoutFeedback onPress={() => handlePress(item)}>
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
            </TouchableWithoutFeedback>
          )}
        />
        <Button
          value={Labels.Done}
          style={{marginBottom: 25}}
          onPress={() => setCountryModalVisible(false)}
        />
      </View>
    );
  };
  const CountryModal = () => {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={countryModalVisible}
        style={{height: Scale(350)}}>
        <TouchableOpacity
          style={HomeScreenStyle.overlay}
          onPress={() => setCountryModalVisible(false)}
        />
        <View style={HomeScreenStyle.content}>{Footer()}</View>
      </Modal>
    );
  };
  const logOut = () => {
    return (
      <TouchableOpacity
        style={HomeScreenStyle.logoutButton}
        onPress={() => {
          setLogoutModalVisible(true), console.log('dfewf');
        }}>
        <Text style={HomeScreenStyle.logoutText}>{Labels.logout}</Text>
      </TouchableOpacity>
    );
  };
  const LogOutModel = () => {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={logoutModalVisible}
        style={{height: Scale(350)}}>
        <TouchableOpacity
          style={HomeScreenStyle.overlay}
          onPress={() => setLogoutModalVisible(false)}
        />
        {/* <View style={HomeScreenStyle.content}>{Footer()}</View> */}
      </Modal>
    );
  };

  return (
    <View style={{backgroundColor: Colors.White, flex: 1}}>
      <StatusBar
        backgroundColor={
          countryModalVisible === true ? '#2A2C2FB3' : Colors.White
        }
        barStyle={'dark-content'}
      />
      {logOut()}
      {Header()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {HomeCard()}
        {CountryModal()}
        {LogOutModel()}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
