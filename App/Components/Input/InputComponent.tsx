import React, { FC, forwardRef, memo, ReactNode } from 'react';
import { View, Text, StyleSheet, TextInput, TextInputProps, Pressable, StyleProp, ViewStyle } from 'react-native';
import StyledText from '../StyledText/StyledText';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface IProps extends TextInputProps {
  label?: string;
  rightIcon?: ReactNode;
  onPress?: () => void;
  styleWapper?: StyleProp<ViewStyle>;
  children?: ReactNode;
  error?: string;
}

const InputComponent: FC<IProps> = forwardRef<TextInput, IProps>((props, ref) => {
  const { label, rightIcon, onPress, styleWapper, children, error, ...rest } = props;

  return (
    <View style={styleWapper}>
      {!!label && <StyledText style={styles.textLable}>{label}</StyledText>}

      <Pressable onPress={onPress} style={[styles.viewInput, !!error && styles.backgroundError]}>
        <TextInput style={styles.textInput} placeholderTextColor="#D6D6D6" ref={ref} {...rest}>
          {!!children && children}
        </TextInput>

        {!!rightIcon && <View style={styles.viewRightIcon}>{rightIcon}</View>}
      </Pressable>

      {!!error && <StyledText style={styles.textError}>{error}</StyledText>}
    </View>
  );
});

const styles = StyleSheet.create({
  textLable: { fontSize: rh(14), fontWeight: '700', color: '#4B4A4B', marginBottom: rh(6) },
  viewInput: { borderRadius: 12, borderWidth: 1, borderColor: '#D6D6D6', flexDirection: 'row', alignItems: 'center' },
  textInput: {
    height: rh(42),
    margin: 0,
    padding: 0,
    paddingHorizontal: rw(12),
    color: '#4B4A4B',
    fontSize: rh(14),
    flex: 1,
    fontWeight: '600',
  },
  viewRightIcon: { paddingRight: rw(12) },
  textError: { color: '#E51D35', fontWeight: '600', fontSize: rh(13), marginTop: rh(3) },
  backgroundError: { borderColor: '#E51D35' },
});

export default memo(InputComponent);
