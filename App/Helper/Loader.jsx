import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
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
import { Colors } from '../Assets/Assets';

const Loader = () => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
    <BarIndicator color={Colors.Primary} />
  </View>
  )
}

export default Loader

const styles = StyleSheet.create({})