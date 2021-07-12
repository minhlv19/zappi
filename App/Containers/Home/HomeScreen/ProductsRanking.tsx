import StyledText from 'App/Components/StyledText/StyledText';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import ItemRaking from './Components/ItemRaking';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const ProductsRanking = () => {
  const { t } = useTranslation();

  const renderItem = useCallback(() => <ItemRaking />, []);
  const itemSeparatorComponent = useCallback(() => <View style={styles.itemSeparatorComponent} />, []);
  const listFooterComponent = useCallback(() => <View style={styles.listFooterComponent} />, []);

  return (
    <View style={styles.container}>
      <StyledText style={styles.textHeader}>{t('Product Rankings')}</StyledText>

      <FlatList
        ListFooterComponent={listFooterComponent}
        data={[1, 2, 3]}
        style={styles.flatList}
        ItemSeparatorComponent={itemSeparatorComponent}
        horizontal
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: rh(20) },
  textHeader: { fontSize: rh(16), fontWeight: '700', color: '#4B4A4B', paddingHorizontal: 15 },
  itemSeparatorComponent: { width: rw(7) },
  flatList: { paddingLeft: rw(15) },
  listFooterComponent: { width: rw(50) },
});

export default memo(ProductsRanking);
