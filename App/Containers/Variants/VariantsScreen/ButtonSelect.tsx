import StyledText from 'App/Components/StyledText/StyledText';
import { RootState } from 'App/Redux';
import { variantOption, VariantReduxState } from 'App/Redux/variant/VariantReducer';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import _ from 'lodash';
import { onClickVariantOption } from 'App/Redux/variant/VariantAction';

interface IButtonSelect {
  indexVC: number;
}

function ButtonSelect(props: IButtonSelect) {
  const { variantsOption }: VariantReduxState = useSelector((state: RootState) => state.variant);
  const { indexVC } = props;

  return (
    <View style={styles.VariantOption}>
      <StyledText style={{ fontWeight: '700', fontSize: 14, marginBottom: rh(10) }}>Variant Options</StyledText>
      {_.chunk(variantsOption[indexVC], 3).map((v: variantOption[], i: number) => (
        <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {v.map((item: variantOption, index: number) => (
            <View key={`${i}_${index}`}>
              <BtnVariantStyled
                key={`${i}_${index}`}
                indexVC={indexVC}
                indexItem={i * 3 + index}
                title={item.title}
                isFocus={variantsOption[indexVC][i * 3 + index].isFocus}
                isNullBtn={item.isNull}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

export default ButtonSelect;

interface IBtnVariantStyled {
  title: string;
  indexVC: number;
  indexItem: number;
  isNullBtn?: boolean;
  isFocus?: boolean;
}

const BtnVariantStyled = (props: IBtnVariantStyled) => {
  const { title, isNullBtn, indexVC, indexItem, isFocus } = props;
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => dispatch(onClickVariantOption(indexVC, indexItem))}
      style={[styles.btnStyle, !isNullBtn && styles.borderNormalBtn, isFocus && styles.buttonChecked]}>
      <StyledText style={[styles.textButton, isFocus && styles.textButtonChecked]}>{title}</StyledText>
    </TouchableOpacity>
  );
};
const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  VariantOption: {
    paddingHorizontal: rw(16),
    marginBottom: rh(20),
  },
  borderNormalBtn: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d6d6d6',
  },

  btnStyle: {
    height: rh(42),
    width: (width - 50) / 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rh(10),
  },
  textButton: { color: '#4B4A4B', fontSize: rh(14), fontWeight: '600' },
  buttonChecked: { backgroundColor: '#42A391', borderColor: '#42A391' },
  textButtonChecked: { color: '#fff' },
});
