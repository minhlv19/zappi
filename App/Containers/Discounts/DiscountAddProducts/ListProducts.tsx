import { Product } from 'App/Types';
import React, { memo, useCallback, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import DraggableFlatList, { DragEndParams, RenderItemParams } from 'react-native-draggable-flatlist';
import { setDisplayedProductDataAction } from 'App/Redux/product/ProductActions';
import StyledText from 'App/Components/StyledText/StyledText';
import { Palette } from 'App/Theme/Palette';
import CheckBox_isActive from 'App/assets/icons/Checkbox_isActive.svg';
import CheckBox_Active from 'App/assets/icons/Checkbox_active.svg';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { uniq } from 'lodash';
import { getCategoryImageDefault } from 'App/Utils/image';
import useIsFnb from 'App/Hooks/useIsFnb';

interface IProps {
  selectedProductIds: string[];
  setSelectedProductIds: any;
}

const ListProducts = ({ selectedProductIds, setSelectedProductIds }: IProps) => {
  const displayedProducts = useSelector((state: RootState) => state.product.displayedProducts);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isFnB = useIsFnb();

  const updateSelectedProductIds = (productId: string) => {
    if (selectedProductIds.includes(productId)) {
      setSelectedProductIds(selectedProductIds.filter(id => id != productId));
    } else {
      setSelectedProductIds([...selectedProductIds, productId]);
    }
  };

  const renderItem = ({ item }: RenderItemParams<Product>) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.checkbox} onPress={() => updateSelectedProductIds(item.id || '')}>
          {selectedProductIds.includes(item.id || '') ? (
            <CheckBox_Active width={rw(20)} height={rw(20)} />
          ) : (
            <CheckBox_isActive width={rw(20)} height={rw(20)} />
          )}
        </TouchableOpacity>
        <FastImage
          source={item.photoUrls?.length ? { uri: item.photoUrls[0] } : getCategoryImageDefault(isFnB)}
          resizeMode="cover"
          style={styles.imageItem}
        />

        <View style={styles.viewRight}>
          <View style={styles.viewContent}>
            <View>
              <StyledText style={styles.textNameProduct}>{item.name}</StyledText>
              <StyledText style={styles.textPrice}>{item.unitPrice} THB</StyledText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const itemSeparatorComponent = useCallback(() => <View style={styles.itemSeparatorComponent} />, []);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  const onDragEnd = useCallback(({ data: products }: DragEndParams<Product>) => {
    dispatch(setDisplayedProductDataAction(products));
  }, []);

  const selectAll = () => {
    const newSelectedProductIds = uniq([...selectedProductIds, ...displayedProducts.map(({ id }) => id)]);
    setSelectedProductIds(newSelectedProductIds);
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <StyledText style={styles.txtallProduct}>{`All products (${displayedProducts.length})`}</StyledText>
        <TouchableOpacity onPress={() => selectAll()}>
          <StyledText style={styles.txtAllSelect}>{t('Select All')}</StyledText>
        </TouchableOpacity>
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  flatlist: {},
  itemSeparatorComponent: { height: rh(10) },
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
  container: {
    flexDirection: 'row',
    paddingVertical: rh(12),
    paddingHorizontal: rw(13),
    borderRadius: 12,
    /*shadowColor: Palette.black,
        shadowOffset: {
          width: 1,
          height: 2
        },
        shadowOpacity: 0.15,
        backgroundColor: Palette.white,*/
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
});

export default memo(ListProducts);
