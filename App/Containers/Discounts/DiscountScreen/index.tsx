import StyledText from 'App/Components/StyledText/StyledText';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { responsiveByHeight as rh } from 'App/Utils/style';
import HeaderComponent from 'App/Components/Header/HeaderComponent';
import { useLayout } from '@react-native-community/hooks';
import ViewHeaderDiscount from 'App/Containers/Discounts/DiscountScreen/HeaderViewDiscount';
import { useTranslation } from 'react-i18next';
import HeaderListDiscount from 'App/Containers/Discounts/DiscountScreen/HeaderListDiscount';
import DiscountCodes from 'App/Containers/Discounts/DiscountCodes/DiscountCodes';

const DiscountScreen = () => {
  const { t } = useTranslation();
  const { onLayout, height } = useLayout();
  return (
    <View style={styles.container}>
      <HeaderComponent
        onLayout={onLayout}
        disabledBack
        styleViewBorder={styles.styleViewBorder}
        hideBackIcon
        styleTitleBack={styles.styleTitleBack}
        titleBack={t('Products')}
        header={<ViewHeaderDiscount isDiscountCodes={true} />}
      />
      <View style={[styles.viewContainer, { top: height }]}>
        <HeaderListDiscount />
        <DiscountCodes />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  styleTitleBack: { fontSize: rh(24), fontWeight: '700', color: '#fff' },
  styleViewBorder: { backgroundColor: 'transparent' },
  viewContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
});
export default DiscountScreen;
