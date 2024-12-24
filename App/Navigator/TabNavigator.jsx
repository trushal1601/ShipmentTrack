import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors, Fonts} from '../Assets/Assets';
import HomeScreen from '../Screens/AppFlow/HomeScreen';
import MyDelivery from '../Screens/AppFlow/MyDelivery';
import Scale from '../Helper/Responsive';
import {useLabels} from '../Helper/ReduxLabels';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const label = useLabels();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: Scale(55),
          backgroundColor: Colors.White,
          // paddingVertical:14,
          // Android shadow
          elevation: 30,
          // iOS shadow
          shadowColor: '#000',
          shadowOffset: {width: 0, height: -2},
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused ? (
                  <Image
                    source={require('../Assets/Images/homeo.png')}
                    style={{height: 24, width: 24}}
                    tintColor={Colors.Primary}
                  />
                ) : (
                  <Image
                    source={require('../Assets/Images/homeo.png')}
                    style={{height: 24, width: 24}}
                    tintColor={Colors.Grey200}
                  />
                )}
              </View>
            );
          },
          tabBarButton: props => (
            <TouchableWithoutFeedback {...props}>
              <View {...props} />
            </TouchableWithoutFeedback>
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? Colors.Primary : Colors.Grey200,
                fontFamily: Fonts.proximanova_regular,
                fontSize: Scale(14),
              }}>
              {label.home}
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="myDelivery"
        component={MyDelivery}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused ? (
                  <Image
                    source={require('../Assets/Images/parcel.png')}
                    style={{height: 24, width: 26}}
                    tintColor={Colors.Primary}
                  />
                ) : (
                  <Image
                    source={require('../Assets/Images/parcel.png')}
                    style={{height: 24, width: 24}}
                    tintColor={Colors.Grey200}
                  />
                )}
              </View>
            );
          },
          tabBarButton: props => (
            <TouchableWithoutFeedback {...props}>
              <View {...props} />
            </TouchableWithoutFeedback>
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? Colors.Primary : Colors.Grey200,
                fontFamily: Fonts.Lexend_Medium,
                fontSize: Scale(14),
              }}>
              {label.myDelivery}
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
