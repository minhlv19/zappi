import StyledText from 'App/Components/StyledText/StyledText';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';

import ItemProductsRanking from './ItemProductsRanking';
import SegmentConponent from './SegmentConponent';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const { width } = Dimensions.get('window');

const ItemRaking = () => {
  const { t } = useTranslation();
  const renderItem = useCallback(({ item }) => <ItemProductsRanking item={item} />, []);
  const itemSeparatorComponent = useCallback(() => <View style={styles.itemSeparatorComponent} />, []);

  return (
    <View style={styles.viewContent}>
      <SegmentConponent data={[`14 ${t('days')}`, t('Last month'), t('All time')]} />
      <StyledText style={styles.textTitle}>{t('Most Revenue')}</StyledText>

      <View style={styles.viewList}>
        <FlatList
          data={[
            {
              image: 'https://www.pasabuyna.com/wp-content/uploads/2020/07/mangoes-chopped-and-fresh.jpg',
              name: 'Product 1',
              price: 'THB 2500',
            },
            {
              image: 'https://www.pasabuyna.com/wp-content/uploads/2020/07/mangoes-chopped-and-fresh.jpg',
              name: 'Product 1',
              price: 'THB 2500',
            },
            {
              image: 'https://www.pasabuyna.com/wp-content/uploads/2020/07/mangoes-chopped-and-fresh.jpg',
              name: 'Product 1',
              price: 'THB 2500',
            },
          ]}
          scrollEnabled={false}
          ItemSeparatorComponent={itemSeparatorComponent}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContent: {
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingVertical: rh(20),
    marginTop: rh(14),
    paddingHorizontal: rw(12),
    width: width - 30,
  },
  textTitle: { marginTop: rh(19), color: '#263238' },
  viewList: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    overflow: 'hidden',
    paddingVertical: rh(15),
    marginTop: rh(10),
  },
  itemSeparatorComponent: { height: rh(8) },
});

export default memo(ItemRaking);
