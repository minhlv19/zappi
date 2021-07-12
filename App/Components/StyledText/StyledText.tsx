import React, { ReactElement } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

const styleFontWeight = (fontWeight?: string, fontFamily?: string) => {
  if (fontFamily) {
    return {
      fontFamily,
    };
  } else {
    switch (fontWeight) {
      case '200':
        return {
          fontFamily: 'SourceSansPro-ExtraLight',
        };
      case '300':
        return {
          fontFamily: 'SourceSansPro-Light',
        };
      case '600':
        return {
          fontFamily: 'SourceSansPro-SemiBold',
        };
      case '700':
        return {
          fontFamily: 'SourceSansPro-Bold',
        };
      case '900':
        return {
          fontFamily: 'SourceSansPro-Black',
        };
      default:
        return {
          fontFamily: 'SourceSansPro-Regular',
        };
    }
  }
};

const StyledText = (props: any): ReactElement => {
  return (
    <Text
      {...props}
      style={[styles.styledText, props.style, styleFontWeight(props?.style?.fontWeight, props?.style?.fontFamily)]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  styledText: {},
});

export default StyledText;
