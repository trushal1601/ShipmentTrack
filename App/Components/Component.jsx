import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../Assets/Assets';
import Scale from '../Helper/Responsive';
import {useNavigation} from '@react-navigation/native';

export const Button = ({value, onPress, style, disabled}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style, disabled && styles.buttonDisabled]}
      disabled={disabled}>
      <Text style={[styles.text, disabled && styles.textDisabled]}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});
