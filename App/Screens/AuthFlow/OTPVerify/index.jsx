import {Image, StyleSheet, Text, TextInput, View, FlatList} from 'react-native';
import React, {useState, useRef} from 'react';
import {Colors, Fonts, Images} from '../../../Assets/Assets';
import Scale from '../../../Helper/Responsive';
import {Labels} from '../../../Assets/Labels';
import {getImageSource} from '../../../Helper/ImageUri';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button} from '../../../Components/Component';

const OTPVerify = ({route}) => {
  const {email} = route.params;
  console.log(email);

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleOtpChange = (text, index) => {
    if (text.length === 1 && index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputs.current[index - 1].focus();
    }
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.string().required('OTP is required'),
  });

  const renderItem = ({item, index}) => (
    <TextInput
      ref={el => (inputs.current[index] = el)}
      keyboardType="numeric"
      style={styles.input}
      value={item}
      onChangeText={text => handleOtpChange(text, index)}
      onKeyPress={e => handleKeyPress(e, index)}
      maxLength={1}
    />
  );

  return (
    <Formik
      initialValues={{otp: ''}}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values);
        // navigation.navigate('OTPVerify', { otp: values.otp });
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={{backgroundColor: Colors.White, flex: 1}}>
          <Image
            source={getImageSource(Images.back_icon)}
            style={{height: Scale(24), width: Scale(24), margin: Scale(15)}}
          />
          <View style={styles.innerContainer}>
            <Text style={styles.headerText}>{Labels.otp}</Text>
            <Text style={styles.bioText}>{Labels.otpBio}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 10,
              }}>
              <Image
                source={Images.mail_icon}
                style={{height: Scale(24), width: Scale(24)}}
              />
              <Text
                style={{
                  color: Colors.Grey400,
                  fontFamily: Fonts.proximanova_regular,
                }}>
                {email}
              </Text>
            </View>
            <FlatList
              data={otp}
              horizontal
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{marginTop: 20, gap: 20}}
            />
            {touched.otp && errors.otp && (
              <Text style={styles.errorText}>{errors.otp}</Text>
            )}
            <Text
              style={{
                color: Colors.Grey200,
                fontFamily: Fonts.proximanova_regular,
                marginTop: 15,
              }}>
              Resend code in{' '}
              <Text
                style={{
                  color: Colors.Grey300,
                  fontFamily: Fonts.proximanova_regular,
                }}>
                1:58
              </Text>
            </Text>
            <Button value={'Verify'} disabled={!values.otp || !!errors.otp} />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default OTPVerify;

const styles = StyleSheet.create({
  innerContainer: {
    paddingHorizontal: Scale(23),
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
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.Grey100,
    height: 54,
    width: 50,
    fontSize: 24,
    textAlign: 'center',
  },
});
