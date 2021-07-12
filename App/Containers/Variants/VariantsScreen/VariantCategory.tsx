import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { VariantReduxState } from 'App/Redux/variant/VariantReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import StyledDropdownSelect from 'App/Components/StyledDropdownSelect/StyledDropdownSelect';
import StyledText from 'App/Components/StyledText/StyledText';
import { deleteVariant, onChangeVariantChoice, setSelectVariantCategories } from 'App/Redux/variant/VariantAction';
import ItemVariantOption from './ItemVariantOption';
import _ from 'lodash';
import StyledTextInput from 'App/Components/StyledTextInput/StyledTextInput';
import { CloseIcon } from 'App/assets/svg';
import useBoolean from 'App/Hooks/useBoolean';
import ModalConfirmDeleteVariant from './ModalConfirmDeleteVariant';
import ButtonSelect from './ButtonSelect';
import { Store } from 'App/Types';
import { useNavigation } from '@react-navigation/core';

interface IProps {
  indexVC: number;
}

const VariantCategory = (props: IProps) => {
  const navigation = useNavigation();
  const { indexVC } = props;
  const dispatch = useDispatch();
  const { variantsSelections, variantsCategoriesDropDown, variantsChoice }: VariantReduxState = useSelector(
    (state: RootState) => state.variant,
  );
  const { productSetType }: Partial<Store> = useSelector((state: RootState) => state.store);
  let [isFnB, setIsFnB] = useState<boolean>();
  useEffect(() => {
    if (isFnB === undefined) {
      setIsFnB(productSetType === 'F&B');
    }
  }, [productSetType]);

  let [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const [isVisibleModalDelete, showModalDelete, hideModeDelete] = useBoolean(false);
  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <StyledText style={styles.textTitle}>Variant Category*</StyledText>

          {variantsSelections.length > 1 && (
            <TouchableOpacity onPress={showModalDelete}>
              <CloseIcon fill="#42A391" width={20} height={20} />
            </TouchableOpacity>
          )}
        </View>
        <StyledDropdownSelect
          dropdownStyle={styles.dropDownVariantCategories}
          style={styles.dropDownSelectVariantCategories}
          options={variantsCategoriesDropDown}
          onSelect={(i, o) => {
            if (isLoaded && o.value !== 'Add') {
              dispatch(setSelectVariantCategories(indexVC, i, o, isFnB));
            }
          }}
          selectedIndex={variantsSelections[indexVC].selectionIndex}
          isShowEditBtn={variantsSelections[indexVC].selectionIndex !== '-1'}
          onClickEditBtn={() => {
            navigation.navigate('VariantCategory', {
              idVariantOption: variantsSelections[indexVC].selectionValue?.value?.id,
              indexVC,
            });
          }}
          isShowEditBtnItem={true}
          onClickEditBtnItem={(index: number) => {
            navigation.navigate('VariantCategory', {
              idVariantOption: variantsCategoriesDropDown[index].value.id,
            });
          }}
          createBtnName={'master variant'}
          onClickAddBtn={() => {
            navigation.navigate('VariantCategory', {});
          }}
        />
        {isFnB && (
          <>
            <StyledText style={styles.textTitle}>Minimum Number of Choices*</StyledText>
            <StyledTextInput
              style={styles.inputText}
              value={variantsChoice[indexVC]?.min}
              onChangeText={e => {
                dispatch(onChangeVariantChoice(indexVC, 'MIN', e));
              }}
            />
            <StyledText style={styles.textTitle}>Maximum Number of Choices*</StyledText>
            <StyledTextInput
              style={styles.inputText}
              value={variantsChoice[indexVC]?.max}
              onChangeText={e => {
                dispatch(onChangeVariantChoice(indexVC, 'MAX', e));
              }}
            />
          </>
        )}
      </View>

      {variantsSelections[indexVC].selectionIndex !== '-1' && <ButtonSelect indexVC={indexVC} />}
      {(isFnB || (!isFnB && variantsSelections.length === 2 && indexVC === 1) || variantsSelections.length === 1) && (
        <ItemVariantOption indexVC={indexVC} isMix={!isFnB && variantsSelections.length === 2 && indexVC === 1} />
      )}

      <ModalConfirmDeleteVariant
        isVisible={isVisibleModalDelete}
        onClose={hideModeDelete}
        onPressYes={() => {
          dispatch(deleteVariant(indexVC));
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: rh(20), backgroundColor: '#fff', marginHorizontal: rw(16) },
  textTitle: { color: '#4B4A4B', fontWeight: '700', fontSize: 14 },
  dropDownSelectVariantCategories: {
    width: Dimensions.get('screen').width - 16 * 2,
    marginTop: rh(18),
    marginBottom: rh(20),
  },
  dropDownVariantCategories: {
    width: Dimensions.get('screen').width - 16 * 2,
  },
  inputText: {
    marginTop: rh(6),
    marginBottom: rh(30),
  },
});

export default memo(VariantCategory);
