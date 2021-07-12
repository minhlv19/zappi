import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable, TextInput, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import GoBackIcon from 'App/assets/icons/GoBackIcon.svg';
import StyledText from 'App/Components/StyledText/StyledText';
import { useTranslation } from 'react-i18next';
import CheckBox from '@react-native-community/checkbox';
import StyledTextInput from 'App/Components/StyledTextInput/StyledTextInput';
import SwitchCustom from 'App/Components/Switch/SwitchCustom';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import { Palette } from 'App/Theme/Palette';
import StyledDropdownSelect, { StyleDropdownRowData } from 'App/Components/StyledDropdownSelect/StyledDropdownSelect';
import AddCategoryIcon from 'App/assets/icons/iconAdd.svg';
import { requestCreateDeliveryProfile } from 'App/Repositories/product';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { DistanceBasedFees } from 'App/Types';
import Header from 'App/Components/Header';
import { logError } from 'App/Utils/error';
import { useDispatch } from 'react-redux';
import { fetchDeliveryProfile } from 'App/Redux/product/ProductActions';

const DistanceOptions: StyleDropdownRowData[] = [
  {
    title: '0-2.5 km',
    value: {
      minDist: 0,
    },
  },
  {
    title: ' 2.5-5 km',
    value: {
      minDist: 2.5,
    },
  },
  {
    title: '5-5.5 km',
    value: {
      minDist: 5,
    },
  },
];
const CreateNewDeliveryProfile = ({ route, navigation }: any) => {
  const { params } = route;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [nameofdelivery, setNameofdelivery] = useState<string>('');
  const [Flatfee, setFlatfee] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [value, setValue] = useState<boolean>(true);
  const [distanceBasedFees, setDistanceBasedFees] = useState<(DistanceBasedFees | null)[]>([null]);
  const toggleSwitch = () => setValue(previousState => !previousState);
  const [formErrors, setFormErrors] = useState({
    nameofdelivery: '',
    Flatfee: '',
  });
  const checkFormValid = () => {
    if (isSelected) {
      return nameofdelivery;
    } else {
      return nameofdelivery && Flatfee;
    }
  };
  const showFormErrors = () => {
    setFormErrors({
      nameofdelivery: !nameofdelivery ? t('The field is required') : '',
      Flatfee: !Flatfee ? t('The field is required') : '',
    });
  };
  const onContinuePress = async () => {
    try {
      await requestCreateDeliveryProfile({
        name: nameofdelivery,
        feeType: isSelected ? 'DISTANCE_BASED' : 'FLAT',
        flatFee: +Flatfee || 0,
        distanceBasedFees: isSelected ? distanceBasedFees.filter(v => v !== null) : undefined,
      });
      dispatch(fetchDeliveryProfile());
      params.setIsSetLastest({
        type: 'PROFILE_DELIVERY',
      });
      navigation.goBack();
    } catch (e) {
      logError(e);
    }
  };
  const onPressDisabled = () => {
    showFormErrors();
  };
  const submitHandler = () => {
    setDistanceBasedFees([...distanceBasedFees, null]);
  };
  const onChangeDropDown = (index: number, option: StyleDropdownRowData) => {
    let dataTmp = [...distanceBasedFees];
    if (dataTmp[index]) {
      dataTmp[index] = {
        ...dataTmp[index],
        minDist: option?.value?.minDist,
      };
    } else {
      dataTmp[index] = {
        minDist: option?.value?.minDist,
      };
    }
    setDistanceBasedFees(dataTmp);
  };
  const onChangeTextField = (index: number, fee: string) => {
    let dataTmp = [...distanceBasedFees];
    if (dataTmp[index]) {
      dataTmp[index] = {
        ...dataTmp[index],
        fee: +fee || 0,
      };
    } else {
      dataTmp[index] = {
        fee: +fee || 0,
      };
    }
    setDistanceBasedFees(dataTmp);
  };
  return (
    <View style={styles.container}>
      <Header
        title={t('Create New Delivery Profile')}
        icon={
          <GoBackIcon
            width={20}
            color={'#ffffff'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
      />
      <ScrollView style={styles.content}>
        <View style={styles.formItem}>
          <StyledText style={styles.formItemTitle}>
            {t('Name of delivery')}
            <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
          </StyledText>
          <StyledTextInput
            style={{ color: Palette.zaapi4 }}
            placeholder={t('e.g. light items, heavy items')}
            onChangeText={text => setNameofdelivery(text)}
            errorMessage={formErrors.nameofdelivery}
          />
        </View>
        <View style={[styles.formItem, { marginTop: rh(30) }]}>
          <StyledText style={styles.formItemTitle}>
            {t('Flat fee (THB)')}
            <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
          </StyledText>
          <StyledTextInput
            placeholder={t('0.00')}
            style={{ color: Palette.zaapi4, backgroundColor: isSelected ? Palette.color_F5F5F5 : Palette.white }}
            onChangeText={text => setFlatfee(text)}
            errorMessage={formErrors.Flatfee}
            editable={isSelected ? false : true}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
            boxType={'square'}
            onFillColor={Palette.zaapi2}
            onTintColor={Palette.zaapi2}
            tintColor={Palette.color_D6D6D6}
            onCheckColor={Palette.white}
          />
          <Text style={styles.label}>{t('Adjust fee based on distance')}</Text>
        </View>
        {isSelected ? (
          <View style={styles.viewDistance}>
            {/*<Distance />*/}
            <View style={styles.container}>
              <FlatList
                data={distanceBasedFees}
                renderItem={({ index }) => (
                  <View style={styles.Distance}>
                    <View style={{ flex: 3, marginRight: rw(10) }}>
                      <StyledDropdownSelect
                        options={DistanceOptions}
                        style={{ flex: 1, width: '100%' }}
                        dropdownStyle={{ width: '56%', marginTop: -30 }}
                        onSelect={(indexSelect, option) => {
                          onChangeDropDown(index, option);
                        }}
                        placeholder={t('Choose distance')}
                      />
                    </View>
                    <View style={{ flex: 2 }}>
                      <Pressable style={[styles.viewInput]}>
                        <TextInput
                          keyboardType="number-pad"
                          onChangeText={e => {
                            onChangeTextField(index, e);
                          }}
                          style={styles.textInput}
                          placeholderTextColor="#D6D6D6"
                          placeholder={'0.00'}
                        />
                      </Pressable>
                    </View>
                  </View>
                )}
              />
              <View style={styles.Distance}>
                <TouchableOpacity style={styles.addDistance} onPress={submitHandler}>
                  <AddCategoryIcon />
                </TouchableOpacity>
              </View>
              {/*<ModalConfirmDeleteVariant isVisible={isVisibaleDelete} onClose={hideModalConfrim} />*/}
            </View>

            {/*<DistanceOption isSubVariant={isSubVariant} setIsSubVariant={setIsSubVariant} />*/}
          </View>
        ) : null}
        <View style={{}}>
          <View style={{ flexDirection: 'row' }}>
            <StyledText style={styles.formItemTitleSwitch}>{t('Make default')}</StyledText>
            <SwitchCustom onValueChange={toggleSwitch} value={value} />
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.txtsubmake}>
              {t(
                'Setting this to "default" will apply this delivery profile by default to all future products you create.',
              )}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomSection}>
        <StyledButton
          disabled={!checkFormValid()}
          title={t('Create Delivery Profile')}
          style={styles.continueButton}
          onPressDisabled={onPressDisabled}
          onPress={onContinuePress}
        />
      </View>
    </View>
  );
};

export default CreateNewDeliveryProfile;
