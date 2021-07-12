import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import BackIcon from 'App/assets/icons/BackIcon.svg';

import StyledText from 'App/Components/StyledText/StyledText';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/Utils/style';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Palette } from 'App/Theme/Palette';
import { RFValue } from 'react-native-responsive-fontsize';
import { SearchIcon } from 'App/assets/svg';
import CheckBox_Active from 'App/assets/icons/Checkbox_active.svg';
import CheckBox_isActive from 'App/assets/icons/Checkbox_isActive.svg';
import Header from 'App/Components/Header';
import NavigationService from 'App/navigation/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import { updateDiscountToCreateAction } from 'App/Redux/discount/DiscountActions';
import { RootState } from 'App/Redux';

interface IDiscountSpecificCustomesScreenRouteParams {
  selectedCustomerIds?: string[];
}

const DiscountSpecificCustomes = ({ route }: { route: { params?: IDiscountSpecificCustomesScreenRouteParams } }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [textSearch, setTextSearch] = useState<string>('');
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>(route.params?.selectedCustomerIds || []);
  const dispatch = useDispatch();
  const { discountToCreate } = useSelector((state: RootState) => state.discount);
  const [listCustomers, setListCustomers] = useState([
    {
      id: '1',
      customerName: 'Harry Potter',
      phoneNumber: '+66(81) 958 1776',
      checked: false,
    },
    {
      id: '2',
      customerName: 'Name Lastname',
      phoneNumber: '+66(81) 958 1776',
      checked: false,
    },
    {
      id: '3',
      customerName: 'Harry Potter',
      phoneNumber: '+66(81) 958 1776',
      checked: false,
    },
    {
      id: '4',
      customerName: 'Name Lastname',
      phoneNumber: '+66(81) 958 1776',
      checked: false,
    },
    {
      id: '5',
      customerName: 'Harry Potter',
      phoneNumber: '+66(81) 958 1776',
      checked: false,
    },
    {
      id: '6',
      customerName: 'Name Lastname',
      phoneNumber: '+66(81) 958 1776',
      checked: false,
    },
    {
      id: '7',
      customerName: 'Harry Potter',
      phoneNumber: '+66(81) 958 1776',
      checked: true,
    },
    {
      id: '8',
      customerName: 'Harry Potter',
      phoneNumber: '+66(81) 958 1776',
      checked: false,
    },
    {
      id: '9',
      customerName: 'Name Lastname',
      phoneNumber: '+66(81) 958 1776',
      checked: false,
    },
    {
      id: '10',
      customerName: 'Harry Potter',
      phoneNumber: '+66(81) 958 1776',
      checked: false,
    },
    {
      id: '11',
      customerName: 'Name Lastname',
      phoneNumber: '+66(81) 958 1776',
      checked: false,
    },
  ]);

  const updateSelectedCustomerIds = (customerId: string) => {
    console.log('customerId', customerId);
    if (selectedCustomerIds.includes(customerId)) {
      setSelectedCustomerIds(selectedCustomerIds.filter(id => id != customerId));
    } else {
      setSelectedCustomerIds([...selectedCustomerIds, customerId]);
    }
  };

  const renderItem = (item: any, index: number) => {
    return (
      <View style={styles.viewItem}>
        <TouchableOpacity style={styles.checkbox} onPress={() => updateSelectedCustomerIds(item.item.id)}>
          {selectedCustomerIds.includes(item.item.id) ? <CheckBox_Active /> : <CheckBox_isActive />}
        </TouchableOpacity>
        <View>
          <StyledText style={styles.txtCustomerName}>{item.item.customerName}</StyledText>
          <StyledText style={styles.txtPhoneNumber}>{item.item.phoneNumber}</StyledText>
        </View>
      </View>
    );
  };
  const onDonePress = () => {
    dispatch(
      updateDiscountToCreateAction({
        eligibility: {
          ...discountToCreate.eligibility,
          customerIds: selectedCustomerIds,
        } as any,
      }),
    );
    NavigationService.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={t('Specific Customers')}
        icon={<BackIcon width={20} color={'#ffffff'} onPress={() => navigation.goBack()} />}
        buttonRight={<StyledText style={styles.txtRightHeader}>{t('Done')}</StyledText>}
        onButtonRightPress={onDonePress}
      />
      <ScrollView style={styles.content}>
        <View style={styles.viewSearch}>
          <SearchIcon width={14} height={14} fill="#D6D6D6" />
          <TextInput
            value={textSearch}
            onChangeText={text => setTextSearch(text)}
            placeholder={t('Customer name, phone number')}
            placeholderTextColor="#D6D6D6"
            style={styles.textInput}
          />
        </View>
        <View>
          <StyledText style={styles.txtLengthCustomer}>{t(`All customers (${listCustomers.length})`)}</StyledText>
          <FlatList data={listCustomers} renderItem={renderItem} />
        </View>
      </ScrollView>
    </View>
  );
};

const { height: screenHeight } = Dimensions.get('screen');
const styles = StyleSheet.create({
  icLeftHeaderStyle: {
    justifyContent: 'center',
    marginLeft: rw(20),
  },
  styleHeader: {
    position: 'absolute',
    width: wp('100%'),
  },
  txtRightHeader: {
    marginRight: rw(20),
    color: Palette.white,
    fontWeight: '700',
    fontSize: RFValue(18, 680),
  },
  styletitleHeader: {
    marginLeft: 12,
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 23,
    color: Palette.white,
  },
  content: {
    position: 'absolute',
    backgroundColor: Palette.white,
    width: wp('100'),
    top: rh(100),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    height: screenHeight - rh(100),
  },
  viewSearch: {
    height: rh(36),
    flex: 1,
    borderRadius: 12,
    backgroundColor: Palette.color_F5F5F5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rw(10),
  },
  txtLengthCustomer: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    display: 'flex',
    alignItems: 'center',
    color: Palette.zaapi4,
    marginTop: 20,
    marginBottom: 10,
  },
  textInput: { flex: 1, height: rh(36), margin: 0, padding: 0, color: '#4B4A4B', paddingHorizontal: 7 },
  checkbox: {
    alignSelf: 'center',
    marginRight: 20,
    width: 28,
    height: 28,
    marginLeft: 12,
  },
  viewItem: {
    backgroundColor: Palette.white,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.65,
    elevation: 2,
    borderRadius: 12,
    marginTop: 10,
    flexDirection: 'row',
  },
  txtCustomerName: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    display: 'flex',
    alignItems: 'center',
    color: Palette.zaapi4,
    marginTop: 10,
  },
  txtPhoneNumber: {
    fontSize: 14,
    lineHeight: 18,
    display: 'flex',
    alignItems: 'center',
    color: Palette.zaapi4,
    marginTop: 5,
    marginBottom: 10,
  },
});
export default DiscountSpecificCustomes;
