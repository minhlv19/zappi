import { Link } from '@react-navigation/native';
import { media } from 'App/assets/media';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import StyledText from 'App/Components/StyledText/StyledText';
import { Palette } from 'App/Theme/Palette';
import setupI18N from 'App/Utils/i18n';
import { getDefaultLanguageCode } from 'App/Utils/localize';
import DataStorage, { getStoredProperty } from 'App/Utils/storage';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, ImageBackground, Image, Dimensions, StatusBar } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ModalDropdown from 'react-native-modal-dropdown';
import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon.svg';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from 'App/Utils/constants';

const options = [
  {
    languageCode: 'th',
    languageName: 'Thai',
    languageLogo: media.Thailand,
  },
  {
    languageCode: 'en',
    languageName: 'Eng',
    languageLogo: media.UnitedKingdom,
  },
];

const LandingScreen = ({ navigation }: any) => {
  const { t } = useTranslation('common');
  const [languageCode, setLanguageCode] = useState(getDefaultLanguageCode());

  const renderLanguageDropdownItem = (rowData: any, index: string) => {
    const indexInt = +index;
    const isDropdownSelected = index == '-1';
    const isSelected = !isDropdownSelected && languageCode === rowData.languageCode;
    return (
      <View
        style={[
          styles.languageOptionContainer,
          isSelected ? { backgroundColor: Palette.white } : {},
          indexInt == 0 ? styles.languageOptionContainerFirst : {},
          isDropdownSelected ? { height: rh(40) } : {},
          indexInt == options.length - 1 ? styles.languageOptionContainerLast : {},
        ]}>
        <Image source={rowData.languageLogo} style={styles.languageOptionLogo} />
        <StyledText style={[styles.languageOptionText, isSelected ? { color: Palette.zaapi2 } : {}]}>
          {rowData.languageName}
        </StyledText>
        {isDropdownSelected && <ArrowDownIcon color={Palette.white} style={styles.languageDropdownArrowDownIcon} />}
      </View>
    );
  };

  useEffect(() => {
    (async () => {
      const savedLanguageCode = await getStoredProperty('languageCode');
      console.log('savedLanguageCode', savedLanguageCode);
      if (savedLanguageCode) {
        setLanguageCode(savedLanguageCode);
      }
    })();
  }, []);

  const onSelectLanguageCode = async (selected: string) => {
    setLanguageCode(selected);
    console.log('saving new language code', selected);
    await DataStorage.save({ key: 'languageCode', data: selected });
    setupI18N();
  };

  const selectedLanguageIndex = options.findIndex(option => option.languageCode == languageCode);

  return (
    <ImageBackground source={media.Landing} style={{ width: '100%', height: '100%' }}>
      <View style={styles.screenContainer}>
        <View style={styles.modalDropdownContainer}>
          <ModalDropdown
            options={options}
            style={styles.languageDropdown}
            dropdownStyle={[
              styles.languageDropdownStyle,
              {
                height: options.length * 38,
              },
            ]}
            renderRow={renderLanguageDropdownItem}
            onSelect={(index, option) => {
              onSelectLanguageCode(option.languageCode);
            }}>
            {renderLanguageDropdownItem(options[selectedLanguageIndex], '-1')}
          </ModalDropdown>
        </View>
        <Image source={media.logo_white} style={styles.logo} />
        <StyledText style={styles.quote}>{t('Start selling online in minutes. Let’s go!')}</StyledText>
        <View style={styles.bottomSection}>
          <StyledText style={styles.privacyPolicyText}>
            {t('By creating a new store, you agree to our ')}
            <Link to={`/webview?url=${TERMS_OF_SERVICE_URL}&&title=Terms of Service`}>
              <StyledText style={styles.hyperlink}>{t('Terms of Service')}</StyledText>
            </Link>
            <StyledText>{t(' and ')}</StyledText>
            <Link to={`/webview?url=${PRIVACY_POLICY_URL}&&title=Privacy Policy`}>
              <StyledText style={styles.hyperlink}>{t('Privacy Policy')}</StyledText>
            </Link>
          </StyledText>
          <StyledButton
            title={t('Create New Store')}
            disabled={true}
            style={styles.createNewStoreButton}
            onPressDisabled={() => navigation.navigate('EnterPhoneScreen', { isLoggingIn: false })}
          />
          <View style={styles.loginPromptContainer}>
            <StyledText style={styles.alreadyHaveAccountText}>{t('Already have an account?')}</StyledText>
            <TouchableOpacity>
              {/*<Link to="/EnterPhoneNumberScreen?isLoggingIn=false">*/}
              <TouchableWithoutFeedback onPress={() => navigation.navigate('EnterPhoneScreen', { isLoggingIn: true })}>
                <StyledText style={styles.loginText}>{t('Log in')}</StyledText>
              </TouchableWithoutFeedback>
              {/*</Link>*/}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  screenContainer: {
    paddingLeft: rw(16),
    paddingRight: rw(16),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  logo: {
    marginTop: rh(205),
    width: rw(179),
    aspectRatio: 179 / 67,
    height: 'auto',
  },
  quote: {
    fontSize: rh(20),
    textAlign: 'center',
    marginTop: rh(18),
    color: Palette.white,
  },
  bottomSection: {
    position: 'absolute',
    flexDirection: 'column',
    display: 'flex',
    width: '100%',
    height: rh((screenHeight * 20) / 100),
    bottom: 0,
    alignItems: 'center',
  },
  createNewStoreButton: {
    width: '100%',
    marginTop: rh(20),
  },
  alreadyHaveAccountText: {
    fontSize: rh(12),
    color: Palette.white,
    marginTop: rh(20),
    fontWeight: '600',
  },
  loginPromptContainer: {
    flexDirection: 'row',
    lineHeight: rh(18),
  },
  loginText: {
    fontSize: rh(12),
    color: Palette.white,
    marginTop: rh(20),
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginLeft: rw(3),
  },
  privacyPolicyText: {
    fontSize: rh(12),
    color: Palette.white,
    textAlign: 'center',
    width: rw((screenWidth * 2) / 3),
  },
  hyperlink: {
    fontWeight: 'bold',
  },
  languageDropdown: {
    width: rw(110),
    height: rh(42),
    marginTop: rh(69 - (StatusBar.currentHeight || 0)),
    borderWidth: 1,
    borderRadius: 31,
    borderColor: Palette.white,
  },
  modalDropdownContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  languageOptionContainer: {
    flexDirection: 'row',
    height: rh(37),
    width: rw(110),
    alignItems: 'center',
  },
  languageOptionLogo: {
    width: rw(21),
    height: rh(21),
    marginRight: rw(9),
    marginLeft: rw(14),
  },
  languageOptionText: {
    color: Palette.white,
    fontSize: rh(16),
    fontWeight: '600',
  },
  languageDropdownStyle: {
    borderRadius: 12,
    borderColor: Palette.white,
    backgroundColor: 'transparent',
    borderWidth: 1,
    marginTop: rh(6),
  },
  languageOptionContainerFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  languageDropdownArrowDownIcon: {
    marginLeft: rw(11),
  },
  languageOptionContainerLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export default LandingScreen;
