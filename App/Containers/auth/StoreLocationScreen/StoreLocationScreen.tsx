import Header from 'App/Components/Header';
import StyledText from 'App/Components/StyledText/StyledText';
import { Palette } from 'App/Theme/Palette';
import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Dimensions, Switch, Image, Platform, Text, TextInput, Alert } from 'react-native';
import { FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import GoBackIcon from '../../../assets/icons/GoBackIcon.svg';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import { media } from 'App/assets/media';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_MAPS_API_KEY } from '@env';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import CurrentLocationIcon from 'App/assets/icons/currentLocation.svg';
import CloseIcon from 'App/assets/icons/CloseIcon.svg';
import LocationIcon from 'App/assets/icons/LocationIcon.svg';
import _, { debounce } from 'lodash';
import { StackActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateStoreDataAction } from 'App/Redux/store/StoreActions';
import { Store } from 'App/Types';
import { RootState } from 'App/Redux';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { openSettings, Permission, PERMISSIONS, request } from 'react-native-permissions';
import NavigationService from 'App/navigation/NavigationService';

Geocoder.init(GOOGLE_MAPS_API_KEY);

interface RadiusItem {
  label: string;
  value: number;
  radius: number;
}

const deliveryRadiusOnMapDetailOptions: RadiusItem[] = [
  {
    label: '5k',
    value: 1,
    radius: 5,
  },
  {
    label: '7.5k',
    value: 2,
    radius: 7.5,
  },
  {
    label: '10k',
    value: 3,
    radius: 10,
  },
  {
    label: '12.5k',
    value: 4,
    radius: 12.5,
  },
  {
    label: '15k',
    value: 5,
    radius: 15,
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

function SearchBar({ position, setPosition, locationText, setLocationText, getCurrentLocation }: any) {
  /**
   * @typedef {import('react-native-google-places-autocomplete').GooglePlacesAutocompleteRef}
   */
  /**
   * @typedef {import('react').MutableRefObject}
   */

  /**
   * @type {React.MutableRefObject<GooglePlacesAutocompleteRef | null>}
   */
  const myRef = React.useRef<GooglePlacesAutocompleteRef>(null);

  React.useEffect(() => {
    myRef.current?.getAddressText();
  }, []);

  React.useEffect(() => {
    myRef.current?.setAddressText(locationText);
  }, [locationText]);
  const clear = () => {
    myRef.current?.clear();
  };

  const onPressRow = (data: GooglePlaceData, detail: GooglePlaceDetail | null = null) => {
    const { lat, lng }: any = detail?.geometry.location;
    setPosition(
      _.merge(_.cloneDeep(position), {
        coords: {
          latitude: lat,
          longitude: lng,
        },
      }),
    );
    setLocationText(data.description);
  };

  return (
    <View
      style={{
        position: 'absolute',
        flexDirection: 'column',
        width: screenWidth,
        top: 20,
        paddingLeft: rw(16),
        paddingRight: rw(16),
      }}>
      <GooglePlacesAutocomplete
        ref={myRef}
        enablePoweredByContainer={false}
        renderRow={data => {
          return (
            <View style={{ flexDirection: 'row' }}>
              <LocationIcon
                height={14}
                width={14}
                style={{
                  marginVertical: rh(6),
                  marginLeft: 10.75,
                  marginRight: 10.75,
                }}
              />
              <Text
                style={{
                  marginVertical: rh(6),
                  fontSize: rh(14),
                }}>
                {data.description}
              </Text>
            </View>
          );
        }}
        renderRightButton={() => (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={clear}>
              <View style={{ height: rh(14), width: rw(14), marginRight: rw(15), marginVertical: 11 }}>
                <CloseIcon />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={getCurrentLocation}>
              <View style={{ height: rh(18), width: rw(18), marginRight: rw(12), marginVertical: 9 }}>
                <CurrentLocationIcon />
              </View>
            </TouchableOpacity>
          </View>
        )}
        styles={{
          textInputContainer: {
            borderRadius: 12,
            backgroundColor: '#FFFFFF',
            height: rh(36),
          },
          textInput: {
            borderRadius: 12,
            height: rh(36),
            paddingVertical: rh(5),
            paddingLeft: rw(10),
            paddingRight: rw(15),
            fontSize: rh(15),
            flex: 1,
          },
          listView: {
            marginTop: rh(4),
            borderRadius: 12,
          },
        }}
        placeholder="Search"
        fetchDetails={true}
        onPress={onPressRow}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'en',
        }}
        textInputProps={{ clearButtonMode: 'never' }}
      />
    </View>
  );
}
const LocationPermission: any = Platform.select({
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
});
const StoreInformationScreen = ({ route, navigation }: any) => {
  const { params } = route;
  const { t } = useTranslation('common');
  const [formErrors, setFormErrors] = useState({
    businessName: '',
    businessType: '',
    productType: '',
    otherProductType: '',
  });
  const [businessTypeSelectedIndex, setBusinessTypeSelectedIndex] = useState('-1');
  const [productTypeSelectedIndex, setProductTypeSelectedIndex] = useState('-1');
  const [businessName, setBusinessName] = useState('');
  const [isDisabledPressed, setIsDisabledPressed] = useState(false);
  const [otherProductType, setOtherProductType] = useState('');
  const [currentLocationText, setCurrentLocationText] = useState('');
  const store: Partial<Store> = useSelector((state: RootState) => state.store);
  const [selectedRadius, setSelectedRadius] = useState<RadiusItem | undefined>(
    deliveryRadiusOnMapDetailOptions.find(item => item.radius == (store.deliveryType?.radius || 7.5)),
  );
  const [position, setPosition] = useState<GeoPosition | undefined>();
  const circleRef: any = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (store?.address) {
      setPosition({
        coords: {
          latitude: +(store?.address.latitude || '0'),
          longitude: +(store?.address.longitude || '0'),
        },
      } as any);
      if (store?.address.addressDetails) {
        setCurrentLocationText(store?.address.addressDetails);
      }
    } else {
      getCurrentLocation();
    }
  }, []);

  const getCurrentLocation = async () => {
    try {
      const status = await request(LocationPermission);
      switch (status) {
        case 'granted': {
          Geolocation.getCurrentPosition(
            position => {
              setPosition(position); //REMOVE
              fetchUserAddress(position.coords.latitude, position.coords.longitude);
            },
            error => {
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
          break;
        }
        case 'denied': {
          getCurrentLocation();
          break;
        }
        case 'blocked': {
          Alert.alert('Please enable location permission in the settings.');
          setTimeout(() => {
            openSettings();
          }, 3000);
          break;
        }
        default: {
          Alert.alert('Please enable location permission in the settings.');
          setTimeout(() => {
            openSettings();
          }, 3000);
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const fetchUserAddress = async (latitude: number, longitude: number) => {
    const result = await Geocoder.from(latitude, longitude);
    var address = result.results[0].formatted_address;
    setCurrentLocationText(address);
  };

  const onPressDisabled = () => {
    setIsDisabledPressed(true);
    showFormErrors();
  };

  const showFormErrors = () => {
    setFormErrors({
      businessName: !businessName ? t('The field is required') : '',
      businessType: businessTypeSelectedIndex == '-1' ? t('The field is required') : '',
      productType: productTypeSelectedIndex == '-1' ? t('The field is required') : '',
      otherProductType: !otherProductType ? t('The field is required') : '',
    });
  };

  const onContinuePress = async () => {
    dispatch(
      updateStoreDataAction({
        address: {
          addressDetails: currentLocationText,
          longitude: String(position?.coords?.longitude || 0),
          latitude: String(position?.coords?.latitude || 0),
        },
        deliveryType: {
          type: store.deliveryType?.type || 'RADIUS',
          radius: selectedRadius?.radius,
        },
      }),
    );

    navigation.dispatch({
      ...StackActions.replace('StoreInformationScreen'),
      source: params?.key,
      target: navigation.dangerouslyGetState().key,
    });
    navigation.pop();
  };

  useEffect(() => {
    if (isDisabledPressed) {
      showFormErrors();
    }
  }, [businessName, businessTypeSelectedIndex, productTypeSelectedIndex, otherProductType]);

  const workaroundFixUI = () => {
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        if (circleRef.current) {
          circleRef.current.setNativeProps({
            fillColor: 'rgba(147, 218, 175, 0.25)',
            strokeColor: 'transparent',
          });
        }
      }, 0);
    }
  };

  useLayoutEffect(() => {
    workaroundFixUI();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      workaroundFixUI();
    }, 500);
  }, []);

  return (
    <>
      <View>
        <Header
          title={t('Store Location')}
          icon={<GoBackIcon width={20} color={'#ffffff'} onPress={() => navigation.goBack()} />}
        />
        <View style={styles.screenContent}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.mapView}
            region={
              position
                ? {
                    latitude: position?.coords?.latitude || 0,
                    longitude: position?.coords?.longitude || 0,
                    latitudeDelta: 0.35,
                    longitudeDelta: 0.35,
                  }
                : undefined
            }
            mapType={'standard'}>
            {!!position && (
              <>
                <Marker key={'currentPosition'} coordinate={position.coords} title={''} description={''}>
                  <Image source={media.MapMarker} style={styles.mapMarker} />
                </Marker>
                <Circle
                  key={'circle'}
                  center={position.coords}
                  radius={(selectedRadius?.radius || 0) * 1000}
                  fillColor={'rgba(147, 218, 175, 0.25)'}
                  strokeColor={'transparent'}
                  ref={circleRef}
                />
              </>
            )}
          </MapView>

          <View style={styles.radiusDetailSelectionContainer}>
            <StyledText style={styles.radiusDetailSelectionLabel}>{t('Radius')}</StyledText>
            <FlatList
              data={deliveryRadiusOnMapDetailOptions}
              horizontal={true}
              renderItem={({ item }: { item: RadiusItem }) => {
                const isSelected = item.value == selectedRadius?.value;
                return (
                  <View style={styles.deliveryRadiusDetailOptionOuterContainer}>
                    <View style={styles.recommendedRadiusTextContainer}>
                      {item.value == 2 && (
                        <StyledText style={styles.recommendedRadiusText}>{t('Recommended')}</StyledText>
                      )}
                    </View>
                    <TouchableWithoutFeedback onPress={() => setSelectedRadius(item)}>
                      <View
                        style={[
                          styles.deliveryRadiusDetailOptionContainer,
                          isSelected ? styles.deliveryRadiusDetailOptionContainerHighlighted : {},
                        ]}>
                        <StyledText>{item.label}</StyledText>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                );
              }}
            />
          </View>

          <SearchBar
            getCurrentLocation={getCurrentLocation}
            setLocationText={setCurrentLocationText}
            locationText={currentLocationText}
            position={position}
            setPosition={setPosition}
          />
        </View>
      </View>
      <View style={styles.bottomSection}>
        <StyledText style={styles.currentLocationText}>{currentLocationText}</StyledText>
        <StyledButton
          title={t('Continue')}
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
    //backgroundColor: Palette.white,
    height: screenHeight - 102,
    width: '100%',
    overflow: 'hidden',
  },
  webviewContent: {
    borderRadius: 20,
  },
  addLogoAreaContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: rh(20),
    marginBottom: rh(30),
  },
  addLogoArea: {
    width: rw(94),
    height: rh(94),
    borderRadius: 94 / 2,
    borderColor: Palette.color_E3E3E3,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  addImageIcon: {
    marginTop: rh(27),
    marginBottom: rh(4),
  },
  addLogoAreaText: {
    color: Palette.zaapi4,
    fontWeight: '400',
  },
  formContainer: {
    paddingTop: rh(20),
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
    bottom: 0,
    paddingLeft: rw(16),
    paddingRight: rw(16),
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: rh(131),
    alignItems: 'center',
    backgroundColor: Palette.white,
    justifyContent: 'flex-start',
    // backgroundColor: 'red',
  },
  continueButton: {
    width: '100%',
    // position: 'absolute',
    // bottom: 100,
    marginTop: 10,
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
  formItemStoreLocation: {
    height: rh(140),
  },
  currentLocationText: {
    lineHeight: 22,
    fontWeight: '600',
    fontSize: rh(14),
    marginTop: rh(22),
  },
  radiusDetailSelectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: rw(16),
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? rh(156) : rh(226),
  },
  radiusDetailSelectionLabel: {
    fontWeight: '600',
    marginRight: rw(14),
    marginTop: rh(10),
  },
  deliveryRadiusDetailOptionContainer: {
    width: rw(62),
    height: rh(36),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.white,
  },
  deliveryRadiusDetailOptionContainerHighlighted: {
    borderWidth: 1,
    borderColor: Palette.zaapi2,
  },
  recommendedRadiusText: {
    fontSize: rh(10),
    color: Palette.zaapi2,
    // position: 'absolute',
    bottom: 3,
  },
  recommendedRadiusTextContainer: {
    height: rh(12),
  },
  deliveryRadiusDetailOptionOuterContainer: {
    marginRight: rw(10),
  },
  mapView: {
    width: '100%',
    height: '100%',
  },
  mapMarker: { width: rw(24), height: rw(32) },
});

export default StoreInformationScreen;
