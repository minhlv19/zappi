import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Pressable, InteractionManager } from 'react-native';

import ModalBottomSheet from 'App/Components/Modal/ModalBottomSheet';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import StyledText from 'App/Components/StyledText/StyledText';
import { TextInput } from 'react-native-gesture-handler';
import { requestUpdateStore } from 'App/Repositories/store';
import StyledModalConfirm from 'App/Components/StyledModalConfirm/StyledModalConfirm';
import useBoolean from 'App/Hooks/useBoolean';
import { ZAAPI_WEB_DOMAIN } from '@env';
import { logError } from 'App/Utils/error';
import { useDispatch } from 'react-redux';
import { updateStoreDataAction } from 'App/Redux/store/StoreActions';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface IProps {
  isVisible: boolean;
  onCloseModal: () => void;
  submitSuccess: () => void;
  slug?: string;
}

const ModalEditLinkStore: FC<IProps> = ({ isVisible, onCloseModal, submitSuccess, slug }) => {
  const { t } = useTranslation();
  const [storeLink, setStoreLink] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isModalConfirmVisible, showModalConfirm, hideModalConfirm] = useBoolean();
  const dispatch = useDispatch();

  useEffect(() => {
    if (slug) {
      setStoreLink(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (isVisible) {
      setErrorMessage('');
    }
  }, [isVisible]);

  const nameApp = `${ZAAPI_WEB_DOMAIN}/`;

  const handleConfirm = useCallback(async () => {
    try {
      await requestUpdateStore({ slug: storeLink });
      dispatch(updateStoreDataAction({ slug: storeLink }));

      submitSuccess();
      hideModalConfirm();

      InteractionManager.runAfterInteractions(() => {
        setErrorMessage('');
      });
    } catch (error) {
      hideModalConfirm();
      logError(error);
      const errorCode = error?.response?.data?.errorCode;
      if (errorCode) {
        setErrorMessage(t(`ErrorCode->${errorCode}`));
      }
      // setErrorMessage(error?.response?.data?.message || error?.response?.data?.message[0]);
    }
  }, [storeLink, submitSuccess]);

  const handlePress = useCallback(() => {
    showModalConfirm();
  }, [showModalConfirm]);

  const onChangeStoreLinkText = useCallback(
    (text: string) => {
      setStoreLink(text.replace(/\s/g, '-'));
    },
    [setStoreLink],
  );

  return (
    <ModalBottomSheet avoidKeyboard isVisible={isVisible} onClose={onCloseModal}>
      <View style={styles.container}>
        <View>
          <StyledText style={styles.textLable}>{t('Store URL')}</StyledText>

          <Pressable style={[styles.viewInput, !!errorMessage && styles.backgroundError]}>
            <Text style={styles.textName}>{nameApp}</Text>
            <TextInput
              autoCapitalize="none"
              placeholderTextColor="#D6D6D6"
              value={storeLink}
              onChangeText={onChangeStoreLinkText}
              style={styles.textInput}
            />
          </Pressable>

          {!!errorMessage && <StyledText style={styles.textError}>{errorMessage}</StyledText>}
        </View>

        <View style={styles.viewButton}>
          <StyledButton disabled={storeLink == slug} onPress={handlePress} title={t('Save')} />
        </View>

        <StyledModalConfirm
          title={t('Are you sure you want to change your store link?')}
          subtitle={t(
            'After editing your store link, users will only be able to access your online store through this link. Your current store link will become invalid.',
          )}
          isVisible={isModalConfirmVisible}
          onClose={() => hideModalConfirm()}
          onConfirm={() => handleConfirm()}
          confirmButtonTitle={t('Confirm')}
          cancelButtonTitle={t('Cancel')}
          canCancel={true}
        />
      </View>
    </ModalBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: rw(15), paddingTop: rh(20) },
  viewButton: { marginTop: rh(30) },
  textName: { color: '#4B4A4B', fontSize: rh(14), fontWeight: '600' },
  textNameStore: { color: '#42A391' },
  textLable: { fontSize: rh(14), fontWeight: '700', color: '#4B4A4B', marginBottom: rh(6) },
  viewInput: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rw(12),
  },
  textInput: {
    height: rh(42),
    margin: 0,
    padding: 0,
    fontSize: rh(14),
    flex: 1,
    fontWeight: '600',
    color: '#42A391',
  },
  textError: { color: '#E51D35', fontWeight: '600', fontSize: rh(13), marginTop: rh(3) },
  backgroundError: { borderColor: '#E51D35' },
});

export default memo(ModalEditLinkStore);
