import React, { FC, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Palette } from 'App/Theme/Palette';
import LinearGradient from 'react-native-linear-gradient';
import { ProductFilterEnums, ProductOrderByEnums } from 'App/Types';
import { useTranslation } from 'react-i18next';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface IProps {}
const HeaderListOrder = ({
  index,

  New,
  Accepted,
  Completed,
  Rejected,
}: {
  index: number;
  New: any;
  Accepted: any;
  Completed: any;
  Rejected: any;
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.viewSelect}>
        <LinearGradient
          style={styles.button}
          colors={index === 1 ? [Palette.color_54B56F, Palette.color_2B90AB] : ['transparent', 'transparent']}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}>
          <TouchableOpacity onPress={New} style={styles.viewButton}>
            <Text style={[styles.textButton, index === 1 && styles.textClick]}>{t('New')}</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          style={styles.button}
          colors={index === 2 ? [Palette.color_54B56F, Palette.color_2B90AB] : ['transparent', 'transparent']}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}>
          <TouchableOpacity onPress={Accepted} style={styles.viewButton}>
            <Text style={[styles.textButton, index === 2 && styles.textClick]}>{t('Accepted')}</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          style={styles.button}
          colors={index === 3 ? [Palette.color_54B56F, Palette.color_2B90AB] : ['transparent', 'transparent']}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}>
          <TouchableOpacity onPress={Completed} style={styles.viewButton}>
            <Text style={[styles.textButton, index === 3 && styles.textClick]}>{t('Completed')}</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          style={styles.button}
          colors={index === 4 ? [Palette.color_54B56F, Palette.color_2B90AB] : ['transparent', 'transparent']}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}>
          <TouchableOpacity onPress={Rejected} style={styles.viewButton}>
            <Text style={[styles.textButton, index == 4 && styles.textClick]}>{t('Rejected')}</Text>
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
export default HeaderListOrder;
