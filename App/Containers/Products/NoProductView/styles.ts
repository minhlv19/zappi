import { StyleSheet } from 'react-native';
import { Palette } from 'App/Theme/Palette';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: rw(78),
  },
  txtTitleContent: {
    color: Palette.zaapi3,
    marginTop: rh(15),
    fontWeight: '600',
    fontSize: rh(14),
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  icCreate: {
    width: rw(24),
    height: rh(24),
    resizeMode: 'contain',
  },
  viewCreateProduct: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: rh(28),
  },
  txtCreate: {
    marginLeft: rw(10),
    color: Palette.zaapi2,
    fontSize: rh(14),
    lineHeight: 18,
    display: 'flex',
    alignItems: 'center',
  },
  inlineIcon: {
    marginRight: rw(3),
    marginLeft: rw(3),
    marginTop: -rh(4),
  },
});
