import {FlatList, Image, Text, View} from 'react-native';
import React from 'react';
import {Images} from '../../../Assets/Assets';
import {Header} from '../../../Components/Component';
import {Labels} from '../../../Assets/Labels';
import {NotificationData} from '../../../Helper/JsonData';
import NotificationStyle from './NotificationStyle';
import {useLabels} from '../../../Helper/ReduxLabels';

const Notification = () => {
  const label = useLabels();
  const Notify = () => {
    return (
      <FlatList
        data={NotificationData}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={NotificationStyle.notificationItem}>
              <View style={NotificationStyle.iconContainer}>
                <Image source={Images.icon1} style={NotificationStyle.icon} />
              </View>
              <View style={NotificationStyle.textContainer}>
                <Text style={NotificationStyle.label}>{item.label}</Text>
                <Text style={NotificationStyle.duration}>{item.duration}</Text>
              </View>
            </View>
          );
        }}
      />
    );
  };
  return (
    <View style={NotificationStyle.container}>
      <Header header={label.notification} />
      {Notify()}
    </View>
  );
};

export default Notification;
