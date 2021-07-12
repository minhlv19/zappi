import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, InteractionManager, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLayout } from '@react-native-community/hooks';

import HeaderComponent from 'App/Components/Header/HeaderComponent';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import InputComponent from 'App/Components/Input/InputComponent';
import { PaymentSettingScreenRouteProp } from 'App/navigation/NavigationRoute';
import NavigationService from 'App/navigation/NavigationService';
import SwitchCustom from 'App/Components/Switch/SwitchCustom';
import StyledText from 'App/Components/StyledText/StyledText';
import StyledDropdownSelect from 'App/Components/StyledDropdownSelect/StyledDropdownSelect';
import { requestUpdateStore } from 'App/Repositories/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateStoreDataAction } from 'App/Redux/store/StoreActions';
import { RootState } from 'App/Redux';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { updateSuccessModalData } from 'App/Redux/appState/AppStateActions';
import useHandleRequestError from 'App/Hooks/useHandleRequestError';

const { width } = Dimensions.get('screen');

interface IProps {
  route: PaymentSettingScreenRouteProp;
}

const banks = [
  { title: 'Kasikorn Bank', value: 'Kasikorn Bank' },
  { title: 'Bangkok Bank', value: 'Bangkok Bank' },
];

const PaymentSettingScreen: FC<IProps> = ({ route: { params } }) => {
  const showPaymentSuccess = params?.showPaymentSuccess;
  const { t } = useTranslation();
  const { onLayout, height } = useLayout();
  const [promptPayNumber, setPromptPayNumber] = useState<string>('');
  const [enabledPrompt, setEnabledPrompt] = useState<boolean>(false);
  const [indexBank, setIndexBank] = useState<number>(-1);
  const [accountNumber, setAccountNumber] = useState<string>();
  const [accountName, setAccountName] = useState<string>();
  const [enabledBank, setEnabledBank] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleRequestError = useHandleRequestError();

  const store = useSelector((state: RootState) => state.store);

  useEffect(() => {
    if (store?.paymentDetail) {
      setPromptPayNumber(store?.paymentDetail?.promptPay?.promptPayNumber || '');
      setEnabledPrompt(store?.paymentDetail?.promptPay?.enabled || false);
      setIndexBank(banks.findIndex(i => i.value === store?.paymentDetail?.bankAccount?.bankName));
      setAccountNumber(store?.paymentDetail?.bankAccount?.accountNumber);
      setAccountName(store?.paymentDetail?.bankAccount?.accountName);
      setEnabledBank(store?.paymentDetail?.bankAccount?.enabled || false);
    }
  }, [store]);

  const handleSubmit = useCallback(async () => {
    try {
      let data: any = {};
      if (promptPayNumber !== '') {
        data['promptPay'] = {
          promptPayNumber,
          enabled: enabledPrompt,
        };
      }
      if (indexBank > -1) {
        data.bankAccount = {
          bankName: banks[indexBank].value,
          accountNumber,
          accountName,
          enabled: enabledBank,
        };
      }
      await requestUpdateStore({ paymentDetail: data });
      dispatch(updateStoreDataAction({ paymentDetail: data }));
      NavigationService.goBack();

      InteractionManager.runAfterInteractions(() => {
        if (showPaymentSuccess) {
          showPaymentSuccess();
        } else {
          dispatch(
            updateSuccessModalData({
              display: true,
            }),
          );
        }
      });
    } catch (error) {
      handleRequestError(error);
    }
  }, [showPaymentSuccess, promptPayNumber, enabledPrompt, banks, indexBank, accountNumber, accountName, enabledBank]);

  const onSelect = useCallback((index: number) => {
    setIndexBank(index);
  }, []);

  return (
    <View style={styles.container}>
      <HeaderComponent onLayout={onLayout} titleBack={t('Payment settings')} />

      <View style={[styles.viewContainer, { top: height }]}>
        <KeyboardAwareScrollView>
          <View style={styles.viewHeader}>
            <StyledText style={styles.textHeader}>{t('Set up payment')}</StyledText>
            <StyledText style={styles.textDesc}>
              {t('Please add and toggle on at least one method of payment')}.{' '}
              {t('All payment details toggled on will be provided to customers upon making an order')}.
            </StyledText>

            <StyledText style={[styles.textHeader, styles.textPromptPay]}>{t('PromptPay')}</StyledText>

            <View style={styles.viewPromtPay}>
              <InputComponent
                keyboardType="number-pad"
                value={promptPayNumber}
                onChangeText={setPromptPayNumber}
                placeholder={t('PromptPay Number')}
                label={t('PromptPay Number')}
              />

              <View style={styles.viewEnbalePrompt}>
                <View style={styles.viewSwich}>
                  <StyledText style={styles.textLabelSwitch}>{enabledPrompt ? t('Enabled') : t('Disabled')}</StyledText>

                  <SwitchCustom value={enabledPrompt} onValueChange={setEnabledPrompt} />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.bankAccount}>
            <StyledText style={styles.textHeader}>{t('Bank Account')}</StyledText>

            <View style={styles.viewPromtPay}>
              <Text style={styles.textLable}>{t('Bank Name')}</Text>
              <StyledDropdownSelect
                selectedIndex={indexBank}
                onSelect={onSelect}
                options={banks}
                placeholder={t('Choose Bank')}
                dropdownStyle={styles.dropdownStyle}
                style={styles.viewDropDown}
              />

              <InputComponent
                keyboardType="number-pad"
                value={accountNumber}
                onChangeText={setAccountNumber}
                styleWapper={styles.styleWapper}
                placeholder={t('Account Number')}
                label={t('Account Number')}
              />
              <InputComponent
                value={accountName}
                onChangeText={setAccountName}
                styleWapper={styles.styleWapper}
                placeholder={t('Full name')}
                label={t('Account Name')}
              />

              <View style={styles.viewEnbalePrompt}>
                <View style={styles.viewSwich}>
                  <StyledText style={styles.textLabelSwitch}>{enabledBank ? t('Enabled') : t('Disabled')}</StyledText>

                  <SwitchCustom value={enabledBank} onValueChange={setEnabledBank} />
                </View>
              </View>
            </View>

            <View style={styles.viewButton}>
              <StyledButton onPress={handleSubmit} title={t('Save')} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  viewHeader: { backgroundColor: '#fff', paddingHorizontal: rw(15), paddingVertical: 20 },
  textHeader: { fontSize: rh(18), fontWeight: '700', color: '#4B4A4B' },
  textDesc: { marginTop: rh(10), fontSize: rh(14), color: '#999999' },
  textPromptPay: { marginTop: rh(30) },
  viewPromtPay: {
    marginTop: rh(15),
    borderRadius: 12,
    paddingHorizontal: rw(15),
    paddingVertical: rh(20),
    borderColor: '#D6D6D6',
    borderWidth: 1,
  },
  textPromptPayNumber: { fontSize: rh(14), fontWeight: '700', color: '#4B4A4B' },
  viewEnbalePrompt: { alignItems: 'flex-end', marginTop: rh(22) },
  viewSwich: { flexDirection: 'row', alignItems: 'center' },
  textLabelSwitch: { fontSize: rh(12), fontWeight: '400', color: '#4B4A4B', marginRight: rw(5) },
  bankAccount: { marginTop: rh(10), paddingVertical: rh(20), paddingHorizontal: rw(15), backgroundColor: '#fff' },
  styleWapper: { marginTop: rh(30) },
  viewButton: { marginTop: rh(30), paddingBottom: getBottomSpace() || 20 },
  viewContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  viewDropDown: { width: '100%' },
  textLable: { fontSize: rh(14), fontWeight: '700', color: '#4B4A4B', marginBottom: rh(6) },
  dropdownStyle: { width: width - 65, height: rh(80) },
});

export default memo(PaymentSettingScreen);
