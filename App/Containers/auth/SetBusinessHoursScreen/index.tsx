import { useLayout } from '@react-native-community/hooks';
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useBoolean from 'App/Hooks/useBoolean';
import HeaderComponent from 'App/Components/Header/HeaderComponent';
import { CheckedRadioButton, ClockIcon, UnCheckedRadioButton } from 'App/assets/svg';
import ViewSetHoliday from './ViewSetHoliday';
import StyledText from 'App/Components/StyledText/StyledText';
import ItemSlider from './ItemSlider';
import { formatMinutesToHoursInDay } from 'App/Utils/time';
import { useTranslation } from 'react-i18next';
import { cloneDeep, isEqual } from 'lodash';
import { Palette } from 'App/Theme/Palette';
import { requestUpdateStore } from 'App/Repositories/store';
import { DailyWorkingPeriod, Store } from 'App/Types';
import { useDispatch, useSelector } from 'react-redux';
import { updateStoreDataAction } from 'App/Redux/store/StoreActions';
import { RootState } from 'App/Redux';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { updateErrorModalData } from 'App/Redux/appState/AppStateActions';

export type ChunkValue = {
  start: number;
  end: number;
  text?: string;
};

export const formatChunkValue = (chunkValue: ChunkValue) => {
  chunkValue.text = `${formatMinutesToHoursInDay(chunkValue.start)} - ${formatMinutesToHoursInDay(chunkValue.end)}`;
  return chunkValue;
};

const checkIsCustomBusinessHours = (store: Partial<Store>) => {
  if (!store.businessHours) return false;
  const businessHoursDays = Object.keys(store.businessHours);
  if (businessHoursDays.length !== 7) return true;

  const all = (store.businessHours as any)[businessHoursDays[0]];
  for (let day of businessHoursDays) {
    if (!isEqual(all, (store.businessHours as any)[day])) {
      return true;
    }
  }
  return false;
};

const SetBusinessHoursScreen = ({ navigation, route }: any) => {
  const { onLayout, height } = useLayout();
  const { t } = useTranslation();
  const store: Partial<Store> = useSelector((state: RootState) => state.store);
  const isCustomBusinessHours = useMemo(() => checkIsCustomBusinessHours(store), [store]);
  const [isCustom, setCheckedCustom, hideCheckedCustom] = useBoolean(isCustomBusinessHours);
  const dispatch = useDispatch();

  const getInitialDaySelectState = useCallback(() => {
    let initialDays = [
      { text: t('Mon'), value: 2, checked: false, fullText: t('Monday'), key: 'MON' },
      { text: t('Tue'), value: 2, checked: false, fullText: t('Tuesday'), key: 'TUE' },
      { text: t('Wed'), value: 2, checked: false, fullText: t('Wednesday'), key: 'WED' },
      { text: t('Thu'), value: 2, checked: false, fullText: t('Thursday'), key: 'THU' },
      { text: t('Fri'), value: 2, checked: false, fullText: t('Friday'), key: 'FRI' },
      { text: t('Sat'), value: 2, checked: false, fullText: t('Saturday'), key: 'SAT' },
      { text: t('Sun'), value: 2, checked: false, fullText: t('Sunday'), key: 'SUN' },
    ];

    if (isCustomBusinessHours) {
      if (store?.businessHours) {
        const businessHoursDays = Object.keys(store?.businessHours);
        initialDays.forEach(day => {
          day.checked = businessHoursDays.includes(day.key);
        });
      }
    }
    return initialDays;
  }, []);

  const getInitialChunkValues = useCallback(() => {
    let initialChunkValues: any = {
      default: defaultChunkValues,
      all: defaultChunkValues,
      MON: defaultChunkValues,
      TUE: defaultChunkValues,
      WED: defaultChunkValues,
      THU: defaultChunkValues,
      FRI: defaultChunkValues,
      SAT: defaultChunkValues,
      SUN: defaultChunkValues,
    };

    if (store?.businessHours) {
      const businessHoursDays = Object.keys(store.businessHours);
      businessHoursDays.forEach(key => {
        initialChunkValues[key] = (store?.businessHours as any)[key].map(formatChunkValue);
      });

      if (!isCustomBusinessHours) {
        initialChunkValues.all = (store?.businessHours as any)[businessHoursDays[0]].map(formatChunkValue);
      }
    }

    return initialChunkValues;
  }, []);

  const [data, setData] = useState(getInitialDaySelectState());
  const defaultChunkValues = [formatChunkValue({ start: 0, end: 60 * 24 })];

  const [chunkValuesMap, setChunkValuesMap] = useState<any>(getInitialChunkValues());
  const [onHolidayEnabled, setOnHolidayEnabled] = useState(store.onHolidayEnabled || false);

  const changeStatusItem = useCallback((item: any) => {
    setData(state => state.map(i => ({ ...i, checked: i.text === item.text ? !item.checked : i.checked })));
  }, []);

  const onChunkValuesMapChange = (key: string) => (chunkValues: any) => {
    chunkValues = chunkValues.map(formatChunkValue);
    setChunkValuesMap((current: any) => ({
      ...current,
      [key]: chunkValues,
    }));
  };

  const addAnotherPeriodMap = (key: string) => () => {
    const chunkValues = chunkValuesMap[key];
    if (chunkValues.length >= 4) {
      // showModalChunkCountLimit();
      dispatch(
        updateErrorModalData({
          title: t('Sorry, you’ve reached the limit'),
          subtitle: t(
            'You can add a maximum of 4 periods per day. You need to remove one before you can add new period.',
          ),
          dismissButtonTitle: t('Got it'),
          display: true,
        }),
      );
      return;
    }

    let newChunk: ChunkValue = { start: 0, end: 0 };
    let position = -1;

    if (chunkValues.length === 0) {
      newChunk = { start: 0, end: 60 * 24 };
    } else {
      const lastChunkValue = chunkValues[chunkValues.length - 1];

      if (lastChunkValue.end < 60 * 24 - 60 * 2) {
        newChunk = { start: lastChunkValue.end + 60, end: 60 * 24 /* lastChunkValue.end + 60 * 2*/ };
      } else {
        const firstChunkValue = chunkValues[0];
        if (firstChunkValue.start >= 60 * 2) {
          newChunk = { start: 0 /*lastChunkValue.end - 60 * 2*/, end: firstChunkValue.start - 60 };
          position = 0;
        } else {
          if (chunkValues.length >= 2) {
            for (let i = 1; i < chunkValues.length; i++) {
              if (chunkValues[i].start - chunkValues[i - 1].end >= 60 * 3) {
                newChunk = { start: chunkValues[i - 1].end + 60, end: chunkValues[i].start - 60 };
                position = i;
              }
            }
          }
        }
      }
    }

    if (newChunk.start == 0 && newChunk.end == 0) {
      // showModalChunkFull();
      dispatch(
        updateErrorModalData({
          title: t('Sorry, you cannot add a period'),
          subtitle: t('The timeline is full, if you want to add another period, please make room for it first.'),
          dismissButtonTitle: t('Got it'),
          display: true,
        }),
      );
      return;
    }

    if (position == -1) {
      setChunkValuesMap((current: any) => ({
        ...current,
        [key]: [...chunkValues, formatChunkValue(newChunk)],
      }));
    } else {
      let newChunkValues = cloneDeep(chunkValues);
      newChunkValues.splice(position, 0, formatChunkValue(newChunk));
      setChunkValuesMap((current: any) => ({
        ...current,
        [key]: newChunkValues,
      }));
    }
  };

  const onDeleteChunkMap = (key: string) => (index: number) => {
    let newChunkValues = cloneDeep(chunkValuesMap[key]);
    if (newChunkValues.length == 1) {
      dispatch(
        updateErrorModalData({
          title: t('Sorry you cannot delete this period'),
          subtitle: t('At least 1 period is required'),
          dismissButtonTitle: t('Got it'),
          display: true,
        }),
      );
      return;
    }
    newChunkValues.splice(index, 1);
    setChunkValuesMap((current: any) => ({
      ...current,
      [key]: newChunkValues,
    }));
  };

  const applyDefaultSettingMap = (key: string) => () => {
    setChunkValuesMap((current: any) => ({
      ...current,
      [key]: current['default'],
    }));
  };

  const onSavePress = async () => {
    const selectedDays = isCustom
      ? data.filter(item => item.checked).map(item => item.key)
      : data.map(item => item.key);
    let businessHours: any = {};

    if (isCustom) {
      selectedDays.forEach(day => {
        businessHours[day] = chunkValuesMap[day].map((item: ChunkValue) => ({
          start: item.start,
          end: item.end,
        }));
      });
    } else {
      selectedDays.forEach(day => {
        businessHours[day] = chunkValuesMap.all.map((item: ChunkValue) => ({
          start: item.start,
          end: item.end,
        }));
      });
    }

    const updatedFields = {
      businessHours,
      onHolidayEnabled,
    };

    if (store.id) {
      await requestUpdateStore(updatedFields);
      dispatch(updateStoreDataAction(updatedFields));
      navigation.goBack();
    } else {
      dispatch(updateStoreDataAction(updatedFields));
      navigation.navigate('StoreInformationScreen');
    }
  };

  const onSetHolidayValueChange = (value: boolean) => {
    setOnHolidayEnabled(value);
  };

  return (
    <View style={styles.container}>
      <HeaderComponent
        styleViewBorder={styles.styleViewBorder}
        onLayout={onLayout}
        titleBack={t('Set Business Hours')}
      />

      <View style={[styles.viewContainer, { top: height }]}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.viewHeader}>
            <View style={styles.topOptionsContainer}>
              <StyledText style={styles.textTitle}>{t('Working Days')}*</StyledText>

              <View style={styles.viewSelectDate}>
                {data.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => changeStatusItem(item)}
                    style={[styles.viewItemDate, item.checked && styles.checkedItemDate]}
                    key={index}>
                    <StyledText style={[styles.textItemDate, item.checked && styles.textCheckedItemDate]}>
                      {item.text}
                    </StyledText>
                  </TouchableOpacity>
                ))}
              </View>

              <StyledText style={[styles.textTitle, styles.textBusinesHour]}>{t('Business Hours')}*</StyledText>

              <View style={styles.viewSelect}>
                <TouchableOpacity onPress={hideCheckedCustom} style={styles.viewSlectItem}>
                  {!isCustom ? <CheckedRadioButton /> : <UnCheckedRadioButton />}
                  <StyledText style={styles.textRightSelect}>{t('Apply to all working days')}</StyledText>
                </TouchableOpacity>

                <TouchableOpacity onPress={setCheckedCustom} style={styles.viewSlectItem}>
                  {isCustom ? <CheckedRadioButton /> : <UnCheckedRadioButton />}
                  <StyledText style={styles.textRightSelect}>{t('Custom')}</StyledText>
                </TouchableOpacity>
              </View>
            </View>

            {!isCustom && (
              <View style={styles.businessHourContainer}>
                <ItemSlider
                  onChunkValuesChange={onChunkValuesMapChange('all')}
                  chunkValues={chunkValuesMap['all']}
                  onDelete={onDeleteChunkMap('all')}
                />

                <View style={styles.viewAddAnother}>
                  <TouchableOpacity style={styles.buttonAddAnother} onPress={addAnotherPeriodMap('all')}>
                    <ClockIcon color={Palette.color_42A391} />
                    <StyledText style={styles.textButtonAddAnother}>{t('Add another period')}</StyledText>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {isCustom && (
              <View>
                <View style={[styles.defaultBusinessHourContainer]}>
                  <StyledText style={styles.businessHourSectionHeader}>{t('Default Business Hours')}</StyledText>
                  <ItemSlider
                    onChunkValuesChange={onChunkValuesMapChange('default')}
                    chunkValues={chunkValuesMap['default']}
                    onDelete={onDeleteChunkMap('default')}
                  />

                  <View style={styles.viewAddAnother}>
                    <TouchableOpacity style={styles.buttonAddAnother} onPress={addAnotherPeriodMap('default')}>
                      <ClockIcon color={Palette.color_42A391} />
                      <StyledText style={styles.textButtonAddAnother}>{t('Add another period')}</StyledText>
                    </TouchableOpacity>
                  </View>
                </View>

                {data
                  .filter(({ checked }) => checked)
                  .map(item => (
                    <Fragment key={item.key}>
                      <View style={styles.businessHourContainer}>
                        <StyledText style={styles.businessHourSectionHeader}>{item.fullText}</StyledText>
                        <ItemSlider
                          onChunkValuesChange={onChunkValuesMapChange(item.key)}
                          chunkValues={chunkValuesMap[item.key]}
                          onDelete={onDeleteChunkMap(item.key)}
                        />

                        <View style={styles.viewAddAnother}>
                          <TouchableOpacity style={styles.buttonAddAnother} onPress={addAnotherPeriodMap(item.key)}>
                            <ClockIcon color={Palette.color_42A391} />
                            <StyledText style={styles.textButtonAddAnother}>{t('Add another period')}</StyledText>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.buttonApplyDefaultSetting}
                            onPress={applyDefaultSettingMap(item.key)}>
                            <StyledText style={styles.textButtonApplyDefaultSetting}>
                              {t('Apply Default Settings')}
                            </StyledText>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.businessHourDivider}></View>
                    </Fragment>
                  ))}
              </View>
            )}
          </View>
          <ViewSetHoliday
            onSavePress={onSavePress}
            onSetHolidayValueChange={onSetHolidayValueChange}
            onHolidaysEnabled={onHolidayEnabled}
            storeId={store.id}
          />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  textTitle: { color: '#4B4A4B', fontWeight: '700' },
  viewHeader: { backgroundColor: '#fff', paddingBottom: rh(30), paddingTop: rh(20) },
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
  styleViewBorder: { backgroundColor: 'transparent' },
  viewSelectDate: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: rh(30) },
  viewItemDate: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#42A391',
    marginHorizontal: rw(3),
    paddingVertical: rh(5),
    borderRadius: 15,
  },
  textItemDate: { fontSize: rh(14), color: '#42A391' },
  textBusinesHour: { marginTop: rh(30) },
  viewSlectItem: { flexDirection: 'row', alignItems: 'center', marginTop: rh(15) },
  textRightSelect: { flex: 1, marginLeft: rw(16), fontSize: rh(14), color: '#4B4A4B', fontWeight: '600' },
  viewSelect: { marginTop: rh(5) },
  viewAddAnother: {
    alignItems: 'center',
    marginTop: rh(25),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonAddAnother: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: rw(0),
      height: rh(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    paddingHorizontal: rw(10),
    paddingVertical: rh(7),
  },
  buttonApplyDefaultSetting: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: rw(0),
      height: rh(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    paddingHorizontal: rw(13),
    paddingVertical: rh(7),
    marginLeft: rw(10),
  },
  textButtonAddAnother: { color: '#42A391', fontSize: rh(12), fontWeight: '600', marginLeft: rw(10) },
  textButtonApplyDefaultSetting: {
    color: '#42A391',
    fontSize: rh(12),
    fontWeight: '600',
  },
  checkedItemDate: { backgroundColor: '#42A391' },
  textCheckedItemDate: { color: '#fff' },
  defaultBusinessHourContainer: {
    backgroundColor: Palette.color_F5F5F5,
    paddingLeft: rw(16),
    paddingRight: rw(16),
    paddingBottom: rh(20),
    paddingTop: rh(16),
    marginTop: rh(30),
    borderRadius: 12,
    marginHorizontal: rw(15),
  },
  businessHourContainer: {
    paddingTop: rh(30),
    paddingBottom: rh(30),
    paddingHorizontal: rw(15),
  },
  businessHourSectionHeader: {
    fontWeight: '600',
    marginBottom: rh(25),
    color: Palette.zaapi4,
  },
  businessHourDivider: {
    height: rh(10),
    backgroundColor: Palette.color_F5F5F5,
  },
  topOptionsContainer: {
    paddingHorizontal: rw(15),
  },
});

export default memo(SetBusinessHoursScreen);
