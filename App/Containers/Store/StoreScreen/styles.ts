import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { Palette } from 'App/Theme/Palette';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.color_F5F5F5,
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
  content: {
    //position: "absolute",
    backgroundColor: Palette.color_F5F5F5,
    width: wp('100'),
    marginTop: rh(100),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
  viewScroll: {
    backgroundColor: Palette.color_F5F5F5,
    width: wp('90'),
    marginTop: rh(90),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignSelf: 'center',
  },
  txtLogout: {
    textAlign: 'center',
    color: Palette.zaapi4,
    fontWeight: '600',
    fontSize: RFValue(14, 680),
    marginTop: rh(10),
  },

  viewContent: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute',
    width: '100%',
    backgroundColor: Palette.color_F5F5F5,
  },
  viewShop: { flexDirection: 'row', paddingHorizontal: rw(16), paddingTop: rh(20) },
  viewLogo: {
    width: rw(50),
    height: rh(50),
    borderRadius: 50 / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.zaapi2,
  },
  viewCenterHeader: { flex: 1, paddingHorizontal: rw(15), justifyContent: 'space-around' },
  textNameShop: {
    fontSize: rh(20),
    fontWeight: '700',
    color: Palette.black,
  },
  logo: {
    width: rw(40),
    height: rh(40),
    resizeMode: 'contain',
  },
  viewItems: {
    paddingBottom: rh(20),
    paddingHorizontal: rw(14),
  },
  formItemTitle: {
    fontWeight: '700',
    fontSize: rh(14),
    marginBottom: rh(6),
    marginRight: rw(10),
  },
  itemStyle: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    marginTop: rh(23),
  },
  txttile: {
    flex: 1,
    marginLeft: rw(20),
    color: Palette.zaapi4,
    fontWeight: '600',
    fontSize: RFValue(14, 680),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
