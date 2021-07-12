import React, { FC, Fragment, memo, ReactNode } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Palette } from 'App/Theme/Palette';
import { BackIcon } from 'App/assets/svg';
import NavigationService from 'App/navigation/NavigationService';
import StyledText from '../StyledText/StyledText';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface IProps {
  hideBackIcon?: boolean;
  titleBack: string;
  styleViewBorder?: StyleProp<ViewStyle>;
  onLayout?: (event: LayoutChangeEvent) => void;
  styleTitleBack?: StyleProp<TextStyle>;
  disabledBack?: boolean;
  rightHeader?: ReactNode;
  header?: ReactNode;
  backFunction?: () => void;
}

const HeaderComponent: FC<IProps> = ({
  hideBackIcon,
  titleBack,
  onLayout,
  styleViewBorder,
  styleTitleBack,
  disabledBack,
  rightHeader,
  header,
  backFunction,
}) => {
  const { top } = useSafeAreaInsets();
  const onBack = () => {
    if (backFunction) {
      backFunction();
    }
    NavigationService.goBack();
  };
  return (
    <View>
      <LinearGradient
        colors={[Palette.color_54B56F, Palette.color_2B90AB]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.viewLinner}
      />

      <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent />
      <View
        onLayout={onLayout}
        style={[styles.viewContent, { paddingTop: Platform.OS === 'ios' ? top : getStatusBarHeight() }]}>
        <View style={styles.viewButtonBack}>
          {header ? (
            header
          ) : (
            <Fragment>
              <TouchableOpacity disabled={disabledBack} onPress={onBack} style={styles.viewRight}>
                {!hideBackIcon && (
                  <View style={styles.backIcon}>
                    <BackIcon />
                  </View>
                )}
                <StyledText style={[styles.textBack, styleTitleBack]}>{titleBack}</StyledText>
              </TouchableOpacity>

              {!!rightHeader && rightHeader}
            </Fragment>
          )}
        </View>
      </View>

      <View style={[styles.viewBorder, styleViewBorder]} />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContent: {},
  viewHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: rw(15), paddingBottom: rh(20) },
  viewButtonBack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rw(15),
    marginTop: rh(20),
    paddingBottom: rh(20),
  },
  viewRight: { flexDirection: 'row', alignItems: 'center' },
  textBack: { color: '#fff', fontSize: rh(18), fontWeight: '700' },
  backIcon: { marginRight: rw(12) },
  viewLinner: { ...StyleSheet.absoluteFillObject },
  viewBorder: { height: rh(20), borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: 'transparent' },
});

export default memo(HeaderComponent);
