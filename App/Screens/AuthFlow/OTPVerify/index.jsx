import {
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

const OTPVerify = ({route, initialSeconds = 120}) => {
  const label = useLabels();
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
  const Email = () => {
    return (
      <View style={OTPVerifyStyle.emailContainer}>
        <Image source={Images.mail_icon} style={OTPVerifyStyle.mailIcon} />
        <Text style={OTPVerifyStyle.emailText}>{email}</Text>
      </View>
    );
  };

  const OTPFill = () => {
    return (
      <>
        <CodeField
          ref={ref}
          {...props}
          value={otp}
          onChangeText={setOtp}
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
        {/* <Text>{label.otp_valid}</Text> */}
      </>
    );
  };

  return (
    <Formik
      initialValues={{otp: ''}}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values);
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={OTPVerifyStyle.container}>
          <StatusBar backgroundColor={Colors.White} barStyle={'dark-content'} />
          <Header />

          <View style={OTPVerifyStyle.innerContainer}>
            <Text style={OTPVerifyStyle.headerText}>
              {label?.otpVarification}
            </Text>
            <Text style={OTPVerifyStyle.bioText}>{label?.otpSomeword}</Text>
            {Email()}
            {OTPFill()}
            {touched.otp && errors.otp && (
              <Text style={OTPVerifyStyle.errorText}>{errors.otp}</Text>
            )}
            {isOtpExpired ? (
              <View style={OTPVerifyStyle.expiredContainer}>
                <Text style={OTPVerifyStyle.invalidOtpText}>
                  {label.aheadMessage}
                </Text>
                <Pressable onPress={handleResend}>
                  <Text style={OTPVerifyStyle.resendText}>{label.resend}</Text>
                </Pressable>
              </View>
            ) : (
              <Text style={OTPVerifyStyle.resendCountdown}>
                {label.resendcodein}
                {':  '}
                <Text style={OTPVerifyStyle.resendTime}>
                  {formatTime(seconds)}
                </Text>
              </Text>
            )}
            <ActionButton
              value={label?.verify}
              disabled={otp.length < CELL_COUNT || !!errors.otp}
              onPress={() => navigation.navigate('home')}
              style={OTPVerifyStyle.verifyButton}
            />
          </View>
        </View>
      )}
    </Formik>
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
