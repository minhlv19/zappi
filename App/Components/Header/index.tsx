import React, { FC, ReactElement } from 'react';
import { View, StatusBar, StyleProp, ViewStyle, StyleSheet, TouchableOpacity } from 'react-native';
import { Palette } from '../../Theme/Palette';
import LinearGradient from 'react-native-linear-gradient';
import StyledText from '../StyledText/StyledText';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface Props {
  title?: string;
  icon?: ReactElement;
  buttonRight?: ReactElement;
  onButtonRightPress?: () => void;
}
const Header = (props: Props): ReactElement => {
  const { title, icon, buttonRight, onButtonRightPress } = props;

  return (
    <LinearGradient
      colors={[Palette.color_54B56F, Palette.color_2B90AB]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 1.0 }}>
      <StatusBar animated={true} barStyle="light-content" backgroundColor={Palette.color_54B56F} />
      <View style={{ height: rh(189) }}>
        <View style={styles.headerContent}>
          {icon && (
            <TouchableOpacity style={styles.iconContainer} onPress={icon.props.onPress}>
              {icon}
            </TouchableOpacity>
          )}
          {!!title && (
            <StyledText style={[styles.headerTitle, !icon ? styles.headerTitleNoIcon : {}]}>{title}</StyledText>
          )}
          {!!buttonRight && (
            <View style={styles.buttonRightContainer}>
              <TouchableOpacity onPress={onButtonRightPress}>{buttonRight}</TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerContent: {
    marginTop: rh(57),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: Palette.white,
    fontSize: rh(18),
    fontWeight: 'bold',
  },
  iconContainer: {
    marginLeft: rw(20),
    marginRight: rw(12),
    width: rw(20),
  },
  headerTitleNoIcon: {
    marginLeft: rw(16),
  },
  buttonRightContainer: {
    right: 0,
    position: 'absolute',
  },
});

export default Header;
