import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors, Fonts, Images} from '../../../Assets/Assets';
import {Header} from '../../../Components/Component';
import {Labels} from '../../../Assets/Labels';
import Scale from '../../../Helper/Responsive';
import {DeliveryOrder} from '../../../Helper/JsonData';
import MyDeliveryStyle from './MyDeliveryStyle';
import {useNavigation} from '@react-navigation/native';

const MyDelivery = () => {
  const navigation = useNavigation();

  const Delivery = () => {
    return (
      <FlatList
        data={DeliveryOrder}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={MyDeliveryStyle.flatListContent}
        renderItem={({item}) => {
          return (
            <View style={MyDeliveryStyle.itemContainer}>
              <View style={MyDeliveryStyle.itemHeader}>
                <Text style={MyDeliveryStyle.shipmentTypeText}>
                  {Labels.Shipment_Type}
                </Text>
                <View
                  style={[
                    MyDeliveryStyle.shipmentTypeBadge,
                    {
                      backgroundColor:
                        item.type === 'Regular' ? Colors.Green : 'red',
                    },
                  ]}>
                  <Text style={MyDeliveryStyle.shipmentTypeLabel}>
                    {item.type}
                  </Text>
                </View>
              </View>
              <View style={MyDeliveryStyle.itemDetails}>
                <View style={MyDeliveryStyle.itemDetail}>
                  <View style={MyDeliveryStyle.iconContainer}>
                    <Image
                      source={Images.calendar}
                      style={MyDeliveryStyle.icon}
                    />
                  </View>
                  <View>
                    <Text style={MyDeliveryStyle.detailHeader}>
                      {Labels.PickUp_Date}
                    </Text>
                    <Text style={MyDeliveryStyle.detailSubtext}>
                      {item.pickUpDate}
                    </Text>
                  </View>
                </View>
                <View style={MyDeliveryStyle.itemDetail}>
                  <View style={MyDeliveryStyle.iconContainer}>
                    <Image source={Images.clock} style={MyDeliveryStyle.icon} />
                  </View>
                  <View>
                    <Text style={MyDeliveryStyle.detailHeader}>
                      {Labels.PickUp_Time}
                    </Text>
                    <Text style={MyDeliveryStyle.detailSubtext}>
                      {item.pickUpTime}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={MyDeliveryStyle.viewDetailsButton}
                onPress={() => navigation.navigate('deliveryDetails',{
                  data:item
                })}>
                <Text style={MyDeliveryStyle.viewDetailsText}>
                  {Labels.View_Details}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    );
  };

  return (
    <View style={MyDeliveryStyle.container}>
      <Header header={Labels.My_Delivery} />
      {Delivery()}
    </View>
  );
};

export default MyDelivery;
