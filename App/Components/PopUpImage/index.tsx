import React, { Dispatch, SetStateAction } from 'react';
import { GestureResponderEvent, Modal, Text, TouchableOpacity, View } from 'react-native';
import StyledText from '../StyledText/StyledText';
import styles from './styles';

const PopUpImage = ({
  visible,
  setVisible,
  openCamera,
  openGallery,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  openCamera: (event: GestureResponderEvent) => void;
  openGallery: (event: GestureResponderEvent) => void;
}) => {
  return (
    <Modal transparent={true} visible={visible} presentationStyle="overFullScreen">
      <View style={styles.overlay} />
      <View style={styles.centeredView}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.openButtonNoLine} onPress={openCamera}>
            <StyledText style={[styles.textStyle, styles.option]}>{'Camera'}</StyledText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.openButton} onPress={openGallery}>
            <StyledText style={[styles.textStyle, styles.option]}>{'Gallery'}</StyledText>
          </TouchableOpacity>
        </View>
        <View style={styles.modalCancel}>
          <TouchableOpacity
            style={styles.openButtonNoLine}
            onPress={() => {
              setVisible(false);
            }}>
            <StyledText style={[styles.textStyle, styles.cancel]}>{'Cancel'}</StyledText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PopUpImage;
