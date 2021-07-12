import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Image, I18nManager } from 'react-native';
import StyleHeader from 'App/Components/Header/StyleHeader';
import { useTranslation } from 'react-i18next';
import BackIcon from 'App/assets/icons/BackIcon.svg';
import { useNavigation } from '@react-navigation/native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/Utils/style';
import { Palette } from 'App/Theme/Palette';
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import CheckBoxContainer from 'App/assets/icons/CheckboxContainer.svg';
import setupI18N from 'App/Utils/i18n';
import DataStorage, { getStoredProperty } from 'App/Utils/storage';
import Header from 'App/Components/Header';

const listLanguage = [
  {
    key: 'en',
    title: 'English',
  },
  {
    key: 'th',
    title: 'ภาษาไทย',
  },
];
const Language = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const [languageCode, setLanguageCode] = useState('');
  const onChangeLng = async (selected: any) => {
    setLanguageCode(selected);
    console.log('saving new language code', selected);
    await DataStorage.save({ key: 'languageCode', data: selected });

    setupI18N();
  };
  useEffect(() => {
    (async () => {
      const language = await getStoredProperty('languageCode');
      setLanguageCode(language);
    })();
  }, []);
  const keyExtractor = useCallback((item, index) => index.toString(), []);
  const renderItem = (item: any, index: number) => {
    return (
      <View key={index} style={[styles.containerItem]}>
        <TouchableOpacity
          style={styles.btnItemLanguage}
          onPress={() => {
            onChangeLng(item.item.key);
          }}>
          <Text style={styles.txttitleLanguage}>{item.item.title}</Text>
          {languageCode === item.item.key ? <CheckBoxContainer style={styles.iconCheck} /> : null}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('Language')}
        icon={<BackIcon width={20} color={'#ffffff'} onPress={() => navigation.goBack()} />}
      />
      <View style={styles.content}>
        <FlatList
          // @ts-ignore
          data={listLanguage}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleHeaderStyle: {
    fontWeight: 'bold',
    fontSize: rh(18),
    lineHeight: rh(23),
    color: Palette.white,
    marginLeft: rw(20),
    justifyContent: 'center',
  },
  icLeftHeaderStyle: {
    justifyContent: 'center',
    marginLeft: rw(20),
  },
  styleHeader: {
    position: 'absolute',
    width: wp('100%'),
  },
  content: {
    position: 'absolute',
    backgroundColor: Palette.white,
    width: wp('100'),
    marginTop: rh(100),
    height: heightPercentageToDP('100%'),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
  containerItem: {
    borderBottomWidth: 1,
    borderColor: Palette.color_F5F5F5,
    paddingVertical: rh(15),
  },
  btnItemLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txttitleLanguage: {
    fontWeight: '600',
    fontSize: rh(14),
    lineHeight: rh(18),
    display: 'flex',
    flex: 1,
  },
  iconCheck: {
    marginRight: 12,
  },
});
export default Language;
