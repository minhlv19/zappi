import StyledText from 'App/Components/StyledText/StyledText';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import ItemReview from './Components/ItemReview';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const LatestReviews = () => {
  const { t } = useTranslation();
  const itemSeparatorComponent = useCallback(() => <View style={styles.itemSeparatorComponent} />, []);
  const listFooterComponent = useCallback(() => <View style={styles.listFooterComponent} />, []);
  const renderItem = useCallback(() => <ItemReview />, []);

  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <StyledText style={styles.textHeader}>{t('Latest Reviews')}</StyledText>
        <StyledText style={styles.textViewAll}>{t('View All')}</StyledText>
      </View>

      <FlatList
        ListFooterComponent={listFooterComponent}
        ItemSeparatorComponent={itemSeparatorComponent}
        style={styles.flatList}
        horizontal
        data={[1, 2, 3]}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: rh(20) },
  textHeader: { fontSize: rh(16), fontWeight: '700', color: '#4B4A4B' },
  viewHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 },
  textViewAll: { color: '#42A391' },
  itemSeparatorComponent: { width: rw(7) },
  flatList: { paddingLeft: rw(15), marginTop: rh(15) },
  listFooterComponent: { width: rw(50) },
});

export default memo(LatestReviews);
