import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { media } from 'App/assets/media';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/Utils/style';
import StyledText from 'App/Components/StyledText/StyledText';
import { Palette } from 'App/Theme/Palette';

const NoAutomaticDiscounts = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.conten}>
          <Image source={media.Discount_isActive} style={{ width: rw(50), height: rh(50) }} />
          <View style={{ flexDirection: 'row' }}>
            <StyledText style={styles.txtTitleConten}>
              {t(
                `No automatic discount yet. You can add automatic discount by clicking the link below or         at the top right`,
              )}
            </StyledText>
          </View>
        </View>
        <TouchableOpacity
          style={styles.viewCreateProduct}
          onPress={() => navigation.navigate('CreateAutomaticDiscount')}>
          <Image source={media.Addicon} style={styles.icCreate} />
          <StyledText style={styles.txtCreate}>{t('Create an automatic code')}</StyledText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  conten: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: rw(78),
  },
  txtTitleConten: {
    color: Palette.zaapi3,
    marginTop: rh(15),
    fontWeight: '600',
    fontSize: rh(14),
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  icCreate: {
    width: rw(20),
    height: rh(20),
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
});

export default NoAutomaticDiscounts;
