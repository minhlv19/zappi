import { PhotoIdentifier } from '@react-native-community/cameraroll';
import { logError } from 'App/Utils/error';
import React, { FC, memo, useCallback } from 'react';
import { TouchableOpacity, StyleSheet, Image as ImageNative, ActivityIndicator, View } from 'react-native';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { CROPPED_IMAGE_HEIGHT, CROPPED_IMAGE_WIDTH } from 'App/Utils/constants';

// import useBoolean from 'App/Hooks/useBoolean';

interface IProps {
  item: PhotoIdentifier;
  handleClickImage: (item: Image) => void;
  cropperCircleOverlay?: boolean;
}

// const convertLocalIdentifierToAssetLibrary = (uri: string, ext: string) => {
//   const hash = uri.replace('ph://', '').split('/')[0];
//   return `assets-library://asset/asset.${ext}?id=${hash}&ext=${ext}`;
// };

const ItemImageLibrary: FC<IProps> = ({ item, handleClickImage, cropperCircleOverlay }) => {
  // const [isLoading, showLoading, hideLoading] = useBoolean();

  const handelPress = useCallback(async () => {
    // const uri: string =
    //   Platform.OS === 'ios'
    //     ? convertLocalIdentifierToAssetLibrary(item.node.image.uri, item.node.type)
    //     : item.node.image.uri;

    try {
      const response = await ImagePicker.openCropper({
        path: item.node.image.uri,
        mediaType: 'photo',
        cropperCircleOverlay: cropperCircleOverlay || false,
        compressImageQuality: 1,
        width: CROPPED_IMAGE_WIDTH,
        height: CROPPED_IMAGE_HEIGHT,
      });
      handleClickImage(response);
    } catch (error) {
      logError(error);
    }
  }, [item, handleClickImage]);

  return (
    <TouchableOpacity onPress={handelPress} style={styles.viewItem}>
      <ImageNative source={{ uri: item.node.image.uri }} resizeMode="cover" style={styles.image} />

      {/* {isLoading && (
        <View style={styles.viewOverley}>
          <ActivityIndicator />
        </View>
      )} */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewItem: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: rw(94), height: rh(94) },
  viewOverley: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});

export default memo(ItemImageLibrary);
