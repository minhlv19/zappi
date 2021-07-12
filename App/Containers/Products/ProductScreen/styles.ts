import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Palette } from 'App/Theme/Palette';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
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
  icRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: rw(20),
  },
  icSearch: {
    justifyContent: 'center',
    marginRight: rw(10),
  },
  icCreate: {},
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#808080',
    padding: 10,
    margin: 2,
  },
  content: {
    backgroundColor: Palette.white,
    width: wp('100'),
    marginTop: rh(100),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});
