import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Dimensions, InteractionManager } from 'react-native';

import StepDetailItem from './Components/StepDetailItem';
import StepItem from './Components/StepItem';
import { AddProductIcon, SavedPaymentIcon } from 'App/assets/svg';
import NavigationService from 'App/navigation/NavigationService';
import useBoolean from 'App/Hooks/useBoolean';
import ModalSuccess from './Components/ModalSuccess';
import StyledText from 'App/Components/StyledText/StyledText';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import { requestUpdateStore } from 'App/Repositories/store';
import { getStoredProperty } from 'App/Utils/storage';
import { logError } from 'App/Utils/error';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import { updateStoreDataAction } from 'App/Redux/store/StoreActions';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { Palette } from 'App/Theme/Palette';

const { width } = Dimensions.get('window');

interface IProps {}

const ViewStepHome: FC<IProps> = () => {
  const { t } = useTranslation();
  const [isVisibleModalPayment, showPaymentSuccess, hidePaymentSuccess] = useBoolean();
  const [isVisibleModelPromptPay, showPromptPay, hidePromptPay] = useBoolean();
  const [numberPhone, setNumberPhone] = useState<string>('');
  const store = useSelector((state: RootState) => state.store);
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);

  useEffect(() => {
    (async () => {
      const numberPhone = await getStoredProperty('phoneNumber');
      setNumberPhone(numberPhone);
      console.log('numberPhone', numberPhone);
    })();
  }, []);
  const onClickYesPromptPay = useCallback(async () => {
    try {
      const body = {
        paymentDetail: {
          promptPay: {
            promptPayNumber: await getStoredProperty('phoneNumber'),
            enabled: true,
          },
        },
      };
      await requestUpdateStore(body);
      dispatch(updateStoreDataAction(body));
      hidePromptPay();
      InteractionManager.runAfterInteractions(() => {
        showPaymentSuccess();
      });
    } catch (err) {
      logError(err);
    }
  }, [getStoredProperty, hidePromptPay, showPaymentSuccess]);
  const onClickNoPromptPay = () => {
    hidePromptPay();
    NavigationService.navigate('PaymentSettingScreen', { hidePromptPay, showPaymentSuccess });
  };

  return (
    <View style={styles.container}>
      <>
        <StyledText style={styles.textProgres}>
          {t('Store')}{' '}
          {
            [
              !!store?.productSetName,
              products.length > 0,
              !!store?.paymentDetail,
              !!store?.hasSharedStoreOnSocialMedia,
            ].filter(Boolean).length
          }
          /4 {t('Complete')}
        </StyledText>

        <View style={styles.viewContent}>
          <View style={styles.viewLeft}>
            <StepItem isDone={!!store?.productSetName} />
            <StepItem isDone={products.length > 0} />
            <StepItem isDone={!!store?.paymentDetail} />
            <StepItem isDone={!!store?.hasSharedStoreOnSocialMedia} hideLine />
          </View>

          <View style={styles.viewRight}>
            <StepDetailItem
              title={t('Create Online Store')}
              description={`${t('Congratulations on your new online store')}!`}
            />
            <StepDetailItem
              onPressButton={() => NavigationService.navigate('Products', { screen: 'AddProduct' })}
              iconRightButton={<AddProductIcon fill="#fff" width={20} height={20} />}
              titleButton={products.length > 0 ? undefined : t('Add Product')}
              title={t('Add Product')}
              description={`${t('Start adding products to create your online store catalogue')}.`}
            />
            <StepDetailItem
              onPressButton={showPromptPay}
              titleButton={!!store?.paymentDetail ? undefined : t('Confirm Details')}
              title={t('Confirm payment details')}
              description={t('Set up payment bank account or PromptPay')}
            />
            <StepDetailItem
              title={t('Share On Social Media')}
              description={t('Connect social media to share your store')}
            />
          </View>
        </View>
      </>

      <ModalSuccess isVisible={isVisibleModelPromptPay} onClose={hidePromptPay}>
        <View style={styles.viewModal}>
          <StyledText style={styles.textHeaderModalConfirm}>
            {t('Do you wish to request your customers to make payments to this PromptPay number?')}
          </StyledText>
          <StyledText style={styles.textPhoneNumberPromptPay}>{numberPhone}</StyledText>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: rh(20) }}>
            <StyledButton style={{ flex: 1 }} disabled={true} onPressDisabled={onClickNoPromptPay} title="No" />
            <View style={{ width: rw(8) }} />
            <StyledButton style={{ flex: 1 }} title="Yes" onPress={onClickYesPromptPay} />
          </View>
        </View>
      </ModalSuccess>

      <ModalSuccess isVisible={isVisibleModalPayment} onClose={hidePaymentSuccess}>
        <View style={styles.viewModal}>
          <SavedPaymentIcon />

          <StyledText style={styles.textSuccess}>Saved successfully</StyledText>

          <StyledText style={styles.textDesc}>
            These payment details will be automatically sent to your customer every time you accept an order
          </StyledText>
        </View>
      </ModalSuccess>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: rw(15) },
  textProgres: { color: '#4B4A4B', fontSize: rh(14) },
  viewContent: { marginTop: rh(20), flexDirection: 'row' },
  viewLeft: { alignItems: 'center' },
  viewRight: { flex: 1, paddingLeft: rw(11) },
  viewModal: {
    width: width - 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: rh(20),
    alignItems: 'center',
    paddingHorizontal: rw(30),
  },
  viewHeader: { alignItems: 'center' },
  textSuccess: { color: '#4B4A4B', marginTop: rh(13), textAlign: 'center', fontSize: rh(16), fontWeight: '700' },
  textDesc: { textAlign: 'center', marginTop: rh(6), color: 'rgba(21, 25, 32, 0.5)' },
  textHeaderModalConfirm: {
    color: Palette.black,
    fontSize: rh(16),
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: rh(24),
  },
  textPhoneNumberPromptPay: {
    color: Palette.zaapi2,
    marginTop: rh(10),
    fontWeight: '600',
    fontSize: rh(16),
    lineHeight: rh(21),
  },
});

export default memo(ViewStepHome);
