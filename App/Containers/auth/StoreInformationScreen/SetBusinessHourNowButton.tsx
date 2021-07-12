import React, { ReactElement, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { GenericTouchableProps } from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';
import { RFValue } from 'react-native-responsive-fontsize';
import MaskedView from '@react-native-community/masked-view';
import { Palette } from 'App/Theme/Palette';
import StyledText from 'App/Components/StyledText/StyledText';
import { ClockIcon } from 'App/assets/svg';
import ArrowRightIcon from 'App/assets/icons/ArrowRightIcon.svg';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface SetBusinessHourNowButtonProps extends GenericTouchableProps {
  title: string;
  onPressDisabled?: () => void;
  loading?: boolean;
}

const SetBusinessHourNowButton = (props: SetBusinessHourNowButtonProps): ReactElement => {
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
        <ClockIcon color={Palette.white} width={12} style={styles.buttonIconLeft} />
        <StyledText style={styles.buttonTitle}>{title}</StyledText>
        <ArrowRightIcon color={Palette.white} style={styles.buttonIconRight} />
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    height: rh(24),
  },
  buttonContainerDisabled: {
    padding: 1,
  },
  buttonTitle: {
    color: Palette.white,
    fontSize: rh(12),
  },
  buttonTitleDisabled: {
    color: Palette.white,
  },
  button: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonDisabled: {
    backgroundColor: Palette.white,
    borderRadius: 12,
    width: '100%',
  },
  buttonIconLeft: {
    marginRight: rw(6),
  },
  buttonIconRight: {
    marginLeft: rw(4),
  },
});

export default SetBusinessHourNowButton;
