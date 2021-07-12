import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Palette } from 'App/Theme/Palette';
import DropDownPicker from 'react-native-dropdown-picker';
import { RFValue } from 'react-native-responsive-fontsize';
import StyledText from '../StyledText/StyledText';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const renderDropdown = (
  label: string,
  data: { label: string; value: number }[],
  placeHolder: string,
  zIndex: number,
  item: any,
) => {
  return (
    <>
      <DropDownPicker
        zIndex={zIndex}
        items={data}
        placeholder={placeHolder}
        searchable={true}
        searchablePlaceholder="Search"
        searchablePlaceholderTextColor="gray"
        searchableError={() => <StyledText>{'Not found'}</StyledText>}
        containerStyle={{ height: rh(40), marginHorizontal: rw(20), marginTop: rh(10) }}
        style={{
          backgroundColor: Palette.white,
          borderWidth: 0,
          borderBottomWidth: 0.5,
        }}
        selectedLabelStyle={{ color: Palette.black }}
        activeLabelStyle={{ color: Palette.color_ff4 }}
        itemStyle={{
          justifyContent: 'flex-start',
          borderBottomWidth: 0.5,
          borderBottomColor: Palette.color_ccc,
        }}
        placeholderStyle={{
          color: Palette.color_ccc,
          fontSize: RFValue(10, 580),
        }}
        dropDownStyle={{ backgroundColor: Palette.white }}
        onChangeItem={item}
      />
    </>
  );
};

export default renderDropdown;
