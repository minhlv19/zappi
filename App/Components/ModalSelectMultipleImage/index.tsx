import React, { FC, memo, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, InteractionManager, Platform } from 'react-native';
import CameraRoll, { PhotoIdentifier } from '@react-native-community/cameraroll';
import ItemImageLibrary from './ItemImageLibrary';
import { useTranslation } from 'react-i18next';
import ImagePicker, { Image } from 'react-native-image-crop-picker';

import { CamraIcon, FirstSelectImageIcon, LibraryIcon } from 'App/assets/svg';
import ModalBottomSheet from 'App/Components/Modal/ModalBottomSheet';
import StyledText from '../StyledText/StyledText';
import RNFS from 'react-native-fs';
import { Palette } from 'App/Theme/Palette';
interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onSetImage: (items: any) => {};
  // setImagePicker?: React.Dispatch<React.SetStateAction<Image | undefined>>;
}

const uriToBase64 = async (uriPhoto: string) => {
  if (Platform.OS === 'ios') {
    if (uriPhoto.startsWith('ph://')) {
      let imagePATH = uriPhoto.substring(5, 41);
      let photoPATH = `assets-library://asset/asset.JPG?id=${imagePATH}&ext=JPG`;
      const dest = `${RNFS.TemporaryDirectoryPath}${Math.random().toString(36).substring(7)}.jpg`;
      const data = await RNFS.copyAssetsFileIOS(photoPATH, dest, 500, 500, 1.0, 1.0, 'contain');
      const base64 = await RNFS.readFile(data, 'base64');
      return base64;
    }
  }
};

const ModalSelectImage: FC<IProps> = ({ isVisible, onClose, onSetImage }) => {
  const { t } = useTranslation();
  const refFlatList = useRef<FlatList>();
  const [imagesLibrary, setImagesLibrary] = useState<PhotoIdentifier[]>([]);
  const [selectedImage, setSelectedImage] = useState<(PhotoIdentifier | null | undefined)[]>([]);

  const handleClickImage = useCallback(
    async (items: any[]) => {
      await onSetImage(
        items.map(image => {
          return image;
        }),
      );

      onClose();
      // setImagesPath([...imagesPath, items.map(image => image.path)]);
      // InteractionManager.runAfterInteractions(() => {
      //   setImagePicker(item);
      // });
    },
    [onSetImage, onClose],
  );
  const onClickDone = async () => {
    const data = await Promise.all(
      selectedImage
        .filter(v => v !== undefined)
        .map(async v => {
          if (v?.node?.image) {
            const base64 = await uriToBase64(v?.node?.image?.uri);

            return { data: base64, mime: 'jpg' };
          }
        }),
    );
    setSelectedImage([]);
    handleClickImage(data);
  };

  const onClickCancel = async () => {
    setSelectedImage([]);
  };

  const handleCamera = useCallback(async () => {
    //TODO: HANLDE LATER
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
    } catch (error) {}
  }, [handleClickImage]);

  const handleLibrary = useCallback(async () => {
    try {
      const response = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        // cropperCircleOverlay: true,
        // cropping: true,
        compressImageQuality: 1,
        includeBase64: true,
      });

      handleClickImage(response);
    } catch (error) {}
  }, [handleClickImage]);

  const handleClickImageItem = async (item: PhotoIdentifier, index: number) => {
    let tmp = [...selectedImage];
    if (!tmp[index]) {
      tmp[index] = item;
    } else {
      tmp[index] = undefined;
    }
    setSelectedImage(tmp);
  };
  const renderItem = useCallback(
    ({ item, index }) => {
      if (item.first) {
        return (
          <TouchableOpacity onPress={handleLibrary} style={styles.viewItem}>
            <FirstSelectImageIcon />
          </TouchableOpacity>
        );
      }
      return (
        <ItemImageLibrary
          isActive={selectedImage[index] !== undefined}
          handleClickImage={() => {
            handleClickImageItem(item, index);
          }}
          item={item}
        />
      );
    },
    [handleLibrary, handleClickImageItem, selectedImage],
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
      <View>
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 20,
            paddingBottom: 11,
            // flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={onClickCancel}>
            <StyledText style={{ fontWeight: '400', fontSize: 18, color: Palette.zaapi2 }}>Cancel</StyledText>
          </TouchableOpacity>
          <StyledText style={{ fontWeight: '700', fontSize: 18, color: Palette.zaapi4 }}>
            {selectedImage.filter(v => v !== undefined).length} selected
          </StyledText>
          <TouchableOpacity onPress={onClickDone}>
            <StyledText style={{ fontWeight: '400', fontSize: 18, color: Palette.zaapi2 }}>Done</StyledText>
          </TouchableOpacity>
        </View>
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
  container: { marginTop: 25 },
  flatList: { paddingLeft: 15, paddingTop: 20 },
  itemSeparatorComponent: { width: 10 },
  listFooterComponent: { width: 50 },
  viewItem: {
    borderRadius: 10,
    overflow: 'hidden',
    width: 94,
    height: 94,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
  viewActions: { borderTopWidth: 1, borderTopColor: '#F5F5F5', marginTop: 20 },
  viewItemAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  textItemAction: { fontSize: 14, fontWeight: '600', marginLeft: 15, flex: 1, color: '#4B4A4B' },
});

export default memo(ModalSelectImage);
