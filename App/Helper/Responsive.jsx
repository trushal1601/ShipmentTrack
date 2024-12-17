import {Dimensions, Platform} from 'react-native';
// import {initialWindowMetrics} from 'react-native-safe-area-context';

const SCREEN_HEIGHT = 844;
const SCREEN_WIDTH = 390;

const {height, width} = Dimensions.get('window');

const scaleWidth = width / SCREEN_WIDTH;
const scaleHeight = height / SCREEN_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);
const Scale = (units = 1) => {
  return scale * units;
};
export default Scale;
// const verticalScale = (size) => (height / SCREEN_HEIGHT) * size;
// const horizontalPadding = width < 500 ? Scale(20) : Scale(50);
// export {verticalScale, horizontalPadding};
// export const bottomBariOSHeight = () => {
//   if (Platform.OS === 'android') {
//     return 0;
//   } else {
//     return initialWindowMetrics?.insets.bottom ?? 0;
//   }
// };
// export const statusBariOSHeight = () => {
//   if (Platform.OS === 'android') {
//     return 0;
//   } else {
//     return initialWindowMetrics?.insets.top ?? 0;
//   }
// };
