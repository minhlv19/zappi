import React, { FC, memo } from 'react';
import { View, StatusBar, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Palette } from 'App/Theme/Palette';
import { BackIcon } from 'App/assets/svg';
import NavigationService from 'App/navigation/NavigationService';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import StyledText from 'App/Components/StyledText/StyledText';

interface IProps {
  hideBackIcon?: boolean;
  titleBack: string;
}

const HeaderComponent: FC<IProps> = ({ hideBackIcon, titleBack }) => {
  const { top } = useSafeAreaInsets();

  return (
    <View>
      <LinearGradient
        colors={[Palette.color_54B56F, Palette.color_2B90AB]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.viewLinner}
      />

      <StatusBar animated={true} barStyle="light-content" backgroundColor={Palette.color_54B56F} />
      <View style={[styles.viewContent, { paddingTop: Platform.OS === 'ios' ? top : getStatusBarHeight() }]}>
        <View style={styles.viewHeader}>
          <TouchableOpacity onPress={NavigationService.goBack} style={styles.viewButtonBack}>
            {!hideBackIcon && (
              <View style={styles.backIcon}>
                <BackIcon />
              </View>
            )}
            <StyledText style={styles.textBack}>{titleBack}</StyledText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.viewBorder} />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContent: {},
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rw(15),
    marginTop: rh(20),
    paddingBottom: rh(20),
  },
  viewButtonBack: { flexDirection: 'row', alignItems: 'center' },
  textBack: { color: '#fff', fontSize: rh(18), fontWeight: '700' },
  backIcon: { marginRight: rw(12) },
  viewLinner: { ...StyleSheet.absoluteFillObject },
  viewBorder: { height: rh(20), borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#fff' },
});

export default memo(HeaderComponent);
