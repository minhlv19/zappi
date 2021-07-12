import Header from 'App/Components/Header';
import StyledText from 'App/Components/StyledText/StyledText';
import StyledTextInput from 'App/Components/StyledTextInput/StyledTextInput';
import { Palette } from 'App/Theme/Palette';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import AddImageIcon from '../../../assets/icons/AddImageIcon.svg';
import FastImage from 'react-native-fast-image';
import NavigationService from 'App/navigation/NavigationService';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import StyledDropdownSelect, { StyleDropdownRowData } from 'App/Components/StyledDropdownSelect/StyledDropdownSelect';
import { Store, UpdateLogo } from 'App/Types';
import { useDispatch } from 'react-redux';
import { updateStoreDataAction } from 'App/Redux/store/StoreActions';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const businessTypeOptions: StyleDropdownRowData[] = [
  {
    title: '100% Online Seller',
    value: '1',
  },
  {
    title: 'Offline Retailer',
    value: '2',
  },
  {
    title: 'Restaurant',
    value: '3',
  },
  {
    title: 'Service Business',
    value: '4',
  },
  {
    title: 'Wholesaler',
    value: '5',
  },
  {
    title: 'Manufacturer',
    value: '6',
  },
  {
    title: 'Other',
    value: '7',
  },
];

const productTypeOptions: StyleDropdownRowData[] = [
  {
    title: 'Appliances',
    value: '1',
  },
  {
    title: 'Automotive Parts & Accessories',
    value: '2',
  },
  {
    title: 'Baby Products',
    value: '3',
  },
  {
    title: 'Beauty & Personal Care',
    value: '4',
  },
  {
    title: 'Clothing, Shoes and Jewelry',
    value: '5',
  },
  {
    title: 'Food & Beverage',
    value: '6',
  },
  {
    title: 'Home & Kitchen',
    value: '7',
  },
  {
    title: 'Office Supplies',
    value: '8',
  },
  {
    title: 'Pet Supplies',
    value: '9',
  },
  {
    title: 'Sports & Outdoors',
    value: '10',
  },
  {
    title: 'Tools & Home Improvement',
    value: '11',
  },
  {
    title: 'Toys & Games',
    value: '12',
  },
  {
    title: 'Other',
    value: '13',
  },
];

const RESTAURANT_BUSINESS_TYPE_INDEX = '2';
const F_AN_B_PRODUCT_TYPE_INDEX = '5';
const OTHER_PRODUCT_TYPE_INDEX = '12';

const CreateAccountScreen = ({ route, navigation }: any) => {
  const { t } = useTranslation('common');

  const [imageLogo, setImageLogo] = useState<UpdateLogo>();
  const [formErrors, setFormErrors] = useState({
    businessName: '',
    businessType: '',
    productType: '',
    otherProductType: '',
  });
  const [businessTypeSelectedIndex, setBusinessTypeSelectedIndex] = useState('-1');
  const [productTypeSelectedIndex, setProductTypeSelectedIndex] = useState('-1');
  const [businessName, setBusinessName] = useState('');
  const [isDisabledPressed, setIsDisabledPressed] = useState(false);
  const [otherProductType, setOtherProductType] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('imageLogo', imageLogo);
  }, [imageLogo]);

  const checkFormValid = () => {
    return (
      businessName &&
      businessTypeSelectedIndex != '-1' &&
      productTypeSelectedIndex != '-1' &&
      (productTypeSelectedIndex != OTHER_PRODUCT_TYPE_INDEX || !!otherProductType)
    );
  };

  const onPressDisabled = () => {
    setIsDisabledPressed(true);
    showFormErrors();
  };

  const showFormErrors = () => {
    setFormErrors({
      businessName: !businessName ? t('The field is required') : '',
      businessType: businessTypeSelectedIndex == '-1' ? t('The field is required') : '',
      productType: productTypeSelectedIndex == '-1' ? t('The field is required') : '',
      otherProductType: !otherProductType ? t('The field is required') : '',
    });
  };

  const onBusinessTypeSelect = (index: string, rowData: StyleDropdownRowData) => {
    console.log('index', index, typeof index);
    setBusinessTypeSelectedIndex(index);

    if (index == RESTAURANT_BUSINESS_TYPE_INDEX) {
      console.log('setting product type', F_AN_B_PRODUCT_TYPE_INDEX);
      setProductTypeSelectedIndex(F_AN_B_PRODUCT_TYPE_INDEX);
    }
  };

  const onProductTypeSelect = (index: string, rowData: StyleDropdownRowData) => {
    console.log('setProductTypeSelectedIndex', index);
    setProductTypeSelectedIndex(index);
  };

  const onContinuePress = () => {
    const updatedStore: Partial<Store> = {
      businessName,
      businessType: [
        'ONLINE_SELLER',
        'OFFLINE_RETAILER',
        'RESTAURANT',
        'SERVICE_BUSINESS',
        'WHOLESELLER',
        'MANUFACTURER',
        'OTHER',
      ][Number(businessTypeSelectedIndex)],
      productSetType: Number(productTypeSelectedIndex) !== 5 ? 'NON F&B' : 'F&B',
      productSetName: productTypeOptions[Number(productTypeSelectedIndex)].title,
      email,
      displayLocationOnlineEnabled: true,
      allowPickupEnabled: true,
      ...(imageLogo && { logoId: imageLogo.logoId }),
    };

    updatedStore.anytimeOrderEnabled = updatedStore.productSetType != 'F&B';
    updatedStore.deliveryType = {
      type: updatedStore.productSetType == 'F&B' ? 'RADIUS' : 'DOMESTIC',
    };

    dispatch(updateStoreDataAction(updatedStore));
    NavigationService.navigate('StoreInformationScreen');
  };

  useEffect(() => {
    if (isDisabledPressed) {
      showFormErrors();
    }
  }, [businessName, businessTypeSelectedIndex, productTypeSelectedIndex, otherProductType]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true); // or some other action
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // or some other action
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const goToCreateAvatar = useCallback(() => {
    NavigationService.navigate('CropAvatarScreen', { setImageLogo, logoUrl: imageLogo?.logoUrl });
  }, [imageLogo, setImageLogo]);

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Header title={t('Create account')} />
      <KeyboardAvoidingView
        behavior={'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 120}
        style={styles.screenContent}>
        <ScrollView>
          <TouchableOpacity style={styles.addLogoAreaContainer} onPress={goToCreateAvatar}>
            {imageLogo ? (
              <FastImage source={{ uri: imageLogo.logoUrl }} style={styles.logo} />
            ) : (
              <View style={styles.addLogoArea}>
                <AddImageIcon color={Palette.zaapi4} width={22} height={20} style={styles.addImageIcon} />
                <StyledText styles={styles.addLogoAreaText}>{t('Logo')}</StyledText>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.formContainer}>
            <View style={styles.formItem}>
              <StyledText style={styles.formItemTitle}>
                {t('Business Name')}
                <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
              </StyledText>
              <StyledTextInput
                placeholder={t('Let customers know your shop name')}
                onChangeText={text => setBusinessName(text)}
                errorMessage={formErrors.businessName}
              />
            </View>
            <View style={styles.formItem}>
              <StyledText style={styles.formItemTitle}>
                {t('Business Type')}
                <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
              </StyledText>
              <StyledDropdownSelect
                options={businessTypeOptions}
                style={styles.businessTypeDropdownSelect}
                dropdownStyle={styles.businessTypeDropdownSelect}
                placeholder={t('Nature of business')}
                onSelect={onBusinessTypeSelect}
                selectedIndex={businessTypeSelectedIndex}
                errorMessage={formErrors.businessType}
              />
            </View>
            <View style={styles.formItem}>
              <StyledText style={styles.formItemTitle}>
                {t('Types of Products')}
                <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
              </StyledText>
              <StyledDropdownSelect
                options={productTypeOptions}
                style={styles.businessTypeDropdownSelect}
                dropdownStyle={styles.businessTypeDropdownSelect}
                placeholder={t('Goods sold')}
                selectedIndex={productTypeSelectedIndex}
                onSelect={onProductTypeSelect}
                errorMessage={formErrors.productType}
              />
            </View>
            {productTypeSelectedIndex == OTHER_PRODUCT_TYPE_INDEX && (
              <View style={styles.formItem}>
                <StyledText style={styles.formItemTitle}>
                  {t('Others')}
                  <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                </StyledText>
                <StyledTextInput
                  placeholder={t('Type of products')}
                  onChangeText={text => setOtherProductType(text)}
                  errorMessage={formErrors.otherProductType}
                />
              </View>
            )}
            <View style={styles.formItem}>
              <StyledText style={styles.formItemTitle}>{t('Email')}</StyledText>
              <StyledTextInput
                placeholder={t('zaapi@example.com')}
                onChangeText={text => setEmail(text)}
                value={email}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.bottomSection}>
        <StyledButton
          disabled={!checkFormValid()}
          title={t('Continue')}
          style={styles.continueButton}
          onPressDisabled={onPressDisabled}
          onPress={onContinuePress}
        />
      </View>
    </View>
  );
};

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  screenContent: {
    position: 'absolute',
    marginTop: rh(102),
    borderRadius: 20,
    backgroundColor: Palette.white,
    height: screenHeight - 102,
    width: '100%',
    paddingLeft: rw(16),
    paddingRight: rw(16),
  },
  webviewContent: {
    borderRadius: 20,
  },
  addLogoAreaContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: rh(20),
    marginBottom: rh(30),
  },
  addLogoArea: {
    width: rw(94),
    height: rh(94),
    borderRadius: 94 / 2,
    borderColor: Palette.color_E3E3E3,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  addImageIcon: {
    marginTop: rh(27),
    marginBottom: rh(4),
  },
  addLogoAreaText: {
    color: Palette.zaapi4,
    fontWeight: '400',
  },
  formContainer: {},
  formItem: {
    //marginBottom: rh(16),
    height: rh(18 + 6 + 42 + 30),
  },
  formItemTitle: {
    fontWeight: '700',
    fontSize: rh(14),
    marginBottom: rh(6),
  },
  requiredMark: {
    color: Palette.error,
  },
  logo: {
    width: rw(94),
    height: rh(94),
    borderRadius: 94 / 2,
  },
  bottomSection: {
    position: 'absolute',
    flexDirection: 'column',
    width: screenWidth,
    bottom: 34,
    justifyContent: 'center',
    paddingLeft: rw(16),
    paddingRight: rw(16),
  },
  continueButton: {
    width: '100%',
  },
  businessTypeDropdownSelect: {
    width: screenWidth - 16 * 2,
  },
});

export default CreateAccountScreen;
