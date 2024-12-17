import {Text, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../Assets/Assets';
import Scale from '../Helper/Responsive';
import {useNavigation} from '@react-navigation/native';

export const Button = ({value, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: Colors.Primary,
        padding: Scale(10),
        borderRadius: Scale(10),
        // margin: Scale(10),
        paddingVertical: Scale(13),
      }}>
      <Text
        style={{
          color: Colors.White,
          textAlign: 'center',
          fontSize: Scale(16),
          fontFamily: Fonts.proximanova_regular,
        }}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};
