import StyledText from 'App/Components/StyledText/StyledText';
import React, { FC, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

interface IProps {
  item: any;
}

const ItemProductsRanking: FC<IProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <FastImage source={{ uri: item?.image }} resizeMode="cover" style={styles.imageProduct} />

      <View style={styles.viewContent}>
        <StyledText style={styles.textName}>{item?.name}</StyledText>
        <StyledText style={styles.textPrice}>{item?.price}</StyledText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', paddingHorizontal: 13 },
  textName: { color: '#263238', flex: 1, paddingHorizontal: 13 },
  textPrice: { color: '#263238' },
  viewContent: { flexDirection: 'row', paddingVertical: rh(5), flex: 1 },
  imageProduct: { width: rw(47), height: rh(47), borderRadius: 12 },
});

export default memo(ItemProductsRanking);
