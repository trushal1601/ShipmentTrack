import {StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../../Assets/Assets';
import {Labels} from '../../../Assets/Labels';
import {ActionButton} from '../../../Components/Component';
import Scale from '../../../Helper/Responsive';
import {Formik} from 'formik';
import * as Yup from 'yup';
import LoginStyle from './LoginStyle';

const Login = ({navigation}) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email address',
      )
      .email('Invalid email format')
      .required('Email is required'),
  });

  const Header = () => {
    return (
      <View>
        <Text style={LoginStyle.headerText}>{Labels.started}</Text>
        <Text style={LoginStyle.bioText}>{Labels.bio}</Text>
      </View>
    );
  };

  return (
    <Formik
      initialValues={{email: ''}}
      validationSchema={validationSchema}
      onSubmit={values => {
        // console.log(values);
        navigation.navigate('OTPVerify', {email: values.email});
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={LoginStyle.container}>
          <StatusBar backgroundColor={Colors.White} barStyle={'dark-content'} />
          <View style={LoginStyle.innerContainer}>
            {Header()}
            <Text style={LoginStyle.labelText}>{Labels.Email}</Text>
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
            <Text style={LoginStyle.infoText}>
              You will receive an OTP to verify this email id.
            </Text>
            <View style={LoginStyle.buttonContainer}>
              <ActionButton
                value={'Login'}
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
