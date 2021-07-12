import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { AppleIcon } from 'App/assets/svg';
import { useTranslation } from 'react-i18next';
import StyledText from 'App/Components/StyledText/StyledText';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const RecentOrder = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <StyledText style={styles.textHeader}>{t('Recent Orders')}</StyledText>

      <View style={styles.viewContent}>
        <AppleIcon width={61} height={61} />

        <View style={styles.viewDetail}>
          <View style={styles.viewDes}>
            <StyledText style={styles.textName}>Producr A Lorem ipsum dolor</StyledText>
            <StyledText style={styles.textOrder}>Order by XXXXX</StyledText>
          </View>

          <StyledText style={styles.textPrice}>333.000 THB</StyledText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: rh(20), paddingHorizontal: 15 },
  textHeader: { fontSize: rh(16), fontWeight: '700', color: '#4B4A4B' },
  viewContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: rw(12),
    paddingVertical: rh(12),
    marginTop: rh(15),
    flexDirection: 'row',
  },
  viewDetail: { paddingLeft: rw(12), flex: 1 },
  textName: { fontSize: 15 },
  textOrder: { fontSize: rh(14), fontWeight: '700', marginTop: rh(3), color: '#4B4A4B' },
  textPrice: { color: '#4B4A4B' },
  viewDes: { flex: 1 },
});

export default memo(RecentOrder);
