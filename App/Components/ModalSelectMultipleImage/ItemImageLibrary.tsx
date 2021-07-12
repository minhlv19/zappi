import { PhotoIdentifier } from '@react-native-community/cameraroll';
import React, { FC, memo, useCallback } from 'react';
import { TouchableOpacity, StyleSheet, Image as ImageNative, ActivityIndicator, View } from 'react-native';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import SelectedGradientIcon from 'App/assets/icons/SelectedGradientIcon.svg';
import { Palette } from 'App/Theme/Palette';
// import useBoolean from 'App/Hooks/useBoolean';

interface IProps {
  item: PhotoIdentifier;
  handleClickImage: (item: any) => void;
  isActive: boolean;
}

// const convertLocalIdentifierToAssetLibrary = (uri: string, ext: string) => {
//   const hash = uri.replace('ph://', '').split('/')[0];
//   return `assets-library://asset/asset.${ext}?id=${hash}&ext=${ext}`;
// };

const ItemImageLibrary: FC<IProps> = ({ item, handleClickImage, isActive }) => {
  // const [isLoading, showLoading, hideLoading] = useBoolean();

  return (
    <TouchableOpacity onPress={handleClickImage} style={styles.viewItem}>
      <View style={[isActive && { borderColor: '#42A391' }, { borderWidth: 1, borderRadius: 10 }]}>
        <ImageNative style={styles.image} source={{ uri: item.node.image.uri }} resizeMode="cover" />
        {isActive && (
          <>
            <View
              style={[
                styles.image,
                { opacity: 0.3, backgroundColor: 'rgb(255,255,255)', position: 'absolute' },
              ]}></View>
            <View style={[styles.image, { position: 'absolute', alignContent: 'center', justifyContent: 'center' }]}>
              <SelectedGradientIcon style={{ width: 20, height: 20, marginHorizontal: 37 }} />
            </View>
          </>
        )}
      </View>
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
  image: { width: 94, height: 94 },
  viewOverley: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});

export default memo(ItemImageLibrary);
