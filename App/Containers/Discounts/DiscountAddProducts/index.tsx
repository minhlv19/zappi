import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useLayout } from '@react-native-community/hooks';
import { useTranslation } from 'react-i18next';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/Utils/style';
import useBoolean from 'App/Hooks/useBoolean';
import { Category, CategoryFilterEnums, ProductFilterEnums, ProductOrderByEnums } from 'App/Types';
import { searchProductsAsyncAction, setProductDisplayFilterAction } from 'App/Redux/product/ProductActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import { SearchIcon } from 'App/assets/svg';
import { Palette } from 'App/Theme/Palette';
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BackIcon from 'App/assets/icons/BackIcon.svg';
import StyledText from 'App/Components/StyledText/StyledText';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import HeaderListProduct from 'App/Containers/Discounts/DiscountAddProducts/HeaderListProduct';
import ListProducts from 'App/Containers/Discounts/DiscountAddProducts/ListProducts';
import ListCategories from 'App/Containers/Discounts/DiscountAddProducts/ListCategories';
import { debounce } from 'lodash';
import Header from 'App/Components/Header';
import { DiscountProductAddTypeEnums } from './DiscountAddProducts.type';
import { updateDiscountToCreateAction } from 'App/Redux/discount/DiscountActions';
import { searchCategoriesAsyncAction, setCategoryDisplayFilterAction } from 'App/Redux/category/CategoryActions';
import { BuyXGetYDiscountRule } from 'App/Types/discount';
import NavigationService from 'App/navigation/NavigationService';

interface IProductScreenRouteParams {
  category?: Category;
  type: DiscountProductAddTypeEnums;
  selectedProductIds?: string[];
  selectedCategoryIds?: string[];
}

const getInitialIsProducts = (addType: DiscountProductAddTypeEnums | undefined) => {
  if (addType == DiscountProductAddTypeEnums.APPLIES_TO_SPECIFIC_CATEGORIES) return false;
  return true;
};

const DiscountAddProducts = ({ route }: { route: { params?: IProductScreenRouteParams } }) => {
  const { t } = useTranslation();
  const addType = route.params?.type;
  const navigation = useNavigation();
  const [isProducts, showIsProducts, hideIsProducts] = useBoolean(getInitialIsProducts(addType));
  const [searchText, setSearchText] = useState<string>('');
  const [filter, setFilter] = useState<ProductFilterEnums>(ProductFilterEnums.ALL);
  const [orderBy, setOrderBy] = useState<ProductOrderByEnums>(ProductOrderByEnums.DEFAULT);
  const [textSearch, setTextSearch] = useState<string>('');
  const chosenCategory = route.params?.category;

  const [categoryFilter, setCategoryFilter] = useState<CategoryFilterEnums>(CategoryFilterEnums.ALL);
  const { displayedProducts, products } = useSelector((state: RootState) => state.product);
  const store = useSelector((state: RootState) => state.store);
  const displayedCategories = useSelector((state: RootState) => state.category.displayedCategories);
  const [selectAll, setSelectAll] = useState(false);
  const dispatch = useDispatch();
  const [selectedProductIds, setSelectedProductIds] = useState(route.params?.selectedProductIds || []);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(route.params?.selectedCategoryIds || []);
  const { discountToCreate } = useSelector((state: RootState) => state.discount);

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

  const updateTextSearch = (textSearch: string) => {
    setTextSearch(textSearch);
    onTextSearchChangeDebounced(textSearch);
  };

  const onTextSearchChangeDebounced = useCallback(
    debounce(textSearch => {
      setSearchText(textSearch);
    }, 1000),
    [],
  );

  const onDonePress = () => {
    if (
      addType == DiscountProductAddTypeEnums.APPLIES_TO_SPECIFIC_PRODUCTS ||
      addType == DiscountProductAddTypeEnums.APPLIES_TO_SPECIFIC_CATEGORIES
    ) {
      dispatch(
        updateDiscountToCreateAction({
          applicability: {
            ...discountToCreate.applicability,
            productIds: selectedProductIds,
            categoryIds: selectedCategoryIds,
          } as any,
        }),
      );
    }

    if (addType == DiscountProductAddTypeEnums.CUSTOMER_BUYS_SPECIFIC_PRODUCTS) {
      dispatch(
        updateDiscountToCreateAction({
          rule: {
            ...discountToCreate.rule,
            xProductIds: selectedProductIds,
          } as BuyXGetYDiscountRule,
        }),
      );
    }

    if (addType == DiscountProductAddTypeEnums.CUSTOMER_GETS_SPECIFIC_PRODUCTS) {
      dispatch(
        updateDiscountToCreateAction({
          rule: {
            ...discountToCreate.rule,
            yProductIds: selectedProductIds,
          } as BuyXGetYDiscountRule,
        }),
      );
    }

    NavigationService.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <Header
        title={
          addType == DiscountProductAddTypeEnums.APPLIES_TO_SPECIFIC_CATEGORIES
            ? t('Add Categories')
            : t('Add Products')
        }
        icon={<BackIcon width={20} color={'#ffffff'} onPress={() => navigation.goBack()} />}
        buttonRight={<StyledText style={styles.txtRightHeader}>{t('Done')}</StyledText>}
        onButtonRightPress={onDonePress}
      />
      <ScrollView style={styles.content}>
        <View style={styles.viewSearch}>
          <SearchIcon width={14} height={14} fill="#D6D6D6" />
          <TextInput
            value={textSearch}
            onChangeText={updateTextSearch}
            placeholder={t('Search')}
            placeholderTextColor="#D6D6D6"
            style={styles.textInput}
          />
        </View>
        <View>
          <HeaderListProduct
            isProducts={isProducts}
            showIsProducts={showIsProducts}
            hideIsProducts={hideIsProducts}
            onselectAll={() => selectAll}
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
            itemCount={isProducts ? displayedProducts.length : displayedCategories.length}
            shouldDisableSelectTabs={[
              DiscountProductAddTypeEnums.APPLIES_TO_SPECIFIC_CATEGORIES,
              DiscountProductAddTypeEnums.APPLIES_TO_SPECIFIC_PRODUCTS,
            ].includes(addType!)}
          />
          {isProducts ? (
            <ListProducts selectedProductIds={selectedProductIds} setSelectedProductIds={setSelectedProductIds} />
          ) : (
            <ListCategories selectedCategoryIds={selectedCategoryIds} setSelectedCategoryIds={setSelectedCategoryIds} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },

  viewContainer: {
    backgroundColor: '#F5F5F5',
    width: wp('100'),
    marginTop: rh(100),
    height: heightPercentageToDP('100%'),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
  content: {
    position: 'absolute',
    backgroundColor: Palette.white,
    width: wp('100'),
    marginTop: rh(100),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    height: heightPercentageToDP('100'),
  },

  icLeftHeaderStyle: {
    justifyContent: 'center',
    marginLeft: rw(20),
  },
  styleHeader: {
    position: 'absolute',
    width: wp('100%'),
  },
  txtRightHeader: {
    marginRight: rw(20),
    color: Palette.white,
    fontWeight: '700',
    fontSize: RFValue(18, 680),
  },
  styletitleHeader: {
    marginLeft: 12,
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 23,
    color: Palette.white,
  },
  viewSearch: {
    height: 36,
    flex: 1,
    borderRadius: 12,
    backgroundColor: Palette.color_F5F5F5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rw(10),
  },
  txtLengthCustomer: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    display: 'flex',
    alignItems: 'center',
    color: Palette.zaapi4,
    marginTop: 20,
    marginBottom: 10,
  },
  textInput: { flex: 1, height: rh(36), margin: 0, padding: 0, color: '#4B4A4B', paddingHorizontal: 7 },
});
export default DiscountAddProducts;
