import { useLayout } from '@react-native-community/hooks';
import React, { memo, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { Palette } from 'App/Theme/Palette';
import HeaderComponent from 'App/Components/Header/HeaderComponent';
import AddIcon from 'App/assets/svg/AddIcon';
import { useDispatch, useSelector } from 'react-redux';
import { addVariant, fetchVariantCategoriesAsyncAction, forseSetVariant } from 'App/Redux/variant/VariantAction';
import VariantCategory from './VariantCategory';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import { VariantReduxState } from 'App/Redux/variant/VariantReducer';
import { RootState } from 'App/Redux';
import { ScrollView } from 'react-native-gesture-handler';
import _ from 'lodash';

const VariantsScreen = ({ route, navigation }: any) => {
  const { onLayout, height } = useLayout();
  const dispatch = useDispatch();
  const {
    variantsCategoriesDropDown,
    variantsSelections,
    variantsValueOptions,
    variantsChoice,
    variantsOption,
  }: VariantReduxState = useSelector((state: RootState) => state.variant);
  const [prevVariant, setVariant] = useState<any>();

  useEffect(() => {
    if (_.isEmpty(variantsCategoriesDropDown)) {
      dispatch(fetchVariantCategoriesAsyncAction());
    }
    setVariant([
      _.cloneDeep(variantsSelections),
      _.cloneDeep(variantsValueOptions),
      _.cloneDeep(variantsChoice),
      _.cloneDeep(variantsOption),
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <HeaderComponent
        onLayout={onLayout}
        titleBack="Variants"
        backFunction={() => {
          dispatch(forseSetVariant(prevVariant));
        }}
        rightHeader={
          <TouchableOpacity
            onPress={() => {
              dispatch(addVariant());
            }}
            style={styles.viewButtonRight}>
            <AddIcon fill={Palette.white} />
          </TouchableOpacity>
        }
      />
      <View style={[styles.viewContainer, { top: height }]}>
        <ScrollView>
          {variantsSelections && variantsSelections.map((v: any, i: number) => <VariantCategory key={i} indexVC={i} />)}
        </ScrollView>

        <View style={styles.viewFooter}>
          <StyledButton
            title="Save"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  viewButtonRight: {
    paddingHorizontal: rw(12),
    paddingVertical: rh(10),
  },
  viewContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1,
    overflow: 'hidden',
    backgroundColor: Palette.white,
  },
  scrollView: {},
  viewFooter: {
    paddingBottom: getBottomSpace() || 20,
    paddingHorizontal: rw(15),
    paddingTop: rh(20),
    backgroundColor: '#fff',
  },
});

export default memo(VariantsScreen);
