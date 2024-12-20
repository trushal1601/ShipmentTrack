import {Text, TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import {Colors, Fonts, Images} from '../Assets/Assets';
import Scale from '../Helper/Responsive';
import {useNavigation} from '@react-navigation/native';
import {getImageSource} from '../Helper/ImageUri';

export const ActionButton = ({value, onPress, style, textStyle, disabled}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style, disabled && styles.buttonDisabled]}
      disabled={disabled}>
      <Text style={[styles.text, textStyle, disabled && styles.textDisabled]}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};

export const Header = ({header, headerVisible}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{alignSelf: 'flex-start'}}>
        {/* <View style={{backgroundColor: 'green',height:Scale(40),width:Scale(40)}}> */}
        <Image
          source={getImageSource(Images.back_icon)}
          style={styles.backIcon}
          tintColor={Colors.Black}
        />
        {/* </View> */}
      </TouchableOpacity>
      <Text style={styles.headerText} numberOfLines={1}>
        {header}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  //button

  button: {
    backgroundColor: Colors.Primary,
    padding: Scale(10),
    borderRadius: Scale(10),
    paddingVertical: Scale(13),
  },
  buttonDisabled: {
    backgroundColor: Colors.Grey100,
  },
  text: {
    color: Colors.White,
    textAlign: 'center',
    fontSize: Scale(16),
    fontFamily: Fonts.proximanova_regular,
  },
  textDisabled: {
    color: Colors.Grey200,
  },
  //header
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Scale(12),
    // backgroundColor: 'red',
  },
  backIcon: {
    height: Scale(15),
    width: Scale(15),
    margin: Scale(10),
    // backgroundColor: 'red',
  },
  headerText: {
    fontFamily: Fonts.proximanova_bold,
    color: Colors.Black,
    fontSize: Scale(16),
    // backgroundColor: 'red',
  },
});
