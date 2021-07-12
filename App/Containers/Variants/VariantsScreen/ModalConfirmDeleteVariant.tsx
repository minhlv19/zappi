import StyledButton from 'App/Components/StyledButton/StyledButton';
import StyledText from 'App/Components/StyledText/StyledText';
import ModalSuccess from 'App/Containers/Home/HomeScreen/Components/ModalSuccess';
import React, { FC, memo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const { width } = Dimensions.get('window');

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onPressYes: () => void;
}

const ModalConfirmDeleteVariant: FC<IProps> = ({ isVisible, onClose, onPressYes }) => {
  return (
    <ModalSuccess isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <StyledText style={styles.textHeader}>Are you sure you want to delete this variant category?</StyledText>
        <StyledText style={styles.textDesc}>
          Deleting this variant category will remove it from your product.
        </StyledText>

        <View style={styles.viewButtons}>
          <StyledButton style={styles.viewButton} onPressDisabled={onClose} disabled title="Cancel" />
          <View style={styles.viewCenter} />
          <StyledButton
            style={styles.viewButton}
            onPress={() => {
              onPressYes();
              onClose();
            }}
            title="Yes"
          />
        </View>
      </View>
    </ModalSuccess>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    paddingVertical: rh(20),
    paddingHorizontal: rw(25),
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  textHeader: { color: '#000', textAlign: 'center', fontSize: rh(16), fontWeight: '700' },
  textDesc: { color: '#8B8C8F', marginTop: rh(10), fontWeight: '400', fontSize: rh(14), textAlign: 'center' },
  viewButtons: { marginTop: rh(20), flexDirection: 'row', alignItems: 'center' },
  viewCenter: { width: rw(10) },
  viewButton: { flex: 1 },
});

export default memo(ModalConfirmDeleteVariant);
