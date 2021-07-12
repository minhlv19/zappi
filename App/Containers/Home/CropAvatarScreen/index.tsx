/* eslint-disable react-native/no-inline-styles */
import StyledButton from 'App/Components/StyledButton/StyledButton';
import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Platform, Dimensions, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { Image } from 'react-native-image-crop-picker';
import { NavigationProp } from '@react-navigation/core';
import { useAsync } from 'react-use';

import ModalSelectImage from 'App/Components/ModalSelectImage';
import useBoolean from 'App/Hooks/useBoolean';
import HeaderComponent from 'App/Components/Header/HeaderComponent';
import StyledText from 'App/Components/StyledText/StyledText';
import { updateAvatarStore } from 'App/Repositories/store';
import { requestUpdateStore } from 'App/Repositories/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateStoreDataAction } from 'App/Redux/store/StoreActions';
import { RootState } from 'App/Redux';
import { logError } from 'App/Utils/error';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const { width } = Dimensions.get('window');

interface IProps {
  navigation: NavigationProp<any>;
  route: any;
}

const CropAvatarScreen: FC<IProps> = ({ route, navigation }) => {
  const setImageLogo = route?.params?.setImageLogo;

  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const [imagePicker, setImagePicker] = useState<Partial<Image>>();

  const [isVisible, showIsVisible, hideIsVisible] = useBoolean();
  const [isLoading, showLoading, hideLoading] = useBoolean();

  const store = useSelector((state: RootState) => state.store);
  const dispatch = useDispatch();

  useEffect(() => {
    if (route?.params?.logoUrl) {
      setImagePicker({ path: route?.params?.logoUrl });
    } else if (store?.logoUrl) {
      setImagePicker({ path: store.logoUrl });
    }
  }, [store, route]);

  const handleSubmit = useCallback(async () => {
    if (imagePicker) {
      if (!!store?.logoUrl && !imagePicker?.mime) {
        navigation.goBack();
        return;
      }

      showLoading();
      try {
        const paths = (imagePicker.path || '').split('/') || [];
        const name = imagePicker.filename || paths[paths.length - 1] || 'image.png';

        const response = await updateAvatarStore({
          uri: imagePicker.path,
          name: name,
          fileName: name,
          height: imagePicker.height,
          width: imagePicker.width,
          size: imagePicker.size,
          type: imagePicker.mime,
        });

        if (response.status === 'SUCCEEDED') {
          if (setImageLogo) {
            setImageLogo(response);
          } else {
            await requestUpdateStore({ logoId: response.logoId });
            dispatch(updateStoreDataAction({ logoId: response.logoId, logoUrl: response.logoUrl }));
          }
          navigation.goBack();
        }
      } catch (error) {
        logError(error);
      } finally {
        hideLoading();
      }
    }
  }, [hideLoading, imagePicker, navigation, setImageLogo, showLoading, store]);

  return (
    <View style={styles.container}>
      <HeaderComponent styleViewBorder={styles.styleViewBorder} titleBack={t('Back')} />
      <View style={[styles.viewContent, { paddingBottom: Platform.OS === 'ios' ? bottom : 20 }]}>
        <View style={styles.viewCrop}>
          <TouchableOpacity onPress={showIsVisible} style={styles.borderCrop}>
            {!imagePicker ? (
              <View>
                <StyledText style={styles.textTapHere}>{t('Tap here')}</StyledText>
                <StyledText style={styles.textDesc}>{t('to upload your store logo')}</StyledText>
              </View>
            ) : (
              <FastImage source={{ uri: imagePicker.path }} resizeMode="cover" style={styles.image} />
            )}
          </TouchableOpacity>
        </View>

        <StyledButton loading={isLoading} onPress={handleSubmit} title="Save" />
      </View>

      <ModalSelectImage
        isVisible={isVisible}
        setImagePicker={setImagePicker}
        onClose={hideIsVisible}
        cropperCircleOverlay={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  viewContent: { paddingHorizontal: rw(15), flex: 1 },
  viewCrop: { flex: 1, paddingHorizontal: rw(15), alignItems: 'center', justifyContent: 'center' },
  borderCrop: {
    borderStyle: 'dashed',
    width: width - 60,
    height: width - 60,
    borderRadius: (width - 60) / 2,
    borderWidth: 1,
    borderColor: '#42A391',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textTapHere: { fontSize: rh(20), color: '#42A391', textAlign: 'center', fontWeight: '700' },
  textDesc: { marginTop: rh(6), color: '#4B4A4B', fontSize: 14 },
  image: { width: width - 60, height: width - 60, borderRadius: width - 60 },
  viewImage: { width: width, height: width, alignItems: 'center', justifyContent: 'center' },
  viewOverley: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewInsideOverley: {
    width: width - 60,
    height: width - 60,
    borderRadius: width - 60,
    backgroundColor: 'transparent',
  },
  styleViewBorder: { backgroundColor: '#fff' },
});

export default memo(CropAvatarScreen);
