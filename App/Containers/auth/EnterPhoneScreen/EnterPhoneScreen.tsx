import React, { memo, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Keyboard, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native';
// import debounce from 'lodash/debounce';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Palette } from 'App/Theme/Palette';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import { Trans, useTranslation } from 'react-i18next';
import GoBackIcon from '../../../assets/icons/GoBackIcon.svg';
import StyledTextInput from 'App/Components/StyledTextInput/StyledTextInput';
import { isPhoneNumberValid } from 'App/Utils/validation';
import { media } from 'App/assets/media';
import ModalDropdown from 'react-native-modal-dropdown';
import StyledText from 'App/Components/StyledText/StyledText';
import { requestSendOTP } from 'App/Repositories/auth';
import { getFullPhoneNumber } from 'App/Utils/convert';
import { logError } from 'App/Utils/error';
import { getDefaultCountryCode } from 'App/Utils/localize';
import COUNTRIES from 'App/assets/other/countries.json';
import { TextInput } from 'react-native-gesture-handler';
import Autocomplete from 'react-native-autocomplete-input';
import FastImage from 'react-native-fast-image';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

let options = COUNTRIES.map(country => ({
  countryLogo: `https://www.countryflags.io/${country.code}/flat/64.png`,
  phonePrefix: country.dial_code,
  countryCode: country.code,
  countryName: country.name,
}));

options = [
  {
    countryCode: 'none',
    phonePrefix: '+00',
    countryName: 'Select country',
    countryLogo: '',
  },
  ...options,
];
/*
const options = [
  {
    countryCode: 'none',
    phonePrefix: '+00',
    countryName: 'Select country',
  },
  {
    countryCode: 'th',
    languageName: 'Thai',
    phonePrefix: '+66',
    countryLogo: media.Thailand,
    countryName: 'Thailand',
  },
  {
    countryCode: 'en',
    languageName: 'Eng',
    phonePrefix: '+44',
    countryLogo: media.UnitedKingdom,
    countryName: 'UK',
  },
  {
    countryCode: 'vi',
    languageName: 'Vietnamese',
    phonePrefix: '+84',
    countryLogo: media.Vietnam,
    countryName: 'Vietnam',
  },
];*/

const getDefaultCountryPrefix = () => {
  const countryCode = getDefaultCountryCode();

  const option = options.find(i => i.countryCode == countryCode);
  return option ? option.phonePrefix || '' : '+66';
};

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

// CountryOption = memo(CountryOption);

const EnterPhoneScreen = ({ navigation, route }: any) => {
  const { isLoggingIn } = route.params;
  const { t } = useTranslation('common');
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [countryPrefix, setCountryPrefix] = useState<string>(getDefaultCountryPrefix());
  // const [didEnterPhoneNumber, setDidEnterPhoneNumber] = useState(false);
  const [isPhonePrefixShowing, setIsPhonePrefixShowing] = useState(false);
  const [isSubmitBtnDisable, setIsSubmitBtnDisable] = useState(true);
  const [isLoggingInState, setIsLoggingInState] = useState(isLoggingIn);
  const [isSent, setIsSent] = useState(false);
  const [countrySearchText, setCountrySearchText] = useState('');
  const [displayCountryOptions, setDisplayCountryOptions] = useState(options);
  // const getAndShowErrorMessage = debounce(() => {
  //   let errorMessage = '';
  //   if (didEnterPhoneNumber) {
  //     if (!phoneNumber) {
  //       errorMessage = t('Please enter a valid phone number');
  //     }
  //     if (!isPhoneNumberValid(getFullPhoneNumber(countryPrefix, phoneNumber))) {
  //       errorMessage = t('Your phone number is invalid');
  //     }
  //   }
  //   console.log(errorMessage)
  //   setErrorMessage(errorMessage);
  //   return errorMessage;
  // }, 3000);

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
  useEffect(() => {
    if (errorMessage === 'ErrorCode->ZP0008') {
      setIsLoggingInState(true);
    }
  }, [errorMessage]);
  const onSubmit = async () => {
    if (validatePhoneNumber()) {
      return;
    }

    // try {

    const fullPhoneNumber = getFullPhoneNumber(countryPrefix, phoneNumber);
    setIsSent(true);

    if (!isSent) {
      requestSendOTP(fullPhoneNumber, isLoggingInState)
        .then(async () => {
          await navigation.navigate('OTPScreen', {
            phoneNumber: fullPhoneNumber,
            isLoggingInState,
          });
          setTimeout(() => {
            setIsSent(false);
          }, 2000);
        })
        .catch(err => {
          const errorCode = err?.response?.data?.errorCode;
          if (errorCode) {
            setErrorMessage(`ErrorCode->${errorCode}`);
          }
          setIsSent(false);
        });
    }

    // const errorCode = error?.response?.data?.errorCode;
    // logError(error);
    // }
  };

  const onFocusNumberPhone = () => {
    // Clear
    setErrorMessage('');
  };
  const onBlurNumberPhone = () => {
    validatePhoneNumber();
  };

  useEffect(() => {
    // getAndShowErrorMessage();
    if (phoneNumber !== '') {
      validatePhoneNumber(false);
      //   setDidEnterPhoneNumber(true);
    }
  }, [phoneNumber]);

  const ErrorTrans = ({ errorCode }: { errorCode: string }) => {
    return (
      <Trans i18nKey={errorCode}>
        <Text
          onPress={async () => {
            onSubmit();
          }}
          style={{ textDecorationLine: 'underline' }}
        />
      </Trans>
    );
  };
  const renderLanguageDropdownMainItem = (rowData: any, index: string) => {
    /*if (isPhonePrefixShowing) {
      return <View 
      style={[
        styles.languageOptionContainer,
        { height: rh(40) },
        isPhonePrefixShowing ? { borderColor: Palette.color_42A391 } : {},
      ]}>
        <TextInput value={countrySearchText} onChangeText={setCountrySearchText}
          autoFocus
          style={{ color: 'red', width: rw(55), marginLeft: rw(10), backgroundColor: 'blue'}}
        />
      </View>
    }*/
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

  const selectedLanguageIndex = options.findIndex(option => option.phonePrefix == countryPrefix);

  const filterCountryByText = (text: string) => {
    setCountrySearchText(text);
    console.log('filterCountryByText', text);
    text = text.toLowerCase();
    const filteredCountryOptions = options.filter(
      option => option.countryCode == 'none' || option.countryName.toLowerCase().includes(text),
    );
    setDisplayCountryOptions(filteredCountryOptions);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{ flex: 1 }}>
        <View>
          <View style={styles.screenHeader}>
            <TouchableOpacity style={{ width: rw(20) }} onPress={() => navigation.goBack()}>
              <GoBackIcon width={20} color={'#D6D6D6'} />
            </TouchableOpacity>
          </View>
          <StyledText style={styles.screenHeaderTitle}>{isLoggingIn ? t('Log in') : t('Let’s Get Started')}</StyledText>
          <StyledText style={styles.screenHeaderSub}>{t('Please enter your phone number')}</StyledText>
          <View style={styles.screenContentContainer}>
            <View style={styles.phoneNumberInputContainer}>
              {/*<Autocomplete
              data={displayCountryOptions}
              value={countrySearchText}
              onChangeText={(text) => filterCountryByText(text)}
              inputContainerStyle={[
                styles.languageOptionContainer,
                { height: rh(40) },
                isPhonePrefixShowing ? { borderColor: Palette.color_42A391 } : {},
              ]}
              renderTextInput={(textInputProps) => {
                return <TextInput {...textInputProps}/>
              }}
              flatListProps={{
                keyExtractor: (item, idx) => item.countryCode,
                renderItem: ({ item, index }) => (
                  <View style={styles.countryNameTextContainer}>
                    <StyledText style={[styles.countryNameText, index == 0 ? { color: Palette.zaapi3 } : {}]}>
                      {item.countryName}
                    </StyledText>
                  </View>
                ),
              }}
              renderItem={(({ item, index }: any) => {
                return <View style={styles.countryNameTextContainer}>
                    <StyledText style={[styles.countryNameText, index == 0 ? { color: Palette.zaapi3 } : {}]}>
                      {item.countryName}
                    </StyledText>
                  </View>
              })}
              listContainerStyle={styles.languageDropdownStyle}
            />*/}
              <ModalDropdown
                options={options}
                style={styles.languageDropdown}
                dropdownStyle={[styles.languageDropdownStyle]}
                renderRow={(rowData, index) => <CountryOption countryName={rowData.countryName} index={index} />}
                onSelect={(index, option) => {
                  if (option.countryCode != 'none') {
                    setCountryPrefix(option.phonePrefix || '');
                  }
                }}
                renderSeparator={() => <></>}
                onDropdownWillShow={() => setIsPhonePrefixShowing(true)}
                onDropdownWillHide={() => setIsPhonePrefixShowing(false)}>
                {renderLanguageDropdownMainItem(options[selectedLanguageIndex], '-1')}
              </ModalDropdown>
              {/*renderLanguageDropdownMainItem(options[selectedLanguageIndex], '-1')*/}
              <StyledTextInput
                style={styles.phoneNumberInput}
                onChangeText={setPhoneNumber}
                errorMessage={errorMessage}
                errorComponent={<ErrorTrans errorCode={errorMessage} />}
                keyboardType="numeric"
                onFocus={onFocusNumberPhone}
                onBlur={onBlurNumberPhone}
              />
            </View>

            <StyledButton
              title={t('Continue')}
              disabled={isSubmitBtnDisable}
              style={styles.continueButton}
              onPress={onSubmit}
              onPressDisabled={onSubmit}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  screenHeader: {
    marginBottom: rh(17),
  },
  screenContentContainer: {
    alignItems: 'center',
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
  continueButton: {
    width: '100%',
    marginTop: rh(106),
  },
  reloadOTPButton: {
    marginRight: rw(6),
  },
  errorMessage: {
    color: Palette.error,
    fontSize: rh(14),
    marginTop: rh(18),
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
  },
  phoneNumberInputContainer: {
    marginTop: rh(46),
    width: '100%',
    flexDirection: 'row',
  },
  languageDropdown: {
    width: rw(75),
    height: rh(42),
    borderWidth: 1,
    borderRadius: 31,
    borderColor: Palette.white,
    marginRight: rw(10),
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
  languageOptionLogo: {
    width: rw(21),
    height: rh(21),
    marginRight: rw(5),
    marginLeft: rw(10),
  },
  languageOptionText: {
    color: Palette.zaapi4,
    fontSize: rh(14),
    fontWeight: '600',
    width: rw(32),
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
});

export default EnterPhoneScreen;
