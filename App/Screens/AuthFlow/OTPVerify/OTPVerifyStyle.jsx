import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../Assets/Assets";
import Scale from "../../../Helper/Responsive";

export default StyleSheet.create({
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