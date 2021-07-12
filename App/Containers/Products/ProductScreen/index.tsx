import { useLayout } from '@react-native-community/hooks';
import React, { memo, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import HeaderListProduct from './HeaderListProduct';
import ListProducts from './ListProducts';
import useBoolean from 'App/Hooks/useBoolean';
import HeaderComponent from 'App/Components/Header/HeaderComponent';
import ViewHeaderProduct from './ViewHeaderProduct';
import ListCategories from './ListCategories';
import { ProductOrderByEnums, ProductFilterEnums, Product, Store, CategoryFilterEnums, Category } from 'App/Types';
import ModalBottomActionProduct from './ModalBottomActionProduct';
import { FNB_PRODUCT_SET_TYPE } from 'App/Utils/constants';
import NoProductView from '../NoProductView';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import { searchCategoriesAsyncAction, setCategoryDisplayFilterAction } from 'App/Redux/category/CategoryActions';
import { setProductBottomSheetShowingAction } from 'App/Redux/appState/AppStateActions';
import { searchProductsAsyncAction, setProductDisplayFilterAction } from 'App/Redux/product/ProductActions';
import { useTranslation } from 'react-i18next';
import StyledText from 'App/Components/StyledText/StyledText';
import { Palette } from 'App/Theme/Palette';
import { InfoIcon } from 'App/assets/svg';
import { getStoredProperty } from 'App/Utils/storage';

interface IProductScreenRouteParams {
  category?: Category;
}

const ProductScreen = ({ route }: { route: { params?: IProductScreenRouteParams } }) => {
  const chosenCategory = route.params?.category;

  const { t } = useTranslation();
  const { onLayout, height } = useLayout();
  const [orderBy, setOrderBy] = useState<ProductOrderByEnums>(ProductOrderByEnums.DEFAULT);
  const [filter, setFilter] = useState<ProductFilterEnums>(ProductFilterEnums.ALL);
  const [searchText, setSearchText] = useState<string>('');
  const [isProducts, showIsProducts, hideIsProducts] = useBoolean(true);
  // const [isDrag, toggleIsDrag] = useToggle(true);
  const store = useSelector((state: RootState) => state.store);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilterEnums>(CategoryFilterEnums.ALL);
  const dispatch = useDispatch();
  const displayedCategories = useSelector((state: RootState) => state.category.displayedCategories);
  const { displayedProducts, products } = useSelector((state: RootState) => state.product);
  const { showProductBottomSheet, isDraggingCategory, isDraggingProduct } = useSelector(
    (state: RootState) => state.appState,
  );
  const [didDragCategory, setDidDragCategory] = useState(false);
  const [didDragProduct, setDidDragProduct] = useState(false);

  useEffect(() => {
    if (store.id && isProducts) {
      dispatch(setProductDisplayFilterAction(searchText, filter, orderBy, chosenCategory?.id || ''));
      dispatch(searchProductsAsyncAction(searchText, filter, orderBy, chosenCategory?.id || ''));
    }
  }, [orderBy, filter, searchText, isProducts, chosenCategory]);

  useEffect(() => {
    if (store.id && !isProducts) {
      dispatch(setCategoryDisplayFilterAction(searchText, categoryFilter));
      dispatch(searchCategoriesAsyncAction(searchText, categoryFilter));
    }
  }, [categoryFilter, searchText, isProducts]);

  useEffect(() => {
    if (chosenCategory) {
      showIsProducts();
    }
  }, [chosenCategory]);

  useEffect(() => {
    (async () => {
      setDidDragCategory(!!(await getStoredProperty('didDragCategory')));
      setDidDragProduct(!!(await getStoredProperty('didDragProduct')));
    })();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderComponent
        onLayout={onLayout}
        disabledBack
        styleViewBorder={styles.styleViewBorder}
        hideBackIcon
        styleTitleBack={styles.styleTitleBack}
        titleBack={t('Products')}
        header={
          <ViewHeaderProduct
            isProducts={isProducts}
            onTextSearchChange={setSearchText}
            chosenCategoryName={chosenCategory?.name}
            chosenCategoryId={chosenCategory?.id}
          />
        }
      />

      <View style={[styles.viewContainer, { top: height }]}>
        <HeaderListProduct
          isProducts={isProducts}
          showIsProducts={showIsProducts}
          hideIsProducts={hideIsProducts}
          onSelectSort={orderBy => {
            setOrderBy(orderBy);
          }}
          onSelectFilter={filter => {
            if (isProducts) {
              setFilter(filter as ProductFilterEnums);
            } else {
              setCategoryFilter(filter as CategoryFilterEnums);
            }
          }}
          chosenCategoryName={chosenCategory?.name}
          itemCount={isProducts ? displayedProducts.length : displayedCategories.length}
        />
        {isProducts ? (
          <>
            {products.length ? (
              <ListProducts
                isFnB={store?.productSetType == FNB_PRODUCT_SET_TYPE}
                chosenCategoryName={chosenCategory?.name}
              />
            ) : (
              <NoProductView />
            )}
          </>
        ) : (
          <ListCategories />
        )}
      </View>

      <ModalBottomActionProduct
        isProduct={isProducts}
        isVisible={showProductBottomSheet}
        onClose={() => dispatch(setProductBottomSheetShowingAction(false))}
      />
      {!didDragCategory && isDraggingCategory && (
        <View style={styles.bottomMessage}>
          <InfoIcon fill="#fff" width={16} height={16} style={{ marginRight: rw(7) }} />
          <StyledText style={styles.bottomMessageContent}>
            <StyledText style={styles.importantNotice}>{t('Important')}</StyledText>
            <StyledText>
              {' '}
              {t('Rearranging your categories will change the order in which they are displayed on your store.')}
            </StyledText>
          </StyledText>
        </View>
      )}
      {!didDragProduct && isDraggingProduct && (
        <View style={styles.bottomMessage}>
          <InfoIcon fill="#fff" width={16} height={16} style={{ marginRight: rw(7) }} />
          <StyledText style={styles.bottomMessageContent}>
            <StyledText style={styles.importantNotice}>{t('Important')}</StyledText>
            <StyledText>
              {' '}
              {t('Rearranging your products will change the order in which they are displayed on your store.')}
            </StyledText>
          </StyledText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  styleTitleBack: { fontSize: rh(24), fontWeight: '700', color: '#fff' },
  styleViewBorder: { backgroundColor: 'transparent' },
  viewContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  bottomMessage: {
    position: 'absolute',
    width: rw(343),
    backgroundColor: '#1CBC7C',
    bottom: rh(21),
    zIndex: 100,
    borderRadius: 12,
    alignSelf: 'center',
    paddingVertical: rh(8),
    flexDirection: 'row',
    paddingHorizontal: rw(10),
  },
  importantNotice: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  bottomMessageContent: {
    color: Palette.white,
    fontSize: rh(14),
    lineHeight: rh(16),
    letterSpacing: rh(14) * 0.04,
    paddingRight: rw(10),
  },
});

export default ProductScreen;
