import { Product } from 'App/Types';
import React, { memo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';

import ItemProduct from './Items/ItemProduct';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import DraggableFlatList, { DragEndParams, RenderItemParams } from 'react-native-draggable-flatlist';
import { setDisplayedProductDataAction } from 'App/Redux/product/ProductActions';

interface IProps {
  isFnB: boolean;
  chosenCategoryName?: string;
}

const ListProducts = ({ isFnB, chosenCategoryName }: IProps) => {
  const displayedProducts = useSelector((state: RootState) => state.product.displayedProducts);
  const dispatch = useDispatch();

  const renderItem = useCallback(
    ({ drag, item }: RenderItemParams<Product>) => (
      <ItemProduct drag={drag} product={item} isFnB={isFnB} chosenCategoryName={chosenCategoryName} />
    ),
    [isFnB],
  );
  const itemSeparatorComponent = useCallback(() => <View style={styles.itemSeparatorComponent} />, []);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  const onDragEnd = useCallback(({ data: products }: DragEndParams<Product>) => {
    dispatch(setDisplayedProductDataAction(products));
  }, []);

  return (
    <DraggableFlatList
      data={displayedProducts}
      ItemSeparatorComponent={itemSeparatorComponent}
      removeClippedSubviews
      windowSize={210}
      renderItem={renderItem}
      style={styles.flatlist}
      keyExtractor={keyExtractor}
      onDragEnd={onDragEnd}
    />
  );
};

const styles = StyleSheet.create({
  flatlist: { paddingHorizontal: 15 },
  itemSeparatorComponent: { height: rh(10) },
});

export default memo(ListProducts);
