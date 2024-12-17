import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../../Assets/Assets';
import {Labels} from '../../../Assets/Labels';
import {Button} from '../../../Components/Component';
import Scale from '../../../Helper/Responsive';

const Login = () => {
  return (
    <View style={{backgroundColor: Colors.White, flex: 1}}>
      <View style={{marginTop: 80, paddingHorizontal: 25}}>
        <Text
          style={{
            color: Colors.Grey400,
            fontSize: 28,
            fontFamily: Fonts.proximanova_bold,
          }}>
          {Labels.started}
        </Text>
        <Text
          style={{
            color: Colors.Grey300,
            fontFamily: Fonts.proximanova_regular,
            marginTop: 10,
          }}>
          {Labels.bio}
        </Text>
        <Text
          style={{
            marginTop: 30,
            fontSize: 14,
            fontFamily: Fonts.proximanova_regular,
            color: Colors.Grey300,
            paddingHorizontal: 2,
          }}>
          {Labels.Email}
        </Text>
        <TextInput
          placeholder="Enter email"
          placeholderTextColor={Colors.Grey200}
          style={{
            marginTop: 10,
            borderWidth: 1,
            fontFamily: Fonts.proximanova_regular,
            color: Colors.Black,
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderColor: Colors.Grey100,
          }}
        />
        <View style={{marginTop: Scale(20)}}>
          <Button value={'Login'} />
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
