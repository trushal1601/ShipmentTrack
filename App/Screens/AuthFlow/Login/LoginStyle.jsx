import { StyleSheet } from "react-native";
import { Colors,Fonts } from "../../../Assets/Assets";
import Scale from "../../../Helper/Responsive";

export default  StyleSheet.create({
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
    infoText: {
      color: Colors.Grey200,
      fontSize: Scale(14),
      marginTop: Scale(5),
      fontFamily: Fonts.proximanova_regular,
    },
    buttonContainer: {
      marginTop: Scale(20),
    },
  });