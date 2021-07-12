import { Dimensions, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Palette } from 'App/Theme/Palette';
import { RFValue } from 'react-native-responsive-fontsize';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const { height: screenHeight } = Dimensions.get('screen');

export default StyleSheet.create({
  icLeftHeaderStyle: {
    justifyContent: 'center',
    marginLeft: rw(20),
  },
  styleHeader: {
    position: 'absolute',
    width: wp('100%'),
  },
  txtRightHeader: {
    color: Palette.white,
    fontWeight: '700',
    fontSize: RFValue(18, 680),
  },
  content: {
    //position: "absolute",
    backgroundColor: Palette.white,
    width: wp('100'),
    marginTop: -rh(20),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    //height: screenHeight - rh(100),
  },
  icons: {
    width: 16,
    height: 16,
  },
});
