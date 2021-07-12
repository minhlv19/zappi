import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Dimensions } from 'react-native';

import StyledButton from 'App/Components/StyledButton/StyledButton';
import ModalSuccess from 'App/Containers/Home/HomeScreen/Components/ModalSuccess';
import StyledText from 'App/Components/StyledText/StyledText';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const { width } = Dimensions.get('window');

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isProduct?: boolean;
  canCancel?: boolean;
  title: string;
  subtitle?: string;
  confirmButtonTitle?: string;
  cancelButtonTitle?: string;
}

const StyledModalConfirm: FC<IProps> = ({
  isVisible,
  onClose,
  onConfirm,
  canCancel,
  title,
  subtitle,
  confirmButtonTitle,
  cancelButtonTitle,
}) => {
  return (
    <ModalSuccess isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <StyledText style={styles.textHeader}>{title}</StyledText>
        {!!subtitle && <StyledText style={styles.textDesc}>{subtitle}</StyledText>}

        <View style={styles.viewActions}>
          {canCancel && (
            <>
              <StyledButton
                onPressDisabled={onClose}
                disabled
                style={styles.viewButton}
                title={cancelButtonTitle || 'Cancel'}
              />
              <View style={styles.viewCenter} />
            </>
          )}

          <StyledButton onPress={onConfirm} style={styles.viewButton} title={confirmButtonTitle || 'Confirm'} />
        </View>
      </View>
    </ModalSuccess>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(25),
    paddingVertical: rh(20),
    backgroundColor: '#fff',
    borderRadius: 12,
    width: width - 50,
  },
  textHeader: { color: '#000', fontSize: rh(16), fontWeight: '700', textAlign: 'center' },
  textDesc: { color: '#8B8C8F', textAlign: 'center', marginTop: rh(12) },
  viewActions: { flexDirection: 'row', alignItems: 'center', marginTop: rh(20) },
  viewButton: { flex: 1 },
  viewCenter: { width: rw(8) },
});

export default StyledModalConfirm;
