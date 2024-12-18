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
    padding: 20,
    width: '100%',
  },
  title: {
    fontFamily: Fonts.proximanova_black,
    color: 'white',
    fontSize: Scale(28),
    paddingBottom: 20,
  },
  listContainer: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    borderColor: Colors.Grey100,
    padding: 8,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    height: 35,
    width: 35,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    color: Colors.Black,
  },
  radioIcon: {
    height: 25,
    width: 25,
    marginLeft: 10,
  },
});
