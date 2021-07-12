import React, { memo, useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, TextInput, Animated, FlatList } from 'react-native';
import useBoolean from 'App/Hooks/useBoolean';
import { useLayout } from '@react-native-community/hooks';
import StyledDropdownSelect, { StyleDropdownRowData } from 'App/Components/StyledDropdownSelect/StyledDropdownSelect';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RFValue } from 'react-native-responsive-fontsize';

import AddCategoryIcon from 'App/assets/icons/iconAdd.svg';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const DistanceOptions: StyleDropdownRowData[] = [
  {
    title: '0-2.5 km',
    value: '1',
  },
  {
    title: ' 2.5-5 km',
    value: '2',
  },
  {
    title: '5-5.5 km',
    value: '3',
  },
];

const Distance = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const submitHandler = (value: any) => {
    // @ts-ignore
    setData(prevTodo => {
      return [
        {
          value: value,
          key: Math.random().toString(),
        },
        ...prevTodo,
      ];
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.Distance}>
        <View style={{ flex: 3, marginRight: rw(10) }}>
          <Text style={styles.txtDistance}>{t('Distance')}</Text>
          <StyledDropdownSelect
            options={DistanceOptions}
            style={{ flex: 1, width: '100%' }}
            dropdownStyle={{ width: '56%', marginTop: -30 }}
            placeholder={t('Choose distance')}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.txtDistance}>{t('Fee')}</Text>
          <Pressable style={[styles.viewInput]}>
            <TextInput style={styles.textInput} placeholderTextColor="#D6D6D6" placeholder={'0.00'} />
          </Pressable>
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={() => (
          <View style={styles.Distance}>
            <View style={{ flex: 3, marginRight: rw(10) }}>
              <StyledDropdownSelect
                options={DistanceOptions}
                style={{ flex: 1, width: '100%' }}
                dropdownStyle={{ width: '56%', marginTop: -30 }}
                placeholder={t('Choose distance')}
              />
            </View>
            <View style={{ flex: 2 }}>
              <Pressable style={[styles.viewInput]}>
                <TextInput style={styles.textInput} placeholderTextColor="#D6D6D6" placeholder={'0.00'} />
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
  );
};
const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  textTitle: { color: '#4B4A4B', fontWeight: '700', fontSize: 14 },
  scrollView: { paddingHorizontal: 15 },
  styleWapper: { marginTop: rh(18) },
  rightIconInput: { flexDirection: 'row', alignItems: 'center' },
  viewPen: { marginRight: rw(14) },
  viewHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  Distance: { flexDirection: 'row' },
  viewInput: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: rh(42),
    margin: 0,
    padding: 0,
    paddingHorizontal: rw(12),
    color: '#4B4A4B',
    fontSize: rh(14),
    flex: 1,
    fontWeight: '600',
  },
  viewRightIcon: { paddingRight: rw(12) },
  txtDistance: {
    fontWeight: '700',
    fontSize: RFValue(14, 680),
    lineHeight: 18,
    marginBottom: rh(10),
  },
  addDistance: {
    width: '58 %',
    //backgroundColor:'#000',
    height: rh(42),
    margin: 0,
    padding: 0,
    paddingHorizontal: rw(14),
    color: '#4B4A4B',
    fontSize: rh(14),
    fontWeight: '600',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(Distance);
