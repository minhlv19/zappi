import React, { ReactElement, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Palette } from 'App/Theme/Palette';
import { getInputBorderColor, responsiveByHeight as rh, responsiveByWidth as rw } from 'App/Utils/style';
import StyledText from 'App/Components/StyledText/StyledText';
interface StyledTextInputProps extends TextInputProps {
  linktitle: string;
}
const TextLink = (props: StyledTextInputProps): ReactElement => {
  const { linktitle } = props;
  return (
    <View style={styles.textlinkContainer}>
      <StyledText style={styles.txtLinktitle}>{linktitle}</StyledText>
      <TextInput {...props} style={[styles.styledTextInput, props.style]} />
    </View>
  );
};
const styles = StyleSheet.create({
  styledTextInput: {
    flex: 1,
    fontSize: rh(14),
    marginLeft: rw(-4),
    marginBottom: rh(-3),
    color: Palette.zaapi2,
    fontWeight: '600',
  },
  textlinkContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    height: rh(42),
    alignItems: 'center',
    borderColor: Palette.color_D6D6D6,
    paddingLeft: rw(11),
    paddingRight: rw(11),
    borderRadius: 12,
  },
  txtLinktitle: {
    alignItems: 'center',
    fontWeight: '600',
  },
});
export default TextLink;
