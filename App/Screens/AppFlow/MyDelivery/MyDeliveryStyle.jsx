import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../Assets/Assets';
import Scale from '../../../Helper/Responsive';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: Scale(18),
  },
  itemContainer: {
    backgroundColor: Colors.contentBg,
    margin: Scale(8),
    padding: Scale(15),
    borderRadius: Scale(9),
    paddingHorizontal: Scale(20),
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Scale(15),
  },
  shipmentTypeText: {
    fontFamily: Fonts.proximanova_bold,
    color: Colors.Black,
    fontSize: Scale(14),
  },
  shipmentTypeBadge: {
    padding: Scale(5),
    borderRadius: Scale(7),
  },
  shipmentTypeLabel: {
    color: Colors.White,
    fontFamily: Fonts.proximanova_regular,
    fontSize: Scale(12),
  },
  itemDetails: {
    flexDirection: 'row',
    flex: 1,
    marginTop: Scale(10),
    borderBottomWidth: Scale(1),
    borderColor: Colors.Grey100,
    paddingVertical: Scale(10),
  },
  itemDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.5,
    gap: Scale(8),
  },
  iconContainer: {
    backgroundColor: Colors.imgBg,
    padding: Scale(8),
    borderRadius: Scale(5),
  },
  icon: {
    height: Scale(15),
    width: Scale(15),
  },
  detailHeader: {
    fontFamily: Fonts.proximanova_bold,
    fontSize: Scale(14),
    color: Colors.Black,
  },
  detailSubtext: {
    fontFamily: Fonts.proximanova_regular,
    color: Colors.Grey300,
    fontSize: Scale(14),
    marginTop: Scale(3),
  },
  viewDetailsButton: {
    alignSelf: 'center',
    marginTop: Scale(15),
  },
  viewDetailsText: {
    color: Colors.Primary,
    fontFamily: Fonts.proximanova_bold,
    fontSize: Scale(14),
    borderBottomWidth: Scale(1),
    borderBottomColor: Colors.Primary,
    textAlign: 'center',
  },
});
