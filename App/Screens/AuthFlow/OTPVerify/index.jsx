import {
  Alert,
  Image,
  Pressable,
  StatusBar,
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
import {ActionButton, Header} from '../../../Components/Component';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useNavigation} from '@react-navigation/native';
import OTPVerifyStyle from './OTPVerifyStyle';
import {useLabels} from '../../../Helper/ReduxLabels';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../Helper/Loader';
import {resendOTP, verifyOTP} from '../../../Redux/Features/LanguageSlice';
import {setEmail} from '../../../Redux/Features/EmailSlice';

const OTPVerify = ({route, initialSeconds = 120}) => {
  const dispatch = useDispatch();
  const {otpVerifyLoading} = useSelector(state => state.language_id);
  const label = useLabels();
  const navigation = useNavigation();
  const {fcm_token} = route.params;
  const {loginEmail} = useSelector(state => state.language_id);
  // const {token} = useSelector(state => state.language_id);
  // console.log('demo1', token?.Token);
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
    dispatch(resendOTP({email: loginEmail?.email, fcm_token}));
  };

  const Email = () => {
    return (
      <View style={OTPVerifyStyle.emailContainer}>
        <Image source={Images.mail_icon} style={OTPVerifyStyle.mailIcon} />
        <Text style={OTPVerifyStyle.emailText}>{loginEmail?.email}</Text>
      </View>
    );
  };

  const handleOtpVerification = async (
    enteredOtp,
    setSubmitting,
    navigation,
  ) => {
    try {
      const response = await dispatch(
        verifyOTP({email: loginEmail.email, fcm_token, otp: enteredOtp}),
      );
      const token = response?.payload?.data?.Token;
      // console.log('token====>', token);

      await dispatch(
        setEmail({
          token,
        }),
      );
      if (token) {
        navigation.navigate('home');
      }
    } catch (error) {
      console.error('Error verifying OTP and setting email:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {otpVerifyLoading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={{otp: ''}}
          validationSchema={validationSchema}
          onSubmit={async (values, {setSubmitting}) => {
            handleOtpVerification(values.otp, setSubmitting, navigation);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={OTPVerifyStyle.container}>
              <StatusBar
                backgroundColor={Colors.White}
                barStyle={'dark-content'}
              />
              <Header />
              <View style={OTPVerifyStyle.innerContainer}>
                <Text style={OTPVerifyStyle.headerText}>
                  {label?.otpVarification}
                </Text>
                <Text style={OTPVerifyStyle.bioText}>{label?.otpSomeword}</Text>
                {Email()}
                <CodeField
                  ref={ref}
                  {...props}
                  value={otp}
                  onChangeText={text => {
                    setOtp(text);
                    handleChange('otp')(text);
                  }}
                  cellCount={CELL_COUNT}
                  rootStyle={OTPVerifyStyle.codeFieldRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({index, symbol, isFocused}) => (
                    <View
                      onLayout={getCellOnLayoutHandler(index)}
                      key={index}
                      style={[
                        OTPVerifyStyle.cell,
                        isFocused && OTPVerifyStyle.focusCell,
                      ]}>
                      <Text style={OTPVerifyStyle.cellText}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    </View>
                  )}
                />

                {touched.otp && errors.otp && (
                  <Text style={OTPVerifyStyle.errorText}>{errors.otp}</Text>
                )}
                {isOtpExpired ? (
                  <View style={OTPVerifyStyle.expiredContainer}>
                    <Text style={OTPVerifyStyle.invalidOtpText}>
                      {label.aheadMessage}
                    </Text>
                    <Pressable onPress={handleResend}>
                      <Text style={OTPVerifyStyle.resendText}>
                        {label.resend}
                      </Text>
                    </Pressable>
                  </View>
                ) : (
                  <Text
                    style={{
                      fontSize: Scale(14),
                      marginTop: Scale(10),
                      fontFamily: Fonts.proximanova_bold,
                    }}>
                    Your OTP is : {loginEmail?.otp}
                  </Text>
                )}
                <ActionButton
                  value={label?.verify}
                  disabled={otp.length < CELL_COUNT || !!errors.otp}
                  onPress={handleSubmit}
                  style={OTPVerifyStyle.verifyButton}
                />
              </View>
            </View>
          )}
        </Formik>
      )}
    </>
  );
};

export default OTPVerify;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1,
  },
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
  backIcon: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.White,
  },
  backImage: {
    height: Scale(24),
    width: Scale(24),
    margin: Scale(15),
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  mailIcon: {
    height: Scale(24),
    width: Scale(24),
  },
  emailText: {
    color: Colors.Grey400,
    fontFamily: Fonts.proximanova_regular,
  },
  expiredContainer: {
    flexDirection: 'row',
    marginTop: Scale(10),
  },
  invalidOtpText: {
    color: Colors.Grey200,
    fontFamily: Fonts.proximanova_regular,
    marginRight: Scale(5),
  },
  resendCountdown: {
    color: Colors.Grey200,
    fontFamily: Fonts.proximanova_regular,
    marginTop: 15,
  },
  resendTime: {
    color: Colors.Grey300,
    fontFamily: Fonts.proximanova_regular,
  },
  verifyButton: {
    marginTop: Scale(20),
  },
});
