import React, { ReactElement, useState } from 'react';
import { View, Text, SafeAreaView, Modal, TouchableOpacity, GestureResponderEvent } from 'react-native';
import StyledText from '../StyledText/StyledText';
import styles from './styles';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface Props {
  title?: string;
  subtitle?: string;
  action?: ((event: GestureResponderEvent) => void) | undefined;
  actioncancle?: ((event: GestureResponderEvent) => void) | undefined;
  txtAction?: string;
  styleActionCancel?: any;
  styleAction?: any;
  visible: boolean;
  txtStyleCancel?: any;
  txtStyleAction?: any;
}
const ConfirmationPopup = (props: Props): ReactElement => {
  return (
    <Modal transparent={true} visible={props.visible} presentationStyle="overFullScreen">
      <View style={styles.overlay} />
      <View style={styles.centeredView}>
        <View style={styles.modalContent}>
          <View>
            <StyledText style={styles.txtTitle}>{props.title}</StyledText>
            <StyledText style={styles.txtSubTitle}>{props.subtitle}</StyledText>
          </View>
          <View style={styles.actionView}>
            <TouchableOpacity
              style={[styles.actionItem, { marginRight: rw(5) }, props.styleActionCancel]}
              onPress={props.actioncancle}>
              <StyledText style={[styles.txtaction, props.txtStyleCancel]}>{'Cancel'}</StyledText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionItem, { marginLeft: rw(5) }, props.styleAction]}
              onPress={props.action}>
              <StyledText style={[styles.txtaction, props.txtStyleAction]}>{props.txtAction}</StyledText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationPopup;
