import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Palette } from 'App/Theme/Palette';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import { useTranslation } from 'react-i18next';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ReloadOTPIcon from '../../../assets/icons/ReloadOTPIcon.svg';
import GoBackIcon from '../../../assets/icons/GoBackIcon.svg';
import { OTP_CODE_DIGIT_COUNT, OTP_RESEND_TIMEOUT } from 'App/Utils/constants';
import { requestSendOTP, requestVerifyOTP } from 'App/Repositories/auth';
import DataStorage from 'App/Utils/storage';
import { logError } from 'App/Utils/error';
import { setUpRequestInterceptor } from 'App/Repositories';
import { requestGetStoreInfo } from 'App/Repositories/store';
import StyledText from 'App/Components/StyledText/StyledText';
import { useDispatch } from 'react-redux';
import { updateStoreDataAction } from 'App/Redux/store/StoreActions';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const OTPScreen = ({ navigation, route }: any) => {
  const { phoneNumber, isLoggingInState } = route.params;
  const { t } = useTranslation('common');
  const [otpExpiredDate, setOTPExpiredDate] = useState<string>();
  const [timeRemaining, setTimeRemaining] = useState<number>(OTP_RESEND_TIMEOUT);
  const [code, setCode] = useState<string>('');
  const [didSubmitOTP, setDidSubmitOTP] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const onOTPSubmit = async (OTPCode = code) => {
    try {
      setDidSubmitOTP(true);
      const { data } = await requestVerifyOTP(phoneNumber, OTPCode);

      await DataStorage.save({ key: 'accessToken', data: data.access_token });
      await DataStorage.save({ key: 'refreshToken', data: data.refresh_token });
      await DataStorage.save({ key: 'phoneNumber', data: phoneNumber });
      await setUpRequestInterceptor();

      // fetchStoreInfoActionAsync()
      const storeInfoData = await requestGetStoreInfo(data.access_token);
      dispatch(updateStoreDataAction(storeInfoData));

      if (storeInfoData) {
        navigation.navigate('BottomTabStack');
      } else {
        navigation.navigate('CreateAccountScreen');
      }
    } catch (error) {
      const errorCode = error?.response?.data?.errorCode;
      if (errorCode) {
        setErrorMessage(t(`ErrorCode->${errorCode}`));
      }
      logError(error);
    }
  };

  useEffect(() => {
    if (otpExpiredDate) {
      const timeRemaining = Math.max(moment(otpExpiredDate).diff(moment(), 'seconds'), 0);
      setTimeRemaining(timeRemaining);
      const interval = setInterval(() => {
        setTimeRemaining((current: number) => Math.max(current - 1, 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpExpiredDate]);

  useEffect(() => {
    setOTPExpiredDate(moment().add(OTP_RESEND_TIMEOUT, 'seconds').format('YYYY-MM-DD HH:mm:ss'));
  }, []);

  const sendOTPAgain = async () => {
    try {
      if (timeRemaining > 0) return;
      await requestSendOTP(phoneNumber, isLoggingInState);
      setTimeRemaining(OTP_RESEND_TIMEOUT);
    } catch (error) {
      logError(error);
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <TouchableOpacity style={{ width: rw(20) }} onPress={() => navigation.goBack()}>
          <GoBackIcon width={20} color={'#D6D6D6'} />
        </TouchableOpacity>
      </View>
      <StyledText style={styles.screenHeaderTitle}>{t('Enter OTP Code')}</StyledText>
      <StyledText style={styles.screenHeaderSub}>
        {t('Please enter the 4-digit code sent via SMS to your registered phone number')}
      </StyledText>
      <View style={styles.screenContentContainer}>
        <OTPInputView
          style={styles.otpInputContainer}
          pinCount={OTP_CODE_DIGIT_COUNT}
          autoFocusOnLoad
          codeInputFieldStyle={{
            ...styles.codeInputField,
            ...{
              borderColor: errorMessage ? Palette.error : Palette.color_D6D6D6,
            },
          }}
          onCodeChanged={code => {
            setCode(code);
          }}
          onCodeFilled={code => {
            if (!didSubmitOTP) {
              onOTPSubmit(code);
            }
          }}
        />
        {!!errorMessage && <StyledText style={styles.errorMessage}>{errorMessage}</StyledText>}
        {timeRemaining > 0 && (
          <StyledText style={styles.timeRemaningIndicator}>
            Time remaining {moment.duration(timeRemaining, 'seconds').format('mm:ss', { trim: false })}
          </StyledText>
        )}
        {didSubmitOTP && (
          <StyledButton
            title={t('Continue')}
            disabled={code.length < OTP_CODE_DIGIT_COUNT}
            style={styles.continueButton}
            onPress={onOTPSubmit}
          />
        )}
        {timeRemaining <= 0 && (
          <TouchableWithoutFeedback style={[styles.sendCodeAgainButton]} onPress={sendOTPAgain}>
            <ReloadOTPIcon width={15} style={styles.reloadOTPButton} />
            <StyledText style={styles.sendCodeAgainButtonText}>{t('Send code again')}</StyledText>
          </TouchableWithoutFeedback>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenHeader: {
    marginBottom: rh(17),
  },
  screenContentContainer: {
    alignItems: 'center',
  },
  otpInputContainer: {
    width: rw(212),
    height: rh(42),
    marginTop: rh(35),
  },
  codeInputField: {
    width: rw(42),
    height: rh(42),
    borderRadius: 12,
    borderColor: Palette.color_D6D6D6,
    color: Palette.black,
    marginRight: rw(12),
    fontSize: rh(18),
  },
  screenContainer: {
    padding: 16,
    backgroundColor: Palette.white,
    height: '100%',
  },
  screenHeaderTitle: {
    fontSize: rh(22),
    fontWeight: 'bold',
    color: '#4B4A4B',
  },
  screenHeaderSub: {
    color: '#999999',
    fontSize: rh(14),
    marginTop: rh(9),
  },
  timeRemaningIndicator: {
    color: '#999999',
    fontSize: rh(14),
    marginTop: rh(18),
  },
  continueButton: {
    width: '100%',
    marginTop: rh(28),
  },
  sendCodeAgainButtonText: {
    color: Palette.zaapi2,
    fontSize: rh(14),
  },
  sendCodeAgainButton: {
    marginTop: rh(28),
    display: 'flex',
    flexDirection: 'row',
  },
  reloadOTPButton: {
    marginRight: rw(6),
  },
  errorMessage: {
    color: Palette.color_E51D35,
    fontSize: rh(14),
    marginTop: rh(18),
  },
});

export default OTPScreen;
