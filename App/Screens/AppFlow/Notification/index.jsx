import {FlatList, Image, StatusBar, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Colors, Images} from '../../../Assets/Assets';
import {Header} from '../../../Components/Component';
import {Labels} from '../../../Assets/Labels';
import {NotificationData} from '../../../Helper/JsonData';
import NotificationStyle from './NotificationStyle';
import {useLabels} from '../../../Helper/ReduxLabels';
import {useDispatch, useSelector} from 'react-redux';
import {myNotification} from '../../../Redux/Features/HomeSlice';

const Notification = () => {
  const dispatch = useDispatch();
  const label = useLabels();
  const {loading, myNotifications} = useSelector(state => state.home);
  console.log('notificationsw', myNotifications);
  useEffect(() => {
    dispatch(myNotification());
  }, [dispatch]);
  const Notify = () => {
    return (
      <FlatList
        data={myNotifications}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View
              key={item.shipment_id}
              style={NotificationStyle.notificationItem}>
              <View style={NotificationStyle.iconContainer}>
                <Image source={Images.icon1} style={NotificationStyle.icon} />
              </View>
              <View style={NotificationStyle.textContainer}>
                <Text style={NotificationStyle.label}>{item.message}</Text>
                <Text style={NotificationStyle.duration}>{item.datetime}</Text>
              </View>
            </View>
          );
        }}
      />
    );
  };
  return (
    <View style={NotificationStyle.container}>
      <StatusBar backgroundColor={Colors.White} barStyle={'dark-content'} />
      <Header header={label?.notification} />
      {Notify()}
    </View>
  );
};

export default Notification;
