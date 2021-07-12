import React, { FC, memo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import DraggableFlatList, { DragEndParams, RenderItemParams } from 'react-native-draggable-flatlist';

import ItemCategory from './Items/ItemCategory';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { Category } from 'App/Types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import { setDisplayedCategoryDataAction } from 'App/Redux/category/CategoryActions';

interface IProps {}

const ListCategories: FC<IProps> = () => {
  const itemSeparatorComponent = useCallback(() => <View style={styles.itemSeparatorComponent} />, []);
  const displayedCategories = useSelector((state: RootState) => state.category.displayedCategories);
  const dispatch = useDispatch();

  const renderItem = useCallback(
    ({ drag, item }: RenderItemParams<Category>) => <ItemCategory drag={drag} category={item} />,
    [],
  );

  const onDragEnd = useCallback(({ data: categories }: DragEndParams<Category>) => {
    dispatch(setDisplayedCategoryDataAction(categories));
  }, []);
  const keyExtractor = useCallback((item, index) => index.toString(), []);

  return (
    <DraggableFlatList
      data={displayedCategories}
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

export default memo(ListCategories);
