import React, { ReactElement, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Palette } from '../../Theme/Palette';
import LinearGradient from 'react-native-linear-gradient';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { GenericTouchableProps } from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';
import { RFValue } from 'react-native-responsive-fontsize';
import MaskedView from '@react-native-community/masked-view';
import StyledText from '../StyledText/StyledText';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface StyledButtonProps extends GenericTouchableProps {
  title: string;
  onPressDisabled?: () => void;
  loading?: boolean;
}

const StyledButton = (props: StyledButtonProps): ReactElement => {
  const { title, style, loading } = props;

  const onPress = () => {
    if (props.disabled) {
      if (props.onPressDisabled) {
        props.onPressDisabled();
      }
    } else {
      if (props.onPress) {
        props.onPress();
      }
    }
  };

  return (
    <LinearGradient
      style={[styles.buttonContainer, style, props.disabled ? styles.buttonContainerDisabled : {}]}
      colors={[Palette.color_54B56F, Palette.color_2B90AB]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 1.0 }}>
      <TouchableWithoutFeedback
        {...props}
        style={[styles.button, props.disabled ? styles.buttonDisabled : {}]}
        onPress={onPress}
        disabled={false}>
        <View style={[styles.wrapper, { backgroundColor: props.disabled ? 'white' : 'transparent' }]}>
          {props.disabled ? (
            <MaskedView
              maskElement={<StyledText style={[styles.buttonTitle, styles.buttonTitleDisabled]}>{title}</StyledText>}>
              <LinearGradient
                colors={[Palette.color_54B56F, Palette.color_2B90AB]}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 1.0 }}>
                <StyledText style={[styles.buttonTitle, { opacity: 0 }]}>{title}</StyledText>
              </LinearGradient>
            </MaskedView>
          ) : loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <StyledText style={styles.buttonTitle}>{title}</StyledText>
          )}
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    height: rh(42),
    justifyContent: 'center',
  },
  buttonContainerDisabled: {
    padding: 1.5,
  },
  buttonTitle: {
    color: Palette.white,
    fontWeight: 'bold',
    fontSize: RFValue(12, 580),
    textAlign: 'center',
  },
  buttonTitleDisabled: {
    color: Palette.white,
  },
  button: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: Palette.white,
    borderRadius: 12,
    width: '100%',
  },
  wrapper: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 11,
  },
});

export default StyledButton;
