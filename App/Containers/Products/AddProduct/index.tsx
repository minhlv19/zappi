import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  InteractionManager,
  GestureResponderEvent,
} from 'react-native';
import styles from './styles';
import StyleHeader from 'App/Components/Header/StyleHeader';
import { useTranslation } from 'react-i18next';
import BackIcon from 'App/assets/icons/BackIcon.svg';
import FastImage from 'react-native-fast-image';
import { Palette } from 'App/Theme/Palette';
import StyledText from 'App/Components/StyledText/StyledText';
import StyledTextInput from 'App/Components/StyledTextInput/StyledTextInput';
import StyledDropdownSelect, { StyleDropdownRowData } from 'App/Components/StyledDropdownSelect/StyledDropdownSelectv2';
import AddIcon from 'App/assets/icons/iconAdd.svg';
import SwitchCustom from 'App/Components/Switch/SwitchCustom';
import useBoolean from 'App/Hooks/useBoolean';
import { WebView } from 'react-native-webview';
import ModalSelectImage from './ModalSelectImage';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import ModalConfig from 'App/Components/ModalConfig';
import ImageHolder from 'App/assets/icons/ImageHolder.svg';
import ModalPickerImageCategory from './ModalPickerImageAddProduct';
import _ from 'lodash';
import debounce from 'lodash/debounce';
import { requestCreateProduct } from 'App/Repositories/product';
import CloseIcon from 'App/assets/svg/CloseIcon';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { requestImage } from 'App/Utils/image';
import { PenIcon } from 'App/assets/svg';
import { Category, DeliveryProfile, Store } from 'App/Types';
import NavigationService from 'App/navigation/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import { fetchDeliveryProfile, searchProductsAsyncAction } from 'App/Redux/product/ProductActions';
import { ProductFilterEnums, ProductOrderByEnums } from 'App/Types';
import { forseSetVariant } from 'App/Redux/variant/VariantAction';
import { VariantReduxState, variantsSelection, IVariantsValueOptions } from 'App/Redux/variant/VariantReducer';
import VariantBox from './VariantBox';
import HeaderComponent from 'App/Components/Header/HeaderComponent';
import { useLayout } from '@react-native-community/hooks';
import { fetchCategoryInfoActionAsync } from 'App/Redux/category/CategoryActions';
import useHandleRequestError from 'App/Hooks/useHandleRequestError';

const unitTypeOptions: StyleDropdownRowData[] = [
  {
    title: 'Piece',
    value: 'PER_PIECE',
  },
  {
    title: 'Box',
    value: 'PER_BOX',
  },
  {
    title: 'Kilo',
    value: 'PER_KILO',
  },
  {
    title: 'Other',
    value: 'OTHER',
  },
];

interface ImageProp {
  index: number;
  image?: Image;
}

const AddProduct = ({ route, navigation }: any) => {
  const chosenCategoryName = route.params?.chosenCategoryName;
  const { t } = useTranslation();
  const [chooseVisible, setChooseVisible] = useState(false);
  const [ProductName, setProductName] = useState('');
  const [Description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [isVisibleConfirm, showModalConfrim, hideModalConfirm] = useBoolean();
  const [isVisible, showIsVisible, hideIsVisible] = useBoolean();
  const [isDisabledPressed, setIsDisabledPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isOnFocus, setisOnFocus] = useState(false);

  const [isDisplayProductEnabled, setIsDisplayProductEnabled] = useState<boolean>(true);

  //Unit
  const [unitIndex, setUnitIndex] = useState('-1');
  const [unitOption, setUnitOption] = useState<StyleDropdownRowData>();

  const { displayFilter } = useSelector((state: RootState) => state.product);

  let [isFnB, setIsFnB] = useState<boolean>();
  const store: Partial<Store> = useSelector((state: RootState) => state.store);
  const handleRequestError = useHandleRequestError();

  useEffect(() => {
    if (isFnB === undefined) {
      setIsFnB(store.productSetType === 'F&B');
    }
  }, [store]);

  const [formErrors, setFormErrors] = useState({
    ProductName: '',
    // ProductCategory: '',
    Price: '',
    Stock: '',
    Unit: '',
    // DeliveryProfile: '',
  });
  const checkFormValid = () => {
    return (
      ProductName &&
      // productCategoriesOption.filter(v => v).length > 0 &&
      price &&
      +unitIndex > -1
      // &&
      // +deliveryProfileIndex > -1
    );
    //   && stock &&  && deliveryProfileIndex;

    // return ProductName && ProductCategoryIndex && price && stock && unitIndex && deliveryProfileIndex;
  };
  const showFormErrors = () => {
    setFormErrors({
      ProductName: !ProductName ? t('The field is required') : '',
      // ProductCategory: productCategoriesOption.filter(v => v).length == 0 ? t('The field is required') : '',
      Price: !price ? t('The field is required') : '',
      Stock: !stock ? t('The field is required') : '',
      Unit: unitIndex == '-1' ? t('The field is required') : '',
      // DeliveryProfile: deliveryProfileIndex == '-1' ? t('Please choose a delivery profile') : '',
    });
  };
  const onUnitSelect = (index: string, rowData: StyleDropdownRowData) => {
    setUnitIndex(index);
    setUnitOption(rowData);
  };

  const onPressDisabled = () => {
    setIsDisabledPressed(true);
    showFormErrors();
  };
  const onContinuePress = async () => {
    try {
      await requestCreateProduct({
        name: ProductName,
        description: Description,
        categoryIds: productCategoryValue.map(
          (v: { indexSelection: string; valueSelection?: StyleDropdownRowData }) => v?.valueSelection?.value || '',
        ),
        unitPrice: +price || 0,
        numberInStock: +stock || 0,
        isInStock: true, //Always true
        unitType: unitOption?.value,
        unitDetail: '',
        deliveryProfileId: deliveryProfileValue.valueSelection?.value || '',
        displayProductEnabled: isDisplayProductEnabled,
        photoUrls: listUriImage.filter(item => item),
        ...initBodyVariant(),
      });
      dispatch(
        searchProductsAsyncAction(
          displayFilter.searchText || '',
          displayFilter.filter || ProductFilterEnums.ALL,
          displayFilter.orderBy || ProductOrderByEnums.DATE_CREATED,
          displayFilter.categoryId || '',
        ),
      );

      dispatch(
        forseSetVariant([
          [
            {
              selectionIndex: '-1',
              selectionValue: null,
            },
          ],
          [],
          [],
          [],
        ]),
      );

      NavigationService.navigate('ProductScreen');
    } catch (e) {
      handleRequestError(e);
    }
  };

  const { variantsSelections, variantsChoice, variantsValueOptions }: VariantReduxState = useSelector(
    (state: RootState) => state.variant,
  );
  const initBodyVariant = useCallback(() => {
    let variantConfig: any = [];
    let variants: any = [];
    if (isFnB) {
      for (let i = 0; i < variantsChoice.length; i++) {
        variantConfig.push({
          name: variantsSelections[i].selectionValue?.title,
          minChoice: +variantsChoice[i]?.min || 0,
          maxChoice: +variantsChoice[i]?.max || 0,
        });
        for (let j = 0; j < variantsValueOptions[i].length; j++) {
          variants.push({
            appliedVariants: [
              {
                name: variantsSelections[i].selectionValue?.title,
                option: variantsValueOptions[i][j].title,
                isAvailable: variantsValueOptions[i][j].isAvailable,
              },
            ],
            addedPrice: +variantsValueOptions[i][j].price[0] || 0,
            numberInStock: 0,
          });
        }
      }
    } else if (!isFnB && variantsValueOptions.length === 2) {
      variantConfig = variantsSelections.map((v: variantsSelection) => ({ name: v.selectionValue?.title }));
      variantsValueOptions[0].forEach((v1: IVariantsValueOptions, i1: number) => {
        variantsValueOptions[1].forEach((v2: IVariantsValueOptions, i2: number) => {
          variants.push({
            appliedVariants: [
              {
                name: variantsSelections[0].selectionValue?.title,
                option: v1.title,
                isAvailable: true,
              },
              {
                name: variantsSelections[1].selectionValue?.title,
                option: v2.title,
                isAvailable: true,
              },
            ],
            addedPrice: +v2.price[i1] || 0,
            numberInStock: +v2.numberInStock[i1] || 0,
          });
        });
      });
    } else if (!isFnB && variantsValueOptions.length === 1) {
      variantConfig = variantsSelections.map((v: variantsSelection) => ({ name: v.selectionValue?.title }));
      variantsValueOptions[0].forEach((v1: IVariantsValueOptions, i1: number) => {
        variants.push({
          appliedVariants: [
            {
              name: variantsSelections[0].selectionValue?.title,
              option: v1.title,
              isAvailable: true,
            },
          ],
          addedPrice: +v1.price[0] || 0,
          numberInStock: +v1.numberInStock[0] || 0,
        });
      });
    }
    if (_.isEmpty(variantConfig) || _.isEmpty(variants)) {
      return {};
    }
    return {
      variantConfig,
      variants,
    };
  }, [variantsSelections, variantsChoice, variantsValueOptions]); //isFnB

  // Variable formated
  const dispatch = useDispatch();
  const { onLayout, height } = useLayout();
  const [isSetChoosen, setIsSetchoosen] = useState<boolean>(false);
  // flag
  const [isSetLatest, setIsSetLastest] = useState<{
    type: string;
    index?: number;
  }>();
  useEffect(() => {
    dispatch(fetchCategoryInfoActionAsync());
    dispatch(fetchDeliveryProfile());
  }, []);

  // Product Category state
  const { categories } = useSelector((state: RootState) => state.category);
  const [productCategoryValue, setProductCategoryValue] = useState<
    {
      indexSelection: string;
      valueSelection?: StyleDropdownRowData;
    }[]
  >([{ indexSelection: '-1' }]);
  const [productCategoryOptions, setProductCategoryOptions] = useState<StyleDropdownRowData[]>([]);
  useEffect(() => {
    setProductCategoryOptions(_.map(categories, (v: Category) => ({ title: v.name, value: v.id || '' })));
    if (isSetLatest && isSetLatest.type === 'CATEGORY' && _.isNumber(isSetLatest?.index))
      onSetValueProductCategory(
        isSetLatest?.index,
        categories.length - 1 + '',
        productCategoryOptions[categories.length - 1],
      );
    setIsSetLastest(undefined);
  }, [categories]);

  useEffect(() => {
    if (!isSetChoosen) {
      if (chosenCategoryName) {
        if (productCategoryOptions.length > 0) {
          let findIndex = _.findIndex(productCategoryOptions, _.matchesProperty('title', chosenCategoryName));
          if (findIndex > 0) {
            onSetValueProductCategory(0, findIndex + '', productCategoryOptions[findIndex]);
            setIsSetchoosen(true);
          }
        }
      } else {
        setIsSetchoosen(true);
      }
    }
  }, [chosenCategoryName, productCategoryOptions]);
  const onSetValueProductCategory = (
    indexCategory: number,
    indexSelection: string,
    valueSelection?: StyleDropdownRowData,
  ) => {
    setProductCategoryValue(
      _.map(productCategoryValue, (v: { indexSelection: string; valueSelection?: StyleDropdownRowData }, i: number) =>
        i === indexCategory
          ? {
              indexSelection,
              valueSelection,
            }
          : v,
      ),
    );
  };
  const onRemoveProductCategory = (index: number) => () => {
    setProductCategoryValue([productCategoryValue[index === 0 ? 1 : 0]]);
  };

  // delivery profile
  const { deliveryProfiles } = useSelector((state: RootState) => state.product);
  const [deliveryProfileCategoryOptions, setDeliveryProfileCategoryOptions] = useState<StyleDropdownRowData[]>([]);
  const [deliveryProfileValue, setDeliveryProfileValue] = useState<{
    indexSelection: string;
    valueSelection?: StyleDropdownRowData;
  }>({ indexSelection: '-1' });
  useEffect(() => {
    setDeliveryProfileCategoryOptions(
      _.map(deliveryProfiles, (v: DeliveryProfile) => ({ title: v.name, value: v.id || '' })),
    );
    if (isSetLatest && isSetLatest.type === 'PROFILE_DELIVERY') {
      setDeliveryProfileValue({
        indexSelection: deliveryProfiles.length - 1 + '',
        valueSelection: deliveryProfileCategoryOptions[deliveryProfiles.length - 1],
      });
      setIsSetLastest(undefined);
    }
  }, [deliveryProfiles]);

  // product image
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisibleSelectImageModal, showSelectImageModal, hideSelectImageModal] = useBoolean(false);
  const [isVisibleChangeImage, showIsVisibleChangeImage, hideIsVisibleChangeImage] = useBoolean();

  const [listImage, setListImage] = useState<ImageProp[]>([]);
  const [imageActive, setImageActive] = useState<number>();
  const [listUriImage, setUriListImage] = useState<string[]>([]);
  const setActiveImage = (index?: number) => () => {
    setImageActive(index);
  };

  useEffect(() => {
    if (_.isNumber(imageActive)) {
      if (listImage[imageActive]?.image) {
        showIsVisibleChangeImage();
      } else {
        showSelectImageModal();
      }
    }
  }, [imageActive]);

  const setImageSelectImage = async (data: Image) => {
    if (_.isNumber(imageActive)) {
      setIsLoading(true);
      let lstImg = [...listImage];

      const uriPhoto = await requestImage(data);
      if (uriPhoto) {
        let uriPhotoList = [...listUriImage];
        uriPhotoList[imageActive] = uriPhoto;
        setUriListImage(uriPhotoList);
      }
      lstImg[imageActive] = {
        image: data,
        index: lstImg[imageActive]?.index || imageActive,
      };
      if (imageActive === lstImg.length - 1 && lstImg.length < 9) {
        lstImg.push({ index: imageActive + 1 });
      }
      setListImage(lstImg);
      setIsLoading(false);
    }
  };
  const onChangeImage = () => {
    hideIsVisibleChangeImage();
    InteractionManager.runAfterInteractions(() => {
      debounce(async () => {
        try {
          const response = await ImagePicker.openPicker({ multiple: false });
          setImageSelectImage(response);
        } catch (error) {
        } finally {
          setImageActive(undefined);
        }
      }, 200)();
    });
  };
  const onSetasCoverPhoto = () => {
    hideIsVisibleChangeImage();
    InteractionManager.runAfterInteractions(() => {
      if (_.isNumber(imageActive)) {
        let newlstImage = [...listImage];
        let currentCover = listImage[0];
        let currentActive = listImage[imageActive];
        currentCover.index = imageActive;
        currentActive.index = 0;
        newlstImage[0] = currentActive;
        newlstImage[imageActive] = currentCover;
        setListImage(newlstImage);
        // Change uri
        let newListUri = [...listUriImage];
        let tmp = newListUri[0];
        newListUri[0] = newListUri[imageActive];
        newListUri[imageActive] = tmp;
        setUriListImage(newListUri);
      }
      setImageActive(undefined);
    });
  };

  const onDeleteImage = () => {
    hideIsVisibleChangeImage();
    InteractionManager.runAfterInteractions(() => {
      setListImage(
        [...listImage]
          .filter(v => v.index !== imageActive)
          .map((v, i) => ({
            ...v,
            index: i,
          })),
      );
      setUriListImage([...listUriImage].filter((v, i) => i !== imageActive));
      setImageActive(undefined);
    });
  };
  // const onClickShowChoose = (index: number) => {
  //   setImageActive(index);
  //   showIsVisible();
  // };

  return (
    <View style={styles.container}>
      <HeaderComponent
        onLayout={onLayout}
        styleViewBorder={styles.styleViewBorder}
        styleTitleBack={styles.styleTitleBack}
        titleBack={'Add Product'}
      />

      <ScrollView style={[styles.viewContainer, { top: height }]}>
        <View style={styles.item}>
          <StyledText style={styles.itemTitle}>{t('Product Image')}</StyledText>
          <View style={{ flexDirection: 'row' }}>
            <ChoosePicture
              imagePicker={listImage[0]?.image}
              onPress={setActiveImage(0)}
              loading={isLoading && imageActive === 0}
              isCover={true}
            />
            {_.chunk(_.tail(listImage), 4).map((v: ImageProp[]) =>
              v.map((item: ImageProp, index: number) => (
                <View key={index}>
                  <ChoosePicture
                    imagePicker={listImage[item.index]?.image}
                    onPress={setActiveImage(item.index)}
                    loading={isLoading && imageActive === item.index}
                  />
                </View>
              )),
            )}
          </View>
        </View>
        <View style={styles.item}>
          <View style={{ flexDirection: 'row' }}>
            <StyledText style={styles.itemTitle}>
              {t('Product Name')}
              <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
            </StyledText>

            <StyledText style={styles.txtLengthTitle}>{isOnFocus ? `${ProductName.length}/250` : ''}</StyledText>
          </View>
          <StyledTextInput
            placeholder={t('Title')}
            onChangeText={text => setProductName(text)}
            errorMessage={formErrors.ProductName}
            value={ProductName}
            maxLength={250}
            onPressIn={() => setisOnFocus(true)}
            onEndEditing={() => setisOnFocus(false)}
          />
        </View>
        <View style={styles.item}>
          <StyledText style={styles.itemTitle}>{t('Product Description')}</StyledText>
          <TouchableOpacity onPress={() => navigation.navigate('ProductDescription', { setDescription, Description })}>
            {Description.length > 0 ? (
              <View
                style={{
                  height: 114,
                  width: '100%',
                  borderRadius: 12,
                  borderStyle: 'solid',
                  borderWidth: 1,
                  borderColor: '#D6D6D6',
                  paddingVertical: 12,
                  paddingLeft: 13,
                  paddingRight: 61,
                }}>
                <WebView
                  originWhitelist={['*']}
                  source={{ html: `<body style="font-size:50px;">${Description}</body>` }}
                  injectedJavaScript={`
           `}
                />
              </View>
            ) : (
              <StyledTextInput placeholder={t('Description')} pointerEvents="none" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <StyledText style={styles.itemTitle}>
            {t('Product Category')}
            <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
          </StyledText>
          {productCategoryValue.map(
            (v: { indexSelection: string; valueSelection?: StyleDropdownRowData }, i: number) => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }} key={i}>
                <StyledDropdownSelect
                  options={productCategoryOptions}
                  selectedIndex={productCategoryValue[i].indexSelection}
                  style={[
                    styles.categoryTypeDropdownSelect,
                    {
                      marginBottom: rh(8),
                    },
                    productCategoryValue.length == 2 && styles.categoryTypeDropdownSelectWithDeletebtn,
                  ]}
                  createBtnName={'category'}
                  onClickAddBtn={() => {
                    navigation.navigate('CreateCategory', {
                      isEditing: false,
                      setIsSetLastest,
                      index: i,
                    });
                  }}
                  onSelect={(index: string, rawData: StyleDropdownRowData) =>
                    onSetValueProductCategory(i, index, rawData)
                  }
                  dropdownStyle={styles.categoryTypeDropdownSelect}
                  placeholder={t('Choose category')}
                  hideFields={
                    productCategoryValue.length == 2 && i === 0
                      ? [productCategoryValue[1].indexSelection]
                      : [productCategoryValue[0].indexSelection]
                  }
                />
                <TouchableOpacity onPress={onRemoveProductCategory(i)}>
                  <CloseIcon fill={Palette.zaapi3} width={rw(20)} height={rh(20)} />
                </TouchableOpacity>
              </View>
            ),
          )}

          {productCategoryValue.length < 2 && (
            <TouchableOpacity
              style={styles.viewBtnAddCategory}
              onPress={() => {
                if (productCategoryValue.length < 2) {
                  setProductCategoryValue([
                    ...productCategoryValue,
                    {
                      indexSelection: '-1',
                    },
                  ]);
                }
              }}>
              <View style={styles.icAddCategory}>
                <AddIcon fill="#4B4A4B" />
              </View>
              <Text style={styles.txtAddCategory}>{t('Add another category')}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.viewPriceStock}>
          <View style={[styles.item, { flex: 1, marginRight: rw(5) }]}>
            <StyledText style={styles.formItemTitle}>
              {t('Price (THB)')}
              <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
            </StyledText>
            <StyledTextInput
              placeholder={t('Price')}
              onChangeText={text => setPrice(text)}
              errorMessage={formErrors.Price}
            />
          </View>
          <View style={[styles.item, { flex: 1, marginLeft: rw(5) }]}>
            <StyledText style={styles.formItemTitle}>
              {t('Stock')}
              <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
            </StyledText>
            <StyledTextInput
              placeholder={t('0')}
              onChangeText={text => setStock(text)}
              errorMessage={formErrors.Stock}
            />
          </View>
        </View>

        <View style={styles.item}>
          <StyledText style={styles.itemTitle}>
            {t('Unit')}
            <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
          </StyledText>
          <StyledDropdownSelect
            options={unitTypeOptions}
            style={styles.categoryTypeDropdownSelect}
            dropdownStyle={styles.categoryTypeDropdownSelect}
            placeholder={t('Choose unit')}
            selectedIndex={unitIndex}
            onSelect={onUnitSelect}
            errorMessage={formErrors.Unit}
          />
        </View>

        <View style={styles.viewVariants}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.txtVariants}>{t('Variants')}</Text>
            {variantsValueOptions.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddVariants');
                }}>
                <PenIcon color={Palette.zaapi2} />
              </TouchableOpacity>
            )}
          </View>
          <VariantBox isFnB={isFnB} />
        </View>
        <View style={styles.viewDeliveryFees}>
          <Text style={styles.txtVariants}>{t('Delivery Fees')}</Text>
          <View style={[styles.formItem, { marginTop: rh(20) }]}>
            <StyledText style={styles.formItemTitle}>
              {t('Delivery Profile')}
              <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
            </StyledText>

            <StyledDropdownSelect
              options={deliveryProfileCategoryOptions}
              style={styles.categoryTypeDropdownSelect}
              dropdownStyle={styles.categoryTypeDropdownSelect}
              placeholder={t('Choose a delivery profile')}
              selectedIndex={deliveryProfileValue.indexSelection}
              onSelect={(index, opt) => {
                setDeliveryProfileValue({
                  indexSelection: index,
                  valueSelection: opt,
                });
              }}
              createBtnName={'delivery profile'}
              onClickAddBtn={() => {
                navigation.navigate('CreateNewDeliveryProfile', {
                  setIsSetLastest,
                });
              }}
              // errorMessage={formErrors.DeliveryProfile}
            />
          </View>
          <View style={{ marginTop: rh(30) }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <StyledText style={styles.formItemTitle}>{t('Display Product')}</StyledText>
              <SwitchCustom
                onValueChange={() => {
                  setIsDisplayProductEnabled(!isDisplayProductEnabled);
                }}
                value={isDisplayProductEnabled}
              />
            </View>

            <Text>{t('Toggle off to hide this product from your shop')}</Text>
          </View>
          <View style={styles.bottomSection}>
            <StyledButton
              disabled={!checkFormValid()}
              title={t('Add Product')}
              style={styles.AddButton}
              onPressDisabled={onPressDisabled}
              onPress={onContinuePress}
            />
          </View>
        </View>
      </ScrollView>

      <ModalConfig
        visible={modalVisible}
        setVisible={setModalVisible}
        action={() => {
          setModalVisible(false);
          dispatch(
            forseSetVariant([
              [
                {
                  selectionIndex: '-1',
                  selectionValue: null,
                },
              ],
              [],
              [],
              [],
            ]),
          );
          navigation.goBack();
        }}
      />

      <ModalSelectImage
        isVisible={isVisibleSelectImageModal}
        setImagePicker={setImageSelectImage}
        onClose={() => {
          setImageActive(undefined);
          hideSelectImageModal();
        }}
      />

      <ModalPickerImageCategory
        showSetAsCoverPhoto={imageActive !== 0}
        onDeleteImage={onDeleteImage}
        onChnageImage={onChangeImage}
        isVisible={isVisibleChangeImage}
        onClose={() => {
          setImageActive(undefined);
          hideIsVisibleChangeImage();
        }}
        onSetasCoverPhoto={onSetasCoverPhoto}
      />
    </View>
  );
};

interface PropsChoosePicture {
  loading?: boolean;
  imagePicker: Image | undefined;
  onPress?: (event: GestureResponderEvent) => void;
  isCover?: boolean;
}

function ChoosePicture(props: PropsChoosePicture) {
  const { imagePicker, onPress, loading, isCover } = props;
  return (
    <TouchableOpacity
      style={[
        styles.addLogoAreaContainer,
        !isCover && {
          width: rw(42.73),
          height: rh(42.73),
          marginLeft: rw(10),
          marginBottom: rh(7),
        },
      ]}
      onPress={loading ? () => {} : onPress}>
      <View style={styles.containerImage}>
        {loading ? (
          <ActivityIndicator style={styles.loading} animating={true} color="red" />
        ) : (
          <>
            {imagePicker ? (
              <FastImage source={{ uri: imagePicker.path }} style={styles.image} />
            ) : (
              <View style={styles.viewImageholder}>
                <ImageHolder style={{ justifyContent: 'center', alignSelf: 'center' }} />
                {isCover && <StyledText style={styles.txtUpload}>{'Upload'}</StyledText>}
              </View>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default AddProduct;
