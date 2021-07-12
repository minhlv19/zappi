import Clipboard from '@react-native-clipboard/clipboard';
import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Linking, Alert, TouchableOpacity } from 'react-native';
import Share, { ShareOptions, ShareSingleOptions } from 'react-native-share';

import { CopyUrlIcon, FacebookIcon, LineIcon, ShareIcon, WhatsAppIcon } from 'App/assets/svg';
import StyledText from 'App/Components/StyledText/StyledText';
import { requestUpdateStore } from 'App/Repositories/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateStoreDataAction } from 'App/Redux/store/StoreActions';
import { logError } from 'App/Utils/error';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { ShareTypeEnums } from '../UniqueReferralLink';
import { RootState } from 'App/Redux';

interface IProps {
  linkStore: string;
  title: string;
  shareType?: ShareTypeEnums;
}

const ViewShareSocial: FC<IProps> = ({ linkStore, title, shareType = ShareTypeEnums.SOCIAL }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.store);

  const setHasSharedStoreOnSocialMedia = async () => {
    try {
      await requestUpdateStore({
        hasSharedStoreOnSocialMedia: true,
      });
      dispatch(
        updateStoreDataAction({
          hasSharedStoreOnSocialMedia: true,
        }),
      );
    } catch (error) {
      logError(error);
    }
  };
  const handleCopyLinkStore = useCallback(async () => {
    Clipboard.setString(linkStore);
    await setHasSharedStoreOnSocialMedia();
    Alert.alert(t('Copy Success'));
  }, [linkStore, t, setHasSharedStoreOnSocialMedia]);

  const handleShareLine = useCallback(async () => {
    try {
      await Linking.openURL(`https://line.me/R/msg/text/?${linkStore}`);
      await setHasSharedStoreOnSocialMedia();
    } catch (error) {
      logError(error);
    }
  }, [linkStore, setHasSharedStoreOnSocialMedia]);

  const handleShare = useCallback(
    (type: 'facebook' | 'whatsapp') => async () => {
      try {
        const shareOptions: ShareSingleOptions = {
          title: 'Share via',
          message: 'Zaapi Shop',
          url: linkStore,
          social: type === 'facebook' ? Share.Social.FACEBOOK : Share.Social.WHATSAPP,
        };
        await Share.shareSingle(shareOptions);

        await setHasSharedStoreOnSocialMedia();
      } catch (error) {
        logError(error);
      }
    },
    [linkStore, setHasSharedStoreOnSocialMedia],
  );

  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <ShareIcon />
        <StyledText style={styles.textTitle}>{title}</StyledText>
      </View>

      <View style={styles.viewSocial}>
        <TouchableOpacity onPress={handleShareLine} style={styles.viewItem}>
          <LineIcon />
          <StyledText style={styles.textItem}>{t('Line')}</StyledText>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShare('facebook')} style={styles.viewItem}>
          <FacebookIcon />
          <StyledText style={styles.textItem}>{t('Facebook')}</StyledText>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShare('whatsapp')} style={styles.viewItem}>
          <WhatsAppIcon />
          <StyledText style={styles.textItem}>{t('WhatsApp')}</StyledText>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCopyLinkStore} style={styles.viewItem}>
          <CopyUrlIcon width={40} height={40} />
          <StyledText style={styles.textItem}>{t('Copy URL')}</StyledText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  viewHeader: { paddingHorizontal: rw(15), flexDirection: 'row', alignItems: 'center' },
  textTitle: { fontSize: rh(14), fontWeight: '600', marginLeft: rw(8), color: '#4B4A4B' },
  viewSocial: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: rw(40), marginTop: rh(20) },
  textItem: { textAlign: 'center', color: '#4B4A4B', fontSize: rh(12), marginTop: rh(10) },
  viewItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default memo(ViewShareSocial);
