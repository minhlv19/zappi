import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import _ from 'lodash';
import HeaderComponent from 'App/Components/Header/HeaderComponent';
import { useLayout } from '@react-native-community/hooks';
import StyledText from 'App/Components/StyledText/StyledText';
import StyledTextInput from 'App/Components/StyledTextInput/StyledTextInput';
import { AddBtnNonFnB, ButtonFnB, ButtonNonFnB } from './ButtonStyle';
import { ButtonProps } from './types';
import { Variant, VariantOption } from 'App/Types';
import { useDispatch, useSelector } from 'react-redux';
import { VariantReduxState } from 'App/Redux/variant/VariantReducer';
import { RootState } from 'App/Redux';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import { requestCreateMasterVariant, requestUpdateMasterVariant } from 'App/Repositories/variant';
import { fetchVariantCategoriesAsyncAction } from 'App/Redux/variant/VariantAction';
import { logError } from 'App/Utils/error';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Palette } from 'App/Theme/Palette';
import { PenEditIcon } from 'App/assets/svg';

const VariantCategory = ({ route, navigation }: any) => {
  const { onLayout, height } = useLayout();
  const { params } = route;
  const { idVariantOption, indexVC } = params;
  const { variantsCategories }: VariantReduxState = useSelector((state: RootState) => state.variant);
  const { productSetType } = useSelector((state: RootState) => state.store);
  const [variantOption, setVariantOption] = useState<ButtonProps[]>();
  const [name, setName] = useState<string>('');
  const [isFnB, setIsFnB] = useState<boolean>();
  const dispatch = useDispatch();
  useEffect(() => {
    if (idVariantOption) {
      let variantSelect = variantsCategories.filter((v: Variant) => v.id === idVariantOption)[0];
      let tmpVariantSelect: ButtonProps[] = [
        ...variantSelect.options.map((v: VariantOption) => ({
          value: v.name,
        })),
        {
          value: '',
          isAdd: true,
        },
      ];
      while (tmpVariantSelect.length % 3 !== 0) {
        tmpVariantSelect.splice(tmpVariantSelect.length, 0, {
          value: '',
          isNull: true,
        });
      }
      setVariantOption(tmpVariantSelect);
      setName(variantSelect.name);
    } else {
      setVariantOption([
        {
          value: '',
        },
        {
          value: '',
        },
        {
          value: '',
        },
        {
          value: '',
          isAdd: true,
        },
      ]);
    }
  }, [idVariantOption]);

  useEffect(() => {
    if (isFnB === undefined) {
      setIsFnB(productSetType === 'F&B');
    }
  }, [productSetType]);
  const onClickAdd = () => {
    if (variantOption) {
      let tmpData = [...variantOption].filter((v: ButtonProps) => !v.isNull);
      tmpData.splice(tmpData.length - 1, 0, {
        value: '',
      });
      while (tmpData.length % 3 !== 0) {
        tmpData.splice(tmpData.length, 0, {
          value: '',
          isNull: true,
        });
      }
      setVariantOption(tmpData);
    }
  };

  const setValue = (i: number) => (e: string) => {
    if (variantOption) {
      let tmpData = [...variantOption];
      tmpData[i].value = e;
      setVariantOption(tmpData);
    }
  };

  const [isEditMode, setIsEditMode] = useState(false);
  const onSave = useCallback(async () => {
    if (variantOption) {
      try {
        let lstVariantOption = [...variantOption].filter((v: ButtonProps) => !v.isAdd && !v.isNull);
        if (idVariantOption) {
          await requestUpdateMasterVariant(
            {
              name,
              options: lstVariantOption.map((v: ButtonProps) => ({
                name: v.value,
                available: true,
              })),
            },
            idVariantOption,
          );
          dispatch(fetchVariantCategoriesAsyncAction(idVariantOption, indexVC));
        } else {
          await requestCreateMasterVariant({
            name,
            options: lstVariantOption.map((v: ButtonProps) => ({
              name: v.value,
              available: true,
            })),
          });
          dispatch(fetchVariantCategoriesAsyncAction());
        }
        navigation.goBack();
      } catch (e) {
        logError(e?.response?.data);
      }
    }
  }, [variantOption, idVariantOption]);

  const onDelete = (i: number) => () => {
    if (variantOption) setVariantOption([...variantOption].filter((v: ButtonProps, index: number) => i !== index));
  };
  return (
    <View style={styles.container}>
      <HeaderComponent onLayout={onLayout} titleBack="Create New Master Variant" />
      <View style={[styles.viewContainer, { top: height }]}>
        <ScrollView style={styles.scrollView}>
          <StyledText style={styles.titleText}>Variant Category*</StyledText>
          <StyledTextInput style={styles.input} onChangeText={setName} value={name} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <StyledText style={styles.titleText}>Variant Options</StyledText>
            {idVariantOption && (
              <TouchableHighlight underlayColor={'transparent'} onPress={() => setIsEditMode(!isEditMode)}>
                {isEditMode ? (
                  <View style={{ height: 20 }}>
                    <StyledText style={{ fontWeight: '600', fontSize: 14, color: Palette.zaapi2 }}>Edit</StyledText>
                  </View>
                ) : (
                  <PenEditIcon fill={Palette.zaapi2} style={{ width: 20, height: 20 }} />
                )}
              </TouchableHighlight>
            )}
          </View>
          <View style={{ marginTop: rh(10) }}>
            {isFnB ? (
              <>
                {variantOption?.map((v: ButtonProps, i: number) => (
                  <View key={i} style={{ marginTop: rh(10) }}>
                    {v.isAdd ? (
                      <TouchableOpacity style={styles.addBtnFnB} onPress={onClickAdd}>
                        <StyledText style={styles.textAddBtn}>
                          {'+  '}
                          Add
                        </StyledText>
                      </TouchableOpacity>
                    ) : (
                      <ButtonFnB
                        onDelete={onDelete(i)}
                        isEditEnable={isEditMode}
                        value={v.value}
                        setValue={setValue(i)}
                      />
                    )}
                  </View>
                ))}
              </>
            ) : (
              <>
                {_.chunk(variantOption, 3).map((v: ButtonProps[], i: number) => (
                  <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {v.map((item: ButtonProps, index: number) => (
                      <View key={`${i}_${index}`}>
                        {item.isAdd ? (
                          <AddBtnNonFnB onAddItem={onClickAdd} />
                        ) : (
                          <ButtonNonFnB
                            isNull={item.isNull}
                            value={item.value}
                            setValue={setValue(i * 3 + index)}
                            onDelete={onDelete(i * 3 + index)}
                            isEditEnable={isEditMode}
                          />
                        )}
                      </View>
                    ))}
                  </View>
                ))}
              </>
            )}
          </View>
        </ScrollView>
        <View style={styles.viewFooter}>
          <StyledButton title="Save" onPress={onSave} />
        </View>
      </View>
    </View>
  );
};

export default VariantCategory;
