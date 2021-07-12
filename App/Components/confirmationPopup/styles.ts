import { Platform, StyleSheet } from 'react-native';
import { Palette } from 'App/Theme/Palette';
import { RFValue } from 'react-native-responsive-fontsize';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    minHeight: 90,
    backgroundColor: Palette.white,
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Palette.color_ccc,
    shadowColor: Palette.black,
    shadowOffset: { width: rw(0), height: rh(1) },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    padding: 24,
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
  txtTitle: {
    textAlign: 'center',
    fontSize: RFValue(16, 680),
    fontWeight: 'bold',
  },
  txtSubTitle: {
    textAlign: 'center',
    fontSize: RFValue(16, 680),
    marginTop: rh(10),
  },
  actionView: {
    flexDirection: 'row',
    marginTop: rh(20),
  },
  actionItem: {
    flex: 1,
    borderWidth: 1,
    height: rh(40),
    borderRadius: 10,
    justifyContent: 'center',
  },
  txtaction: {
    textAlign: 'center',
    fontSize: RFValue(16, 680),
  },
});
