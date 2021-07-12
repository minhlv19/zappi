import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import ModalSuccess from 'App/Containers/Home/HomeScreen/Components/ModalSuccess';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const { width } = Dimensions.get('window');

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalChangeSuccess: FC<IProps> = ({ isVisible, onClose, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <ModalSuccess isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.textHeader}>{t('Do you want to save the changes you made to this category')}?</Text>

        <Text style={styles.textDesc}>{t('Your save will be lost if you don’t save them')}.</Text>

        <View style={styles.viewActions}>
          <StyledButton onPressDisabled={onClose} disabled style={styles.viewButton} title="Cancel" />
          <View style={styles.viewCenter} />
          <StyledButton onPress={onConfirm} style={styles.viewButton} title="Save" />
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

export default memo(ModalChangeSuccess);
