import React, { FC, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Modal, { ModalProps } from 'react-native-modal';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface IProps extends Partial<ModalProps> {
  onClose?: () => void;
}

const ModalBottomSheet: FC<IProps> = props => {
  const { children, onClose, ...rest } = props;

  return (
    <Modal
      backdropOpacity={0.5}
      style={styles.modal}
      useNativeDriverForBackdrop
      animationIn="slideInUp"
      animationOut="slideOutDown"
      swipeDirection={['down']}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      {...rest}>
      <View>
        <View style={styles.viewWapperHeader}>
          <View style={styles.viewHeader} />
        </View>
        <View style={[styles.container, { paddingBottom: getBottomSpace() || 20 }]}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: { justifyContent: 'flex-end', margin: 0 },
  container: { backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  viewHeader: { height: rh(5), width: rw(80), borderRadius: 10, backgroundColor: '#fff', marginBottom: rh(6) },
  viewWapperHeader: { alignItems: 'center' },
});

export default memo(ModalBottomSheet);
