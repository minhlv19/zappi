import React, { memo, useCallback, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable, TouchableOpacity, InteractionManager } from 'react-native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/Utils/style';
import { Palette } from 'App/Theme/Palette';
import StyledText from 'App/Components/StyledText/StyledText';
import { useTranslation } from 'react-i18next';
import { ZAAPI_WEB_DOMAIN } from '@env';
import LinearGradient from 'react-native-linear-gradient';
import { DEFAULT_LETTER_SPACING } from 'App/Utils/constants';
import useBoolean from 'App/Hooks/useBoolean';
import ModalShareQr from 'App/Containers/Home/HomeScreen/Components/ModalShareQr';

export enum ShareTypeEnums {
  SOCIAL = 'SOCIAL',
}
const UniqueReferralLink = () => {
  const { t } = useTranslation();
  const [isVisibleSocial, showModalSocial, hideModalSocial] = useBoolean();
  const [isClickShareSocial, setIsClickShareSocial] = useState<boolean>(true);
  const [shareType, setShareType] = useState<ShareTypeEnums | undefined>();
  const onCloseModalSocial = useCallback(() => {
    hideModalSocial();

    InteractionManager.runAfterInteractions(() => {
      setIsClickShareSocial(true);
      setShareType(ShareTypeEnums.SOCIAL);
    });
  }, [hideModalSocial]);
  return (
    <View style={styles.containerItem}>
      <StyledText style={styles.title}>{t('Unique Referral Link')}</StyledText>
      <View style={{ borderBottomWidth: 1, borderColor: Palette.color_F5F5F5 }} />
      <View style={styles.contentItem}>
        <StyledText style={styles.txtsubcontent}>
          {t('Get your friends to sign up using the referral link below and remove the Zaapi banner from your store.')}
        </StyledText>
      </View>
      <View style={styles.viewLinkShare}>
        <Pressable style={styles.viewLinkStore}>
          <StyledText numberOfLines={1} style={styles.textLinkShare}>
            {ZAAPI_WEB_DOMAIN}
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
      <ModalShareQr
        linkStore={`${ZAAPI_WEB_DOMAIN}`}
        title={t('Share Referral Link')}
        isVisible={isVisibleSocial}
        onCloseModal={onCloseModalSocial}
        shareType={shareType}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  containerItem: {
    minHeight: rh(155),
    width: '99%',
    marginTop: 50,
    marginBottom: 10,
    backgroundColor: Palette.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,

    elevation: 5,
    borderRadius: 12,
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: rh(14),
    lineHeight: rh(18),
    display: 'flex',
    alignItems: 'center',
    color: Palette.zaapi4,
    paddingHorizontal: rw(12),
    paddingVertical: 10,
  },
  contentItem: {
    paddingHorizontal: rw(12),
    paddingVertical: rh(10),
  },
  txtsubcontent: {
    fontSize: rh(14),
    lineHeight: rh(19),
    display: 'flex',
    alignItems: 'center',
    color: Palette.zaapi4,
  },
  viewLinkShare: {
    height: rh(36),
    backgroundColor: Palette.color_F5F5F5,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    // marginVertical: rh(10),
    marginHorizontal: rw(12),
  },
  textLinkShare: {
    color: Palette.zaapi2,
    fontSize: rh(14),
    fontWeight: '600',
    letterSpacing: DEFAULT_LETTER_SPACING,
    lineHeight: rh(18),
  },
  viewLinkStore: { paddingHorizontal: rw(15), flex: 1, justifyContent: 'center' },
  viewButtonShare: { height: '100%', borderRadius: 12 },
  textShare: {
    fontSize: rh(14),
    color: Palette.white,
    fontWeight: '600',
    letterSpacing: DEFAULT_LETTER_SPACING,
    lineHeight: rh(18),
  },
  viewContentButton: { justifyContent: 'center', alignItems: 'center', flex: 1, paddingHorizontal: 17 },
});
export default memo(UniqueReferralLink);
