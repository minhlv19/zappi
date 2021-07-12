import React, { memo } from 'react';

import _ from 'lodash';
import { ButtonProps } from './types';
import StyledTextInput from 'App/Components/StyledTextInput/StyledTextInput';
import { CloseIcon } from 'App/assets/svg';
import { Palette } from 'App/Theme/Palette';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StyledText from 'App/Components/StyledText/StyledText';
import styles from './styles';
function ButtonFnBComponent(props: ButtonProps) {
  const { value, setValue, onDelete } = props;
  return (
    <>
      <View
        style={{
          position: 'absolute',
          right: 0,
          top: -8,
          zIndex: 1,
          backgroundColor: Palette.zaapi3,
          borderRadius: rw(17) / 2,
          width: rw(17),
          height: rh(17),
        }}>
        <TouchableOpacity onPress={onDelete}>
          <CloseIcon fill={Palette.black} width={rw(17)} height={rh(17)} />
        </TouchableOpacity>
      </View>
      <StyledTextInput value={value} placeholder="Name" onChangeText={setValue} />
    </>
  );
}

function ButtonNonFnBComponent(props: ButtonProps) {
  const { value, isNull, setValue, onDelete, isEditEnable } = props;
  return (
    <>
      {isNull ? (
        <View style={[styles.btnStyle]}></View>
      ) : (
        <>
          {isEditEnable && (
            <View
              style={{
                position: 'absolute',
                right: 0,
                zIndex: 1,
                backgroundColor: Palette.zaapi3,
                borderRadius: rw(14) / 2,
                width: rw(14),
                height: rh(14),
              }}>
              <TouchableOpacity onPress={onDelete}>
                <CloseIcon fill={Palette.black} width={rw(14)} height={rh(14)} />
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity style={[styles.btnStyle]}>
            <View style={{ width: '100%' }}>
              <StyledTextInput onChangeText={setValue} textAlign="center" value={value} />
            </View>
          </TouchableOpacity>
        </>
      )}
    </>
  );
}

interface IAddBtnNonFnBProps {
  onAddItem: () => void;
}

export function AddBtnNonFnB(props: IAddBtnNonFnBProps) {
  const { onAddItem } = props;
  return (
    <>
      <TouchableOpacity
        onPress={onAddItem}
        style={[
          styles.btnStyle,
          {
            borderRadius: 12,
            borderColor: Palette.zaapi2,
            borderWidth: 1,
            borderStyle: 'solid',
          },
        ]}>
        <StyledText style={{ fontWeight: '600', color: Palette.zaapi2, fontSize: 14 }}>+ Add</StyledText>
      </TouchableOpacity>
    </>
  );
}

export const ButtonFnB = memo(ButtonFnBComponent);
export const ButtonNonFnB = memo(ButtonNonFnBComponent);
