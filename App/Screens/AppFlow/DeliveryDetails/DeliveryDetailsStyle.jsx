import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../Assets/Assets';
import Scale from '../../../Helper/Responsive';

export default StyleSheet.create({
  container: {backgroundColor: Colors.White, flex: 1},
  headerText: {
    fontFamily: Fonts.proximanova_bold,
    color: Colors.Grey400,
    fontSize: Scale(16),
    paddingHorizontal: Scale(5),
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Scale(15),
  },
  contentContainer: {paddingHorizontal: Scale(20)},
  shipmentDetailsContainer: {
    padding: Scale(15),
    backgroundColor: Colors.contentBg,
    borderRadius: Scale(9),
    marginTop: Scale(15),
    paddingHorizontal: Scale(18),
  },
  itemHeader: {flexDirection: 'row', alignItems: 'center', gap: Scale(15)},
  shipmentTypeText: {
    fontFamily: Fonts.proximanova_bold,
    color: Colors.Black,
    fontSize: Scale(14),
  },
  shipmentTypeBadge: {
    padding: Scale(5),
    borderRadius: Scale(7),
    paddingHorizontal: Scale(8),
  },
  shipmentTypeLabel: {
    color: Colors.White,
    fontFamily: Fonts.proximanova_regular,
    fontSize: Scale(12),
  },
  agentIdText: {
    marginTop: Scale(10),
    color: Colors.Grey300,
    fontFamily: Fonts.proximanova_regular,
    fontSize: Scale(14),
  },
  textInput: {
    backgroundColor: Colors.White,
    paddingVertical: Scale(5),
    borderRadius: Scale(10),
    marginTop: Scale(8),
    color: Colors.Grey400,
    fontSize: Scale(16),
    paddingHorizontal: Scale(15),
    fontFamily: Fonts.proximanova_regular,
    borderWidth: Scale(0.5),
    borderColor: Colors.Grey100,
  },
  row: {flexDirection: 'row', alignItems: 'center', marginTop: Scale(16)},
  rowItem: {flex: 0.5},
  rowItemHeader: {
    color: Colors.Black,
    fontFamily: Fonts.proximanova_bold,
    fontSize: Scale(14),
  },
  rowItemText: {
    color: Colors.Grey300,
    fontFamily: Fonts.proximanova_regular,
    fontSize: Scale(14),
  },
  shipInfoContainer: {
    padding: Scale(15),
    backgroundColor: Colors.contentBg,
    borderRadius: Scale(9),
    marginTop: Scale(15),
    paddingHorizontal: Scale(18),
  },
  shipInfo1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickDateSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.5,
    gap: Scale(8),
  },
  imgSec: {
    backgroundColor: Colors.imgBg,
    padding: Scale(8),
    borderRadius: Scale(5),
    alignSelf: 'flex-start',
  },
  icon: {height: Scale(18), width: Scale(18)},
  pickUpText: {
    color: Colors.Black,
    fontFamily: Fonts.proximanova_bold,
    fontSize: Scale(14),
  },
  dateTimeText: {
    color: Colors.Grey300,
    fontFamily: Fonts.proximanova_regular,
    fontSize: Scale(14),
  },
  shipmentTypeText: {
    fontFamily: Fonts.proximanova_bold,
    color: Colors.Black,
    fontSize: Scale(14),
  },
  shipmentTypeBadge: {
    padding: Scale(5),
    borderRadius: Scale(7),
    paddingHorizontal: Scale(8),
  },
  shipmentTypeLabel: {
    color: Colors.White,
    fontFamily: Fonts.proximanova_regular,
    fontSize: Scale(12),
  },
  pickUp: {
    fontFamily: Fonts.proximanova_bold,
    fontSize: Scale(14),
    color: Colors.Black,
  },
  pickUpData: {
    fontFamily: Fonts.proximanova_regular,
    fontSize: Scale(14),
    color: Colors.Grey300,
    marginTop: Scale(3),
  },
  pickupLocation: {
    borderLeftWidth: 1,
    borderStyle: 'dashed',
    paddingBottom: Scale(30),
    paddingHorizontal: Scale(30),
  },
  dot: {
    position: 'absolute',
    height: Scale(12),
    width: Scale(12),
  },
  bottomButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: Scale(10),
    marginTop: Scale(30),
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: Scale(20),
  },
});
