import Header from 'App/Components/Header';
import StyledText from 'App/Components/StyledText/StyledText';
import { Palette } from 'App/Theme/Palette';
import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Dimensions, Image, TouchableHighlight, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import RadioButtonGroup from 'App/Components/RadioButtonGroup';
import GoBackIcon from '../../../assets/icons/GoBackIcon.svg';
import SwitchCustom from 'App/Components/Switch/SwitchCustom';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { media } from 'App/assets/media';
import { debounce } from 'lodash';
import { GeoPosition } from 'react-native-geolocation-service';
import PenEditIcon from '../../../assets/icons/PenEdit.svg';
import { requestCreateStore, requestUpdateStore } from 'App/Repositories/store';
import { logError } from 'App/Utils/error';
import SetBusinessHourNowButton from './SetBusinessHourNowButton';
import { DAYS_IN_WEEK } from 'App/Utils/constants';
import { ChunkValue, formatChunkValue } from '../SetBusinessHoursScreen';
import { BusinessHoursKeyEnums, Store } from 'App/Types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import { updateStoreDataAction } from 'App/Redux/store/StoreActions';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { updateErrorModalData, updateSuccessModalData } from 'App/Redux/appState/AppStateActions';
import NavigationService from 'App/navigation/NavigationService';

const deliveryRadiusGeneralOptions = [
  {
    label: 'Domestic',
    value: 0,
  },
  {
    label: 'Radius',
    value: 1,
  },
];

const deliveryRadiusDetailOptions = [
  {
    label: '5 k',
    value: 1,
    radius: 5,
  },
  {
    label: '7.5 k (Recommended)',
    value: 2,
    radius: 7.5,
  },
  {
    label: '10 k',
    value: 3,
    radius: 10,
  },
  {
    label: '12.5 k',
    value: 4,
    radius: 12.5,
  },
  {
    label: '15 k',
    value: 5,
    radius: 15,
  },
  {
    label: 'Other',
    value: 6,
  },
];

const businessHoursOptions = [
  {
    label: 'Allow to place orders at any time',
    value: 1,
  },
  {
    label: 'Allow to place orders only business hours',
    value: 2,
  },
];

const StoreInformationScreen = ({ route, navigation }: any) => {
  const { t } = useTranslation('common');
  const [isFormValid, setIsFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isDisabledPressed, setIsDisabledPressed] = useState(false);
  const store: Partial<Store> = useSelector((state: RootState) => state.store);
  const isEditing = !!store.id;
  const [allowPickupEnabled, setAllowPickupEnabled] = useState<boolean>(store.allowPickupEnabled!);
  const [displayLocationOnlineEnabled, setDisplayLocationOnlineEnabled] = useState<boolean>(
    store.displayLocationOnlineEnabled!,
  );
  const [anytimeOrderEnabled, setAnytimeOrderEnabled] = useState<boolean>(store.anytimeOrderEnabled!);
  const [indexDeliveryType, setIndexDeliveryType] = useState<number>(store.deliveryType?.type == 'DOMESTIC' ? 0 : 1);
  const [radius, setRadius] = useState<number | undefined>(store.deliveryType?.radius);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateStoreDataAction({
        allowPickupEnabled,
        displayLocationOnlineEnabled,
        anytimeOrderEnabled,
        deliveryType: { type: indexDeliveryType === 0 ? 'DOMESTIC' : 'RADIUS', radius: radius },
      }),
    );
  }, [allowPickupEnabled, displayLocationOnlineEnabled, anytimeOrderEnabled, indexDeliveryType, radius]);

  const checkFormValid = () => {
    return true;
  };

  const onPressDisabled = () => {
    setIsDisabledPressed(true);
    showFormErrors();
  };

  const showFormErrors = () => {
    setFormErrors({});
  };

  const onContinuePress = async () => {
    if (!isEditing) {
      const { businessName, businessType, productSetType, productSetName, email, logoId } = store;
      const input: Partial<Store> = {
        businessName,
        businessType,
        productSetType,
        productSetName,
        logoId,
        allowPickupEnabled,
        displayLocationOnlineEnabled,
        anytimeOrderEnabled,
        deliveryType: { type: indexDeliveryType === 0 ? 'DOMESTIC' : 'RADIUS', radius: radius },
        address: store.address,
        businessHours: store?.businessHours,
      };

      if (email) {
        input.email = email;
      }

      try {
        const store = await requestCreateStore(input);
        dispatch(updateStoreDataAction(store));
        navigation.replace('BottomTabStack');
      } catch (error) {
        logError(error);
      }
    } else {
      try {
        const updatedFields: Partial<Store> = {
          allowPickupEnabled,
          displayLocationOnlineEnabled,
          anytimeOrderEnabled,
          deliveryType: { type: indexDeliveryType === 0 ? 'DOMESTIC' : 'RADIUS', radius: radius },
          address: store.address,
          businessHours: store?.businessHours,
        };
        await requestUpdateStore(updatedFields);
        dispatch(updateStoreDataAction(updatedFields));
        dispatch(
          updateSuccessModalData({
            display: true,
          }),
        );
        NavigationService.goBack();
      } catch (error) {
        dispatch(
          updateErrorModalData({
            title: t('An error occurred'),
            subtitle: error?.response?.data?.message,
            dismissButtonTitle: t('Got It'),
            display: true,
          }),
        );
      }
    }
  };

  const onSelectDeliveryRadiusGeneral = (value: number) => {
    setIndexDeliveryType(value);
  };

  const onSelectDeliveryRadiusDetail = (value: number) => {
    const radiusItem = deliveryRadiusDetailOptions.find(option => option.value == value);
    setRadius(radiusItem?.radius);
  };

  const onSelectBusinessHours = (value: number) => {
    // console.log('value', value);
    // console.log('onSelectBusinessHours', value);
    const isEnabled = Number(value) === 1;
    if (store.productSetType !== 'F&B' && !isEnabled) {
      dispatch(
        updateErrorModalData({
          title: t('Note'),
          subtitle: t('Customers will only be able to place orders during your business hours'),
          display: true,
        }),
      );
    }
    setAnytimeOrderEnabled(isEnabled);
  };

  /*useEffect(() => {
    if (isDisabledPressed) {
      showFormErrors();
    }
  }, [businessName, businessTypeSelectedIndex, productTypeSelectedIndex, otherProductType]);*/

  const onClickChooseHandler = useCallback(
    debounce(() => {
      navigation.push('StoreLocationScreen', {
        name: navigation.dangerouslyGetState().key,
        key: route.key,
      });
    }, 500),
    [],
  );
  const onClickChoose = () => {
    onClickChooseHandler();
  };

  const onClickSetBusinessHoursHandler = useCallback(
    debounce(() => {
      navigation.push('SetBusinessHoursScreen', {
        name: navigation.dangerouslyGetState().key,
        key: route.key,
        businessHours: store?.businessHours,
      });
    }, 500),
    [],
  );
  const onClickSetBusinessHours = () => {
    onClickSetBusinessHoursHandler();
  };
  return (
    <>
      <View>
        <Header
          title={isEditing ? t('Delivery Settings') : t('Store Information')}
          icon={<GoBackIcon width={20} color={'#ffffff'} onPress={() => navigation.goBack()} />}
        />
        <View style={styles.screenContent}>
          <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
            <View style={[styles.formItem, styles.formItemStoreLocation]}>
              <StyledText style={[styles.formItemTitle, styles.formItemTitleLocation]}>
                {t('Store Location')}
                <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
              </StyledText>
              <View style={styles.thumbnailMap}>
                {store.address === undefined ? (
                  <>
                    <Image
                      source={media.BlankMapThumbnail}
                      style={{
                        borderRadius: 12,
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                      }}
                    />
                    <TouchableHighlight
                      underlayColor={Palette.white}
                      activeOpacity={0.5}
                      style={{
                        borderRadius: 12,
                        position: 'absolute',
                        backgroundColor: Palette.white,
                        alignSelf: 'center',
                        marginVertical: rh(33),
                      }}
                      onPress={onClickChoose}>
                      <View style={{ flex: 1, flexDirection: 'row', paddingVertical: rh(11), paddingHorizontal: 16 }}>
                        <StyledText style={{ fontSize: rh(12), marginRight: 6.75, color: Palette.grey }}>
                          Choose your location
                        </StyledText>
                        <Image source={media.MapMarker} style={{ width: rw(12), height: rh(15) }} />
                      </View>
                    </TouchableHighlight>
                  </>
                ) : (
                  <View>
                    <MapView
                      zoomTapEnabled={false}
                      zoomControlEnabled={false}
                      scrollEnabled={false}
                      provider={PROVIDER_GOOGLE}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      region={{
                        latitude: +(store.address?.latitude || '0'),
                        longitude: +(store.address?.longitude || '0'),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                      mapType={'standard'}>
                      <Marker
                        key={'currentPosition'}
                        coordinate={{
                          latitude: +(store.address?.latitude || '0'),
                          longitude: +(store.address?.longitude || '0'),
                        }}
                        title={''}
                        description={''}>
                        <Image source={media.MapMarker} style={styles.mapMarker} />
                      </Marker>
                    </MapView>
                  </View>
                )}
              </View>
              {!!store.address?.addressDetails && (
                <View style={{ marginTop: rh(12), flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: rh(14), color: Palette.zaapi4 }}>{store.address?.addressDetails}</Text>
                  <TouchableOpacity onPress={onClickChoose}>
                    <PenEditIcon style={{ height: rh(20), width: rw(20), alignItems: 'flex-end' }} />
                  </TouchableOpacity>
                </View>
              )}
              <View style={{ marginTop: rh(7) }}>
                <View style={styles.switchFormItemContainer}>
                  <StyledText>{t('Allow customer self pick-up')}</StyledText>
                  <SwitchCustom
                    value={allowPickupEnabled}
                    onValueChange={setAllowPickupEnabled}
                    containerStyle={styles.formItemSwitch}
                  />
                </View>
                <View style={styles.switchFormItemContainer}>
                  <StyledText>{t('Display location on online store')}</StyledText>
                  <SwitchCustom
                    value={displayLocationOnlineEnabled}
                    onValueChange={setDisplayLocationOnlineEnabled}
                    containerStyle={styles.formItemSwitch}
                  />
                </View>
              </View>
            </View>
            <View style={[styles.formItem, { marginTop: rh(25) }]}>
              <StyledText style={styles.formItemTitle}>
                {t('Delivery Radius')}
                <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
              </StyledText>
              <RadioButtonGroup
                radio={deliveryRadiusGeneralOptions}
                onPress={onSelectDeliveryRadiusGeneral}
                initial={indexDeliveryType}
              />
            </View>
            {indexDeliveryType === 1 && (
              <View style={styles.formItem}>
                <StyledText style={styles.formItemTitle}>
                  {t('Delivery Radius')}
                  <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                </StyledText>
                <RadioButtonGroup
                  radio={deliveryRadiusDetailOptions}
                  onPress={onSelectDeliveryRadiusDetail}
                  initial={deliveryRadiusDetailOptions.findIndex(
                    item => item.radius == (store.deliveryType?.radius || 7.5),
                  )}
                />
              </View>
            )}
            <View style={[styles.formItem]}>
              <StyledText style={styles.formItemTitle}>
                {t('Business Hours')}
                <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
              </StyledText>
              <RadioButtonGroup
                radio={businessHoursOptions}
                onPress={onSelectBusinessHours}
                initial={anytimeOrderEnabled ? 0 : 1}
              />
              {!anytimeOrderEnabled && (
                <View style={styles.selectedBusinessHoursContainer}>
                  {!store.businessHours && (
                    <SetBusinessHourNowButton
                      title={t('Set business hours now')}
                      onPress={onClickSetBusinessHours}
                      style={{ width: rw(175) }}
                    />
                  )}
                  {!!store.businessHours && (
                    <View style={{ flexDirection: 'row' }}>
                      <View style={styles.businessHourDisplayContainer}>
                        {Object.keys(store.businessHours).map((key: any) => (
                          <View style={styles.dayInWeekContainer}>
                            <StyledText style={styles.dayInWeekText}>
                              {t(DAYS_IN_WEEK.find(item => item.key == key)?.fullText!)}
                            </StyledText>
                            <View style={styles.chunkValuesContainer}>
                              {(store.businessHours as any)[key]?.map((item: ChunkValue) => (
                                <StyledText style={styles.chunkValueText}>{formatChunkValue(item).text}</StyledText>
                              ))}
                            </View>
                          </View>
                        ))}
                      </View>
                      <View style={{ flexDirection: 'row', paddingLeft: rw(30) }}>
                        <TouchableOpacity onPress={onClickSetBusinessHours} style={styles.editBusinessHoursButton}>
                          <PenEditIcon style={{ height: rh(20), width: rw(20) }} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <StyledButton
          disabled={false && !checkFormValid()}
          title={isEditing ? t('Save') : t('Continue')}
          style={styles.continueButton}
          onPressDisabled={onPressDisabled}
          onPress={onContinuePress}
        />
      </View>
    </>
  );
};

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  screenContent: {
    position: 'absolute',
    marginTop: rh(102),
    borderRadius: 20,
    backgroundColor: Palette.white,
    height: screenHeight - 102,
    width: '100%',
    paddingLeft: rw(16),
    paddingRight: rw(16),
  },
  addImageIcon: {
    marginTop: rh(27),
    marginBottom: rh(4),
  },
  formContainer: {
    paddingTop: rh(20),
    marginBottom: rh(90),
  },
  formItem: {
    marginBottom: rh(10),
    // height: rh(18) + 6 + 42 + 30,
  },
  formItemTitle: {
    fontWeight: '700',
    fontSize: rh(14),
    marginBottom: rh(22),
  },
  requiredMark: {
    color: Palette.error,
  },
  logo: {
    width: rw(94),
    height: rh(94),
    borderRadius: 94 / 2,
  },
  bottomSection: {
    position: 'absolute',
    flexDirection: 'column',
    width: screenWidth,
    bottom: rh(30),
    justifyContent: 'center',
    paddingLeft: rw(16),
    paddingRight: rw(16),
  },
  continueButton: {
    width: '100%',
    height: rh(40),
  },
  businessTypeDropdownSelect: {
    width: screenWidth - 16 * 2,
  },
  switchFormItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rh(25),
  },
  formItemSwitch: {
    position: 'absolute',
    right: 0,
  },
  formItemStoreLocation: {},
  thumbnailMap: {
    borderRadius: 12,
    height: rh(103),
    overflow: 'hidden',
  },
  selectedBusinessHoursContainer: {
    paddingLeft: rw(40),
    minHeight: 80,
  },
  chunkValuesContainer: {
    flexDirection: 'column',
  },
  dayInWeekContainer: {
    marginBottom: rh(6),
    flexDirection: 'row',
  },
  dayInWeekText: {
    color: Palette.zaapi4,
    width: rw(80),
  },
  chunkValueText: {
    color: Palette.zaapi4,
    marginBottom: rh(4),
  },
  businessHourDisplayContainer: {
    // height: 400
  },
  editBusinessHoursButton: {
    // position: 'absolute',
  },
  formItemTitleLocation: {
    marginBottom: rh(6),
  },
  mapMarker: { width: rw(24), height: rw(32) },
});

export default StoreInformationScreen;
