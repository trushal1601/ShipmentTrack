import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../Assets/Assets';
import Scale from '../../../Helper/Responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: '#36393c',
    flex: 1,
    opacity: 0.6,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    padding: Scale(20),
    width: '100%',
  },
  title: {
    fontFamily: Fonts.proximanova_black,
    color: 'white',
    fontSize: Scale(28),
    paddingBottom: Scale(20),
  },
  listContainer: {
    backgroundColor: Colors.White,
    borderRadius: Scale(10),
    padding: Scale(10),
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: Scale(1),
    borderRadius: Scale(10),
    margin: Scale(10),
    borderColor: Colors.Grey100,
    padding: Scale(8),
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    height: Scale(35),
    width: Scale(35),
    marginRight: Scale(10),
  },
  itemText: {
    fontSize: Scale(16),
    color: Colors.Black,
  },
  radioIcon: {
    height: Scale(25),
    width: Scale(25),
    marginLeft: Scale(10),
  },
});
