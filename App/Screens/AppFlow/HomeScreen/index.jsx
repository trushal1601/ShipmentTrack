import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../Assets/Assets';

const HomeScreen = () => {
  return (
    <View style={{backgroundColor: Colors.White, flex: 1}}>
      <Text>HomeScreen</Text>
      <TextInput placeholder="fghjkfh" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
