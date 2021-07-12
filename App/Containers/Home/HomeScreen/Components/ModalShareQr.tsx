import React, { FC, memo } from 'react';
import { View, StyleSheet } from 'react-native';

import ViewShareSocial from './ViewShareSocial';
import ModalBottomSheet from 'App/Components/Modal/ModalBottomSheet';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { ShareTypeEnums } from '../ShareStore';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useSelector } from 'react-redux';
import { RootState } from 'App/Redux';

interface IProsp {
  isVisible: boolean;
  onCloseModal: () => void;
  title: string;
  linkStore: string;
  shareType?: ShareTypeEnums;
}

const ModalShareQr: FC<IProsp> = ({ isVisible, onCloseModal, title, linkStore, shareType }) => {
  const store = useSelector((state: RootState) => state.store);

  return (
    <ModalBottomSheet isVisible={isVisible} onClose={onCloseModal}>
      <View style={styles.container}>
        <ViewShareSocial linkStore={linkStore} title={title} shareType={shareType} />
      </View>
    </ModalBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: rh(20), paddingBottom: getBottomSpace() },
});

export default memo(ModalShareQr);
