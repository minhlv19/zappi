import { Dimensions, StyleSheet } from 'react-native';
import { Palette } from 'App/Theme/Palette';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.white,
  },
  titleHeaderStyle: {
    fontWeight: 'bold',
    fontSize: RFValue(20, 680),
    marginLeft: rw(20),
    color: Palette.white,
    justifyContent: 'center',
  },
  icLeftHeaderStyle: {
    justifyContent: 'center',
    marginLeft: rw(20),
  },
  styleHeader: {
    position: 'absolute',
    width: wp('100%'),
  },
  content: {
    position: 'absolute',
    marginTop: rh(102),
    backgroundColor: Palette.white,
    width: wp('100'),
    height: heightPercentageToDP('100%'),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: rh(20),
    paddingHorizontal: rw(16),
  },
  formItemTitle: {
    fontWeight: '700',
    fontSize: rh(14),
    marginBottom: rh(6),
    color: Palette.zaapi4,
  },
  addLogoAreaContainer: {
    width: rw(94),
    //alignItems: 'center',
    height: rh(94),
    // borderWidth:1,
    alignItems: 'center',
    alignContent: 'center',
  },
  containerImage: {
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    // marginHorizontal: rw(10),
    // borderWidth:1,
    borderColor: Palette.color_c6c,
    borderStyle: 'dashed',
    // justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  loading: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
  },
  iconAdd: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  formItem: {
    height: rh(18) + 6 + 42 + 30,
    marginTop: rh(30),
  },
  requiredMark: {
    color: Palette.error,
  },
  bottomSection: {
    position: 'absolute',
    //flexDirection: 'column',
    width: screenWidth,
    bottom: 34,
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column-reverse',
    paddingLeft: rw(16),
    paddingRight: rw(16),
  },
  continueButton: {
    width: '100%',
  },
  viewImageholder: {
    justifyContent: 'center',
    borderWidth: 1,
    width: '100%',
    height: '100%',
    borderStyle: 'dashed',
    borderRadius: 10,
    borderColor: Palette.color_E3E3E3,
    backgroundColor: Palette.white,
  },
  txtUpload: {
    textAlign: 'center',
    fontSize: rh(14),
    lineHeight: 18,
    color: Palette.zaapi4,
  },
  viewActions: { flexDirection: 'row', alignItems: 'center' },
  viewButtonEdit: { flex: 1 },
  viewCenter: { width: rw(8) },
  viewDisableCategory: { flexDirection: 'row', justifyContent: 'space-between' },
  textDesc: { color: '#999999', fontWeight: '400', marginTop: rh(3), fontSize: 12 },
  viewContentCategory: { flex: 1 },
  textTitle: { color: '#4B4A4B', fontSize: rh(14), fontWeight: '700' },
});
