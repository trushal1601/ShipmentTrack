import {Image, ScrollView, Text, TextInput, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {Colors, Fonts, Images} from '../../../Assets/Assets';
import {ActionButton, Header} from '../../../Components/Component';
import {Labels} from '../../../Assets/Labels';
import Scale from '../../../Helper/Responsive';
import DeliveryDetailsStyle from './DeliveryDetailsStyle';
import RBSheet from 'react-native-raw-bottom-sheet';

const DeliveryDetails = ({route}) => {
  const [agentId, setAgentId] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const refStatusRBSheet = useRef();
  const {data} = route.params;
  console.log('data', data);

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
            <Image source={Images.calendar} style={DeliveryDetailsStyle.icon} />
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
            <Image source={Images.clock} style={DeliveryDetailsStyle.icon} />
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
            <Text
              style={{
                color: Colors.Grey300,
                fontFamily: Fonts.proximanova_regular,
                fontSize: Scale(14),
              }}>
              {Labels.Shipment_Status}
            </Text>
            <View
              style={{
                backgroundColor: Colors.White,
                paddingVertical: Scale(5),
                borderRadius: Scale(8),
                marginTop: Scale(8),
                borderWidth: Scale(0.5),
                borderColor: Colors.Grey100,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: Scale(10),
              }}>
              <Text
                style={{
                  fontSize: Scale(16),
                  fontFamily: Fonts.proximanova_regular,
                }}>
                Please select status
              </Text>
              <Image
                source={Images.downArrow}
                style={{height: Scale(24), width: Scale(24)}}
              />
            </View>
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
        onClose={() => setStatusModalVisible(false)}>
        <View style={HomeScreenStyle.content}>
          <Text>fjkae</Text>
        </View>
      </RBSheet>
    );
  };

  return (
    <View style={DeliveryDetailsStyle.container}>
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
        </View>
      </ScrollView>
      {showStatus === true ? (
        <ActionButton
          value={'Update'}
          disabled
          style={{marginHorizontal: Scale(20), marginBottom: Scale(10)}}
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
            textStyle={{color: Colors.Primary}}
          />
          <ActionButton
            value={'Accept'}
            style={{width: '50%'}}
            disabled={agentId.length !== 12}
            onPress={() => setShowStatus(true)}
          />
        </View>
      )}
    </View>
  );
};

export default DeliveryDetails;
