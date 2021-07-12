import React from 'react';
import { View, SafeAreaView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { media } from 'App/assets/media';
import { responsiveByHeight as rh, responsiveByWidth as rw } from 'App/Utils/style';
import StyledText from 'App/Components/StyledText/StyledText';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Palette } from 'App/Theme/Palette';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import { DiscountType } from 'App/Types/discount';
import { updateDiscountToCreateAction } from 'App/Redux/discount/DiscountActions';
import moment from 'moment';
import { AddIcon } from 'App/assets/svg';

const NoDiscountCodes = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { displayFilter } = useSelector((state: RootState) => state.discount);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.content}>
          <Image source={media.Discount_isActive} style={{ width: rw(50), height: rh(50) }} />
          <View style={{ flexDirection: 'row' }}>
            {displayFilter.type == DiscountType.MANUAL ? (
              <StyledText style={styles.txtTitleContent}>
                {t(`No discount code yet. You can add product code by clicking the link below or`)}
                <AddIcon fill={Palette.zaapi3} width={rh(21)} height={rh(21)} style={styles.inlineIcon} />
                {t(`at the top right`)}
              </StyledText>
            ) : (
              <StyledText style={styles.txtTitleContent}>
                {t(`No automatic discount yet. You can add automatic discount by clicking the link below or`)}
                <AddIcon fill={Palette.zaapi3} width={rh(21)} height={rh(21)} style={styles.inlineIcon} />
                {t(`at the top right`)}
              </StyledText>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.viewCreateProduct}
          onPress={() => {
            dispatch(
              updateDiscountToCreateAction({
                validFrom: moment().startOf('day').toDate(),
              }),
            );
            navigation.navigate('CreateDiscountScreen');
          }}>
          <Image source={media.Addicon} style={styles.icCreate} />
          <StyledText style={styles.txtCreate}>{t('Create discount code')}</StyledText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: rw(78),
  },
  txtTitleContent: {
    color: Palette.zaapi3,
    marginTop: rh(15),
    fontWeight: '600',
    fontSize: rh(14),
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  icCreate: {
    width: rw(20),
    height: rh(20),
    resizeMode: 'contain',
  },
  viewCreateProduct: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: rh(28),
  },
  txtCreate: {
    marginLeft: rw(10),
    color: Palette.zaapi2,
    fontSize: rh(14),
    lineHeight: 18,
    display: 'flex',
    alignItems: 'center',
  },
  inlineIcon: {
    marginRight: rw(3),
    marginLeft: rw(3),
    marginTop: -rh(4),
  },
});

export default NoDiscountCodes;
