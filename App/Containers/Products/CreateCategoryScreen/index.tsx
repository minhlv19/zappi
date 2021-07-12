import React, { FC, memo, useCallback, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, InteractionManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import FastImage from 'react-native-fast-image';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import debounce from 'lodash/debounce';

import HeaderComponent from 'App/Components/Header/HeaderComponent';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import NavigationService from 'App/navigation/NavigationService';
import InputComponent from 'App/Components/Input/InputComponent';
import SwitchCustom from 'App/Components/Switch/SwitchCustom';
import { CreateCategoryScreenRouteProp } from 'App/navigation/NavigationRoute';
import ModalConfirmDeleteProduct from 'App/Containers/Products/ProductScreen/ModalConfirmDeleteProduct';
import useBoolean from 'App/Hooks/useBoolean';
import { Palette } from 'App/Theme/Palette';
import AddImageIcon from 'App/assets/icons/AddImageIcon.svg';
import ModalPickerImageCategory from './ModalPickerImageCategory';
import { logError } from 'App/Utils/error';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface IProps {
  route: CreateCategoryScreenRouteProp;
}

const CreateCategoryScreen: FC<IProps> = ({ route: { params } }) => {
  const { isEdit } = params;

  const { t } = useTranslation();
  const [nameCategory, setNameCategory] = useState<string>('');
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [imagePicker, setImagePicker] = useState<Image>();
  const [isVisibaleDelete, showModalDelete, hideModalDelete] = useBoolean();
  const [isVisibleChangeImage, showIsVisibleChangeImage, hideIsVisibleChangeImage] = useBoolean();

  const pickerImage = useCallback(() => {
    hideIsVisibleChangeImage();

    InteractionManager.runAfterInteractions(() => {
      debounce(async () => {
        try {
          const response = await ImagePicker.openPicker({ multiple: false });
          setImagePicker(response);
        } catch (error) {
          logError(error);
        }
      }, 200)();
    });
  }, [hideIsVisibleChangeImage]);

  const onDeleteImage = useCallback(() => {
    hideIsVisibleChangeImage();

    InteractionManager.runAfterInteractions(() => {
      setImagePicker(undefined);
    });
  }, [hideIsVisibleChangeImage]);

  return (
    <View style={styles.container}>
      <HeaderComponent styleViewBorder={styles.styleViewBorder} titleBack="Create Category" />

      <View style={styles.viewContent}>
        <Text style={styles.textTitle}>{t('Category Image')}</Text>

        <TouchableOpacity onPress={showIsVisibleChangeImage} style={styles.buttonImage}>
          {imagePicker ? (
            <FastImage source={{ uri: imagePicker.path }} style={styles.viewImage} />
          ) : (
            <View style={styles.addLogoArea}>
              <AddImageIcon color={Palette.zaapi4} width={22} height={20} style={styles.addImageIcon} />
              <Text style={styles.addLogoAreaText}>{t('Upload')}</Text>
            </View>
          )}
        </TouchableOpacity>

        <InputComponent
          value={nameCategory}
          onChangeText={setNameCategory}
          styleWapper={styles.styleWapperInput}
          label={`${t('Category Name')}*`}
          placeholder={t('Category Name')}
        />

        <View style={styles.viewDisableCategroy}>
          <View style={styles.viewContentCategory}>
            <Text style={styles.textTitle}>{t('Display category')}</Text>
            <Text style={styles.textDesc}>{t('Toggle off to hide this category from your shop')}</Text>
          </View>

          <SwitchCustom value={isDisable} onValueChange={setIsDisable} />
        </View>
      </View>

      <View style={styles.viewButton}>
        {isEdit ? (
          <View style={styles.viewActions}>
            <StyledButton onPressDisabled={showModalDelete} disabled style={styles.viewButtonEdit} title="Delete" />
            <View style={styles.viewCenter} />
            <StyledButton onPress={NavigationService.goBack} style={styles.viewButtonEdit} title="Confirm" />
          </View>
        ) : (
          <StyledButton title={t('Create Category')} onPress={NavigationService.goBack} />
        )}
      </View>

      <ModalConfirmDeleteProduct isVisible={isVisibaleDelete} onClose={hideModalDelete} />
      <ModalPickerImageCategory
        onDeleteImage={onDeleteImage}
        onChnageImage={pickerImage}
        isVisible={isVisibleChangeImage}
        onClose={hideIsVisibleChangeImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  styleViewBorder: { backgroundColor: '#fff' },
  viewContent: { flex: 1, paddingHorizontal: 15 },
  viewButton: { paddingBottom: getBottomSpace() || 20, paddingHorizontal: 15 },
  textTitle: { color: '#4B4A4B', fontSize: rh(14), fontWeight: '700' },
  viewImage: { width: rw(94), height: rh(94) },
  buttonImage: { width: rw(94), height: rh(94), marginTop: rh(6), borderRadius: 10, overflow: 'hidden' },
  styleWapperInput: { marginTop: rh(30) },
  viewDisableCategroy: { marginTop: rh(30), flexDirection: 'row', justifyContent: 'space-between' },
  textDesc: { color: '#999999', fontWeight: '400', marginTop: rh(3), fontSize: 12 },
  viewContentCategory: { flex: 1 },
  viewActions: { flexDirection: 'row', alignItems: 'center' },
  viewButtonEdit: { flex: 1 },
  viewCenter: { width: rw(8) },
  addLogoArea: {
    width: rw(94),
    height: rh(94),
    borderColor: Palette.color_E3E3E3,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  addLogoAreaText: { color: Palette.zaapi4, fontWeight: '400' },
  addImageIcon: { marginBottom: rh(4) },
});

export default memo(CreateCategoryScreen);
