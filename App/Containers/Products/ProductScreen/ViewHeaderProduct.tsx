import React, { FC, Fragment, memo, useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, InteractionManager } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AddCategoryIcon, AddProductIcon, BackIcon, CloseIcon, ReOrderIcon, SearchIcon } from 'App/assets/svg';
import useBoolean from 'App/Hooks/useBoolean';
import NavigationService from 'App/navigation/NavigationService';
import ModalChangeSuccess from './ModalChangeSuccess';
import { debounce } from 'lodash';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { useDispatch, useSelector } from 'react-redux';
import { resetConfirmModalData, toggleAppStateFlag, updateConfirmModalData } from 'App/Redux/appState/AppStateActions';
import { reorderCategoryAsyncAction } from 'App/Redux/category/CategoryActions';
import { RootState, RootStateDefault } from 'App/Redux';
import { Category, ConfirmModalStateEnums, ConfirmModalTypeEnums } from 'App/Types';
import StyledText from 'App/Components/StyledText/StyledText';
import { reorderProductAsyncAction } from 'App/Redux/product/ProductActions';

interface IProps {
  isProducts: boolean;
  onTextSearchChange: (textSearch: string) => void;
  chosenCategoryName?: string;
  chosenCategoryId?: string;
}

const ViewHeaderProduct: FC<IProps> = ({ isProducts, onTextSearchChange, chosenCategoryName, chosenCategoryId }) => {
  const { t } = useTranslation();
  const [isShowSearch, showSearch, hideSearch] = useBoolean();
  const [isChangeDragDone, showChangeDragDone, hideChangeDragDone] = useBoolean();
  const [textSearch, setTextSearch] = useState<string>('');
  const dispatch = useDispatch();
  const displayedCategories = useSelector((state: RootState) => state.category.displayedCategories);
  const displayedProducts = useSelector((state: RootState) => state.product.displayedProducts);
  const { isDraggingCategory, isDraggingProduct, confirmModalData } = useSelector((state: RootState) => state.appState);

  const handelClearSearch = useCallback(() => {
    updateTextSearch('');
  }, []);

  const handleHideSearch = useCallback(() => {
    updateTextSearch('');
    hideSearch();
  }, []);

  const handleCreateProduct = useCallback(() => {
    NavigationService.navigate('AddProduct', { chosenCategoryName });
  }, []);

  const handleCreateCate = useCallback(() => {
    NavigationService.navigate('CreateCategory');
  }, []);

  const onTextSearchChangeDebounced = useCallback(
    debounce(textSearch => {
      onTextSearchChange(textSearch);
    }, 1000),
    [],
  );

  const updateTextSearch = (textSearch: string) => {
    setTextSearch(textSearch);
    onTextSearchChangeDebounced(textSearch);
  };

  const onCloseChangeDrag = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      dispatch(toggleAppStateFlag('isDraggingCategory', false));
      hideChangeDragDone();
    });
  }, [hideChangeDragDone]);

  const onConfirmChangeDrag = () => {};

  const finishReordering = () => {
    if (isProducts) {
      const updatedProducts = displayedProducts.map(
        (product, index) =>
          ({
            id: product.id,
            order: index + 1,
            categoryId: chosenCategoryId,
          } as Partial<Category>),
      );

      dispatch(reorderProductAsyncAction(updatedProducts));
      dispatch(toggleAppStateFlag('isDraggingProduct', false));
    } else {
      const updatedCategories = displayedCategories.map(
        (category, index) =>
          ({
            id: category.id,
            order: index + 1,
          } as Partial<Category>),
      );

      dispatch(reorderCategoryAsyncAction(updatedCategories));
      dispatch(toggleAppStateFlag('isDraggingCategory', false));
    }
  };

  const onGoBack = useCallback(() => {
    if (isDraggingProduct) {
      dispatch(
        updateConfirmModalData({
          title: t('You have unsaved changes'),
          subtitle: t('Are you sure you want to exit? All unsaved changes will be lost.'),
          display: true,
          type: ConfirmModalTypeEnums.PRODUCT_REORDER_UNSAVED,
        }),
      );
    } else {
      NavigationService.goBack();
    }
  }, [isDraggingProduct]);

  useEffect(() => {
    if (confirmModalData.type == ConfirmModalTypeEnums.PRODUCT_REORDER_UNSAVED) {
      if (confirmModalData.state == ConfirmModalStateEnums.CONFIRMED) {
        dispatch(toggleAppStateFlag('isDraggingProduct', false));
        dispatch(resetConfirmModalData());
        NavigationService.goBack();
      }
      if (confirmModalData.state == ConfirmModalStateEnums.CANCELLED) {
        dispatch(resetConfirmModalData());
      }
    }
  }, [confirmModalData]);

  return (
    <Fragment>
      {!isShowSearch ? (
        <View style={styles.container}>
          {chosenCategoryName ? (
            <TouchableOpacity onPress={onGoBack} style={styles.backTitleContainer}>
              <BackIcon style={styles.backIcon} />
              <StyledText style={[styles.styleTitleBack, { fontSize: rh(18) }]}>{chosenCategoryName}</StyledText>
            </TouchableOpacity>
          ) : (
            <StyledText style={[styles.styleTitleBack]}>{t('Products')}</StyledText>
          )}

          <View style={styles.rightHeader}>
            {!isDraggingCategory && !isDraggingProduct && !chosenCategoryName && (
              <TouchableOpacity onPress={showSearch} style={styles.buttonHeader}>
                <SearchIcon />
              </TouchableOpacity>
            )}

            {isProducts ? (
              <>
                {isDraggingProduct ? (
                  <TouchableOpacity onPress={finishReordering}>
                    <Text style={styles.textDone}>{t('Done')}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.buttonHeader} onPress={handleCreateProduct}>
                    <AddProductIcon fill="#fff" width={25} height={25} />
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <Fragment>
                {isDraggingCategory ? (
                  <TouchableOpacity onPress={finishReordering}>
                    <Text style={styles.textDone}>{t('Done')}</Text>
                  </TouchableOpacity>
                ) : (
                  <Fragment>
                    <TouchableOpacity onPress={handleCreateCate} style={styles.buttonHeader}>
                      <AddCategoryIcon />
                    </TouchableOpacity>
                  </Fragment>
                )}
              </Fragment>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.viewSearch}>
            <SearchIcon width={14} height={14} fill="#D6D6D6" />
            <TextInput
              autoFocus={isShowSearch}
              value={textSearch}
              onChangeText={updateTextSearch}
              placeholder={t('Search')}
              placeholderTextColor="#D6D6D6"
              style={styles.textInput}
            />

            {!!textSearch && (
              <TouchableOpacity onPress={handelClearSearch}>
                <CloseIcon fill="#4B4A4B" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity onPress={handleHideSearch} style={styles.buttonCancelSearch}>
            <Text style={styles.textCancel}>{t('Cancel')}</Text>
          </TouchableOpacity>
        </View>
      )}

      <ModalChangeSuccess isVisible={isChangeDragDone} onClose={onCloseChangeDrag} onConfirm={onConfirmChangeDrag} />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: rh(36),
  },
  rightHeader: { flexDirection: 'row', alignItems: 'center' },
  buttonHeader: { paddingLeft: rw(15) },
  styleTitleBack: { fontSize: rh(24), fontWeight: '700', color: '#fff' },
  viewSearch: {
    height: rh(36),
    flex: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rw(10),
  },
  textInput: { flex: 1, height: rh(36), margin: 0, padding: 0, color: '#4B4A4B', paddingHorizontal: 7 },
  textCancel: { color: '#fff', fontSize: 14 },
  buttonCancelSearch: { paddingLeft: rw(12), height: rh(36), justifyContent: 'center' },
  textDone: { color: '#fff', fontWeight: '700', fontSize: 18 },
  backIcon: { marginRight: rw(12) },
  backTitleContainer: { flexDirection: 'row', alignItems: 'center' },
});

export default memo(ViewHeaderProduct);
