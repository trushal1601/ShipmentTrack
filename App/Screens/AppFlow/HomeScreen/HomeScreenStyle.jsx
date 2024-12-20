import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../Assets/Assets';
import Scale from '../../../Helper/Responsive';

export default StyleSheet.create({
  overlay: {
    backgroundColor: '#36393c',
    flex: 1,
    opacity: 0.6,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  title: {
    fontFamily: Fonts.proximanova_bold,
    color: Colors.Black,
    fontSize: Scale(18),
    paddingBottom: Scale(10),
    marginTop: Scale(20),
  },
  listContainer: {
    backgroundColor: Colors.White,
    padding: Scale(10),
    paddingHorizontal: Scale(25),
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: Scale(1),
    borderRadius: Scale(10),
    // margin: Scale(10),
    marginVertical: Scale(10),
    borderColor: Colors.Grey100,
    padding: Scale(10),
    paddingHorizontal: Scale(15),
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    height: Scale(25),
    width: Scale(25),
    marginRight: Scale(10),
  },
  itemText: {
    fontSize: Scale(15),
    color: Colors.Black,
    fontFamily: Fonts.proximanova_regular,
  },
  radioIcon: {
    height: Scale(25),
    width: Scale(25),
    marginLeft: Scale(10),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Scale(5),
    paddingHorizontal: Scale(20),
    borderBottomWidth: Scale(1),
    borderColor: Colors.Grey100,
    marginTop: Scale(10),
  },
  logo: {
    height: Scale(30),
    width: Scale(60),
    resizeMode: 'contain',
  },
  headerRightContainer: {
    flexDirection: 'row',
    gap: Scale(10),
    alignItems: 'center',
  },
  icon: {
    height: Scale(22),
    width: Scale(22),
    resizeMode: 'contain',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationText: {
    position: 'absolute',
    backgroundColor: 'red',
    color: Colors.White,
    borderRadius: Scale(9),
    paddingHorizontal: Scale(5),
    textAlign: 'center',
    fontSize: Scale(11),
    right: Scale(-3),
    top: Scale(-3),
  },
  homeCardContainer: {
    paddingHorizontal: Scale(15),
    marginTop: Scale(10),
  },
  shipmentLabel: {
    fontSize: Scale(20),
    color: Colors.Grey400,
    fontFamily: Fonts.proximanova_bold,
    paddingHorizontal: Scale(6),
  },
  shipmentList: {
    marginTop: Scale(10),
  },
  shipmentItem: {
    borderRadius: Scale(10),
    padding: Scale(10),
    justifyContent: 'space-between',
    margin: Scale(5),
    alignContent: 'center',
    flex: 1,
  },
  shipmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shipmentCount: {
    fontSize: Scale(24),
    fontFamily: Fonts.proximanova_bold,
    color: Colors.Grey300,
  },
  shipmentStatus: {
    height: Scale(25),
    width: Scale(25),
  },
  shipmentText: {
    fontSize: Scale(16),
    color: Colors.Black,
    fontFamily: Fonts.proximanova_regular,
    width: Scale(90),
  },
  logoutButton: {
    position: 'absolute',
    bottom: Scale(10),
    alignSelf: 'center',
  },
  logoutText: {
    color: Colors.Primary,
    fontFamily: Fonts.proximanova_bold,
    fontSize: Scale(16),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.Primary,
  },
});
