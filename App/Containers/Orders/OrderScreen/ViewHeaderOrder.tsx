import React, { FC, Fragment, memo, useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, InteractionManager } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AddCategoryIcon, AddProductIcon, CloseIcon, ReOrderIcon, SearchIcon } from 'App/assets/svg';
import useBoolean from 'App/Hooks/useBoolean';
import NavigationService from 'App/navigation/NavigationService';
//import ModalChangeSuccess from './ModalChangeSuccess';
import { debounce } from 'lodash';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderList, searchOrder } from 'App/Redux/order/orderActions';
import { EStatusOrder } from 'App/Types/order';
import { OrderReduxState } from 'App/Redux/order/orderReducer';
import { RootState } from 'App/Redux';

interface IProps {
  index: number;
}

const indexToStatus = (index: number) => {
  switch (index) {
    case 1:
      return EStatusOrder.NEW;
    case 2:
      return EStatusOrder.ACCEPTED;
    case 3:
      return EStatusOrder.COMPLETED;
    case 4:
      return EStatusOrder.REJECTED;
    default:
      return EStatusOrder.NEW;
  }
};

const ViewHeaderOrder: FC<IProps> = ({ index }) => {
  const { t } = useTranslation();
  const [isShowSearch, showSearch, hideSearch] = useBoolean();
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useDispatch();
  const handelClearSearch = useCallback(() => {
    setSearchText('');
    dispatch(fetchOrderList());
  }, []);

  const onTextSearchChangeDebounced = debounce(textSearch => {
    onTextSearchChange(textSearch);
  }, 500);

  const updateTextSearch = (textSearch: string) => {
    setSearchText(textSearch);
    onTextSearchChangeDebounced(textSearch);
  };

  const onTextSearchChange = (e: string) => {
    dispatch(searchOrder(e, indexToStatus(index)));
  };

  useEffect(() => {
    if (searchText.length > 0) {
      dispatch(searchOrder(searchText, indexToStatus(index)));
    }
  }, [index]);

  const onHideSearch = () => {
    hideSearch();
    setSearchText('');
    dispatch(fetchOrderList());
  };
  return (
    <Fragment>
      {!isShowSearch ? (
        <View style={styles.container}>
          <Text style={styles.styleTitleBack}>{t('Orders')}</Text>
          <View style={styles.rightHeader}>
            <TouchableOpacity onPress={showSearch} style={styles.buttonHeader}>
              <SearchIcon />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.viewSearch}>
            <SearchIcon width={14} height={14} fill="#D6D6D6" />
            <TextInput
              autoFocus={isShowSearch}
              value={searchText}
              onChangeText={updateTextSearch}
              placeholder={t('Product, #order, customer name')}
              placeholderTextColor="#D6D6D6"
              style={styles.textInput}
            />

            {searchText.length > 0 && (
              <TouchableOpacity onPress={handelClearSearch}>
                <CloseIcon fill="#4B4A4B" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity onPress={onHideSearch} style={styles.buttonCancelSearch}>
            <Text style={styles.textCancel}>{t('Cancel')}</Text>
          </TouchableOpacity>
        </View>
      )}
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
});

export default memo(ViewHeaderOrder);
