import React, { FC, memo, ReactNode } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const { width } = Dimensions.get('window');

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalSettingsPaymentSuccess: FC<IProps> = ({ isVisible, onClose, children }) => {
  return (
    <Modal
      avoidKeyboard
      isVisible={isVisible}
      style={styles.modal}
      // coverScreen={false}
      useNativeDriver
      hideModalContentWhileAnimating
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}>
      {children}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: { margin: 0, alignItems: 'center' },
  viewContent: {
    width: width - 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: rh(20),
    alignItems: 'center',
    paddingHorizontal: rw(30),
  },
  viewHeader: { alignItems: 'center' },
  textSuccess: { color: '#4B4A4B', marginTop: rh(13), textAlign: 'center', fontSize: rh(16), fontWeight: '700' },
  textDesc: { textAlign: 'center', marginTop: rh(6), color: 'rgba(21, 25, 32, 0.5)' },
});

export default memo(ModalSettingsPaymentSuccess);
