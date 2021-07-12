import React, { FC, memo, useCallback, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import DraggableFlatList, { DragEndParams, RenderItemParams } from 'react-native-draggable-flatlist';

import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { Category } from 'App/Types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import { setDisplayedCategoryDataAction } from 'App/Redux/category/CategoryActions';
import StyledText from 'App/Components/StyledText/StyledText';
import CheckBox_isActive from 'App/assets/icons/Checkbox_isActive.svg';
import CheckBox_Active from 'App/assets/icons/Checkbox_active.svg';
import FastImage from 'react-native-fast-image';
import { Palette } from 'App/Theme/Palette';
import { useTranslation } from 'react-i18next';
import { getCategoryImageDefault } from 'App/Utils/image';
import useIsFnb from 'App/Hooks/useIsFnb';
import { uniq } from 'lodash';

interface IProps {
  selectedCategoryIds: string[];
  setSelectedCategoryIds: any;
}

const ListCategories = ({ selectedCategoryIds, setSelectedCategoryIds }: IProps) => {
  const { t } = useTranslation();
  const itemSeparatorComponent = useCallback(() => <View style={styles.itemSeparatorComponent} />, []);
  const displayedCategories = useSelector((state: RootState) => state.category.displayedCategories);
  const dispatch = useDispatch();
  const isFnB = useIsFnb();

  const updateSelectedCategoryIds = (categoryId: string) => {
    if (selectedCategoryIds.includes(categoryId)) {
      setSelectedCategoryIds(selectedCategoryIds.filter(id => id != categoryId));
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, categoryId]);
    }
  };

  const getProductCountText = (productCount: number) => {
    return `${productCount} ${productCount > 1 ? t('products') : t('product')}`;
  };
  const renderItem = ({ item }: RenderItemParams<Category>) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.checkbox} onPress={() => updateSelectedCategoryIds(item.id || '')}>
          {selectedCategoryIds.includes(item.id || '') ? (
            <CheckBox_Active width={rw(20)} height={rw(20)} />
          ) : (
            <CheckBox_isActive width={rw(20)} height={rw(20)} />
          )}
        </TouchableOpacity>
        <FastImage
          source={
            item.photoUrl
              ? {
                  uri: item.photoUrl,
                }
              : getCategoryImageDefault(isFnB)
          }
          resizeMode="cover"
          style={styles.imageItem}
        />

        <View style={styles.viewRight}>
          <View style={styles.viewContent}>
            <View>
              <StyledText style={styles.textNameProduct}>{item.name}</StyledText>
              <StyledText style={styles.textPrice}>{getProductCountText(item.productCount ?? 0)}</StyledText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const selectAll = () => {
    const newSelectedProductIds = uniq([...selectedCategoryIds, ...displayedCategories.map(({ id }) => id)]);
    setSelectedCategoryIds(newSelectedProductIds);
  };

  const onDragEnd = useCallback(({ data: categories }: DragEndParams<Category>) => {
    dispatch(setDisplayedCategoryDataAction(categories));
  }, []);
  const keyExtractor = useCallback((item, index) => index.toString(), []);

  return (
    <View>
      <View style={{ flexDirection: 'row', marginBottom: rh(20) }}>
        <StyledText style={styles.txtallProduct}>{`Categories (${displayedCategories.length})`}</StyledText>
        <TouchableOpacity onPress={selectAll}>
          <StyledText>
            <StyledText style={styles.txtAllSelect}>{'Select All'}</StyledText>
          </StyledText>
        </TouchableOpacity>
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  flatlist: {},
  itemSeparatorComponent: { height: rh(10) },
  container: {
    flexDirection: 'row',
    paddingVertical: rh(12),
    paddingHorizontal: rw(13),
    borderRadius: 12,
    // shadowColor: Palette.black,
    // shadowOffset: {
    //   width: 1,
    //   height: 2
    // },
    // shadowOpacity: 0.15,
    backgroundColor: Palette.white,
    //shadowRadius: 2.22,
    // elevation: 3,
    borderWidth: 1,
    borderColor: Palette.color_D6D6D6,
  },
  imageItem: { width: rw(61), height: rh(61), borderRadius: 12 },
  viewContent: { flexDirection: 'row' },
  viewRight: { flex: 1, marginLeft: rw(12) },
  textNameProduct: { color: Palette.zaapi4, fontSize: rh(14) },
  textPrice: { color: Palette.zaapi4, fontSize: rh(14), fontWeight: '600', marginTop: rh(4) },
  checkbox: {
    alignSelf: 'center',
    marginRight: rw(15),
  },
  txtallProduct: {
    fontWeight: '600',
    fontSize: rh(14),
    lineHeight: rh(18),
    display: 'flex',
    alignItems: 'center',
    color: Palette.zaapi4,
    flex: 1,
  },
  txtAllSelect: {
    fontWeight: '600',
    fontSize: rh(14),
    lineHeight: rh(18),
    display: 'flex',
    alignItems: 'center',
    color: Palette.zaapi2,
  },
});

export default memo(ListCategories);
