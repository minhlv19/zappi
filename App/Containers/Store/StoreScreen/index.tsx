import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { Link, useLinkTo, useNavigation } from '@react-navigation/native';
import { logout } from 'App/Repositories/auth';
import StyledText from 'App/Components/StyledText/StyledText';
import AccountSetting from 'App/assets/icons/AccountSettingsIcon.svg';
import Customers from 'App/assets/icons/CustomersIcon.svg';
import ProductVariantIcon from 'App/assets/icons/ProductVariant.svg';
import MailIcon from 'App/assets/icons/Mail.svg';
import BlogIcon from 'App/assets/icons/Blog.svg';
import DeliverySetting from 'App/assets/icons/DeliverySettingsIcon.svg';
import PaymentSetting from 'App/assets/icons/mobilepayment.svg';
import Language from 'App/assets/icons/LanguageIcon.svg';
import Rate from 'App/assets/icons/RateIcon.svg';
import VideoTutorial from 'App/assets/icons/VideoTutorialIcon.svg';
import Help from 'App/assets/icons/HelpIcon.svg';
import PrivacyPolicy from 'App/assets/icons/PrivacyPolicyIcon.svg';
import Item from 'App/Containers/Store/StoreScreen/item';
import HeaderStore from './HeaderStore';
import { useLayout } from '@react-native-community/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Palette } from 'App/Theme/Palette';
import StyledModalConfirm from 'App/Components/StyledModalConfirm/StyledModalConfirm';
import useBoolean from 'App/Hooks/useBoolean';
import { useDispatch, useSelector } from 'react-redux';
import { clearStoreDataAction } from 'App/Redux/store/StoreActions';
import { Store } from 'App/Types';
import { RootState } from 'App/Redux';
import FastImage from 'react-native-fast-image';
import { LogoIcon, PenIcon } from 'App/assets/svg';
import { getBusinessHoursText } from 'App/Utils/time';
import NavigationService from 'App/navigation/NavigationService';
import { logError } from 'App/Utils/error';
import { responsiveByWidth as rw, responsiveByHeight as rh, getBottomBarHeight } from 'App/Utils/style';
import { clearRequestInterceptor } from 'App/Repositories';
import Referfriend from 'App/assets/icons/Referfriend.svg';
import { PRIVACY_POLICY_URL } from 'App/Utils/constants';

const StoreScreen = () => {
  const [isVisibleModalLogout, showModalLogout, hideModalLogout] = useBoolean();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const linkTo = useLinkTo();
  const store: Partial<Store> = useSelector((state: RootState) => state.store);

  const onClickConfirmLogout = async () => {
    try {
      await logout();
      dispatch(clearStoreDataAction());
      hideModalLogout();
      clearRequestInterceptor();
      NavigationService.reset('LoginStack');
    } catch (error) {
      logError(error);
    }
  };

  const { onLayout: onLayoutHeader, height: heightHeader } = useLayout();
  const { top, bottom } = useSafeAreaInsets();
  const { height } = Dimensions.get('screen');
  return (
    <View style={styles.container}>
      <HeaderStore onLayout={onLayoutHeader} />
      <View
        style={[
          styles.viewContent,
          {
            height: height - top - bottom - heightHeader - getBottomBarHeight(),
            top: heightHeader + top + rh(100),
          },
        ]}>
        <ScrollView
          style={[
            {
              borderRadius: 12,
              marginHorizontal: rw(16),
              top: -rh(49),
            },
          ]}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: Palette.white,
              borderRadius: 12,
              shadowOffset: {
                width: rw(0),
                height: rh(0),
              },
              shadowRadius: 5,
              shadowColor: 'rgba(0, 0, 0, 0.15)',
              shadowOpacity: 1,
              marginBottom: rh(15),
            }}>
            <View style={styles.viewShop}>
              <TouchableOpacity style={styles.viewLogo}>
                {store?.logoUrl ? (
                  <FastImage source={{ uri: store.logoUrl }} resizeMode="cover" style={styles.viewLogo} />
                ) : (
                  <LogoIcon width={53} height={53} />
                )}
              </TouchableOpacity>

              <View style={styles.viewCenterHeader}>
                <StyledText style={styles.textNameShop}>{store.businessName}</StyledText>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: rh(5) }}>
                  <StyledText style={{ fontWeight: '400', fontSize: rh(14), marginRight: rw(8) }}>
                    {getBusinessHoursText(store)}
                  </StyledText>
                  <TouchableOpacity onPress={() => NavigationService.navigate('SetBusinessHoursScreen')}>
                    <PenIcon color={Palette.zaapi4} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={[styles.viewItems, { paddingTop: rh(20) }]}>
              <Item
                txtTitle={t('Refer Friends and Unlock Perks')}
                icLeft={<Referfriend />}
                action={() => navigation.navigate('Referfriends')}
              />
              <Item txtTitle={t('Customers')} icLeft={<Customers />} />
              <Item txtTitle={t('Product Variants')} icLeft={<ProductVariantIcon />} />
              <Item
                txtTitle={t('Delivery Settings')}
                icLeft={<DeliverySetting />}
                action={() => navigation.navigate('StoreInformationScreen', { isEditing: true })}
              />
              <Item
                txtTitle={t('Payment Settings')}
                icLeft={<PaymentSetting />}
                action={() => navigation.navigate('PaymentSettingScreen')}
              />
              <Item
                txtTitle={t('Account Settings')}
                icLeft={<AccountSetting />}
                action={() => navigation.navigate('AccountSettings')}
              />
              <Item txtTitle={t('Language')} icLeft={<Language />} action={() => navigation.navigate('Language')} />
            </View>
          </View>
          <View
            style={{
              backgroundColor: Palette.white,
              borderRadius: 12,
              shadowOffset: {
                width: rw(0),
                height: rh(0),
              },
              shadowRadius: 5,
              shadowColor: 'rgba(0, 0, 0, 0.15)',
              shadowOpacity: 1,
            }}>
            <View style={[styles.viewItems]}>
              <Item txtTitle={t('Rate Us')} icLeft={<Rate />} />
              <Item txtTitle={t('Video Tutorial')} icLeft={<VideoTutorial />} />
              <Item txtTitle={t('FAQs')} icLeft={<Help />} />
              <Item txtTitle={t('Blogs')} icLeft={<BlogIcon />} />
              <Item txtTitle={t('Contact')} icLeft={<MailIcon />} />
              <Item
                txtTitle={t('Privacy Policy')}
                icLeft={<PrivacyPolicy />}
                action={() => linkTo(`/webview?url=${PRIVACY_POLICY_URL}&&title=Privacy Policy`)}
              />
            </View>
          </View>
          <View style={{ marginTop: rh(20), marginBottom: rh(50) }}>
            <TouchableOpacity onPress={showModalLogout}>
              <StyledText style={styles.txtLogout}>{t('Log out')}</StyledText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <StyledModalConfirm
        title={t('Are you sure you want to log out?')}
        subtitle={t(
          'Your store will remain online, but you will no longer receive notifications when customers place orders.',
        )}
        isVisible={isVisibleModalLogout}
        canCancel={true}
        onClose={hideModalLogout}
        onConfirm={onClickConfirmLogout}
        confirmButtonTitle={'Log out'}
        cancelButtonTitle={'Cancel'}
      />
    </View>
  );
};

export default StoreScreen;
