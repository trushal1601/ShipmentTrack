import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../Assets/Assets';
import Scale from '../../../Helper/Responsive';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1,
    marginTop: Scale(22),
  },
  notificationItem: {
    backgroundColor: Colors.contentBg,
    margin: Scale(10),
    marginHorizontal: Scale(20),
    padding: Scale(15),
    borderRadius: Scale(9),
    flexDirection: 'row',
    gap: Scale(10),
  },
  iconContainer: {
    padding: Scale(10),
    backgroundColor: Colors.White,
    alignSelf: 'flex-start',
    borderRadius: Scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: Scale(20),
    width: Scale(20),
  },
  textContainer: {
    flex: 1,
  },
  label: {
    color: Colors.Black,
    fontFamily: Fonts.proximanova_regular,
    fontSize: Scale(14),
  },
  duration: {
    color: Colors.Grey200,
    fontFamily: Fonts.proximanova_regular,
    fontSize: Scale(12),
  },
});
