import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Fonts, Images} from '../../../Assets/Assets';
import {Header} from '../../../Components/Component';
import {Labels} from '../../../Assets/Labels';
import {NotificationData} from '../../../Helper/JsonData';
import Scale from '../../../Helper/Responsive';

const Notification = () => {
  return (
    <View style={{backgroundColor: Colors.White, flex: 1}}>
      <Header header={Labels.Notification} />
      <FlatList
        data={NotificationData}
        renderItem={({item, index}) => {
          return (
            <View
              key={index}
              style={{
                backgroundColor: Colors.Grey100,
                margin: Scale(10),
                marginHorizontal: Scale(20),
                padding: Scale(15),
                borderRadius: Scale(9),
                flexDirection: 'row',
                gap: Scale(10),
              }}>
              <View
                style={{
                  padding: Scale(10),
                  backgroundColor: Colors.White,
                  alignSelf: 'flex-start',
                  borderRadius: Scale(10),
                }}>
                <Image
                  source={Images.icon1}
                  style={{height: Scale(25), width: Scale(25)}}
                />
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: Colors.Black,
                    fontFamily: Fonts.proximanova_regular,
                    fontSize: Scale(14),
                  }}>
                  {item.label}
                </Text>
                <Text
                  style={{
                    color: Colors.Grey200,
                    fontFamily: Fonts.proximanova_regular,
                    fontSize: Scale(12),
                  }}>
                  {item.duration}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
