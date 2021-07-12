import { Palette } from 'App/Theme/Palette';

import { getBottomSpace } from 'react-native-iphone-x-helper';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { DEFAULT_REFERENCE_SCREEN_HEIGHT, DEFAULT_REFERENCE_SCREEN_WIDTH } from './constants';

export const getInputBorderColor = (isFocused: boolean, isError: boolean) => {
  if (isError) return Palette.error;
  if (isFocused) return Palette.zaapi2;
  return Palette.color_D6D6D6;
};

export const responsiveByWidth = (value: number, referenceScreenWidth: number = DEFAULT_REFERENCE_SCREEN_WIDTH) => {
  return widthPercentageToDP((value / referenceScreenWidth) * 100);
};

export const responsiveByHeight = (value: number, referenceScreenHeight: number = DEFAULT_REFERENCE_SCREEN_HEIGHT) => {
  return heightPercentageToDP((value / referenceScreenHeight) * 100);
};

export const getBottomBarHeight = () => {
  return responsiveByHeight(50) + getBottomSpace();
};
