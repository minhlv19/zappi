import { StyleSheet } from 'react-native';
import { Palette } from 'App/Theme/Palette';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

export default StyleSheet.create({
  viewModal: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // width:widthPercentageToDP('100%'),
    // // backgroundColor:Palette.white,
    // opacity:0.3,

    marginHorizontal: rw(22),
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Palette.black,
    opacity: 0.6,
    zIndex: 0,
  },
  styleActioncontent: {
    flexDirection: 'row',
    marginTop: rh(18),
  },
  contentModal: {
    backgroundColor: Palette.white,
    width: '100%',
    height: rh(173),
    //justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
  },
  txtTitle: {
    fontWeight: '700',
    fontSize: RFValue(16, 680),
    textAlign: 'center',
    color: Palette.black,
  },
  txtSubtitle: {
    fontWeight: '400',
    fontSize: RFValue(14, 680),
    textAlign: 'center',
    color: '#15192050',
    marginTop: rh(10),
  },
  action: {
    flex: 1,
  },
  buttonContainer: {
    borderRadius: 12,
    height: rh(42),
    flex: 1,
  },
  button: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: Palette.white,
    fontWeight: 'bold',
    fontSize: RFValue(12, 580),
    textAlign: 'center',
  },
  buttonTitleDisabled: {
    color: Palette.white,
  },
  btnLeave: {
    borderRadius: 12,
    backgroundColor: Palette.white,
    width: '98%',
    height: '96%',
    // margin:2
    justifyContent: 'center',
  },
});
