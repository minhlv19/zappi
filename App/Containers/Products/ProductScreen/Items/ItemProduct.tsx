import { MoreActionIcon } from 'App/assets/svg';
import React, { memo, useCallback, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';

import SwitchCustom from 'App/Components/Switch/SwitchCustom';
import { useTranslation } from 'react-i18next';
import StyledText from 'App/Components/StyledText/StyledText';
import { ConfirmModalStateEnums, ConfirmModalTypeEnums, Product, ProductFilterEnums } from 'App/Types';
import { getProductDisplayStatus } from 'App/Utils/text';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { setSelectedProductAction, updateProductAsyncAction } from 'App/Redux/product/ProductActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetConfirmModalData,
  setProductBottomSheetShowingAction,
  toggleAppStateFlag,
  updateConfirmModalData,
} from 'App/Redux/appState/AppStateActions';
import { RootState, RootStateDefault } from 'App/Redux';
import DataStorage, { getStoredProperty } from 'App/Utils/storage';
import { media } from 'App/assets/media';
import { getCategoryImageDefault } from 'App/Utils/image';

interface IProps {
  drag: () => void;
  product: Product;
  isFnB: boolean;
  chosenCategoryName?: string;
}

const ItemProduct = ({ product, isFnB, drag, chosenCategoryName }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { isDraggingProduct, confirmModalData } = useSelector((state: RootState) => state.appState);
  const displayFilter = useSelector((state: RootState) => state.product.displayFilter);

  const updateProductEnabledChange = useCallback((value: boolean) => {
    let body: Partial<Product> = {
      id: product.id,
    };
    if (isFnB) {
      body.isInStock = value;
    } else {
      body.displayProductEnabled = value;
    }
    dispatch(updateProductAsyncAction(body));
  }, []);

  const onValueChange = useCallback((valueChange: boolean) => {
    if (valueChange || isFnB) {
      updateProductEnabledChange(valueChange);
    } else {
      (async () => {
        if (!!(await getStoredProperty('didTurnOffProductFirstTime'))) {
          updateProductEnabledChange(valueChange);
        } else {
          dispatch(
            updateConfirmModalData({
              title: t('Are you sure you want to turn off this product?'),
              subtitle: t('Turning this product offline will remove it from your store until it is put online again.'),
              display: true,
              type: ConfirmModalTypeEnums.PRODUCT_DISABLE_TOGGLE,
              metadata: {
                productId: product.id,
              },
            }),
          );
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (
      confirmModalData.type == ConfirmModalTypeEnums.PRODUCT_DISABLE_TOGGLE &&
      confirmModalData.metadata?.productId === product.id
    ) {
      if (confirmModalData.state == ConfirmModalStateEnums.CONFIRMED) {
        updateProductEnabledChange(false);
        dispatch(resetConfirmModalData());
        (async () => {
          DataStorage.save({ key: 'didTurnOffProductFirstTime', data: true });
        })();
      }
      if (confirmModalData.state == ConfirmModalStateEnums.CANCELLED) {
        dispatch(resetConfirmModalData());
      }
    }
  }, [confirmModalData]);

  const handleOnLongPress = () => {
    if (!chosenCategoryName) return;
    dispatch(toggleAppStateFlag('isDraggingProduct', true));
    if (displayFilter.filter === ProductFilterEnums.ALL) {
      drag();
    }
    (async () => {
      await DataStorage.save({ key: 'didDragProduct', data: false });
    })();
  };

  return (
    <Pressable
      // onPress={() => NavigationService.navigate('ProductInCategoryScreen', { category })}
      onLongPress={handleOnLongPress}
      delayLongPress={isDraggingProduct ? 100 : undefined}
      style={styles.container}>
      <FastImage
        source={product.photoUrls?.length ? { uri: product.photoUrls[0] } : getCategoryImageDefault(isFnB)}
        resizeMode="cover"
        style={styles.imageItem}
      />

      <View style={styles.viewRight}>
        <View style={styles.viewContent}>
          <View>
            <StyledText style={styles.textNameProduct}>{product.name}</StyledText>
            <StyledText style={styles.textPrice}>{product.unitPrice} THB</StyledText>
          </View>

          <TouchableOpacity
            onPress={() => {
              dispatch(setSelectedProductAction(product));
              dispatch(setProductBottomSheetShowingAction(true));
            }}>
            <MoreActionIcon />
          </TouchableOpacity>
        </View>

        <View style={styles.viewFooter}>
          <View style={styles.viewSwitch}>
            <StyledText style={styles.textInStock}>
              {t(getProductDisplayStatus(product.displayProductEnabled, isFnB))}
            </StyledText>
            <SwitchCustom
              onValueChange={onValueChange}
              value={isFnB ? product.isInStock : product.displayProductEnabled}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rh(12),
    paddingHorizontal: rw(13),
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  imageItem: { width: rw(61), height: rh(61), borderRadius: 12 },
  viewContent: { flexDirection: 'row', justifyContent: 'space-between' },
  viewRight: { flex: 1, marginLeft: rw(12), justifyContent: 'space-between' },
  viewFooter: { alignItems: 'flex-end' },
  viewSwitch: { flexDirection: 'row', alignItems: 'center' },
  textInStock: { color: '#4B4A4B', fontSize: rh(12), marginRight: rw(7) },
  textNameProduct: { color: '#4B4A4B', fontSize: 14 },
  textPrice: { color: '#4B4A4B', fontSize: rh(14), fontWeight: '600', marginTop: rh(4) },
});

export default memo(ItemProduct);
