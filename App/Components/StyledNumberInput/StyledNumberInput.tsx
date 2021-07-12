import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import InputSpinner, { ReactNativeInputSpinnerProps } from 'react-native-input-spinner';
import NumberMinusIcon from 'App/assets/icons/NumberMinusIcon.svg';
import NumberAddIcon from 'App/assets/icons/NumberAddIcon.svg';
import { Palette } from 'App/Theme/Palette';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const StyledNumberInput = (props: ReactNativeInputSpinnerProps): ReactElement => {
  return (
    <InputSpinner
      showBorder={true}
      skin={'clean'}
      shadow={false}
      style={styles.generalStyle}
      buttonStyle={styles.buttonStyle}
      buttonTextStyle={styles.buttonTextStyle}
      buttonTextColor={Palette.zaapi2}
      inputStyle={styles.inputStyle}
      fontSize={rh(14)}
      buttonLeftImage={<NumberMinusIcon />}
      buttonRightImage={<NumberAddIcon />}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  generalStyle: {
    shadowColor: 'transparent',
    borderColor: Palette.color_D6D6D6,
    borderWidth: 1,
    borderRadius: 12,
    width: rw(114),
    height: rh(42),
  },
  buttonStyle: {
    height: rh(42),
  },
  buttonTextStyle: {
    height: rh(42),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    height: rh(42),
  },
});

export default StyledNumberInput;
