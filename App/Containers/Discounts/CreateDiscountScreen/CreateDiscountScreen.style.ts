import { Dimensions, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Palette } from 'App/Theme/Palette';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.white,
  },
  styleHeader: {
    position: 'absolute',
    width: wp('100%'),
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
  content: {
    position: 'absolute',
    backgroundColor: Palette.color_F5F5F5,
    width: wp('100'),
    marginTop: rh(102),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: screenHeight - rh(102),
  },
  viewcontent: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: rh(20),
    paddingHorizontal: rw(16),
    backgroundColor: Palette.white,
    paddingBottom: rh(30),
  },
  viewVariants: {
    marginTop: rh(10),
    backgroundColor: Palette.white,
    paddingVertical: rh(20),
  },
  viewDeliveryFees: {
    marginTop: rh(10),
    paddingHorizontal: rw(16),
    backgroundColor: Palette.white,
    paddingVertical: rh(20),
  },
  addLogoAreaContainer: {
    width: rw(94),
    height: rh(94),
    //alignItems: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  logo: {
    width: rw(94),
    height: rh(94),
    borderRadius: 94 / 2,
  },
  addLogoArea: {
    width: rw(94),
    height: rh(94),
  },
  addLogoAreaText: {
    color: Palette.zaapi4,
    fontWeight: '400',
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
  loading: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
  },

  image: {
    resizeMode: 'contain',
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  iconAdd: {
    width: rw(94),
    height: rh(94),
    resizeMode: 'contain',
  },
  txttitle: {
    fontWeight: 'bold',
    fontSize: RFValue(18, 680),
  },
  formItem: {
    //height: rh(18 + 6 + 42 + 30),
    marginTop: rh(30),
    //backgroundColor: 'red'
  },
  formItemTitle: {
    fontWeight: '700',
    fontSize: rh(14),
    marginBottom: rh(6),
    flex: 1,
  },
  requiredMark: {
    color: Palette.error,
  },
  categoryTypeDropdownSelect: {
    width: screenWidth - rw(16 * 2),
    // minHeight: 52,
  },
  categoryTypeDropdownSelectWithDeletebtn: {
    width: screenWidth - rw(40 + 16 * 2),
  },
  viewAddCate: {
    flexDirection: 'row',
    marginTop: rh(10),
  },
  icAddCategory: {
    marginRight: rw(20),
    marginLeft: rw(4),
  },
  txtAddCategory: {
    color: Palette.zaapi4,
    fontSize: RFValue(14, 680),
  },
  viewPriceStock: {
    flexDirection: 'row',
  },
  txtVariants: {
    color: Palette.zaapi2,
    fontSize: RFValue(18, 680),
    fontWeight: '700',
  },
  btnAddVariants: {
    flexDirection: 'row',

    borderWidth: 1,
    borderColor: Palette.zaapi2,
    width: '50%',
    padding: 10,
    borderRadius: 26,
    justifyContent: 'center',
  },
  txtAddVariants: {
    marginLeft: rw(10),
    color: Palette.zaapi2,
    fontSize: RFValue(14, 680),
  },
  btnAddProduct: {
    marginBottom: rh(30),
    borderWidth: 1,
    borderRadius: 12,
    padding: 11,
    justifyContent: 'center',
    marginTop: rh(20),
    width: '100%',
    alignItems: 'center',
  },
  bottomSection: {
    marginVertical: rh(30),
  },
  styleBtn: {
    flex: 1.0,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: '99%',
    height: '99%',
    margin: 1,
    borderRadius: 12,
    marginBottom: rh(2),
  },
  AddButton: {
    width: '100%',
  },
  styletxt: {
    color: Palette.color_54B56F,
    textAlign: 'center',
  },
  iconAddicon: {
    width: rw(44),
    height: rh(44),
    resizeMode: 'contain',
  },
  txtSubVariants: {
    fontWeight: '600',
    fontSize: rh(14),
    lineHeight: rh(17.6),
    color: Palette.zaapi4,
    marginBottom: rh(14),
    marginTop: rh(11),
  },
  txtLengthTitle: {
    fontSize: rh(14),
    lineHeight: 18,
    display: 'flex',
    color: Palette.grey,
  },
  errorMessage: {
    color: Palette.error,
    fontSize: rh(14),
    marginTop: rh(2),
    lineHeight: 18,
  },
  switchContainer: { flexDirection: 'row', flex: 1 },
  switchContainerText: { maxWidth: (screenWidth * 50) / 100 },
  switchInnerContainer: { justifyContent: 'center', right: 0, position: 'absolute' },
  quantityOfItemsInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: rh(18),
    fontWeight: '700',
  },
  divider: {
    backgroundColor: Palette.color_F5F5F5,
    height: rh(10),
    width: screenWidth,
    marginLeft: -rw(16),
  },
  viewActions: { flexDirection: 'row', alignItems: 'center' },
  viewCenter: { width: rw(8) },
  viewButtonEdit: { flex: 1 },
  productCountText: {
    fontSize: rh(14),
    fontWeight: '600',
    marginTop: rh(20),
    marginLeft: rw(5),
  },
  productSelectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerCountTextContainer: {
    marginTop: rh(20),
    marginLeft: rw(5),
  },
  customerCountText: {
    marginBottom: rh(2),
  },
});
