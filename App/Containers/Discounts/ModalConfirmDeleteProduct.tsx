import React, { FC, memo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import StyledButton from 'App/Components/StyledButton/StyledButton';
import ModalSuccess from 'App/Containers/Home/HomeScreen/Components/ModalSuccess';
import { useTranslation } from 'react-i18next';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const { width } = Dimensions.get('window');

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  isProduct?: boolean;
  onConfirm: () => void;
}

const ModalConfirmDeleteProduct: FC<IProps> = ({ isVisible, onClose, isProduct, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <ModalSuccess isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.textHeader}>
          {isProduct
            ? t('Are you sure you want to delete this product')
            : t('Are you sure you want to delete this category?')}{' '}
          ?
        </Text>

        {!isProduct && (
          <Text style={styles.textDesc}>
            {t('All products left without a category will automatically be moved to the "Other" category.')}.
          </Text>
        )}
        <View style={styles.viewActions}>
          <StyledButton onPressDisabled={onClose} disabled style={styles.viewButton} title="Cancel" />
          <View style={styles.viewCenter} />
          <StyledButton onPress={onConfirm} style={styles.viewButton} title="Confirm" />
        </View>
      </View>
    </ModalSuccess>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: rh(20),
    paddingHorizontal: rw(20),
    borderRadius: 12,
    backgroundColor: '#fff',
    width: width - 50,
  },
  textHeader: { fontSize: rh(16), fontWeight: '600', color: '#000', textAlign: 'center' },
  viewActions: { flexDirection: 'row', alignItems: 'center', marginTop: rh(20) },
  viewButton: { flex: 1 },
  viewCenter: { width: rw(8) },
  textDesc: { color: '#8B8C8F', marginTop: rh(10), textAlign: 'center' },
});

export default memo(ModalConfirmDeleteProduct);
