import React, { FC, memo } from 'react';
import { View, StyleSheet } from 'react-native';

import ViewShareSocial from './ViewShareSocial';
import ModalBottomSheet from 'App/Components/Modal/ModalBottomSheet';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { ShareTypeEnums } from '../UniqueReferralLink';
import { getBottomSpace } from 'react-native-iphone-x-helper';

interface IProsp {
  isVisible: boolean;
  onCloseModal: () => void;
  title: string;
  linkStore: string;
  shareType?: ShareTypeEnums;
}

const ModalShareQr: FC<IProsp> = ({ isVisible, onCloseModal, title, linkStore, shareType }) => {
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
