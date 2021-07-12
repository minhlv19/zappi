import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: getStatusBarHeight(),
  },
  headerMainCon: {
    height: hp('10%'),
  },
  gradientHeader: {},
});
