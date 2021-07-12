import { LabelProps } from '@ptomasroos/react-native-multi-slider';
import { useLayout } from '@react-native-community/hooks';
import StyledText from 'App/Components/StyledText/StyledText';
import { Palette } from 'App/Theme/Palette';
import React, { FC, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CloseSettimeIcon } from 'App/assets/svg';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface IProps extends LabelProps {
  text: string;
  centerToLeft: number;
  location: string;
  sliderLength: number;
  onDelete: () => {};
}

let itemWidth = rw(96);

const LabelMultiSlider: FC<IProps> = ({ text, centerToLeft, location, sliderLength, onDelete }) => {
  return (
    <View
      style={[
        styles.viewOverlay,
        {
          left: Math.min(Math.max(centerToLeft - itemWidth / 2, 0), sliderLength - itemWidth),
          top: location == 'up' ? -50 : 30,
        },
      ]}>
      <View style={styles.viewTimeOverley}>
        <StyledText style={styles.textTime}>{text}</StyledText>
        <TouchableOpacity onPress={onDelete}>
          <Ionicons color="#E3E3E3" name="close-circle" size={17} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewTimeOverley: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#42A391',
    borderRadius: 20,
    width: itemWidth,
    height: rh(26),
    justifyContent: 'center',
    backgroundColor: Palette.white,
  },
  viewOverlay: { position: 'absolute', top: -30 },
  textTime: { color: '#4B4A4B', fontSize: rh(12), marginRight: rw(5) },
});

export default memo(LabelMultiSlider);
