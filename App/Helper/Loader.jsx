import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import {Colors} from '../Assets/Assets';
import Scale from './Responsive';

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.White,
      }}>
      <BarIndicator color={Colors.Primary} size={Scale(25)} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
