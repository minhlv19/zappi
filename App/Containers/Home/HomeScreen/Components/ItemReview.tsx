import { AppleIcon, ReplyIcon, StarIcon } from 'App/assets/svg';
import StyledText from 'App/Components/StyledText/StyledText';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const { width } = Dimensions.get('window');

const ItemReview = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <AppleIcon width={47} height={47} />

        <View style={styles.viewIconLeft}>
          <StyledText style={styles.textName}>Mary Thompson</StyledText>

          <View style={styles.viewStar}>
            <StarIcon width={17} height={17} fill="#FFC107" />
            <StarIcon width={17} height={17} fill="#FFC107" />
            <StarIcon width={17} height={17} fill="#FFC107" />
            <StarIcon width={17} height={17} fill="#FFC107" />
            <StarIcon width={17} height={17} fill="#D6D6D6" />
          </View>
        </View>
      </View>

      <View style={styles.viewContent}>
        <StyledText style={styles.textNameProduct}>
          <StyledText style={styles.textProduct}>Product 1</StyledText> Variation : Red
        </StyledText>

        <StyledText style={styles.textDesc} numberOfLines={3}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere incidunt quod veniam delectus optio placeat
          nobis omnis, qui praesentium dolorem dolore cum repellendus, debitis beatae quasi eius deserunt temporibus
          quibusdam!
        </StyledText>

        <View style={styles.viewTime}>
          <StyledText style={styles.textTime}>05/05/2021 09:11</StyledText>

          <TouchableOpacity style={styles.viewButtonReply}>
            <StyledText style={styles.textReply}>{t('Reply')}</StyledText>
            <ReplyIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: width - 30,
  },
  viewHeader: {
    flexDirection: 'row',
    paddingHorizontal: rw(12),
    paddingVertical: rh(12),
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 0.5,
  },
  viewIconLeft: { flex: 1, paddingLeft: rw(12) },
  textName: { fontSize: rh(14), fontWeight: '700', color: '#4B4A4B' },
  containerStyle: { width: rw(110) },
  viewStar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rh(7),
    width: rw(95),
    justifyContent: 'space-between',
  },
  viewContent: { paddingVertical: rh(12), paddingHorizontal: rw(12), paddingLeft: rw(59) },
  textProduct: { fontWeight: '700' },
  textNameProduct: { fontSize: rh(14), color: '#4B4A4B' },
  textDesc: { color: '#4B4A4B', marginTop: rh(5) },
  viewTime: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: rh(15) },
  textTime: { color: '#999999' },
  viewButtonReply: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#42A391',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: rw(15),
    paddingVertical: rh(5),
    alignContent: 'center',
    justifyContent: 'center',
  },
  textReply: { fontWeight: '700', color: '#42A391', fontSize: rh(12), marginRight: rw(5) },
});

export default memo(ItemReview);
