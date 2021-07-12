import React, { FC, memo, useCallback, useMemo } from 'react';
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
import moment from 'moment';
import { DAYS_IN_WEEK, DEFAULT_LETTER_SPACING } from 'App/Utils/constants';
import { ChunkValue, formatChunkValue } from 'App/Containers/auth/SetBusinessHoursScreen';
import { useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import { getBusinessHoursText } from 'App/Utils/time';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface IProps {
  style?: StyleProp<ViewStyle>;
  onLayout?: (event: LayoutChangeEvent) => void;
}

const HeaderHome: FC<IProps> = ({ style, onLayout }) => {
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();

  const store = useSelector((state: RootState) => state.store);

  const goToChangeLogo = useCallback(() => {
    NavigationService.navigate('CropAvatarScreen');
  }, []);

  return (
    <LinearGradient
      colors={[Palette.color_54B56F, Palette.color_2B90AB]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 1.0 }}>
      <StatusBar animated={true} barStyle="light-content" backgroundColor={Palette.color_54B56F} />
      <View style={[styles.viewContent, { paddingTop: top + 20 }, style]}>
        <View onLayout={onLayout} style={styles.viewShop}>
          <TouchableOpacity onPress={goToChangeLogo} style={styles.viewLogo}>
            {store?.logoUrl ? (
              <FastImage source={{ uri: store.logoUrl }} resizeMode="cover" style={styles.viewLogo} />
            ) : (
              <LogoIcon width={53} height={53} />
            )}
          </TouchableOpacity>

          <View style={styles.viewCenterHeader}>
            <StyledText style={styles.textNameShop}>{store?.businessName}</StyledText>

            <View style={styles.viewTimeOpen}>
              <StyledText style={styles.textTimeOpen}>{getBusinessHoursText(store)}</StyledText>
              <TouchableOpacity onPress={() => NavigationService.navigate('SetBusinessHoursScreen')}>
                <PenIcon color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <TouchableOpacity style={styles.buttonViewStore}>
              <StyledText style={styles.textViewStore}>{t('View Store')}</StyledText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  viewShop: { flexDirection: 'row', paddingHorizontal: 15 },
  viewLogo: {
    width: rw(50),
    height: rh(50),
    borderRadius: 50 / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewCenterHeader: { flex: 1, paddingHorizontal: rw(15), justifyContent: 'space-around' },
  viewContent: { paddingBottom: rh(100) },
  textNameShop: { fontSize: rh(20), fontWeight: '700', color: '#fff' },
  viewTimeOpen: { flexDirection: 'row' },
  textTimeOpen: { fontSize: rh(14), color: '#fff', marginRight: rw(8) },
  textViewStore: { color: '#fff', fontSize: rh(14), letterSpacing: rh(14) * DEFAULT_LETTER_SPACING },
  buttonViewStore: {
    paddingVertical: rh(4),
    paddingHorizontal: rw(6),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default memo(HeaderHome);
