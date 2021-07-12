import React, { FC, memo, useCallback, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, LayoutChangeEvent, InteractionManager, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { CloseIcon, InfoIcon, QrCodeIcon, SuccessIcon } from 'App/assets/svg';
import { Palette } from 'App/Theme/Palette';
import ModalQrShareStore from './Components/ModalQrShareStore';
import useBoolean from 'App/Hooks/useBoolean';
import ModalShareQr from './Components/ModalShareQr';
import ModalEditLinkStore from './Components/ModalEditLinkStore';
import ModalSuccess from './Components/ModalSuccess';
import StyledText from 'App/Components/StyledText/StyledText';
import { ZAAPI_WEB_DOMAIN } from '@env';
import { useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import NavigationService from 'App/navigation/NavigationService';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { DEFAULT_LETTER_SPACING } from 'App/Utils/constants';

interface IProps {
  heightHeader: number;
  onLayout?: (event: LayoutChangeEvent) => void;
}

export enum ShareTypeEnums {
  QR = 'QR',
  SOCIAL = 'SOCIAL',
}

const ShareStore: FC<IProps> = ({ heightHeader, onLayout }) => {
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();
  const [isVisible, showModal, hideModal] = useBoolean();
  const [isVisibleSocial, showModalSocial, hideModalSocial] = useBoolean();
  const [isVisibaleEditLink, showEditLink, hideEditLink] = useBoolean();
  const [isVisibaleEditLinkSuccess, showEditLinkSuccess, hideEditLinkSuccess] = useBoolean();
  const [isClickShareSocial, setIsClickShareSocial] = useState<boolean>(true);
  const store = useSelector((state: RootState) => state.store);
  const [shareType, setShareType] = useState<ShareTypeEnums | undefined>();

  const onPressShareQR = useCallback(() => {
    hideModal();
    setIsClickShareSocial(false);
    setShareType(ShareTypeEnums.QR);

    InteractionManager.runAfterInteractions(() => {
      showModalSocial();
    });
  }, [hideModal, showModalSocial]);

  const onCloseModalSocial = useCallback(() => {
    hideModalSocial();

    InteractionManager.runAfterInteractions(() => {
      setIsClickShareSocial(true);
      setShareType(ShareTypeEnums.SOCIAL);
    });
  }, [hideModalSocial]);

  const submitSuccess = useCallback(() => {
    hideEditLink();

    InteractionManager.runAfterInteractions(() => {
      showEditLinkSuccess();
    });
  }, [hideEditLink, showEditLinkSuccess]);

  const getTopScreenMessage = () => {
    if (!store.businessHours) {
      return (
        <View style={styles.viewError}>
          <InfoIcon fill="#fff" width={16} height={16} />
          <StyledText style={styles.textError}>
            {t('You have not yet set your business hours')}.{'\n'}
            <TouchableWithoutFeedback onPress={() => NavigationService.navigate('SetBusinessHoursScreen')}>
              <StyledText style={styles.textClick}>{t('Click here to set now')}.</StyledText>
            </TouchableWithoutFeedback>
          </StyledText>
        </View>
      );
    }
  };

  return (
    <View onLayout={onLayout} style={[styles.container, { top: heightHeader + top + 40 }]}>
      {getTopScreenMessage()}

      {/* <View style={styles.viewSuccess}>
        <StyledText style={styles.textSucces}>
          {t('Register your social media accounts to allow your customers to get in touch')}.{' '}
          <StyledText style={styles.textClick}>{t('Register now')}</StyledText>
        </StyledText>

        <TouchableOpacity>
          <CloseIcon fill="#fff" width={16} height={16} />
        </TouchableOpacity>
      </View> */}

      <View style={styles.viewShareStore}>
        <View style={styles.viewHeaderShare}>
          <StyledText style={styles.textHeader}>{t('Share Store Online')}</StyledText>
          <TouchableOpacity onPress={showModal}>
            <QrCodeIcon fill="#4B4A4B" />
          </TouchableOpacity>
        </View>

        <StyledText style={styles.textDesc}>
          {t('Your customers can visit your online store and place orders from this link')}.
        </StyledText>

        <View style={styles.viewLinkShare}>
          <Pressable onPress={showEditLink} style={styles.viewLinkStore}>
            <StyledText numberOfLines={1} style={styles.textLinkShare}>
              {ZAAPI_WEB_DOMAIN}/{store?.slug}
            </StyledText>
          </Pressable>

          <LinearGradient
            style={styles.viewButtonShare}
            colors={[Palette.color_54B56F, Palette.color_2B90AB]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 1.0 }}>
            <TouchableOpacity onPress={showModalSocial} style={styles.viewContentButton}>
              <StyledText style={styles.textShare}>{t('Share')}</StyledText>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>

      <ModalQrShareStore
        linkStore={`${ZAAPI_WEB_DOMAIN}/${store?.slug}`}
        isVisible={isVisible}
        onPressShare={onPressShareQR}
        onCloseModal={hideModal}
      />
      <ModalShareQr
        linkStore={`${ZAAPI_WEB_DOMAIN}/${store?.slug}`}
        title={isClickShareSocial ? t('Share Store') : t('Share this QR Code')}
        isVisible={isVisibleSocial}
        onCloseModal={onCloseModalSocial}
        shareType={shareType}
      />
      <ModalEditLinkStore
        slug={store?.slug}
        submitSuccess={submitSuccess}
        isVisible={isVisibaleEditLink}
        onCloseModal={hideEditLink}
      />

      <ModalSuccess isVisible={isVisibaleEditLinkSuccess} onClose={hideEditLinkSuccess}>
        <View style={styles.viewSuccessStoreLink}>
          <SuccessIcon />
          <StyledText style={styles.textUpdateSuccess}>{t('Update Successful')}</StyledText>
        </View>
      </ModalSuccess>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'absolute', width: '100%', paddingHorizontal: rw(15), zIndex: 2 },
  viewShareStore: { backgroundColor: '#fff', paddingHorizontal: rw(12), paddingVertical: rh(10), borderRadius: 12 },
  textHeader: {
    fontSize: rh(14),
    fontWeight: '700',
    color: Palette.zaapi4,
    letterSpacing: rh(14) * DEFAULT_LETTER_SPACING,
  },
  viewHeaderShare: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  textDesc: {
    marginTop: rh(15),
    color: '#4B4A4B',
    fontSize: rh(14),
    lineHeight: rh(19),
    letterSpacing: rh(14) * DEFAULT_LETTER_SPACING,
  },
  viewLinkShare: {
    height: rh(36),
    backgroundColor: '#F5F5F5',
    borderRadius: 13,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: rh(10),
  },
  textLinkShare: {
    color: '#42A391',
    fontSize: rh(14),
    fontWeight: '600',
    letterSpacing: rh(14) * DEFAULT_LETTER_SPACING,
  },
  viewLinkStore: { paddingHorizontal: rw(15), flex: 1, justifyContent: 'center' },
  viewButtonShare: { height: '100%', borderRadius: 12 },
  textShare: { fontSize: rh(14), color: '#fff', fontWeight: '600', letterSpacing: rh(14) * DEFAULT_LETTER_SPACING },
  viewContentButton: { justifyContent: 'center', alignItems: 'center', flex: 1, paddingHorizontal: 17 },
  viewError: {
    backgroundColor: '#FF4D4F',
    borderRadius: 12,
    paddingHorizontal: rw(12),
    paddingVertical: rh(10),
    flexDirection: 'row',
    marginBottom: rh(20),
  },
  textError: { color: '#fff', fontSize: rh(14), marginLeft: rw(20), flex: 1, lineHeight: 19 },
  textClick: { textDecorationLine: 'underline', color: Palette.white, lineHeight: 19 },
  viewSuccess: {
    backgroundColor: '#1CBC7C',
    borderRadius: 12,
    paddingHorizontal: rw(12),
    paddingVertical: rh(10),
    flexDirection: 'row',
    marginBottom: rh(20),
  },
  textSucces: { color: '#fff', fontSize: rh(14), marginRight: rw(20), flex: 1 },
  viewSuccessStoreLink: {
    height: rh(125),
    width: rw(200),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  textUpdateSuccess: { marginTop: rh(10), color: '#4B4A4B', textAlign: 'center', fontWeight: '700' },
});

export default memo(ShareStore);
