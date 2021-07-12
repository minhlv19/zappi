import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native';
import StyleHeader from 'App/Components/Header/StyleHeader';
import BackIcon from 'App/assets/icons/BackIcon.svg';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/Utils/style';
import { Palette } from 'App/Theme/Palette';
import SavaIcon from 'App/assets/icons/SaveIcon.svg';
import { media } from 'App/assets/media';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import HeaderComponent from 'App/Components/Header/HeaderComponent';
import { useLayout } from '@react-native-community/hooks';

const PaymentReceiptScreen = ({ route, navigation }: any) => {
  const { params } = route;
  const { t } = useTranslation();
  const [markAsPaid, setMarkasPaid] = useState<boolean>();

  const { onLayout, height } = useLayout();

  useEffect(() => {
    setMarkasPaid(false);
  }, [false]);
  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent
        onLayout={onLayout}
        styleViewBorder={styles.styleViewBorder}
        styleTitleBack={styles.styleTitleBack}
        titleBack={'Payment Receipt'}
      />
      <ScrollView style={[styles.viewContainer, { top: height }]}>
        <View style={{ backgroundColor: 'rgb(13,92,245)' }}>
          <Image source={media.ReceiptPayment} style={styles.imagePayment} />
        </View>
        <View style={styles.bottomSection}>
          <StyledButton
            disabled={!markAsPaid}
            title={markAsPaid ? t('Mark as Paid') : t('Mark as Unpaid')}
            style={styles.AddButton}
            onPressDisabled={() => {
              setMarkasPaid(true);
            }}
            onPress={() => {
              setMarkasPaid(false);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  styleTitleBack: { fontSize: rh(24), fontWeight: '700', color: '#fff' },
  styleViewBorder: { backgroundColor: 'transparent' },

  viewContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1,
    overflow: 'hidden',
    backgroundColor: Palette.white,
  },
  viewContent: {
    width: '100%',
    height: '100%',

    alignItems: 'center',
  },
  imagePayment: {
    width: wp('100%'),
    resizeMode: 'stretch',
  },
  bottomSection: {
    marginLeft: 16,
    marginRight: 16,
  },
  AddButton: {
    width: '100%',
    marginTop: 10,
    marginBottom: 34,
    //marginHorizontal:16,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
export default PaymentReceiptScreen;
