import { Palette } from 'App/Theme/Palette';
import { getInputBorderColor } from 'App/Utils/style';
import React, { ReactElement, useCallback, useState } from 'react';
import { StyleSheet, Text, TextInputProps, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import StyledText from '../StyledText/StyledText';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import _ from 'lodash';

interface StyledTextInputProps extends TextInputProps {
  errorMessage?: string;
  errorComponent?: ReactElement;
}

const StyledTextInput = (props: StyledTextInputProps): ReactElement => {
  const { errorMessage, errorComponent } = props; //isError using when errorMessage is ReactElement, because if errorMessage is ReactElement, its always true
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <TextInput
        {...props}
        style={[
          styles.styledTextInput,
          props.editable === false ? { backgroundColor: Palette.color_F5F5F5 } : {},
          props.style,
          {
            borderColor: getInputBorderColor(isFocused, !!errorMessage),
          },
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {!_.isEmpty(errorComponent) || !_.isEmpty(errorMessage) ? (
        <StyledText style={styles.errorMessage}>{errorComponent ? errorComponent : errorMessage}</StyledText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  styledTextInput: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Palette.color_D6D6D6,
    paddingLeft: rw(11),
    paddingRight: rw(11),
    fontSize: rh(14),
    minHeight: rh(42),
  },
  errorMessage: {
    color: Palette.error,
    fontSize: rh(14),
    marginTop: rh(2),
    lineHeight: rh(18),
  },
});

export default StyledTextInput;
