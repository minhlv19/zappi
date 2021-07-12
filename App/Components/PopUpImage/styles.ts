import { Palette } from 'App/Theme/Palette';
import { Platform, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 30 : 10,
  },
  modalContent: {
    width: '90%',
    height: rh(90),
    backgroundColor: Palette.white,
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Palette.color_ccc,
    shadowColor: Palette.black,
    shadowOffset: { width: rw(0), height: rh(1) },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  modalCancel: {
    width: '90%',
    height: rh(50),
    marginTop: rh(10),
    backgroundColor: Palette.white,
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Palette.color_ccc,
    shadowColor: Palette.black,
    shadowOffset: { width: rw(0), height: rh(1) },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  openButton: {
    flex: 1,
    borderTopWidth: 0.5,
    borderTopColor: Palette.color_ccc,
    justifyContent: 'center',
    zIndex: 1,
  },
  openButtonNoLine: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 1,
  },
  textStyle: {
    fontSize: RFValue(15, 580),
    textAlign: 'center',
  },
  option: {
    color: Palette.color_3c8,
  },
  cancel: {
    color: Palette.color_ff2,
    fontWeight: '500',
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
});
