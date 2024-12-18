import {Text, TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import {Colors, Fonts, Images} from '../Assets/Assets';
import Scale from '../Helper/Responsive';
import {useNavigation} from '@react-navigation/native';
import {getImageSource} from '../Helper/ImageUri';

export const Button = ({value, onPress, style, textStyle, disabled}) => {
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
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{alignSelf: 'flex-start'}}>
          <Image
            source={getImageSource(Images.back_icon)}
            style={styles.backIcon}
            tintColor={Colors.Black}
          />
        </TouchableOpacity>
        {/* {headerVisible ? ( */}
        <Text style={styles.headerText} numberOfLines={1}>
          {header}
        </Text>
        {/* ) : (
          <Text></Text>
        )} */}
      </View>
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
  },
  backIcon: {
    height: Scale(24),
    width: Scale(24),
    margin: Scale(15),
  },
  headerText: {
    fontFamily: Fonts.proximanova_bold,
    color: Colors.Black,
    fontSize: Scale(17),
  },
});
