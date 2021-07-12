import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, SafeAreaView, Modal, Alert, TouchableOpacity, GestureResponderEvent } from 'react-native';
import styles from './styles';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import { Palette } from 'App/Theme/Palette';
import LinearGradient from 'react-native-linear-gradient';
import StyledText from 'App/Components/StyledText/StyledText';
import MaskedView from '@react-native-community/masked-view';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const ModalConfig = ({
  visible,
  setVisible,
  action,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  action: (event: GestureResponderEvent) => void;
}) => {
  return (
    <>
      <Modal animationType="slide" transparent={true} visible={visible} presentationStyle="overFullScreen">
        <View style={styles.overlay} />
        <View style={styles.viewModal}>
          <View style={styles.contentModal}>
            <Text style={styles.txtTitle}>{'Are you sure to leave this page?'}</Text>
            <Text style={styles.txtSubtitle}>{'If you leave this page, the data you entered will be lost.'}</Text>
            <View style={styles.styleActioncontent}>
              <LinearGradient
                style={[styles.buttonContainer, { marginRight: rw(4) }]}
                colors={[Palette.color_54B56F, Palette.color_2B90AB]}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 1.0 }}>
                <TouchableOpacity style={styles.button} onPress={action}>
                  <View style={styles.btnLeave}>
                    <StyledText style={[styles.buttonTitle, { color: Palette.zaapi2 }]}>{'Leave'}</StyledText>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                style={[styles.buttonContainer, { marginLeft: rw(4) }]}
                colors={[Palette.color_54B56F, Palette.color_2B90AB]}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 1.0 }}>
                <TouchableOpacity style={styles.button} onPress={() => setVisible(false)}>
                  <StyledText style={styles.buttonTitle}>{'Stay'}</StyledText>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ModalConfig;
