import {StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../../Assets/Assets';
import {Labels} from '../../../Assets/Labels';
import {ActionButton} from '../../../Components/Component';
import Scale from '../../../Helper/Responsive';
import {Formik} from 'formik';
import * as Yup from 'yup';
import LoginStyle from './LoginStyle';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../Redux/Features/UserSlice';
import {useLabels} from '../../../Helper/ReduxLabels';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const label = useLabels();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        label.email_valid,
      )
      .email(label.email_valid)
      .required('Email is required'),
  });

  const Header = () => {
    return (
      <View>
        <Text style={LoginStyle.headerText}>{label.LetsGetStarted}</Text>
        <Text style={LoginStyle.bioText}>{label.LoginSlogan}</Text>
      </View>
    );
  };

  return (
    <Formik
      initialValues={{email: ''}}
      validationSchema={validationSchema}
      onSubmit={values => {
        navigation.navigate('OTPVerify', {email: values.email});
        dispatch(loginUser(values.email));
        // AsyncStorage.setItem('email', values.email);
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={LoginStyle.container}>
          <StatusBar backgroundColor={Colors.White} barStyle={'dark-content'} />
          <View style={LoginStyle.innerContainer}>
            {Header()}
            <Text style={LoginStyle.labelText}>{label.email}</Text>
            <TextInput
              placeholder="Enter email"
              placeholderTextColor={Colors.Grey200}
              style={LoginStyle.textInput}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={LoginStyle.errorText}>{errors.email}</Text>
            )}
            <Text style={LoginStyle.infoText}>{label.recievedEmail}</Text>
            <View style={LoginStyle.buttonContainer}>
              <ActionButton
                value={label.login}
                onPress={handleSubmit}
                disabled={!values.email || !!errors.email}
                style={{}}
              />
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Login;
