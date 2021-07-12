import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import { media } from 'App/assets/media';
import StyledText from 'App/Components/StyledText/StyledText';
import { useTranslation } from 'react-i18next';
import { Palette } from 'App/Theme/Palette';

const Index = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.containerNoOrder}>
      <Image source={media.Order_isActive} style={{ width: 43, height: 46 }} />
      <StyledText style={styles.txtNoOrder}>{t('No order yet.')}</StyledText>
    </View>
  );
};
const styles = StyleSheet.create({
  containerNoOrder: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    width: '100%',
    height: '100%',
  },
  txtNoOrder: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    display: 'flex',
    alignItems: 'center',
    color: Palette.zaapi3,
    marginTop: 16,
  },
});
export default Index;
