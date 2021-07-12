import React, { FC } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import ModalSuccess from 'App/Containers/Home/HomeScreen/Components/ModalSuccess';
import StyledText from 'App/Components/StyledText/StyledText';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { SuccessIcon } from 'App/assets/svg';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
}

const StyledSuccessModal: FC<IProps> = ({ isVisible, onClose, title }) => {
  return (
    <ModalSuccess isVisible={isVisible} onClose={onClose}>
      <View style={styles.viewSuccess}>
        <SuccessIcon />
        <StyledText style={styles.textUpdateSuccess}>{title}</StyledText>
      </View>
    </ModalSuccess>
  );
};

const styles = StyleSheet.create({
  textUpdateSuccess: { marginTop: rh(10), color: '#4B4A4B', textAlign: 'center', fontWeight: '700' },
  viewSuccess: {
    height: rh(125),
    width: rw(200),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
});

export default StyledSuccessModal;
