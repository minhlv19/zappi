import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Palette } from 'App/Theme/Palette';
import { useTranslation } from 'react-i18next';
import { responsiveByHeight as rh } from 'App/Utils/style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import { DiscountType } from 'App/Types/discount';
import { setDiscountDisplayFilterAction } from 'App/Redux/discount/DiscountActions';

const HeaderListDiscount = () => {
  const { t } = useTranslation();
  const { displayFilter } = useSelector((state: RootState) => state.discount);
  const dispatch = useDispatch();

  const onSelectDiscountType = (type: DiscountType) => {
    dispatch(setDiscountDisplayFilterAction(type, displayFilter.searchText || ''));
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewSelect}>
        <LinearGradient
          style={styles.button}
          colors={
            displayFilter.type == DiscountType.MANUAL
              ? [Palette.color_54B56F, Palette.color_2B90AB]
              : ['transparent', 'transparent']
          }
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}>
          <TouchableOpacity onPress={() => onSelectDiscountType(DiscountType.MANUAL)} style={styles.viewButton}>
            <Text style={[styles.textButton, displayFilter.type == DiscountType.MANUAL && styles.textClick]}>
              {t('Discount Codes')}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          style={styles.button}
          colors={
            displayFilter.type == DiscountType.AUTOMATIC
              ? [Palette.color_54B56F, Palette.color_2B90AB]
              : ['transparent', 'transparent']
          }
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}>
          <TouchableOpacity onPress={() => onSelectDiscountType(DiscountType.AUTOMATIC)} style={styles.viewButton}>
            <Text style={[styles.textButton, displayFilter.type == DiscountType.AUTOMATIC && styles.textClick]}>
              {t('Automatic Discounts')}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { paddingVertical: rh(20), paddingHorizontal: 15 },
  viewSelect: { flexDirection: 'row', alignItems: 'center' },
  button: { height: rh(36), borderRadius: 25, overflow: 'hidden', flex: 1 },
  viewButton: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  textButton: { fontSize: rh(14), fontWeight: '600', color: '#4B4A4B', lineHeight: 17 },
  textClick: { color: '#fff', fontWeight: '700' },
});
export default HeaderListDiscount;
