import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts} from '../../../Assets/Assets';
import {Labels} from '../../../Assets/Labels';
import {ActionButton} from '../../../Components/Component';
import Scale from '../../../Helper/Responsive';
import {Formik} from 'formik';
import * as Yup from 'yup';
import LoginStyle from './LoginStyle';
import {useDispatch, useSelector} from 'react-redux';
import {useLabels} from '../../../Helper/ReduxLabels';
import Loader from '../../../Helper/Loader';
import {login} from '../../../Redux/Features/LanguageSlice';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const label = useLabels();
  const {loading} = useSelector(state => state.language_id);
  const [submitting, setSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        label?.email_valid,
      )
      .email(label?.email_valid)
      .required('Email is required'),
  });

  const Header = () => {
    return (
      <View>
        <Text style={LoginStyle.headerText}>{label?.LetsGetStarted}</Text>
        <Text style={LoginStyle.bioText}>{label?.LoginSlogan}</Text>
      </View>
    );
  };

  return (
    <View style={LoginStyle.container}>
      <StatusBar backgroundColor={Colors.White} barStyle={'dark-content'} />
      {loading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={{email: ''}}
          validationSchema={validationSchema}
          onSubmit={async (values, {setSubmitting}) => {
            setSubmitting(true);
            try {
              const Login = await dispatch(
                login({email: values.email, fcm_token: 'string'}),
              );
              if (Login.type === login.fulfilled.type) {
                const {message} = Login.payload;
                if (message === 'success_message') {
                  navigation.navigate('OTPVerify', {fcm_token: 'string'});
                }
              } else {
                throw new Error('Login response not as expected');
              }
            } catch (error) {
              console.error('Error logging in:', error);
              Alert.alert('Error logging in. Please try again.');
            } finally {
              setSubmitting(false);
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <View style={LoginStyle.innerContainer}>
              {Header()}
              <Text style={LoginStyle.labelText}>{label?.email}</Text>
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
              {values.email && !errors.email ? (
                <Text style={LoginStyle.infoText}>{label?.recievedEmail}</Text>
              ) : null}
              <View style={LoginStyle.buttonContainer}>
                {isSubmitting ? (
                  <Loader />
                ) : (
                  <ActionButton
                    value={label?.login}
                    onPress={handleSubmit}
                    disabled={!values.email || !!errors.email || isSubmitting}
                    style={{}}
                  />
                )}
              </View>
            </View>
          )}
        </Formik>
      )}
    </View>
  );
};

export default Login;
