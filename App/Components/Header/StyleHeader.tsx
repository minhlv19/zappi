import React, { ReactElement } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  GestureResponderEvent,
  StatusBar,
  Platform,
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { Palette } from 'App/Theme/Palette';
import StyledText from '../StyledText/StyledText';

interface Props {
  title?: string;
  iconLeft?: any;
  headerContainer?: any;
  styleiconLeft?: any;
  actionLeft?: ((event: GestureResponderEvent) => void) | undefined;
  styleTitle?: any;
  actionRight?: ((event: GestureResponderEvent) => void) | undefined;
  iconRight?: any;
  styleiconRight?: any;
  isStatusbar: boolean;
  colorStatus?: any;
  styleHeader?: any;
}

const StyleHeader = (props: Props): ReactElement => {
  return (
    <View>
      {props.isStatusbar === false ? (
        <View style={[styles.container, props.headerContainer]}>
          <StatusBar barStyle="light-content" backgroundColor={props.colorStatus} />
          <TouchableOpacity onPress={props.actionLeft} style={props.styleiconLeft}>
            {props.iconLeft}
          </TouchableOpacity>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <StyledText style={props.styleTitle}>{props.title}</StyledText>
          </View>

          <TouchableOpacity onPress={props.actionRight} style={props.styleiconRight}>
            {props.iconRight}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={props.styleHeader}>
          <LinearGradient
            colors={[Palette.color_54B56F, Palette.color_2B90AB]}
            style={styles.gradientHeader}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 1.0 }}>
            <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent />
            <View style={[styles.container, props.headerContainer]}>
              <TouchableOpacity onPress={props.actionLeft} style={props.styleiconLeft}>
                {props.iconLeft}
              </TouchableOpacity>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <StyledText style={[props.styleTitle]}>{props.title}</StyledText>
              </View>

              <TouchableOpacity onPress={props.actionRight} style={props.styleiconRight}>
                {props.iconRight}
              </TouchableOpacity>
            </View>
            <View style={[styles.headerMainCon]} />
          </LinearGradient>
        </View>
      )}
    </View>
  );
};
export default StyleHeader;
