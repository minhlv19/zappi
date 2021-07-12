import React, { Dispatch, FC, memo, SetStateAction, useEffect, useState } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import InputComponent from 'App/Components/Input/InputComponent';
import StyledText from 'App/Components/StyledText/StyledText';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import StyledTextInput from 'App/Components/StyledTextInput/StyledTextInput';
import _ from 'lodash';
import SwitchCustom from 'App/Components/Switch/SwitchCustom';
import { VariantReduxState, variantsValueOptions } from 'App/Redux/variant/VariantReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import { onChangeVariantValueOptions } from 'App/Redux/variant/VariantAction';
import { Store } from 'App/Types';

interface IProps {
  indexVC: number;
  isMix: boolean;
}
const ItemVariantOption: FC<IProps> = ({ indexVC, isMix }) => {
  const { variantsValueOptions }: VariantReduxState = useSelector((state: RootState) => state.variant);
  const { productSetType }: Partial<Store> = useSelector((state: RootState) => state.store);

  let [isFnB, setIsFnB] = useState<boolean>();
  useEffect(() => {
    if (isFnB === undefined) {
      setIsFnB(productSetType === 'F&B');
    }
  }, [productSetType]);
  return isMix ? (
    <>
      {variantsValueOptions.length === 2 && (
        <View style={styles.viewSetupVariant}>
          {variantsValueOptions[0].map((v: variantsValueOptions, i1: number) => (
            <View key={i1}>
              <StyledText style={styles.textHeader}>{v.title}</StyledText>
              <HeaderVariantOption isFnB={isFnB} />
              {variantsValueOptions[indexVC] && (
                <>
                  {variantsValueOptions[indexVC].map((v: variantsValueOptions, index: number) => (
                    <>
                      <VariantItem
                        indexVC={indexVC}
                        indexCategory={index}
                        title={v.title}
                        price={v.price[i1] || ''}
                        isAvailable={v.isAvailable}
                        numberInStock={v.numberInStock[i1] || ''}
                        orderOfData={i1}
                        isFnB={isFnB}
                      />
                    </>
                  ))}
                </>
              )}
            </View>
          ))}
        </View>
      )}
    </>
  ) : (
    <>
      {variantsValueOptions[indexVC] && (
        <>
          <View style={styles.viewSetupVariant}>
            <HeaderVariantOption isFnB={isFnB} />
          </View>
          {variantsValueOptions[indexVC].map((v: variantsValueOptions, index: number) => (
            <View style={styles.viewSetupVariant} key={index}>
              <VariantItem
                indexVC={indexVC}
                indexCategory={index}
                title={v.title}
                price={v.price[0]}
                isAvailable={v.isAvailable}
                numberInStock={v.numberInStock[0] || ''}
                isFnB={isFnB}
              />
            </View>
          ))}
        </>
      )}
    </>
  );
};

interface IHeaderVariantOptionProps {
  isFnB?: boolean;
}

const HeaderVariantOption = (props: IHeaderVariantOptionProps) => {
  const { isFnB } = props;
  return (
    <View style={styles.viewHeaderSetup}>
      <View style={styles.viewStepOne}>
        <StyledText style={styles.textHeaderSetup}>Variants</StyledText>
      </View>

      <View style={styles.viewStepTwo}>
        <StyledText style={styles.textHeaderSetup}>Price</StyledText>
      </View>

      <View style={styles.viewStepThree}>
        <StyledText style={styles.textHeaderSetup}>{isFnB ? 'Available' : 'Stock'}</StyledText>
      </View>
    </View>
  );
};
interface VIProps {
  isFnB?: boolean;
  title: string;
  price: string;
  isAvailable: boolean;
  indexVC: number;
  indexCategory: number;
  numberInStock: string;
  orderOfData?: number;
}
const VariantItem = (props: VIProps) => {
  const dispatch = useDispatch();
  const { title, price, isAvailable, indexVC, indexCategory, numberInStock, orderOfData, isFnB } = props;
  return (
    <View style={styles.viewChecked}>
      <View style={[styles.viewStepOne, { paddingRight: rw(10) }]} pointerEvents="none">
        {isFnB ? <StyledTextInput value={title} /> : <StyledText>{title}</StyledText>}
      </View>

      <View style={styles.viewStepTwo}>
        <StyledTextInput
          placeholder="+0"
          value={price + ''}
          onChangeText={e => {
            dispatch(onChangeVariantValueOptions(indexVC, indexCategory, 'PRICE', e, orderOfData));
          }}
        />
      </View>
      <View style={styles.viewStepThree}>
        {isFnB ? (
          <SwitchCustom
            value={isAvailable}
            onValueChange={e => {
              dispatch(onChangeVariantValueOptions(indexVC, indexCategory, 'AVAILABLE', e));
            }}
          />
        ) : (
          <StyledTextInput
            placeholder="+0"
            value={numberInStock + ''}
            onChangeText={e => {
              dispatch(onChangeVariantValueOptions(indexVC, indexCategory, 'STOCK', e, orderOfData));
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewSetupVariant: { paddingHorizontal: rw(16) },
  viewHeaderSetup: { flexDirection: 'row', alignItems: 'center', marginBottom: rh(10) },
  viewStepOne: { width: '60%' },
  viewStepTwo: { width: '23%', paddingRight: rw(10) },
  viewStepThree: { width: '17%' },
  textHeaderSetup: { fontSize: rh(14), color: '#4B4A4B', fontWeight: '700' },
  textTitleChecked: { fontSize: rh(14), color: '#4B4A4B', fontWeight: '600' },
  viewChecked: { flexDirection: 'row', alignItems: 'center', marginTop: rh(10) },
  textHeader: { color: '#42A391', fontSize: rh(18), fontWeight: '700', marginBottom: rh(15) },
});

export default memo(ItemVariantOption);
