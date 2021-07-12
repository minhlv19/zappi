import React, { FC, memo, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, InteractionManager } from 'react-native';
import CameraRoll, { PhotoIdentifier } from '@react-native-community/cameraroll';
import ItemImageLibrary from './ItemImageLibrary';
import { useTranslation } from 'react-i18next';
import ImagePicker, { Image } from 'react-native-image-crop-picker';

import { CamraIcon, FirstSelectImageIcon, LibraryIcon } from 'App/assets/svg';
import ModalBottomSheet from 'App/Components/Modal/ModalBottomSheet';
import StyledText from '../StyledText/StyledText';
import { logError } from 'App/Utils/error';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  setImagePicker: React.Dispatch<React.SetStateAction<Partial<Image> | undefined>>;
  cropperCircleOverlay?: boolean;
}

const ModalSelectImage: FC<IProps> = ({ isVisible, onClose, setImagePicker, cropperCircleOverlay }) => {
  const { t } = useTranslation();
  const refFlatList = useRef<FlatList>();
  const [imagesLibrary, setImagesLibrary] = useState<PhotoIdentifier[]>([]);

  const handleClickImage = useCallback(
    (item: Image) => {
      onClose();

      InteractionManager.runAfterInteractions(() => {
        setImagePicker(item);
      });
    },
    [onClose, setImagePicker],
  );

  const handleCamera = useCallback(async () => {
    try {
      const response = await ImagePicker.openCamera({
        multiple: false,
        useFrontCamera: false,
        mediaType: 'photo',
        cropperCircleOverlay: true,
        cropping: true,
        compressImageQuality: 1,
      });
      handleClickImage(response);
    } catch (error) {
      logError(error);
    }
  }, [handleClickImage]);

  const handleLibrary = useCallback(async () => {
    try {
      const response = await ImagePicker.openPicker({
        multiple: false,
        mediaType: 'photo',
        // cropperCircleOverlay: true,
        // cropping: true,
        compressImageQuality: 1,
      });
      handleClickImage(response);
    } catch (error) {
      logError(error);
    }
  }, [handleClickImage]);

  const renderItem = useCallback(
    ({ item }) => {
      if (item.first) {
        return (
          <TouchableOpacity onPress={handleLibrary} style={styles.viewItem}>
            <FirstSelectImageIcon />
          </TouchableOpacity>
        );
      }

      return (
        <ItemImageLibrary handleClickImage={handleClickImage} item={item} cropperCircleOverlay={cropperCircleOverlay} />
      );
    },
    [handleLibrary, handleClickImage],
  );
  const itemSeparatorComponent = useCallback(() => <View style={styles.itemSeparatorComponent} />, []);
  const listFooterComponent = useCallback(() => <View style={styles.listFooterComponent} />, []);

  useEffect(() => {
    if (isVisible) {
      CameraRoll.getPhotos({ first: 10 }).then(async res => {
        setImagesLibrary(res.edges);
      });
    }
  }, [isVisible]);

  return (
    <ModalBottomSheet
      onSwipeComplete={onClose}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      propagateSwipe
      isVisible={isVisible}>
      <View style={styles.container}>
        <FlatList
          ref={refFlatList as MutableRefObject<FlatList>}
          data={[{ first: true }, ...imagesLibrary]}
          ListFooterComponent={listFooterComponent}
          ItemSeparatorComponent={itemSeparatorComponent}
          style={styles.flatList}
          renderItem={renderItem}
          horizontal
        />

        <View style={styles.viewActions}>
          <TouchableOpacity onPress={handleCamera} style={styles.viewItemAction}>
            <CamraIcon />
            <StyledText style={styles.textItemAction}>{t('Camera')}</StyledText>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLibrary} style={styles.viewItemAction}>
            <LibraryIcon />
            <StyledText style={styles.textItemAction}>{t('Import from files app')}</StyledText>
          </TouchableOpacity>
        </View>
      </View>
    </ModalBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: rh(25) },
  flatList: { paddingLeft: rw(15) },
  itemSeparatorComponent: { width: rw(10) },
  listFooterComponent: { width: rw(50) },
  viewItem: {
    borderRadius: 10,
    overflow: 'hidden',
    width: rw(94),
    height: rh(94),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
  viewActions: { borderTopWidth: 1, borderTopColor: '#F5F5F5', marginTop: rh(20) },
  viewItemAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rh(15),
    paddingHorizontal: rw(15),
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  textItemAction: { fontSize: rh(14), fontWeight: '600', marginLeft: rw(15), flex: 1, color: '#4B4A4B' },
});

export default memo(ModalSelectImage);
