import { media } from 'App/assets/media';
import { requestUploadProductImage } from 'App/Repositories/product';
import { IOrder } from 'App/Types/order';
import { orderBy, sortBy } from 'lodash';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

export const convertFileToBase64 = (uriPhoto: string) => {
  if (Platform.OS === 'ios') {
    if (uriPhoto.startsWith('ph://')) {
      let imagePATH = uriPhoto.substring(5, 41);
      let photoPATH = `assets-library://asset/asset.JPG?id=${imagePATH}&ext=JPG`;

      const dest = `${RNFS.TemporaryDirectoryPath}${Math.random().toString(36).substring(7)}.jpg`;

      //   RNFS.copyAssetsFileIOS(photoPATH, dest, 500, 500, 1.0, 1.0, 'contain').then(data => {
      //     RNFS.readFile(data, 'base64').then(base64 => {

      //       //TODO - Delete file
      //     });
      //   });
    }
  }
};

export const getCategoryImageDefault = (isFnb: boolean) => {
  return isFnb ? media.CategoryImageDefaultFnb : media.CategoryImageDefault;
};

export const getOrderImage = (order: IOrder, isFnb: boolean) => {
  if (order.items.length > 0) {
    const orderItems = orderBy(order.items, ['unitPrice'], ['desc']);
    const itemWithHighestPrice = orderItems[0];
    return itemWithHighestPrice.productPhotoUrls.length
      ? { uri: itemWithHighestPrice.productPhotoUrls[0] }
      : getCategoryImageDefault(isFnb);
  }
  return getCategoryImageDefault(isFnb);
};

import { Image } from 'react-native-image-crop-picker';

export const initFormData = (image: Image | null, keyInServer: string = 'file') => {
  if (image) {
    const upload_body = {
      uri: image['path'],
      type: image['mime'],
      name: `product_category_${Date.now()}.${image['mime'] === 'image/jpeg' ? 'jpg' : 'png'}`,
    };
    let _data_body = new FormData();
    _data_body.append(keyInServer, upload_body);
    return _data_body;
  }
  return null;
};

export const requestImage = async (objImg?: Image) => {
  if (objImg) {
    const formData = initFormData(objImg);
    if (formData) {
      const { photoUrl } = await requestUploadProductImage(formData);
      return photoUrl;
    }
  }
  return undefined;
};
