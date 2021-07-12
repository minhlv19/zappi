import { Dimensions, StyleSheet } from 'react-native';
import { Palette } from 'App/Theme/Palette';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
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
    marginLeft: rw(12),
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
    backgroundColor: Palette.white,
    width: wp('100'),
    marginTop: rh(100),
    height: heightPercentageToDP('100%'),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 16,
    marginBottom: rh(80),
    paddingBottom: rh(60),
    paddingTop: rh(20),
  },
  formItem: {
    // height: rh(18 + 6 + 42 + 30),
  },
  formItemTitle: {
    fontWeight: '700',
    fontSize: rh(14),
    marginBottom: rh(6),
    paddingTop: rh(10),
    color: Palette.zaapi4,
  },
  requiredMark: {
    color: Palette.error,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: rh(20),
    marginTop: rh(30),
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
    height: 24,
    width: 24,
  },
  label: {
    margin: 8,
    fontWeight: '600',
    fontSize: RFValue(14, 680),
    color: Palette.zaapi4,
    lineHeight: 21,
  },
  formItemTitleSwitch: {
    flex: 1,
    fontWeight: '700',
    fontSize: RFValue(14, 680),
  },
  txtsubmake: {
    fontWeight: '400',
    fontSize: RFValue(14, 680),
    color: Palette.grey,
    marginTop: rh(11),
  },
  viewDistance: {
    //width:wp('100%')
    marginBottom: rh(10),
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
  textTitle: { color: '#4B4A4B', fontWeight: '700', fontSize: 14 },
  scrollView: { paddingHorizontal: 15 },
  styleWapper: { marginTop: rh(18) },
  rightIconInput: { flexDirection: 'row', alignItems: 'center' },
  viewPen: { marginRight: rw(14) },
  viewHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  Distance: { flexDirection: 'row' },
  viewInput: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: rh(42),
    margin: 0,
    padding: 0,
    paddingHorizontal: rw(12),
    color: '#4B4A4B',
    fontSize: rh(14),
    flex: 1,
    fontWeight: '600',
  },
  viewRightIcon: { paddingRight: rw(12) },
  txtDistance: {
    fontWeight: '700',
    fontSize: RFValue(14, 680),
    lineHeight: 18,
    marginBottom: rh(10),
  },
  addDistance: {
    width: '58 %',
    //backgroundColor:'#000',
    height: rh(42),
    margin: 0,
    padding: 0,
    paddingHorizontal: rw(14),
    color: '#4B4A4B',
    fontSize: rh(14),
    fontWeight: '600',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
