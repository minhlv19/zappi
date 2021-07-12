import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import styles from './styles';
import StyleHeader from 'App/Components/Header/StyleHeader';
import GoBackIcon from 'App/assets/icons/GoBackIcon.svg';
import BackIcon from 'App/assets/icons/BackIcon.svg';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import StyledText from 'App/Components/StyledText/StyledText';
import FastImage from 'react-native-fast-image';
import useBoolean from 'App/Hooks/useBoolean';
import { Image } from 'react-native-image-crop-picker';
import StyledTextInput from 'App/Components/StyledTextInput/StyledTextInput';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import ImageHolder from 'App/assets/icons/ImageHolder.svg';
import { initFormData } from 'App/Utils/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import Header from 'App/Components/Header';
import ModalConfirmDeleteProduct from '../ProductScreen/ModalConfirmDeleteProduct';
import {
  deleteCategoryAsyncAction,
  fetchCategoryInfoActionAsync,
  searchCategoriesAsyncAction,
  updateCategoryAsyncAction,
} from 'App/Redux/category/CategoryActions';
import SwitchCustom from 'App/Components/Switch/SwitchCustom';
import { CategoryFilterEnums } from 'App/Types';
import { logError } from 'App/Utils/error';
import { updateErrorModalData } from 'App/Redux/appState/AppStateActions';
import { requestCreateCategory, requestUploadImageCategory } from 'App/Repositories/category';
import ModalSelectImage from 'App/Components/ModalSelectImage';

export interface ICreateCategoryRouteParams {
  isEditing?: boolean;
  setIsSetLastest?: React.Dispatch<
    React.SetStateAction<{
      type: string;
      index?: number;
    }>
  >;
  index?: number;

  fetchProductCategories: any;
  setProductStateByIndex: any;
  setIsCreatedProductCategories: any;
}

const CreateCategory = ({ route, navigation }: any) => {
  const { params }: { params: ICreateCategoryRouteParams } = route;
  const { isEditing } = params;
  const { t } = useTranslation();
  const [isVisible, showIsVisible, hideIsVisible] = useBoolean();
  const [loading, setLoading] = useState(false);
  const [imagePicker, setImagePicker] = useState<Partial<Image> | undefined>();
  const [isDisabledPressed, setIsDisabledPressed] = useState(false);
  const [formErrors, setFormErrors] = useState({
    categoryName: '',
  });
  const { selectedCategory, displayFilter, categories } = useSelector((state: RootState) => state.category);
  const [uriPhoto, setUriPhoto] = useState<string>(isEditing ? selectedCategory?.photoUrl || '' : '');
  const [isVisibaleDelete, showModalDelete, hideModalDelete] = useBoolean();
  const [categoryName, setCategoryName] = useState(isEditing ? selectedCategory?.name || '' : '');
  const dispatch = useDispatch();
  const [displayCategoryEnabled, setDisplayCategoryEnabled] = useState(
    isEditing ? selectedCategory?.displayCategoryEnabled || false : true,
  );
  const isEditingOtherCategory = isEditing && selectedCategory?.name == t('Other');

  const checkFormValid = () => {
    return categoryName;
  };
  const showFormErrors = () => {
    setFormErrors({
      categoryName: !categoryName ? t('The field is required') : '',
    });
  };
  const onPressDisabled = () => {
    setIsDisabledPressed(true);
    showFormErrors();
  };

  useEffect(() => {
    if (imagePicker) {
      const formData = initFormData(imagePicker);
      if (formData) {
        (async () => {
          const { photoUrl } = await requestUploadImageCategory(formData);
          setUriPhoto(photoUrl);
        })();
      }
    }
  }, [imagePicker]);
  const onContinuePress = async () => {
    try {
      if (isEditing) {
        dispatch(
          updateCategoryAsyncAction({
            id: selectedCategory?.id,
            name: categoryName,
            photoUrl: uriPhoto,
            displayCategoryEnabled,
          }),
        );
        navigation.goBack();
      } else {
        await requestCreateCategory({
          name: categoryName,
          photoUrl: uriPhoto,
          displayCategoryEnabled,
        });
        await dispatch(fetchCategoryInfoActionAsync());
        if (params.setIsSetLastest) {
          params.setIsSetLastest({
            type: 'CATEGORY',
            index: params?.index,
          });
        }
        navigation.goBack();
      }
    } catch (e) {
      logError(e);
      let errorTitle: string;
      let errorSubtitle: string;
      if (e?.response?.data?.errorCode == 'ZPSTORE0005') {
        errorTitle = t('Sorry, this name already exists');
        errorSubtitle = t('You have already created a category with this name. Please change the name and try again.');
      } else {
        errorTitle = t('An error occurred');
        errorSubtitle = e?.response?.data?.message;
      }
      dispatch(
        updateErrorModalData({
          title: errorTitle,
          subtitle: errorSubtitle,
          dismissButtonTitle: t('Got It'),
          display: true,
        }),
      );
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title={isEditing ? selectedCategory?.name : t('Create New Category')}
        icon={
          <GoBackIcon
            width={20}
            color={'#ffffff'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
      />
      <ScrollView style={styles.content}>
        <View>
          <View>
            <StyledText style={styles.formItemTitle}>{t('Product Image')}</StyledText>
          </View>

          <TouchableOpacity style={styles.addLogoAreaContainer} onPress={showIsVisible}>
            <View style={styles.containerImage}>
              {loading ? <ActivityIndicator style={styles.loading} animating={true} /> : null}
              {!imagePicker && (!isEditing || !selectedCategory?.photoUrl) ? (
                <View style={styles.viewImageholder}>
                  <ImageHolder style={{ justifyContent: 'center', alignSelf: 'center' }} />
                  <StyledText style={styles.txtUpload}>{'Upload'}</StyledText>
                </View>
              ) : (
                <FastImage
                  source={{ uri: imagePicker?.path || (params.isEditing ? selectedCategory?.photoUrl : '') }}
                  style={styles.image}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.formItem}>
          <StyledText style={styles.formItemTitle}>
            {t('Category Name')}
            <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
          </StyledText>
          <StyledTextInput
            placeholder={t('Category Name')}
            onChangeText={text => setCategoryName(text)}
            errorMessage={formErrors.categoryName}
            defaultValue={isEditing ? selectedCategory?.name : ''}
            editable={!isEditingOtherCategory}
          />
        </View>
        <View style={styles.viewDisableCategory}>
          <View style={styles.viewContentCategory}>
            <Text style={styles.textTitle}>{t('Display category')}</Text>
            <Text style={styles.textDesc}>{t('Toggle off to hide this category from your shop')}</Text>
          </View>

          <SwitchCustom
            disabled={isEditingOtherCategory}
            value={displayCategoryEnabled}
            onValueChange={setDisplayCategoryEnabled}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomSection}>
        {isEditing ? (
          <View style={styles.viewActions}>
            {!isEditingOtherCategory && (
              <>
                <StyledButton onPressDisabled={showModalDelete} disabled style={styles.viewButtonEdit} title="Delete" />
                <View style={styles.viewCenter} />
              </>
            )}
            <StyledButton
              style={styles.viewButtonEdit}
              title={t('Save')}
              disabled={!checkFormValid()}
              onPressDisabled={onPressDisabled}
              onPress={onContinuePress}
            />
          </View>
        ) : (
          <StyledButton
            disabled={!checkFormValid()}
            title={t('Create Category')}
            style={styles.continueButton}
            onPressDisabled={onPressDisabled}
            onPress={onContinuePress}
          />
        )}
      </View>
      <ModalConfirmDeleteProduct
        isProduct={false}
        isVisible={isVisibaleDelete}
        onClose={hideModalDelete}
        onConfirm={() => {
          dispatch(deleteCategoryAsyncAction(selectedCategory?.id || ''));
          navigation.goBack();
        }}
      />
      <ModalSelectImage isVisible={isVisible} setImagePicker={setImagePicker} onClose={hideIsVisible} />
      {/*<ModalChangeSelectImage isVisible={isVisibleChange} setImagePicker={setImagePicker} onClose={hideIsVisible} />*/}
    </View>
  );
};

export default CreateCategory;
