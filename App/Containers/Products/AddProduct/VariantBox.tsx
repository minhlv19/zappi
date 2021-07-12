import { useNavigation } from '@react-navigation/native';
import StyledText from 'App/Components/StyledText/StyledText';
import { RootState } from 'App/Redux';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import AddIconZaapi2 from 'App/assets/icons/iconAddZaapi2.svg';
import { TouchableOpacity, View } from 'react-native';
import { VariantReduxState, variantsSelection, IVariantsValueOptions } from 'App/Redux/variant/VariantReducer';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/Utils/style';
import { Palette } from 'App/Theme/Palette';
import { onChangeVariantValueOptions } from 'App/Redux/variant/VariantAction';
import SwitchCustom from 'App/Components/Switch/SwitchCustom';

interface IVariantBox {
  isFnB?: boolean;
}

export default function VariantBox(props: IVariantBox) {
  const { isFnB } = props;
  const { variantsSelections, variantsChoice, variantsValueOptions }: VariantReduxState = useSelector(
    (state: RootState) => state.variant,
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return variantsValueOptions.length === 0 ? (
    <>
      <StyledText style={styles.txtSubVariants}>
        {t('Add variants if this product comes in multiple versions e.g. sizes or colors.')}
      </StyledText>
      <TouchableOpacity style={styles.btnAddVariants} onPress={() => navigation.navigate('AddVariants')}>
        <AddIconZaapi2 />
        <StyledText style={styles.txtAddVariants}>{t('Add Variants')}</StyledText>
      </TouchableOpacity>
    </>
  ) : (
    <>
      {isFnB ? (
        <>
          {variantsSelections &&
            variantsSelections.map((v: variantsSelection, i: number) => (
              <View key={i}>
                {v.selectionValue && (
                  <>
                    <StyledText style={{ fontWeight: '700', fontSize: 14, marginBottom: rh(8) }}>
                      Variant {i + 1} : {v.selectionValue?.title}{' '}
                      {variantsChoice[i] && (
                        <StyledText style={{ fontWeight: '400' }}>
                          (Choose {`${+variantsChoice[i]?.min} - ` || ''}
                          {+variantsChoice[i]?.max || 0})
                        </StyledText>
                      )}
                    </StyledText>
                    {variantsValueOptions[i] &&
                      variantsValueOptions[i].map((item: IVariantsValueOptions, j: number) => (
                        <View key={`${i}_${j}`}>
                          <View
                            style={{
                              marginBottom: 4,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <StyledText style={{ fontSize: 14, fontWeight: '600', marginBottom: rh(14) }}>
                              {'\u2022' + '    '}
                              {item.title}
                            </StyledText>
                            <View style={{ flexDirection: 'row' }}>
                              <StyledText
                                style={{
                                  fontSize: 14,
                                  fontWeight: '400',
                                  color: Palette.zaapi2,
                                  marginRight: rw(14),
                                }}>
                                +{+item.price[0] || 0} THB
                              </StyledText>
                              <SwitchCustom
                                value={variantsValueOptions[i][j].isAvailable}
                                onValueChange={e => {
                                  dispatch(onChangeVariantValueOptions(i, j, 'AVAILABLE', e));
                                }}
                              />
                            </View>
                          </View>
                        </View>
                      ))}
                  </>
                )}
              </View>
            ))}
        </>
      ) : (
        <>
          {variantsValueOptions.length === 2 ? (
            <View>
              <StyledText style={{ fontWeight: '700', marginBottom: rh(6) }}>
                Variant Name:{' '}
                {variantsSelections
                  .map((v: variantsSelection, i: number) => `${i === 1 ? ' ' : ''}${v.selectionValue?.title}`)
                  .join(',')}
              </StyledText>
              {variantsValueOptions[0].map((v: IVariantsValueOptions, i1: number) => (
                <View key={i1}>
                  {variantsValueOptions[1].map((item: IVariantsValueOptions, index: number) => (
                    <View
                      key={`${i1}_${index}`}
                      style={{ marginTop: rh(10), flexDirection: 'row', justifyContent: 'space-between' }}>
                      <StyledText style={{ fontSize: 14, fontWeight: '600' }}>
                        {'\u2022'}
                        {'   '} {v.title} / {item.title}
                      </StyledText>
                      <StyledText style={{ fontSize: 14, fontWeight: '400', color: Palette.zaapi2 }}>
                        +{item.price[i1]} THB {'\u2022'} {item.numberInStock[i1]} available
                      </StyledText>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ) : (
            <View>
              <StyledText style={{ fontWeight: '700', marginBottom: rh(6) }}>
                Variant Name: {variantsSelections[0].selectionValue?.title}
              </StyledText>
              {variantsValueOptions[0].map((v: IVariantsValueOptions, i1: number) => (
                <View key={i1}>
                  <View style={{ marginTop: rh(10), flexDirection: 'row', justifyContent: 'space-between' }}>
                    <StyledText style={{ fontSize: 14, fontWeight: '600' }}>
                      {'\u2022'}
                      {'   '} {v.title}
                    </StyledText>
                    <StyledText style={{ fontSize: 14, fontWeight: '400', color: Palette.zaapi2 }}>
                      +{v.price[0]} THB {'\u2022'} {v.numberInStock[0]} available
                    </StyledText>
                  </View>
                </View>
              ))}
            </View>
          )}
        </>
      )}
    </>
  );
}
