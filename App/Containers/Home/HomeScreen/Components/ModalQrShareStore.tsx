import ModalBottomSheet from 'App/Components/Modal/ModalBottomSheet';
import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, PermissionsAndroid, Platform, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import RNQRGenerator from 'rn-qr-generator';
import FastImage from 'react-native-fast-image';
import CameraRoll, { SaveToCameraRollOptions } from '@react-native-community/cameraroll';

import { DowloadIcon, ShareIcon } from 'App/assets/svg';
import StyledText from 'App/Components/StyledText/StyledText';
import { logError } from 'App/Utils/error';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const { width: screenWidth } = Dimensions.get('screen');

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

async function savePicture(tag: string, options?: SaveToCameraRollOptions) {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    return Promise.reject();
  }

  return CameraRoll.save(tag, options);
}

interface IProsp {
  isVisible: boolean;
  onCloseModal: () => void;
  onPressShare?: () => void;
  linkStore: string;
}

const ModalQrShareStore: FC<IProsp> = ({ isVisible, onCloseModal, onPressShare, linkStore }) => {
  const { t } = useTranslation();
  const [imageQr, setImageQr] = useState<string>('');

  useEffect(() => {
    if (isVisible) {
      RNQRGenerator.generate({
        value: linkStore,
        width: screenWidth / 1.5,
        height: screenWidth / 1.5,
        correctionLevel: 'M',
      }).then(res => {
        setImageQr(res.uri);
      });
    }
  }, [isVisible, linkStore]);

  const onPressDowload = useCallback(async () => {
    try {
      await savePicture(imageQr, { type: 'photo' });
      Alert.alert('Download Scucess');
    } catch (error) {
      logError(error);
    }
  }, [imageQr]);

  return (
    <ModalBottomSheet isVisible={isVisible} onClose={onCloseModal}>
      <View style={styles.container}>
        <StyledText style={styles.textTitle}>{t('Store QR Code')}</StyledText>

        <FastImage source={{ uri: imageQr }} resizeMode="cover" style={styles.viewImageQr} />

        <View style={styles.viewActions}>
          <TouchableOpacity onPress={onPressDowload} style={styles.viewItemAction}>
            <DowloadIcon />
            <StyledText style={styles.textItemAction}>{t('Download')}</StyledText>
          </TouchableOpacity>

          <TouchableOpacity onPress={onPressShare} style={styles.viewItemAction}>
            <ShareIcon fill="#000" />
            <StyledText style={styles.textItemAction}>{t('Share this QR Code')}</StyledText>
          </TouchableOpacity>
        </View>
      </View>
    </ModalBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', paddingTop: rh(30) },
  textTitle: { fontSize: rh(16), fontWeight: '700' },
  viewActions: { flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-evenly' },
  viewItemAction: { flexDirection: 'row', alignItems: 'center', marginTop: rh(10) },
  textItemAction: { fontSize: rh(14), fontWeight: '600', marginLeft: rw(8) },
  viewImageQr: { width: screenWidth / 1.5, height: screenWidth / 1.5, marginVertical: 10 },
});

export default memo(ModalQrShareStore);
