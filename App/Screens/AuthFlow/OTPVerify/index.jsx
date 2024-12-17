import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Fonts, Images} from '../../../Assets/Assets';
import Scale from '../../../Helper/Responsive';
import {Labels} from '../../../Assets/Labels';
import {getImageSource} from '../../../Helper/ImageUri';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button} from '../../../Components/Component';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useNavigation} from '@react-navigation/native';

const OTPVerify = ({route, initialSeconds = 60}) => {
  const navigation = useNavigation();
  const {email} = route.params;
  const [otp, setOtp] = useState('');
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({value: otp, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  });

  const validationSchema = Yup.object().shape({
    otp: Yup.string().required('OTP is required'),
  });

  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => setSeconds(seconds - 1), 1000);
      return () => clearInterval(timerId);
    } else {
      setIsOtpExpired(true);
    }
  }, [seconds]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleResend = () => {
    setSeconds(initialSeconds);
    setIsOtpExpired(false);
    // Add resend OTP logic here
  };

  return (
    <Formik
      initialValues={{otp: ''}}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values);
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={{backgroundColor: Colors.White, flex: 1}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              alignSelf: 'flex-start',
              backgroundColor: Colors.White,
            }}>
            <Image
              source={getImageSource(Images.back_icon)}
              style={{
                height: Scale(24),
                width: Scale(24),
                margin: Scale(15),
              }}
            />
          </TouchableOpacity>
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
            <CodeField
              ref={ref}
              {...props}
              value={otp}
              onChangeText={setOtp}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}>
                  <Text style={styles.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
            {touched.otp && errors.otp && (
              <Text style={styles.errorText}>{errors.otp}</Text>
            )}

            {isOtpExpired ? (
              <View style={{flexDirection: 'row', marginTop: Scale(10)}}>
                <Text
                  style={{
                    color: Colors.Grey200,
                    fontFamily: Fonts.proximanova_regular,
                    marginRight: Scale(5),
                  }}>
                  Entered OTP is invalid or expired.
                </Text>
                <Pressable onPress={handleResend}>
                  <Text style={styles.resendText}>Resend</Text>
                </Pressable>
              </View>
            ) : (
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
                  {formatTime(seconds)}
                </Text>
              </Text>
            )}
            <Button
              value={'Verify'}
              disabled={otp.length < CELL_COUNT || !!errors.otp}
              onPress={() => navigation.navigate('home')}
              style={{marginTop: Scale(20)}}
            />
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
  codeFieldRoot: {
    marginTop: Scale(20),
    paddingRight: Scale(80),
  },
  cell: {
    width: Scale(52),
    height: Scale(52),
    lineHeight: Scale(36),
    fontSize: Scale(24),
    borderWidth: Scale(2),
    borderColor: Colors.Grey100,
    textAlign: 'center',
    borderRadius: Scale(10),
  },
  focusCell: {
    borderColor: Colors.Grey400,
  },
  cellText: {
    fontSize: Scale(24),
    color: Colors.Grey400,
    textAlign: 'center',
    marginTop: Scale(8),
  },
  errorText: {
    color: Colors.Red,
    fontFamily: Fonts.proximanova_regular,
    marginTop: Scale(10),
  },
  resendText: {
    color: Colors.Primary,
    fontFamily: Fonts.proximanova_bold,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
