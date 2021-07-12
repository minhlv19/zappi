import ModalBottomSheet from 'App/Components/Modal/ModalBottomSheet';
import { ProductOrderByEnums } from 'App/Types';
import React, { FC, memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectSort: (orderBy: ProductOrderByEnums) => void;
}

const ModalFilterProducts: FC<IProps> = ({ isVisible, onClose, onSelectSort }) => {
  const data = [
    { label: 'Sort by', isTitle: true, onPress: () => {} },
    { label: 'Date created', isTitle: false, onPress: onClose, value: ProductOrderByEnums.DATE_CREATED },
    { label: 'Highest price first', isTitle: false, onPress: onClose, value: ProductOrderByEnums.PRICE_HIGH_TO_LOW },
    { label: 'Lowest price first', isTitle: false, onPress: onClose, value: ProductOrderByEnums.PRICE_LOW_TO_HIGH },
  ];

  return (
    <ModalBottomSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        {data.map((item, index) => (
          <TouchableOpacity
            onPress={() => onSelectSort(item.value!)}
            disabled={item.isTitle}
            key={index}
            style={styles.viewItem}>
            <Text style={[styles.textItem, item.isTitle && styles.textTitle]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ModalBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {},
  viewItem: { paddingVertical: rh(15), paddingHorizontal: rw(16), borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  textItem: { fontSize: rh(14), color: '#4B4A4B' },
  textTitle: { fontWeight: '700' },
});

export default memo(ModalFilterProducts);
