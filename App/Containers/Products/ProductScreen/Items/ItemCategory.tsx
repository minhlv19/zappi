import { MoreActionIcon, ReOrderIcon } from 'App/assets/svg';
import React, { FC, memo, useCallback, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, InteractionManager, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';

import SwitchCustom from 'App/Components/Switch/SwitchCustom';
import ModalConfirmOffline from '../ModalConfirmOffline';
import useBoolean from 'App/Hooks/useBoolean';
import ModalBottomActionProduct from '../ModalBottomActionProduct';
import { useTranslation } from 'react-i18next';
import StyledText from 'App/Components/StyledText/StyledText';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { Category, CategoryFilterEnums } from 'App/Types';
import { useDispatch, useSelector } from 'react-redux';
import { setProductBottomSheetShowingAction, toggleAppStateFlag } from 'App/Redux/appState/AppStateActions';
import { setSelectedCategoryAction, updateCategoryAsyncAction } from 'App/Redux/category/CategoryActions';
import { media } from 'App/assets/media';
import { RootState } from 'App/Redux';
import NavigationService from 'App/navigation/NavigationService';
import DataStorage from 'App/Utils/storage';
import { getCategoryImageDefault } from 'App/Utils/image';
import useIsFnb from 'App/Hooks/useIsFnb';

interface IProps {
  drag: () => void;
  category: Category;
}

const ItemCategory: FC<IProps> = ({ drag, category }) => {
  const { t } = useTranslation();
  const [isVisibleConfirm, showModalConfirm, hideModalConfirm] = useBoolean();
  const isDraggingCategory = useSelector((state: RootState) => state.appState.isDraggingCategory);
  const displayFilter = useSelector((state: RootState) => state.category.displayFilter);
  const dispatch = useDispatch();
  const isFnb = useIsFnb();

  const onValueChange = useCallback(
    (valueChange: boolean) => {
      if (valueChange) {
        dispatch(
          updateCategoryAsyncAction({
            id: category.id,
            displayCategoryEnabled: true,
          }),
        );
      } else {
        showModalConfirm();
      }
    },
    [showModalConfirm],
  );

  const onConfirm = useCallback(() => {
    hideModalConfirm();

    InteractionManager.runAfterInteractions(() => {
      dispatch(
        updateCategoryAsyncAction({
          id: category.id,
          displayCategoryEnabled: false,
        }),
      );
    });
  }, [hideModalConfirm]);

  const getProductCountText = (productCount: number) => {
    return `${productCount} ${productCount > 1 ? t('products') : t('product')}`;
  };

  const handleOnLongPress = () => {
    dispatch(toggleAppStateFlag('isDraggingCategory', true));
    if (displayFilter.filter === CategoryFilterEnums.ALL) {
      drag();
    }
    (async () => {
      await DataStorage.save({ key: 'didDragCategory', data: true });
    })();
  };

  return (
    <Pressable
      onPress={() => NavigationService.navigate('ProductInCategoryScreen', { category })}
      onLongPress={handleOnLongPress}
      delayLongPress={isDraggingCategory ? 100 : undefined}>
      <View style={styles.container}>
        <FastImage
          source={
            category.photoUrl
              ? {
                  uri: category.photoUrl,
                }
              : getCategoryImageDefault(isFnb)
          }
          resizeMode="cover"
          style={styles.imageItem}
        />

        <View style={styles.viewRight}>
          <View style={styles.viewContent}>
            <View style={styles.viewContentDesc}>
              <StyledText style={styles.textNameProduct}>{category.name}</StyledText>
              <StyledText style={styles.textPrice}>{getProductCountText(category.productCount ?? 0)}</StyledText>
            </View>

            <TouchableOpacity
              onPress={() => {
                dispatch(setProductBottomSheetShowingAction(true));
                dispatch(setSelectedCategoryAction(category));
              }}>
              <MoreActionIcon />
            </TouchableOpacity>
          </View>

          <View style={styles.viewFooter}>
            <View style={styles.viewSwitch}>
              <StyledText style={styles.textInStock}>
                {category.displayCategoryEnabled ? t('Online') : t('Offline')}
              </StyledText>
              <SwitchCustom onValueChange={onValueChange} value={category.displayCategoryEnabled} />
            </View>
          </View>
        </View>

        <ModalConfirmOffline onConfirm={onConfirm} isVisible={isVisibleConfirm} onClose={hideModalConfirm} />
        {/*<ModalBottomActionProduct isVisible={isVisibleActions} onClose={hideActionsModal} />*/}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: rh(12),
    paddingHorizontal: rw(13),
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowRadius: 8,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 4,
  },
  imageItem: { width: rw(61), height: rh(61), borderRadius: 12 },
  viewContent: { flexDirection: 'row', justifyContent: 'space-between', flex: 1 },
  viewRight: { flex: 1, marginLeft: rw(12), justifyContent: 'space-between' },
  viewFooter: { alignItems: 'flex-end' },
  viewSwitch: { flexDirection: 'row', alignItems: 'center' },
  textInStock: { color: '#4B4A4B', fontSize: rh(12), marginRight: rw(7) },
  textNameProduct: { color: '#4B4A4B', fontSize: 14 },
  textPrice: { color: '#4B4A4B', fontSize: rh(14), marginTop: rh(4) },
  viewContentDesc: { flex: 1 },
  viewDrag: { height: '100%', justifyContent: 'center' },
});

export default memo(ItemCategory);
