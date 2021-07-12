import { Dimensions, StyleSheet } from 'react-native';
import { Palette } from 'App/Theme/Palette';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
export default StyleSheet.create({
  container: { flex: 1 },

  viewContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1,
    overflow: 'hidden',
    backgroundColor: Palette.white,
    paddingHorizontal: rw(16),
    paddingTop: 22,
  },
  scrollView: {},
  viewFooter: {
    paddingBottom: getBottomSpace() || 20,
    paddingHorizontal: rw(15),
    paddingTop: rh(20),
    backgroundColor: '#fff',
  },
  titleText: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17.6,
  },
  input: {
    marginTop: rh(6),
    marginBottom: rh(30),
  },
  addBtnFnB: {
    borderStyle: 'solid',
    borderColor: Palette.zaapi2,
    borderWidth: 1,
    paddingVertical: rh(12),
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 12,
  },
  textAddBtn: { fontWeight: '600', fontSize: 14, color: Palette.zaapi2 },
  btnStyle: {
    height: rh(42),
    width: (width - 50) / 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rh(10),
  },
});
