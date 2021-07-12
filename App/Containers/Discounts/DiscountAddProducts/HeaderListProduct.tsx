import { Palette } from 'App/Theme/Palette';
import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ModalDropdown from 'react-native-modal-dropdown';

import useBoolean from 'App/Hooks/useBoolean';
import { useTranslation } from 'react-i18next';

import { ArrowDownInStock, InfoIcon, SortIcon } from 'App/assets/svg';
//import ModalFilterProducts from './ModalFilterProducts';
import {
  CategoryFilterEnums,
  CategoryFilterInputParams,
  ProductFilterEnums,
  ProductOrderByEnums,
  Store,
} from 'App/Types';
import { FNB_PRODUCT_SET_TYPE } from 'App/Utils/constants';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import StyledText from 'App/Components/StyledText/StyledText';

const dataFilter = [
  { title: 'All', value: ProductFilterEnums.ALL, isForFnB: true, type: 'PRODUCT' },
  { title: 'In Stock', value: ProductFilterEnums.IN_STOCK, isForFnB: true, type: 'PRODUCT' },
  { title: 'Out Of Stock', value: ProductFilterEnums.OUT_OF_STOCK, isForFnB: true, type: 'PRODUCT' },
  { title: 'All', value: ProductFilterEnums.ALL, isForFnB: false, type: 'PRODUCT' },
  { title: 'Online', value: ProductFilterEnums.ONLINE, isForFnB: false, type: 'PRODUCT' },
  { title: 'Offline', value: ProductFilterEnums.OFFLINE, isForFnB: false, type: 'PRODUCT' },
  { title: 'All', value: CategoryFilterEnums.ALL, type: 'CATEGORY' },
  { title: 'Online', value: CategoryFilterEnums.ONLINE, type: 'CATEGORY' },
  { title: 'Offline', value: CategoryFilterEnums.OFFLINE, type: 'CATEGORY' },
];

interface IProps {
  isProducts: boolean;
  showIsProducts: () => void;
  hideIsProducts: () => void;
  onSelectSort: (orderBy: ProductOrderByEnums) => void;
  onSelectFilter: (filter: ProductFilterEnums | CategoryFilterEnums) => void;
  itemCount: number;
  shouldDisableSelectTabs?: boolean;
  onselectAll: () => void;
}

const HeaderListProduct: FC<IProps> = ({
  isProducts,
  showIsProducts,
  hideIsProducts,
  onSelectSort,
  onSelectFilter,
  itemCount,
  shouldDisableSelectTabs,
  onselectAll,
}) => {
  const { t } = useTranslation();
  const [selectAll, showFilter, hideFilter] = useBoolean(false);
  const [indexFilter, setIndexFilter] = useState<number>(0);
  const [filterOptions, setFilterOptions] = useState<any>([]);
  const store = useSelector((state: RootState) => state.store);
  const displayFilterCategory = useSelector((state: RootState) => state.category.displayFilter);
  const displayFilterProduct = useSelector((state: RootState) => state.product.displayFilter);
  const { isDraggingCategory, isDraggingProduct } = useSelector((state: RootState) => state.appState);

  useEffect(() => {
    let filterOptions = [];
    filterOptions = dataFilter.filter(({ type }) => type === (isProducts ? 'PRODUCT' : 'CATEGORY'));
    if (isProducts) {
      filterOptions = filterOptions.filter(
        ({ isForFnB }) => isForFnB == (store.productSetType == FNB_PRODUCT_SET_TYPE),
      );
    }
    console.log('filterOptions', filterOptions);
    setFilterOptions(filterOptions);
  }, [store]);

  const renderRow = useCallback(
    (option: any) => (
      <View style={styles.renderRow}>
        <Text style={styles.optionText}>{option.title}</Text>
      </View>
    ),
    [],
  );

  const onSelect = useCallback(
    (index: string, option: { title: string; value: ProductFilterEnums }) => {
      setIndexFilter(+index);
      onSelectFilter(option.value);
    },
    [onSelectFilter],
  );

  return (
    <View style={[styles.container, shouldDisableSelectTabs ? { paddingVertical: rh(10) } : {}]}>
      {!shouldDisableSelectTabs && (
        <View style={styles.viewSelect}>
          <LinearGradient
            style={styles.button}
            colors={isProducts ? [Palette.color_54B56F, Palette.color_2B90AB] : ['transparent', 'transparent']}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 1.0 }}>
            <TouchableOpacity onPress={showIsProducts} style={styles.viewButton}>
              <Text style={[styles.textButton, isProducts && styles.textClick]}>{t('Products')}</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            style={styles.button}
            colors={!isProducts ? [Palette.color_54B56F, Palette.color_2B90AB] : ['transparent', 'transparent']}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 1.0 }}>
            <TouchableOpacity onPress={hideIsProducts} style={styles.viewButton}>
              <Text style={[styles.textButton, !isProducts && styles.textClick]}>{t('Categories')}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: rh(20), paddingHorizontal: 15, zIndex: 100 },
  viewSelect: { flexDirection: 'row', alignItems: 'center' },
  button: { height: rh(36), borderRadius: 25, overflow: 'hidden', flex: 1 },
  viewButton: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  textButton: { fontSize: rh(14), fontWeight: '600', color: '#4B4A4B' },
  textClick: { color: '#fff', fontWeight: '700' },
  viewFilter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: rh(15) },
  textAllCate: { color: '#4B4A4B', fontSize: rh(14), fontWeight: '600' },
  textInStock: { color: '#4B4A4B', fontSize: rh(12), fontWeight: '600', marginRight: rw(5) },
  viewDropdown: {
    paddingHorizontal: rw(8),
    height: rh(36),
    backgroundColor: '#fff',
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: rw(0),
      height: rh(1),
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  viewRightFilter: { flexDirection: 'row', alignItems: 'center' },
  txtSelectAll: {
    fontWeight: '600',
    fontSize: rh(14),
    lineHeight: rh(18),
    display: 'flex',
    alignItems: 'center',
    color: Palette.zaapi2,
  },
  dropdownStyle: {
    borderRadius: 12,
    borderColor: Palette.color_42A391,
    backgroundColor: Palette.white,
    borderWidth: 1,
    width: rw(100),
    maxHeight: 100,
  },
  renderRow: { paddingHorizontal: rw(10), paddingVertical: 7 },
  optionText: { fontWeight: '600', color: Palette.zaapi4 },
  bottomMessage: {
    position: 'absolute',
    width: rw(343),
    backgroundColor: '#1CBC7C',
    borderRadius: 12,
    alignSelf: 'center',
    paddingVertical: rh(8),
    paddingLeft: rw(10),
    paddingRight: rw(21),
    flexDirection: 'row',
    right: 0,
    top: 45,
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
    fontWeight: '600',
  },
});

export default memo(HeaderListProduct);
