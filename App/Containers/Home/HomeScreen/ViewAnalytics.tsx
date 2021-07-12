import StyledText from 'App/Components/StyledText/StyledText';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ItemAnalytics from './Components/ItemAnalytics';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const ViewAnalytics = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <StyledText style={styles.textHeader}>{t('Analytics')}</StyledText>

      <ScrollView horizontal style={styles.flatList}>
        {[{ visitior: false }, { visitior: true }].map((item, index) => (
          <View key={index} style={styles.viewItem}>
            <ItemAnalytics item={item} />
          </View>
        ))}

        <View style={styles.listFooterComponent} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: rh(20) },
  textHeader: { fontSize: rh(16), fontWeight: '700', color: '#4B4A4B', paddingHorizontal: 15 },
  itemSeparatorComponent: { width: rw(7) },
  flatList: { paddingLeft: rw(15) },
  listFooterComponent: { width: rw(50) },
  viewItem: { marginRight: rw(7) },
});

export default memo(ViewAnalytics);
