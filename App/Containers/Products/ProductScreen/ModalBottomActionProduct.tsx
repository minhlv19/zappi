import React, { FC, Fragment, memo, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, InteractionManager } from 'react-native';
import { useTranslation } from 'react-i18next';

import { PenEditIcon, TrashIcon } from 'App/assets/svg';
import ModalBottomSheet from 'App/Components/Modal/ModalBottomSheet';
import ViewShareSocial from 'App/Containers/Home/HomeScreen/Components/ViewShareSocial';
import StyledText from 'App/Components/StyledText/StyledText';
import ModalConfirmDeleteProduct from './ModalConfirmDeleteProduct';
import useBoolean from 'App/Hooks/useBoolean';
import NavigationService from 'App/navigation/NavigationService';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategoryAsyncAction } from 'App/Redux/category/CategoryActions';
import { RootState } from 'App/Redux';
import { ICreateCategoryRouteParams } from '../CreateCategory';
import { deleteProductAsyncAction } from 'App/Redux/product/ProductActions';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  isProduct?: boolean;
}

const ModalBottomActionProduct: FC<IProps> = ({ isVisible, onClose, isProduct }) => {
  const { t } = useTranslation();
  const [isVisibleDelete, showModalDelete, hideModalDelete] = useBoolean();
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory);
  const selectedProduct = useSelector((state: RootState) => state.product.selectedProduct);

  const handleDelete = useCallback(() => {
    onClose();

    InteractionManager.runAfterInteractions(() => {
      showModalDelete();
    });
  }, [onClose, showModalDelete]);

  const handleEdit = useCallback(() => {
    onClose();

    InteractionManager.runAfterInteractions(() => {
      if (!isProduct) {
        NavigationService.navigate('CreateCategory', { isEditing: true } as ICreateCategoryRouteParams);
      }
    });
  }, [isProduct, onClose]);

  const onConfirmDelete = () => {
    hideModalDelete();
    if (isProduct) {
      if (selectedProduct?.id) {
        dispatch(deleteProductAsyncAction(selectedProduct.id));
      }
    } else {
      if (selectedCategory?.id) {
        dispatch(deleteCategoryAsyncAction(selectedCategory.id));
      }
    }
  };

  return (
    <Fragment>
      <ModalBottomSheet isVisible={isVisible} onClose={onClose}>
        <View style={styles.container}>
          <ViewShareSocial title={isProduct ? t('Share this product') : t('Share this category')} link="aaaa" />

          <View style={styles.viewActions}>
            <TouchableOpacity onPress={handleEdit} style={styles.viewItemAction}>
              <PenEditIcon />
              <StyledText style={styles.textItemAction}>
                {isProduct ? t('Edit this product') : t('Edit this category')}
              </StyledText>
            </TouchableOpacity>
            {!(!isProduct && selectedCategory?.name == 'Other') && (
              <TouchableOpacity onPress={handleDelete} style={styles.viewItemAction}>
                <TrashIcon />
                <StyledText style={styles.textItemAction}>
                  {isProduct ? t('Delete this product') : t('Delete this category')}
                </StyledText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ModalBottomSheet>

      <ModalConfirmDeleteProduct
        isProduct={isProduct}
        isVisible={isVisibleDelete}
        onClose={hideModalDelete}
        onConfirm={onConfirmDelete}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: rh(20) },
  viewActions: { borderTopWidth: 1, borderTopColor: '#F5F5F5', marginTop: rh(20) },
  viewItemAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rh(15),
    paddingHorizontal: rw(15),
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  textItemAction: { fontSize: rh(14), fontWeight: '600', marginLeft: rw(15), flex: 1, color: '#4B4A4B' },
});

export default memo(ModalBottomActionProduct);
