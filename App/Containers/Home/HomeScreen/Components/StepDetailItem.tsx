import React, { FC, memo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Palette } from 'App/Theme/Palette';
import StyledText from 'App/Components/StyledText/StyledText';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { DEFAULT_LETTER_SPACING } from 'App/Utils/constants';

interface IProps {
  title: string;
  description: string;
  titleButton?: string;
  iconRightButton?: ReactNode;
  onPressButton?: () => void;
}

const StepDetailItem: FC<IProps> = ({ title, description, titleButton, iconRightButton, onPressButton }) => {
  return (
    <View style={styles.container}>
      <StyledText style={styles.textHeader}>{title}</StyledText>

      <StyledText style={styles.textDesc}>{description}</StyledText>

      {!!titleButton && (
        <View style={styles.viewButton}>
          <LinearGradient
            style={styles.viewButtonShare}
            colors={[Palette.color_54B56F, Palette.color_2B90AB]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 1.0 }}>
            <TouchableOpacity onPress={onPressButton} style={styles.viewContentButton}>
              {!!iconRightButton && <View style={styles.viewIconRight}>{iconRightButton}</View>}
              <StyledText style={styles.textShare}>{titleButton}</StyledText>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: rh(100) },
  textHeader: { color: '#42A391', fontSize: rh(20), fontWeight: '700' },
  textDesc: { color: '#4B4A4B', marginTop: rh(4), fontSize: 14 },
  viewButtonShare: { borderRadius: 20, marginTop: rh(4) },
  viewContentButton: {
    height: rh(26),
    paddingHorizontal: rw(15),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textShare: { fontSize: rh(14), color: '#fff', fontWeight: '400', letterSpacing: rh(14) * DEFAULT_LETTER_SPACING },
  viewButton: { flexDirection: 'row' },
  viewIconRight: { marginRight: rw(5) },
});

export default memo(StepDetailItem);
