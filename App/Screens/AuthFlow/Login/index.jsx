import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../../Assets/Assets';
import {Labels} from '../../../Assets/Labels';
import {Button} from '../../../Components/Component';
import Scale from '../../../Helper/Responsive';
import {Formik} from 'formik';
import * as Yup from 'yup';

const Login = ({navigation}) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });

  return (
    <Formik
      initialValues={{email: ''}}
      validationSchema={validationSchema}
      onSubmit={values => {
        // console.log(values);
        navigation.navigate('OTPVerify', {email: values.email});
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.headerText}>{Labels.started}</Text>
            <Text style={styles.bioText}>{Labels.bio}</Text>
            <Text style={styles.labelText}>{Labels.Email}</Text>
            <TextInput
              placeholder="Enter email"
              placeholderTextColor={Colors.Grey200}
              style={styles.textInput}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <Text
              style={{
                color: Colors.Grey200,
                fontSize: Scale(14),
                marginTop: Scale(5),
                fontFamily: Fonts.proximanova_regular,
              }}>
              You will receive an OTP to verify this email id.
            </Text>
            <View style={styles.buttonContainer}>
              <Button
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  innerContainer: {
    marginTop: Scale(80),
    paddingHorizontal: Scale(25),
  },
  headerText: {
    color: Colors.Grey400,
    fontSize: Scale(26),
    fontFamily: Fonts.proximanova_bold,
  },
  bioText: {
    color: Colors.Grey300,
    fontFamily: Fonts.proximanova_regular,
    marginTop: Scale(10),
    fontSize: Scale(14),
  },
  labelText: {
    marginTop: Scale(30),
    fontSize: Scale(13),
    fontFamily: Fonts.proximanova_regular,
    color: Colors.Grey300,
    paddingHorizontal: Scale(2),
  },
  textInput: {
    marginTop: Scale(10),
    borderWidth: Scale(1),
    fontFamily: Fonts.proximanova_regular,
    color: Colors.Black,
    borderRadius: Scale(10),
    paddingHorizontal: Scale(20),
    paddingVertical: Scale(8),
    borderColor: Colors.Grey100,
  },
  errorText: {
    color: 'red',
    marginTop: Scale(5),
    fontSize: Scale(14),
    fontFamily: Fonts.proximanova_regular,
  },
  buttonContainer: {
    marginTop: Scale(20),
  },
});
