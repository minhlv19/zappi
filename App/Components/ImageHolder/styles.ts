import { StyleSheet } from 'react-native';
import { Palette } from 'App/Theme/Palette';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

export default StyleSheet.create({
  addLogoAreaContainer: {
    width: '100%',
    //alignItems: 'center',
    marginTop: rh(20),
    marginBottom: rh(30),
  },
  containerImage: {
    height: rh(70),
    width: rw(70),
    marginHorizontal: rw(10),
    borderWidth: 1,
    borderColor: Palette.color_c6c,
    borderStyle: 'dashed',
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
  },
  image: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    resizeMode: 'cover',
  },
  iconAdd: {
    width: rw(94),
    height: rh(94),
    resizeMode: 'contain',
  },
});
