import {
  FlatList,
  Image,
  Keyboard,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Colors, Images} from '../../../Assets/Assets';
import {ActionButton, Header} from '../../../Components/Component';
import {Labels} from '../../../Assets/Labels';
import Scale from '../../../Helper/Responsive';
import DeliveryDetailsStyle from './DeliveryDetailsStyle';
import RBSheet from 'react-native-raw-bottom-sheet';
// import {DeliveryStatus} from '../../../Helper/JsonData';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import {useLabels} from '../../../Helper/ReduxLabels';
import {deliveryDetail, updateStatus} from '../../../Redux/Features/HomeSlice';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../Helper/Loader';

const DeliveryDetails = ({route}) => {
  const dispatch = useDispatch();
  const label = useLabels();
  const navigation = useNavigation();
  const [agentId, setAgentId] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showStatus, setShowStatus] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const refStatusRBSheet = useRef();
  const refRejectRBSheet = useRef();
  const {data} = route.params;
  const {deliveryDetails, loading} = useSelector(state => state.home);
  // console.log('HomeDetails', deliveryDetails);

  const DeliveryStatus = [
    {
      id: 1,
      status: label.pickup,
    },
    {
      id: 2,
      status: label.inTransit,
    },
    {
      id: 3,
      status: label.delivered,
    },
  ];

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    dispatch(deliveryDetail({shipment_id: data?.shipment_id}));
  }, [dispatch]);

  useEffect(() => {
    if (deliveryDetails?.shipment_status === '1') {
      setSelectedItem(DeliveryStatus[0].id);
      setSelectedStatus(DeliveryStatus[0].status);
    } else if (deliveryDetails?.shipment_status === '2') {
      setSelectedItem(DeliveryStatus[1].id);
      setSelectedStatus(DeliveryStatus[1].status);
    } else {
      setSelectedItem(DeliveryStatus[2].id);
      setSelectedStatus(DeliveryStatus[2].status);
    }
  }, [deliveryDetails?.shipment_status]);

  const handlePress = item => {
    setSelectedItem(item.id);
  };
  const handlePressDone = () => {
    const selectedStatus = DeliveryStatus.find(
      status => status.id === selectedItem,
    );
    const newStatus = selectedStatus
      ? selectedStatus.status
      : 'Please select status';
    setSelectedStatus(newStatus);
    setStatusModalVisible(false);
  };

  useEffect(() => {
    if (statusModalVisible) {
      refStatusRBSheet?.current?.open();
    } else {
      refStatusRBSheet?.current?.close();
    }
  }, [statusModalVisible]);

  useEffect(() => {
    if (rejectModalVisible) {
      refRejectRBSheet?.current?.open();
    } else {
      refRejectRBSheet?.current?.close();
    }
  }, [rejectModalVisible]);

  const ShipmentType = () => {
    return (
      <View style={DeliveryDetailsStyle.itemHeader}>
        <Text style={DeliveryDetailsStyle.shipmentTypeText}>
          {label.shipmentType}
        </Text>
        <View
          style={[
            DeliveryDetailsStyle.shipmentTypeBadge,
            {
              backgroundColor: data.type === 'Urgent' ? 'red' : Colors.Green,
            },
          ]}>
          <Text style={DeliveryDetailsStyle.shipmentTypeLabel}>
            {deliveryDetails?.shipment_type}
          </Text>
        </View>
      </View>
    );
  };
  const AgentIdSection = () => {
    return (
      <View>
        <Text style={DeliveryDetailsStyle.agentIdText}>{label.agentID}</Text>
        <TextInput
          placeholder={label?.pleaseEnterAgentId}
          placeholderTextColor={Colors.Grey200}
          value={agentId}
          onChangeText={text => setAgentId(text)}
          style={DeliveryDetailsStyle.textInput}
          keyboardType="numeric"
          maxLength={12}
        />
      </View>
    );
  };
  const ShipmentIDSection = () => {
    return (
      <View style={DeliveryDetailsStyle.row}>
        <View style={DeliveryDetailsStyle.rowItem}>
          <Text style={DeliveryDetailsStyle.rowItemHeader}>
            {label.shipmentId}
          </Text>
          <Text style={DeliveryDetailsStyle.rowItemText}>
            {deliveryDetails?.shipment_uniqueid}
          </Text>
        </View>
        <View style={DeliveryDetailsStyle.rowItem}>
          <Text style={DeliveryDetailsStyle.rowItemHeader}>
            {label.totalCharges}
          </Text>
          <Text style={DeliveryDetailsStyle.rowItemText}>
            ₹ {deliveryDetails?.charges}
          </Text>
        </View>
      </View>
    );
  };
  const ShipmentDetails = () => {
    return (
      <View style={DeliveryDetailsStyle.shipmentDetailsContainer}>
        {ShipmentType()}
        {AgentIdSection()}
        {ShipmentIDSection()}
      </View>
    );
  };
  const PickUpInfo = () => {
    return (
      <View style={DeliveryDetailsStyle.shipInfo1}>
        <View style={DeliveryDetailsStyle.pickDateSection}>
          <View style={DeliveryDetailsStyle.imgSec}>
            <Image
              source={Images.calendar}
              style={DeliveryDetailsStyle.icon}
              tintColor={'#666666'}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={DeliveryDetailsStyle.pickUpText}>
              {label.pickUpDate}
            </Text>
            <Text style={DeliveryDetailsStyle.dateTimeText}>
              {deliveryDetails?.shipment_date}
            </Text>
          </View>
        </View>
        <View style={DeliveryDetailsStyle.pickDateSection}>
          <View style={DeliveryDetailsStyle.imgSec}>
            <Image
              source={Images.clock}
              style={DeliveryDetailsStyle.icon}
              tintColor={'#666666'}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={DeliveryDetailsStyle.pickUpText}>
              {label.pickUpTime}
            </Text>
            <Text style={DeliveryDetailsStyle.dateTimeText}>
              {deliveryDetails?.shipment_time}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const PickUpLocation = () => {
    return (
      <View style={DeliveryDetailsStyle.pickupLocation}>
        <Image
          source={Images.red_round}
          style={[DeliveryDetailsStyle.dot, {left: Scale(-7), top: Scale(0)}]}
        />
        <Text style={DeliveryDetailsStyle.pickUp}>{label.pickUpLocation}</Text>
        <Text style={DeliveryDetailsStyle.pickUpData}>
          {deliveryDetails?.shipment_pickup_location}
        </Text>
        <Image
          source={Images.red_round}
          style={[
            DeliveryDetailsStyle.dot,
            {left: Scale(-7), bottom: Scale(-11)},
          ]}
        />
      </View>
    );
  };
  const DropLocation = () => {
    return (
      <View
        style={{
          paddingHorizontal: Scale(30),
        }}>
        <Text style={DeliveryDetailsStyle.pickUp}>{label.dropLocation}</Text>
        <Text style={DeliveryDetailsStyle.pickUpData}>
          {deliveryDetails?.shipment_drop_location}
        </Text>
      </View>
    );
  };
  const ShipmentInfo = () => {
    return (
      <View style={DeliveryDetailsStyle.shipInfoContainer}>
        {PickUpInfo()}
        <View
          style={{
            marginTop: Scale(20),
            marginHorizontal: Scale(17),
          }}>
          {PickUpLocation()}
          {DropLocation()}
        </View>
        {showStatus === true && (
          <View style={{marginTop: Scale(15)}}>
            <Text style={DeliveryDetailsStyle.statusText}>
              {label.shipmentstatus}
            </Text>
            <TouchableOpacity
              onPress={() => setStatusModalVisible(true)}
              style={DeliveryDetailsStyle.statusView}>
              <Text style={DeliveryDetailsStyle.status}>
                {selectedStatus === 0
                  ? label.pleaseSelectStatus
                  : selectedStatus}
              </Text>
              <Image
                source={Images.downArrow}
                style={{height: Scale(24), width: Scale(24)}}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  const StatusModel = () => {
    return (
      <RBSheet
        openDuration={250}
        ref={refStatusRBSheet}
        draggable={true}
        draggableIcon={true}
        height={Scale(300)}
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
        onClose={() => {
          setStatusModalVisible(false);
        }}>
        <View style={DeliveryDetailsStyle.shipmentStatusView}>
          <FlatList
            data={DeliveryStatus}
            renderItem={({item}) => {
              return (
                <TouchableWithoutFeedback onPress={() => handlePress(item)}>
                  <View style={DeliveryDetailsStyle.statusModel}>
                    <Image
                      source={
                        selectedItem === item.id
                          ? Images.Selcted
                          : Images.UnSelcted
                      }
                      style={DeliveryDetailsStyle.statusModelImg}
                    />
                    <Text style={DeliveryDetailsStyle.statusModelText}>
                      {item.status}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
          <ActionButton
            value={label.done}
            style={{marginHorizontal: Scale(10), marginTop: Scale(15)}}
            onPress={handlePressDone}
          />
        </View>
      </RBSheet>
    );
  };
  const RejectModel = () => {
    return (
      <RBSheet
        openDuration={250}
        ref={refRejectRBSheet}
        draggable={true}
        draggableIcon={true}
        height={Scale(325)}
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
        onClose={() => setRejectModalVisible(false)}>
        <View style={DeliveryDetailsStyle.rejectView}>
          <View style={DeliveryDetailsStyle.rejectHeaderView}>
            <Image
              source={Images.danger}
              style={DeliveryDetailsStyle.rejectImg}
            />
            <Text style={DeliveryDetailsStyle.rejectLabel}>
              {label.RejectShipmentDelivery}
            </Text>
            <Text style={DeliveryDetailsStyle.rejectBio}>
              {label.RejectModalSomeWords}
            </Text>
          </View>
          <View style={DeliveryDetailsStyle.rejectButtonView}>
            <ActionButton
              value={label.cancel}
              style={{
                borderColor: Colors.Primary,
                backgroundColor: Colors.White,
                borderWidth: 1,
                width: '50%',
              }}
              textStyle={{color: Colors.Primary}}
              onPress={() => setRejectModalVisible(false)}
            />
            <ActionButton
              value={label.yes}
              style={{width: '50%'}}
              onPress={() => navigation.navigate('myDelivery')}
            />
          </View>
        </View>
      </RBSheet>
    );
  };

  return (
    <View style={DeliveryDetailsStyle.container}>
      <StatusBar
        backgroundColor={
          statusModalVisible || rejectModalVisible === true
            ? '#36393C99'
            : Colors.White
        }
        barStyle={'dark-content'}
      />
      {loading ? (
        <Loader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header header={label.myDelivery} />
          <View style={DeliveryDetailsStyle.contentContainer}>
            <Text
              style={[DeliveryDetailsStyle.headerText, {marginTop: Scale(8)}]}>
              {label.shipmentDetails}
            </Text>
            {ShipmentDetails()}
            <Text
              style={[DeliveryDetailsStyle.headerText, {marginTop: Scale(20)}]}>
              {label.shipmentInformation}
            </Text>
            {ShipmentInfo()}
            {StatusModel()}
            {RejectModel()}
          </View>
        </ScrollView>
      )}
      {!isKeyboardVisible &&
        (showStatus ? (
          <ActionButton
            value={label.update}
            disabled={!selectedStatus}
            style={{marginHorizontal: Scale(20), marginBottom: Scale(10)}}
            onPress={() => {
              dispatch(
                updateStatus({
                  shipment_id: data?.shipment_id,
                  status: selectedItem,
                }),
              );
              navigation.navigate('myDelivery');
            }}
          />
        ) : (
          <View style={DeliveryDetailsStyle.bottomButton}>
            <ActionButton
              value={label.reject}
              style={{
                borderColor: Colors.Primary,
                backgroundColor: Colors.White,
                borderWidth: 1,
                width: '50%',
              }}
              onPress={() => setRejectModalVisible(true)}
              textStyle={{color: Colors.Primary}}
            />
            <ActionButton
              value={label.accept}
              style={{width: '50%'}}
              disabled={agentId.length !== 12}
              onPress={() => setShowStatus(true)}
            />
          </View>
        ))}
    </View>
  );
};

export default DeliveryDetails;
