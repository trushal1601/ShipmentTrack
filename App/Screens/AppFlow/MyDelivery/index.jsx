import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Colors, Fonts, Images} from '../../../Assets/Assets';
import {Header} from '../../../Components/Component';
import {Labels} from '../../../Assets/Labels';
import MyDeliveryStyle from './MyDeliveryStyle';
import {useNavigation} from '@react-navigation/native';
import {useLabels} from '../../../Helper/ReduxLabels';
import {useDispatch, useSelector} from 'react-redux';
import {myDelivery} from '../../../Redux/Features/HomeSlice';
import Loader from '../../../Helper/Loader';

const MyDelivery = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const label = useLabels();

  useEffect(() => {
    dispatch(myDelivery());
  }, [dispatch]);

  const {loading, myDeliveryData} = useSelector(state => state.home);
  // console.log('count', myDeliveryData);

  const DeliveryOrder = [
    {
      id: 1,
      type: label.regular,
      pickUpDate: '24/07/2024',
      pickUpTime: '05:10pm',
      id: '#258413914346',
      charge: '499',
      pickUpLocation: '705,Elite Business House,Sola,Ahmedabad',
      dropLocation: 'B-606,Satyamev Eminence,Science City Road,Sola,Ahmedabad',
    },
    {
      id: 2,
      type: Labels.Urgent,
      pickUpDate: '24/07/2024',
      pickUpTime: '07:15pm',
      id: '#654713911257',
      charge: '799',
      pickUpLocation: 'B-606,Silver Radiance,Science City Road,Sola,Ahmedabad',
      dropLocation:
        'B-606,Empire Business Hub,Science City Road,Sola,Ahmedabad',
    },
    {
      id: 3,
      type: label.regular,
      pickUpDate: '25/07/2024',
      pickUpTime: '11:15am',
      id: '#982113914346',
      charge: '150',
      pickUpLocation: '705,Elite Business House,Sola,Ahmedabad',
      dropLocation: 'B-606,Satyamev Eminence,Science City Road,Sola,Ahmedabad',
    },
    {
      id: 4,
      type: label.regular,
      pickUpDate: '25/07/2024',
      pickUpTime: '01:10pm',
      id: '#108313914346',
      charge: '499',
      pickUpLocation:
        '1596 Cheriton Dr, Port Shepstone, KwaZulu-Natal, South Africa',
      dropLocation:
        '1857 St. John Street, Kleinmond, Western Cape, South Africa',
    },
    {
      id: 5,
      type: Labels.Urgent,
      pickUpDate: '26/07/2024',
      pickUpTime: '07:10am',
      id: '#510813914346',
      charge: '999',
      pickUpLocation: '705,Elite Business House,Sola,Ahmedabad',
      dropLocation: 'B-606,Satyamev Eminence,Science City Road,Sola,Ahmedabad',
    },
    {
      id: 6,
      type: label.regular,
      pickUpDate: '26/07/2024',
      pickUpTime: '03:10pm',
      id: '#713913914346',
      charge: '499',
      pickUpLocation:
        '1596 Cheriton Dr, Port Shepstone, KwaZulu-Natal, South Africa',
      dropLocation:
        '1857 St. John Street, Kleinmond, Western Cape, South Africa',
    },
  ];

  const Delivery = () => {
    return (
      <FlatList
        data={myDeliveryData}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={MyDeliveryStyle.flatListContent}
        renderItem={({item}) => {
          return (
            <View style={MyDeliveryStyle.itemContainer} key={item.shipment_id}>
              <View style={MyDeliveryStyle.itemHeader}>
                <Text style={MyDeliveryStyle.shipmentTypeText}>
                  {label.shipmentType}
                </Text>
                <View
                  style={[
                    MyDeliveryStyle.shipmentTypeBadge,
                    {
                      backgroundColor:
                        item.type === 'Urgent' ? 'red' : Colors.Green,
                    },
                  ]}>
                  <Text style={MyDeliveryStyle.shipmentTypeLabel}>
                    {item.shipment_type}
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
                  <View
                    style={{
                      flex: 1,
                    }}>
                    <Text style={MyDeliveryStyle.detailHeader}>
                      {label.pickUpDate}
                    </Text>
                    <Text style={MyDeliveryStyle.detailSubtext}>
                      {item.shipment_date}
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
                  <View style={{flex: 1}}>
                    <Text style={MyDeliveryStyle.detailHeader}>
                      {label.pickUpTime}
                    </Text>
                    <Text style={MyDeliveryStyle.detailSubtext}>
                      {item.shipment_time}
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
      <StatusBar backgroundColor={Colors.White} barStyle={'dark-content'} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header header={label.myDelivery} />
          {Delivery()}
        </>
      )}
    </View>
  );
};

export default MyDelivery;
