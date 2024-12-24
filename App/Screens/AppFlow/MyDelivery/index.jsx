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
import {useLabels} from '../../../Helper/ReduxLabels';

const MyDelivery = () => {
  const navigation = useNavigation();
  const label = useLabels();

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
                  {label.shipmentType}
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
                      tintColor={'#666666'}
                    />
                  </View>
                  <View>
                    <Text style={MyDeliveryStyle.detailHeader}>
                      {label.pickUpDate}
                    </Text>
                    <Text style={MyDeliveryStyle.detailSubtext}>
                      {item.pickUpDate}
                    </Text>
                  </View>
                </View>
                <View style={MyDeliveryStyle.itemDetail}>
                  <View style={MyDeliveryStyle.iconContainer}>
                    <Image
                      source={Images.clock}
                      style={MyDeliveryStyle.icon}
                      tintColor={'#666666'}
                    />
                  </View>
                  <View>
                    <Text style={MyDeliveryStyle.detailHeader}>
                      {label.pickUpTime}
                    </Text>
                    <Text style={MyDeliveryStyle.detailSubtext}>
                      {item.pickUpTime}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={MyDeliveryStyle.viewDetailsButton}
                onPress={() =>
                  navigation.navigate('deliveryDetails', {
                    data: item,
                  })
                }>
                <Text style={MyDeliveryStyle.viewDetailsText}>
                  {label.viewDetails}
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
      <Header header={label.myDelivery} />
      {Delivery()}
    </View>
  );
};

export default MyDelivery;
