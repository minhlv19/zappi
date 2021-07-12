import React, { FC, memo, useCallback } from 'react';
import { View, StatusBar, StyleProp, ViewStyle, StyleSheet, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { Palette } from 'App/Theme/Palette';
import { LogoIcon, PenIcon } from 'App/assets/svg';
import NavigationService from 'App/navigation/NavigationService';
import StyledText from 'App/Components/StyledText/StyledText';
import { Store } from 'App/Types';
import FastImage from 'react-native-fast-image';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface IProps {
  style?: StyleProp<ViewStyle>;
  onLayout?: (event: LayoutChangeEvent) => void;
}

const HeaderStore: FC<IProps> = ({ style, onLayout }) => {
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[Palette.color_54B56F, Palette.color_2B90AB]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 1.0 }}>
      <StatusBar barStyle="light-content" backgroundColor={'translucent'} translucent />
      <View style={[styles.viewContent, { paddingTop: top + 20 }, style]}>
        <View onLayout={onLayout} style={styles.titleContainer}>
          <StyledText style={styles.textBack}>{t('Store')}</StyledText>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  titleContainer: { flexDirection: 'row', paddingHorizontal: 15 },
  viewContent: { paddingBottom: rh(100) },
  textBack: { fontSize: rh(24), fontWeight: '700', color: '#fff' },
});

export default memo(HeaderStore);
