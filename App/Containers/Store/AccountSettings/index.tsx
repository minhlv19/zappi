import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import StyleHeader from 'App/Components/Header/StyleHeader';
import BackIcon from 'App/assets/icons/BackIcon.svg';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/Utils/style';
import { Palette } from 'App/Theme/Palette';
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { Trans, useTranslation } from 'react-i18next';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import ModalConfig from 'App/Containers/Store/AccountSettings/ModalConfig';
import FastImage from 'react-native-fast-image';
import { LogoIcon } from 'App/assets/svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import NavigationService from 'App/navigation/NavigationService';
import StyledText from 'App/Components/StyledText/StyledText';
import StyledTextInput from 'App/Components/StyledTextInput/StyledTextInput';
import StyledDropdownSelect, { StyleDropdownRowData } from 'App/Components/StyledDropdownSelect/StyledDropdownSelect';
import ModalDropdown from 'react-native-modal-dropdown';
import COUNTRIES from 'App/assets/other/countries.json';
import { getDefaultCountryCode } from 'App/Utils/localize';
import { isPhoneNumberValid } from 'App/Utils/validation';
import { getFullPhoneNumber } from 'App/Utils/convert';
import { requestSendOTP } from 'App/Repositories/auth';
import SwitchCustom from 'App/Components/Switch/SwitchCustom';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import TextLink from 'App/Containers/Store/AccountSettings/TextLink';
import { getStoredProperty } from 'App/Utils/storage';
import { ConfirmModalStateEnums, ConfirmModalTypeEnums, Store, UpdateLogo } from 'App/Types';
import {
  resetConfirmModalData,
  updateConfirmModalData,
  updateSuccessModalData,
} from 'App/Redux/appState/AppStateActions';
import ModalBottomActionDiscount from 'App/Containers/Discounts/ModalBottomActionDiscount';
import { requestUpdateStore } from 'App/Repositories/store';
import { updateStoreDataAction } from 'App/Redux/store/StoreActions';
import { deleteDiscountAsyncAction, resetDiscountToCreateAction } from 'App/Redux/discount/DiscountActions';

const businessTypeOptions: StyleDropdownRowData[] = [
  {
    title: '100% Online Seller',
    value: '1',
    type: 'ONLINE_SELLER',
  },
  {
    title: 'Offline Retailer',
    value: '2',
    type: 'ONLINE_SELLER',
  },
  {
    title: 'Restaurant',
    value: '3',
    type: 'RESTAURANT',
  },
  {
    title: 'Service Business',
    value: '4',
    type: 'SERVICE_BUSINESS',
  },
  {
    title: 'Wholesaler',
    value: '5',
    type: 'WHOLESELLER',
  },
  {
    title: 'Manufacturer',
    value: '6',
    type: 'MANUFACTURER',
  },
  {
    title: 'Other',
    value: '7',
    type: 'OTHER',
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
let options = COUNTRIES.map(country => ({
  countryLogo: `https://www.countryflags.io/${country.code}/flat/64.png`,
  phonePrefix: country.dial_code,
  countryCode: country.code,
  countryName: country.name,
}));
interface CountryOptionProps {
  index: string;
  countryName: string;
}
let CountryOption = memo(({ index, countryName }: CountryOptionProps) => {
  return (
    <View style={styles.countryNameTextContainer}>
      <StyledText style={[styles.countryNameText, index == '0' ? { color: Palette.zaapi3 } : {}]}>
        {countryName}
      </StyledText>
    </View>
  );
});
const getDefaultCountryPrefix = () => {
  const countryCode = getDefaultCountryCode();

  const option = options.find(i => i.countryCode == countryCode);
  return option ? option.phonePrefix || '' : '+66';
};
const RESTAURANT_BUSINESS_TYPE_INDEX = '2';
const F_AN_B_PRODUCT_TYPE_INDEX = '5';
const OTHER_PRODUCT_TYPE_INDEX = '12';
const AccountSettings = ({ route }: any) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const store: Partial<Store> = useSelector((state: RootState) => state.store);
  const [businessTypeSelectedIndex, setBusinessTypeSelectedIndex] = useState('-1');
  const [productTypeSelectedIndex, setProductTypeSelectedIndex] = useState('-1');
  const [countryPrefix, setCountryPrefix] = useState<string>(getDefaultCountryPrefix());
  const [otherProductType, setOtherProductType] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitBtnDisable, setIsSubmitBtnDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isPhonePrefixShowing, setIsPhonePrefixShowing] = useState(false);
  const [isDisplayonStoreEnabled, setIsDisplayonStoreEnabled] = useState<boolean>(true);
  const [linkInstagram, setLinkInstagram] = useState('');
  const [linkFacebook, setLinkFacebook] = useState('');
  const [LINEofficial, setLINEofficial] = useState('');
  const [isDisabledPressed, setIsDisabledPressed] = useState(false);
  const { confirmModalData } = useSelector((state: RootState) => state.appState);
  const [formErrors, setFormErrors] = useState({
    businessName: '',
    businessType: '',
    productType: '',
    otherProductType: '',
  });
  const [imageLogo, setImageLogo] = useState<UpdateLogo>();
  const goToChangeLogo = useCallback(() => {
    NavigationService.navigate('CropAvatarScreen', { setImageLogo, logoUrl: imageLogo?.logoUrl });
  }, [imageLogo, setImageLogo]);
  const onBusinessTypeSelect = (index: string, rowData: StyleDropdownRowData) => {
    console.log('index', index, typeof index);
    setBusinessTypeSelectedIndex(index);

    if (index == RESTAURANT_BUSINESS_TYPE_INDEX) {
      console.log('setting product type', F_AN_B_PRODUCT_TYPE_INDEX);
      setProductTypeSelectedIndex(F_AN_B_PRODUCT_TYPE_INDEX);
    }
  };
  useEffect(() => {
    (async () => {
      const numberPhone = await getStoredProperty('phoneNumber');
      setPhoneNumber(numberPhone);
      setBusinessName(`${store.businessName}`);
      setBusinessTypeSelectedIndex(`${store.businessType}`);
      setEmail(`${store.email}`);
      console.log('numberPhone', numberPhone);
    })();
  }, []);
  useEffect(() => {
    if (confirmModalData.type === ConfirmModalTypeEnums.ACCOUNT_SETTING_EXIT) {
      if (confirmModalData.state === ConfirmModalStateEnums.CONFIRMED) {
        dispatch(resetConfirmModalData());
        NavigationService.goBack();
      }
      if (confirmModalData.state === ConfirmModalStateEnums.CANCELLED) {
        dispatch(resetConfirmModalData());
      }
    }
  }, [confirmModalData]);
  const validatePhoneNumber = (printMessage: boolean = true) => {
    let errorMessage = '';
    if (phoneNumber.length === 0) {
      // When phone number empty
      errorMessage = 'Please enter a valid phone number';
    } else {
      // When phone number nonempty
      if (!isPhoneNumberValid(getFullPhoneNumber(countryPrefix, phoneNumber))) {
        // Phone number invalid
        errorMessage = 'Your phone number is invalid';
      }
    }
    if (printMessage) {
      setErrorMessage(errorMessage);
    }
    if (isSubmitBtnDisable !== !!errorMessage) {
      setIsSubmitBtnDisable(!!errorMessage);
    }
    // Return trie when errorMessage not empty
    return !!errorMessage;
  };
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

  const onProductTypeSelect = (index: string, rowData: StyleDropdownRowData) => {
    console.log('setProductTypeSelectedIndex', index);
    setProductTypeSelectedIndex(index);
  };

  const onFocusNumberPhone = () => {
    // Clear
    setErrorMessage('');
  };
  const onBlurNumberPhone = () => {
    validatePhoneNumber();
  };
  const onContinuePress = async () => {
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
      ...(imageLogo && { logoId: imageLogo.logoId }),
    };

    setFormErrors({
      businessName: !businessName ? t('The field is required') : '',
      businessType: businessTypeSelectedIndex == '-1' ? t('The field is required') : '',
      productType: productTypeSelectedIndex == '-1' ? t('The field is required') : '',
      otherProductType: !otherProductType ? t('The field is required') : '',
    });
    await requestUpdateStore(updatedStore);
    dispatch(updateStoreDataAction(updatedStore));
    dispatch(
      updateSuccessModalData({
        display: true,
      }),
    );
  };
  const selectedLanguageIndex = options.findIndex(option => option.phonePrefix == countryPrefix);
  const renderLanguageDropdownMainItem = (rowData: any, index: string) => {
    const isDropdownSelected = index == '-1';
    const isSelected = !isDropdownSelected && countryPrefix === rowData.phonePrefix;
    return (
      <View
        style={[
          styles.languageOptionContainer,
          isSelected ? { backgroundColor: Palette.white } : {},
          isDropdownSelected ? { height: rh(40) } : {},
          isPhonePrefixShowing ? { borderColor: Palette.color_42A391 } : {},
        ]}>
        <FastImage source={{ uri: rowData.countryLogo }} style={styles.languageOptionLogo} />
        <StyledText style={[styles.languageOptionText, isSelected ? { color: Palette.zaapi2 } : {}]}>
          {rowData.phonePrefix}
        </StyledText>
      </View>
    );
  };
  const onReject = () => {
    dispatch(
      updateConfirmModalData({
        title: t('Are you sure you want to leave this page without saving?'),
        display: true,
        type: ConfirmModalTypeEnums.ACCOUNT_SETTING_EXIT,
        metadata: {
          source: AccountSettings.name,
        },
      }),
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StyleHeader
        isStatusbar={true}
        title={t('Account Settings')}
        styleTitle={styles.titleHeaderStyle}
        iconLeft={<BackIcon />}
        styleiconLeft={styles.icLeftHeaderStyle}
        actionLeft={onReject}
        styleHeader={styles.styleHeader}
      />
      <ScrollView style={styles.content}>
        <View style={styles.viewContent}>
          <View style={styles.viewLogo}>
            <TouchableOpacity onPress={goToChangeLogo} style={styles.viewLogo}>
              {store?.logoUrl ? (
                <FastImage source={{ uri: store.logoUrl }} resizeMode="cover" style={styles.viewLogo} />
              ) : (
                <LogoIcon width={53} height={53} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.formItem}>
              <StyledText style={styles.formItemTitle}>
                {t('Business Name')}
                <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
              </StyledText>
              <StyledTextInput
                placeholder={t('Let customers know your shop name')}
                onChangeText={text => setBusinessName(text)}
                value={businessName}
                style={styles.styleInput}
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
                dropdownStyle={styles.businessTypedropdownStyle}
                placeholder={t('Nature of business')}
                onSelect={onBusinessTypeSelect}
                selectedIndex={
                  productTypeOptions.findIndex(item => item.title == store.productSetName).toString() || ''
                }
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
                dropdownStyle={styles.businessTypedropdownStyle}
                placeholder={t('Goods sold')}
                selectedIndex={
                  productTypeOptions.findIndex(item => item.title == store.productSetName).toString() || ''
                }
                // productTypeOptions.findIndex(item => item.value == discountToCreate.rule?.type).toString() || ''
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
                  style={styles.txtTitle}
                />
              </View>
            )}
            <View style={styles.formItem}>
              <StyledText style={styles.formItemTitle}>{t('Email')}</StyledText>
              <StyledTextInput
                placeholder={t('zaapi@example.com')}
                onChangeText={text => setEmail(text)}
                value={email}
                style={styles.styleInput}
              />
            </View>
          </View>
        </View>
        <View style={styles.viewContactDetails}>
          <StyledText style={styles.txtContactDetails}>{t('Contact Details')}</StyledText>
          <View style={[styles.formItem, { marginTop: rh(30) }]}>
            <StyledText style={styles.formItemTitle}>{t('Phone Number')}</StyledText>
            <View style={styles.phoneNumberInputContainer}>
              <View style={styles.languageDropdown}>
                {renderLanguageDropdownMainItem(options[selectedLanguageIndex], '-1')}
              </View>
              {/*renderLanguageDropdownMainItem(options[selectedLanguageIndex], '-1')*/}
              {/*<ModalDropdown*/}
              {/*  options={options}*/}
              {/*  disabled={false}*/}
              {/*  style={styles.languageDropdown}*/}
              {/*  dropdownStyle={[styles.languageDropdownStyle]}*/}
              {/* renderRow={(rowData, index) => <CountryOption countryName={rowData.countryName} index={index} />}*/}
              {/*  onSelect={(index, option) => {*/}
              {/*    if (option.countryCode != 'none') {*/}
              {/*      setCountryPrefix(option.phonePrefix || '');*/}
              {/*    }*/}
              {/*  }}*/}
              {/*  renderSeparator={() => <></>}*/}
              {/*  onDropdownWillShow={() => setIsPhonePrefixShowing(false)}*/}
              {/*  onDropdownWillHide={() => setIsPhonePrefixShowing(false)}>*/}
              {/*  {renderLanguageDropdownMainItem(options[selectedLanguageIndex], '-1')}*/}
              {/*</ModalDropdown>*/}
              <StyledTextInput
                style={styles.phoneNumberInput}
                value={phoneNumber}
                errorMessage={errorMessage}
                keyboardType="numeric"
                onFocus={onFocusNumberPhone}
                onBlur={onBlurNumberPhone}
                editable={false}
              />
            </View>
          </View>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <StyledText style={styles.txtDisplayonstore}>{t('Display on store')}</StyledText>
              <SwitchCustom
                onValueChange={() => {
                  setIsDisplayonStoreEnabled(!isDisplayonStoreEnabled);
                }}
                value={isDisplayonStoreEnabled}
              />
            </View>
            <StyledText style={styles.txtSubAccount}>
              {t(
                'If you do not register any account, your phone number will be displayed on your online store for customers to contact you.',
              )}
            </StyledText>
          </View>
          <View style={styles.formItem}>
            <StyledText style={styles.formItemTitle}>{t('Instagram')}</StyledText>
            <TextLink
              linktitle={'https://www.instagram.com/'}
              placeholder={t('account')}
              onChangeText={text => setLinkInstagram(text)}
              value={linkInstagram}
            />
          </View>
          <View style={styles.formItem}>
            <StyledText style={styles.formItemTitle}>{t('Facebook')}</StyledText>
            <TextLink
              linktitle={'https://www.facebook.com/'}
              placeholder={t('account')}
              onChangeText={text => setLinkFacebook(text)}
              value={linkFacebook}
            />
          </View>

          <View style={styles.formItem}>
            <StyledText style={styles.formItemTitle}>{t('LINE official')}</StyledText>
            <TextLink
              linktitle={'@'}
              placeholder={t('youraccount')}
              onChangeText={text => setLINEofficial(text)}
              value={LINEofficial}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.viewbtnSave}>
        <StyledButton
          title={'Save'}
          disabled={!checkFormValid()}
          onPressDisabled={onPressDisabled}
          onPress={onContinuePress}
        />
      </View>
      <ModalConfig
        visible={modalVisible}
        setVisible={setModalVisible}
        action={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleHeaderStyle: {
    fontWeight: 'bold',
    fontSize: rh(18),
    lineHeight: rh(23),
    color: Palette.white,
    marginLeft: rw(20),
    justifyContent: 'center',
  },
  icLeftHeaderStyle: {
    justifyContent: 'center',
    marginLeft: rw(20),
  },
  styleHeader: {
    position: 'absolute',
    width: wp('100%'),
  },
  content: {
    width: wp('100'),
    marginTop: rh(100),
    height: heightPercentageToDP('100%'),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: Palette.color_F5F5F5,
  },
  viewbtnSave: {
    paddingHorizontal: rw(16),
    backgroundColor: Palette.white,
    paddingBottom: rh(34),
    paddingTop: rh(10),
    borderTopWidth: 0.5,
    borderColor: Palette.grey,
  },
  viewLogo: {
    width: rw(94),
    height: rw(94),
    borderRadius: 94,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  formContainer: {
    marginTop: rh(26),
  },
  formItem: {
    //marginBottom: rh(16),
    height: rh(18 + 6 + 42 + 30),
  },
  formItemTitle: {
    fontWeight: '700',
    fontSize: rh(14),
    marginBottom: rh(6),
  },
  businessTypeDropdownSelect: {
    width: '100%',
    height: rh(42),
  },
  styleInput: {
    height: rh(42),
    fontWeight: '600',
    fontSize: rh(14),
    lineHeight: rh(18),
    display: 'flex',
    alignItems: 'center',
  },
  requiredMark: {
    color: Palette.error,
  },
  businessTypedropdownStyle: {
    width: '90%',
  },
  txtTitle: {
    fontSize: rh(14),
    fontWeight: '600',
    lineHeight: rh(18),
    display: 'flex',
    alignItems: 'center',
    color: Palette.zaapi4,
  },
  viewContent: {
    backgroundColor: Palette.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: rw(16),
    paddingTop: rh(20),
    paddingBottom: rh(30),
  },
  phoneNumberInputContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  languageDropdown: {
    width: rw(75),
    height: rh(42),
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Palette.zaapi3,
    marginRight: rw(10),
    backgroundColor: Palette.color_F5F5F5,
  },
  languageOptionContainer: {
    flexDirection: 'row',
    height: rh(42),
    width: rw(75),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Palette.color_D6D6D6,
    borderRadius: 12,
  },
  languageDropdownStyle: {
    borderRadius: 12,
    borderColor: Palette.color_42A391,
    backgroundColor: Palette.white,
    borderWidth: 1,
    marginTop: rh(6),
    width: rw(143),
    height: rh(289),
  },
  countryNameTextContainer: {
    paddingLeft: rw(13),
    height: rh(36),
    justifyContent: 'center',
  },
  countryNameText: {
    fontWeight: '600',
    color: Palette.zaapi4,
  },
  languageOptionLogo: {
    width: rw(21),
    height: rw(21),
    marginRight: rw(5),
    marginLeft: rw(10),
  },
  languageOptionText: {
    color: Palette.zaapi4,
    fontSize: rh(14),
    fontWeight: '600',
    width: rw(32),
  },
  phoneNumberInput: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Palette.color_D6D6D6,
    paddingLeft: rw(11),
    paddingRight: rw(11),
    fontSize: rh(14),
    height: rh(42),
    width: screenWidth - rw(75 + 10 + 16 * 2),
    backgroundColor: Palette.color_F5F5F5,
    color: Palette.zaapi4,
    fontWeight: '600',
  },
  viewContactDetails: {
    marginTop: rh(10),
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Palette.white,
  },
  txtContactDetails: {
    fontWeight: 'bold',
    fontSize: rh(18),
    lineHeight: rh(23),
  },
  txtDisplayonstore: {
    fontWeight: '600',
    fontSize: rh(14),
    lineHeight: rh(18),
    display: 'flex',
    alignItems: 'center',
    color: Palette.zaapi4,
    flex: 1,
  },
  txtSubAccount: {
    fontSize: rh(14),
    lineHeight: rh(18),
    color: Palette.grey,
    marginTop: rh(10),
    marginBottom: rh(29),
  },
});
export default AccountSettings;
