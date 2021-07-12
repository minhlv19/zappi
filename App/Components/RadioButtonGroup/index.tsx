import React, { useState } from 'react';
import { View, Text, SafeAreaView, Animated, StyleSheet } from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
  ReactNativeRadioFormProps,
} from 'react-native-simple-radio-button';
import { Palette } from 'App/Theme/Palette';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

export interface RadioButtonOption {
  label: string;
  value: string;
}

interface RadioButtonGroupProps extends ReactNativeRadioFormProps {
  radio: RadioButtonOption[];
  onPress: (val: string) => void;
}

const RadioButtonGroup = (props: RadioButtonGroupProps) => {
  const { radio, onPress } = props;

  return (
    <>
      <RadioForm
        radio_props={radio}
        initial={0}
        onPress={onPress}
        buttonColor={Palette.zaapi3}
        selectedButtonColor={Palette.zaapi2}
        labelColor={Palette.zaapi4}
        buttonSize={8}
        buttonOuterSize={20}
        labelStyle={styles.labelStyle}
      />
    </>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    marginLeft: rw(10),
    marginBottom: rh(10),
  },
  buttonStyle: {
    marginBottom: rh(160),
    height: rh(100),
    backgroundColor: 'red',
  },
});

export default RadioButtonGroup;
