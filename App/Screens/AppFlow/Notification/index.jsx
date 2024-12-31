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
import moment from 'moment';
import Loader from '../../../Helper/Loader';

const Notification = () => {
  const dispatch = useDispatch();
  const label = useLabels();
  const {loading, myNotifications} = useSelector(state => state.home);

  useEffect(() => {
    dispatch(myNotification());
  }, [dispatch]);

  const getTimeDifference = datetime => {
    let now = moment();
    let notificationTime = moment(datetime, 'YYYY-MM-DD HH:mm:ss');
    let duration = moment.duration(now.diff(notificationTime));

    let days = duration.days();
    let hours = duration.hours();
    let minutes = duration.minutes();

    let timeDifference = '';
    if (days > 0) timeDifference += `${days} days `;
    if (hours > 0) timeDifference += `${hours} hours `;
    if (minutes > 0 || timeDifference === '')
      timeDifference += `${minutes} minutes `;

    return `${timeDifference} ago`;
  };

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
                <Text style={NotificationStyle.duration}>
                  {getTimeDifference(item.datetime)}
                </Text>
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header header={label?.notification} />
          {Notify()}
        </>
      )}
    </View>
  );
};

export default Notification;
