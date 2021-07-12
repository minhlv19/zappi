import React, { FC, Fragment, memo, useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, InteractionManager } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AddCategoryIcon, AddProductIcon, CloseIcon, ReOrderIcon, SearchIcon, AddIcon } from 'App/assets/svg';
import useBoolean from 'App/Hooks/useBoolean';
import NavigationService from 'App/navigation/NavigationService';
//import ModalChangeSuccess from './ModalChangeSuccess';
import { debounce } from 'lodash';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import {
  setDiscountDisplayFilterAction,
  updateDiscountAsyncAction,
  updateDiscountToCreateAction,
} from 'App/Redux/discount/DiscountActions';
import { DiscountType } from 'App/Types/discount';
import moment from 'moment';
import { Palette } from 'App/Theme/Palette';

interface IProps {
  isDiscountCodes: boolean;
}

const ViewHeaderDiscount: FC<IProps> = ({ isDiscountCodes }) => {
  const { t } = useTranslation();
  const [isShowSearch, showSearch, hideSearch] = useBoolean();
  const [textSearch, setTextSearch] = useState<string>('');
  const dispatch = useDispatch();
  const { displayFilter } = useSelector((state: RootState) => state.discount);

  const handelClearSearch = useCallback(() => {
    updateTextSearch('');
  }, []);

  const goToCreateDiscount = useCallback(() => {
    dispatch(
      updateDiscountToCreateAction({
        validFrom: moment().startOf('day').toDate(),
      }),
    );
    NavigationService.navigate('CreateDiscountScreen');
  }, []);

  const onTextSearchChangeDebounced = useCallback(
    debounce(textSearch => {
      dispatch(setDiscountDisplayFilterAction(displayFilter.type || DiscountType.MANUAL, textSearch));
    }, 1000),
    [],
  );

  const updateTextSearch = (textSearch: string) => {
    setTextSearch(textSearch);
    onTextSearchChangeDebounced(textSearch);
  };

  return (
    <Fragment>
      {!isShowSearch ? (
        <View style={styles.container}>
          <Text style={styles.styleTitleBack}>{t('Discount')}</Text>

          <View style={styles.rightHeader}>
            <TouchableOpacity onPress={showSearch} style={styles.buttonHeader}>
              <SearchIcon />
            </TouchableOpacity>

            <TouchableOpacity onPress={goToCreateDiscount} style={{ marginLeft: 18 }}>
              <AddIcon fill={Palette.white} />
            </TouchableOpacity>
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
              placeholder={t('Search discount')}
              placeholderTextColor="#D6D6D6"
              style={styles.textInput}
            />

            {!!textSearch && (
              <TouchableOpacity onPress={handelClearSearch}>
                <CloseIcon fill="#4B4A4B" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity onPress={hideSearch} style={styles.buttonCancelSearch}>
            <Text style={styles.textCancel}>{t('Cancel')}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/*<ModalChangeSuccess isVisible={isChangeDragDone} onClose={onCloseChangeDrag} />*/}
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

export default memo(ViewHeaderDiscount);
