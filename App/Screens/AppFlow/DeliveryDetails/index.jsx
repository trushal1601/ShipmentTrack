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
import {Colors, Fonts, Images} from '../../../Assets/Assets';
import {ActionButton, Header} from '../../../Components/Component';
import {Labels} from '../../../Assets/Labels';
import Scale from '../../../Helper/Responsive';
import DeliveryDetailsStyle from './DeliveryDetailsStyle';
import RBSheet from 'react-native-raw-bottom-sheet';
import {DeliveryStatus} from '../../../Helper/JsonData';
import {useNavigation} from '@react-navigation/native';

const DeliveryDetails = ({route}) => {
  const navigation = useNavigation();
  const [agentId, setAgentId] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showStatus, setShowStatus] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const refStatusRBSheet = useRef();
  const refRejectRBSheet = useRef();
  const {data} = route.params;
  console.log('data', data);

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
      refStatusRBSheet.current.open();
    } else {
      refStatusRBSheet.current.close();
    }
  }, [statusModalVisible]);

  useEffect(() => {
    if (rejectModalVisible) {
      refRejectRBSheet.current.open();
    } else {
      refRejectRBSheet.current.close();
    }
  }, [rejectModalVisible]);

  const ShipmentType = () => {
    return (
      <View style={DeliveryDetailsStyle.itemHeader}>
        <Text style={DeliveryDetailsStyle.shipmentTypeText}>
          {Labels.Shipment_Type}
        </Text>
        <View
          style={[
            DeliveryDetailsStyle.shipmentTypeBadge,
            {
              backgroundColor: data.type === 'Regular' ? Colors.Green : 'red',
            },
          ]}>
          <Text style={DeliveryDetailsStyle.shipmentTypeLabel}>
            {data.type}
          </Text>
        </View>
      </View>
    );
  };
  const AgentIdSection = () => {
    return (
      <View>
        <Text style={DeliveryDetailsStyle.agentIdText}>{Labels.AgentID}</Text>
        <TextInput
          placeholder="Please enter agent id"
          placeholderTextColor={Colors.Grey200}
          value={agentId}
          onChangeText={text => setAgentId(text)}
          style={DeliveryDetailsStyle.textInput}
          keyboardType="numeric"
        />
      </View>
    );
  };
  const ShipmentIDSection = () => {
    return (
      <View style={DeliveryDetailsStyle.row}>
        <View style={DeliveryDetailsStyle.rowItem}>
          <Text style={DeliveryDetailsStyle.rowItemHeader}>
            {Labels.ShipmentID}
          </Text>
          <Text style={DeliveryDetailsStyle.rowItemText}>{data.id}</Text>
        </View>
        <View style={DeliveryDetailsStyle.rowItem}>
          <Text style={DeliveryDetailsStyle.rowItemHeader}>
            {Labels.Total_Charges}
          </Text>
          <Text style={DeliveryDetailsStyle.rowItemText}>₹ {data.charge}</Text>
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
          <View>
            <Text style={DeliveryDetailsStyle.pickUpText}>
              {Labels.PickUp_Date}
            </Text>
            <Text style={DeliveryDetailsStyle.dateTimeText}>
              {data.pickUpDate}
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
          <View>
            <Text style={DeliveryDetailsStyle.pickUpText}>
              {Labels.PickUp_Time}
            </Text>
            <Text style={DeliveryDetailsStyle.dateTimeText}>
              {data.pickUpTime}
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
        <Text style={DeliveryDetailsStyle.pickUp}>
          {Labels.PickUp_Location}
        </Text>
        <Text style={DeliveryDetailsStyle.pickUpData}>
          {data.pickUpLocation}
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
        <Text style={DeliveryDetailsStyle.pickUp}>{Labels.Drop_Location}</Text>
        <Text style={DeliveryDetailsStyle.pickUpData}>{data.dropLocation}</Text>
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
        {showStatus === true ? (
          <View style={{marginTop: Scale(15)}}>
            <Text style={DeliveryDetailsStyle.statusText}>
              {Labels.Shipment_Status}
            </Text>
            <TouchableOpacity
              onPress={() => setStatusModalVisible(true)}
              style={DeliveryDetailsStyle.statusView}>
              <Text style={DeliveryDetailsStyle.status}>
                {selectedStatus === null
                  ? 'Please select status'
                  : selectedStatus}
              </Text>
              <Image
                source={Images.downArrow}
                style={{height: Scale(24), width: Scale(24)}}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
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
            value={'Done'}
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
        onClose={() => setRejectModalVisible(false)}>
        <View style={DeliveryDetailsStyle.rejectView}>
          <View style={DeliveryDetailsStyle.rejectHeaderView}>
            <Image
              source={Images.danger}
              style={DeliveryDetailsStyle.rejectImg}
            />
            <Text style={DeliveryDetailsStyle.rejectLabel}>
              {Labels.Reject_Shipment_Delivery}
            </Text>
            <Text style={DeliveryDetailsStyle.rejectBio}>
              Are you sure you want to reject this shipment delivery? Confirm
              your decision to ensure precise and efficient shipment tracking
              management.
            </Text>
          </View>
          <View style={DeliveryDetailsStyle.rejectButtonView}>
            <ActionButton
              value={'Cancel'}
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
              value={'Yes'}
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header header={Labels.My_Delivery} />
        <View style={DeliveryDetailsStyle.contentContainer}>
          <Text
            style={[DeliveryDetailsStyle.headerText, {marginTop: Scale(8)}]}>
            {Labels.Shipment_Details}
          </Text>
          {ShipmentDetails()}
          <Text
            style={[DeliveryDetailsStyle.headerText, {marginTop: Scale(20)}]}>
            {Labels.Shipment_Information}
          </Text>
          {ShipmentInfo()}
          {StatusModel()}
          {RejectModel()}
        </View>
      </ScrollView>
      {!isKeyboardVisible &&
        (showStatus ? (
          <ActionButton
            value={'Update'}
            disabled={!selectedStatus}
            style={{marginHorizontal: Scale(20), marginBottom: Scale(10)}}
            onPress={() => navigation.navigate('myDelivery')}
          />
        ) : (
          <View style={DeliveryDetailsStyle.bottomButton}>
            <ActionButton
              value={'Reject'}
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
              value={'Accept'}
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
