import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import NoDiscountCodes from 'App/Containers/Discounts/NoDiscountCodes';
import StyledText from 'App/Components/StyledText/StyledText';
import { MoreActionIcon } from 'App/assets/svg';
import { useTranslation } from 'react-i18next';
import SwitchCustom from 'App/Components/Switch/SwitchCustom';
import { Palette } from 'App/Theme/Palette';
import { useDispatch, useSelector } from 'react-redux';
import ModalBottomActionDiscount from 'App/Containers/Discounts/ModalBottomActionDiscount';
import {
  searchDiscountsAsyncAction,
  setSelectedDiscountAction,
  updateDiscountAsyncAction,
  updateDiscountToCreateAction,
} from 'App/Redux/discount/DiscountActions';
import { RootState } from 'App/Redux';
import { groupBy } from 'lodash';
import moment from 'moment';
import { Discount, DiscountType } from 'App/Types/discount';
import { DEFAULT_DATE_FORMAT, DEFAULT_LETTER_SPACING } from 'App/Utils/constants';
import i18n from 'i18next';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { getDiscountValidTimeDisplayText } from 'App/Utils/text';
import NavigationService from 'App/navigation/NavigationService';
import { getDiscountDetailText } from './DiscountCodes.util';

type DiscountsByDate = {
  dateDisplayText: string;
  date: string;
  discounts: Discount[];
};

const getDateDisplayText = (date: string) => {
  if (date == moment().format(DEFAULT_DATE_FORMAT)) {
    return i18n.t('Created today');
  }
  return `${i18n.t('Created')} ${moment(date).format('DD MMMM YYYY')}`;
};

const getDiscountListByDate = (discounts: Discount[]) => {
  const data = groupBy(discounts, discount => moment(discount.createdAt).format(DEFAULT_DATE_FORMAT));
  let dates = Object.keys(data);
  dates.sort().reverse();
  return dates.map(
    date =>
      ({
        date,
        discounts: data[date],
        dateDisplayText: getDateDisplayText(date),
      } as DiscountsByDate),
  );
};

const DiscountCodes = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isVisible, setisVisible] = useState(false);
  const { displayFilter, displayedDiscounts, discounts } = useSelector((state: RootState) => state.discount);
  const discountListByDates = useMemo(() => getDiscountListByDate(displayedDiscounts), [displayedDiscounts]);

  useEffect(() => {
    dispatch(searchDiscountsAsyncAction(displayFilter.type || DiscountType.MANUAL, displayFilter.searchText || ''));
  }, [displayFilter]);

  const renderDiscountByDates = (discountsByDate: DiscountsByDate) => {
    if (discountsByDate.discounts && discountsByDate.discounts.length) {
      const discountsView = discountsByDate.discounts.map(discount => {
        return (
          <TouchableOpacity
            style={styles.viewContent}
            onPress={() => {
              dispatch(updateDiscountToCreateAction(discount));
              NavigationService.navigate('CreateDiscountScreen', {
                isEditing: true,
                existingDiscount: discount,
              });
            }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <StyledText>
                  <StyledText style={styles.discountCodeText}>{discount.code}</StyledText>
                  {discount.useCount > 0 && (
                    <StyledText style={styles.useCountText}>{` (${t('Used {{x}} times', {
                      x: discount.useCount,
                    })})`}</StyledText>
                  )}
                </StyledText>
                <StyledText style={styles.detailsText}>{getDiscountDetailText(discount)}</StyledText>
              </View>

              <TouchableOpacity
                onPress={() => {
                  dispatch(setSelectedDiscountAction(discount));
                  setisVisible(true);
                }}>
                <MoreActionIcon />
              </TouchableOpacity>
            </View>
            <View style={styles.discountMetadataContainer}>
              <StyledText style={styles.txtTimeSale}>{getDiscountValidTimeDisplayText(discount)}</StyledText>
              <View style={{ flexDirection: 'row' }}>
                {discount.enabled ? (
                  <StyledText style={styles.active}>{t('Active')}</StyledText>
                ) : (
                  <StyledText style={styles.inactive}>{t('Inactive')}</StyledText>
                )}

                <SwitchCustom
                  value={discount.enabled}
                  onValueChange={value => dispatch(updateDiscountAsyncAction({ id: discount.id, enabled: value }))}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      });

      return (
        <View>
          <StyledText style={styles.dateDisplayText}>{discountsByDate.dateDisplayText}</StyledText>
          {discountsView}
        </View>
      ) as any;
    }
    return (<View></View>) as any;
  };

  if (displayedDiscounts.length === 0) {
    return <NoDiscountCodes />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={discountListByDates}
          renderItem={({ item: discountsByDate }) => renderDiscountByDates(discountsByDate)}
          showsVerticalScrollIndicator={false}
        />
        <ModalBottomActionDiscount onClose={() => setisVisible(false)} isVisible={isVisible} />
      </SafeAreaView>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: rw(16),
  },
  viewContent: {
    backgroundColor: Palette.white,
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.65,
    elevation: 2,
    padding: rh(12),
    marginBottom: rh(10),
  },
  discountCodeText: {
    fontWeight: 'bold',
    fontSize: rh(16),
    lineHeight: rh(18),
    display: 'flex',
    color: Palette.zaapi4,
    alignItems: 'center',
    letterSpacing: rh(14) * DEFAULT_LETTER_SPACING,
  },
  detailsText: {
    fontSize: rh(14),
    marginTop: rh(6),
    lineHeight: rh(18),
    display: 'flex',
    color: Palette.zaapi4,
    alignItems: 'center',
    letterSpacing: rh(14) * DEFAULT_LETTER_SPACING,
  },
  txtTimeSale: {
    fontSize: rh(12),
    flex: 1,
    alignItems: 'center',
    display: 'flex',
    color: Palette.grey,
  },
  active: {
    marginRight: rw(7),
    fontSize: rh(12),
    lineHeight: rh(15),
    display: 'flex',
    alignItems: 'center',
    color: Palette.zaapi2,
    alignSelf: 'center',
  },
  inactive: {
    marginRight: rw(7),
    fontSize: rh(12),
    lineHeight: rh(15),
    display: 'flex',
    alignItems: 'center',
    color: Palette.zaapi3,
    alignSelf: 'center',
  },
  dateDisplayText: {
    marginBottom: rh(14),
    marginTop: rh(15),
    fontWeight: '600',
    color: Palette.zaapi4,
    fontSize: rh(14),
    letterSpacing: rh(14) * DEFAULT_LETTER_SPACING,
  },
  discountMetadataContainer: {
    flexDirection: 'row',
    marginTop: rh(10),
    alignItems: 'center',
  },
  useCountText: {
    marginLeft: rw(5),
    color: Palette.zaapi4,
    fontSize: rh(14),
    letterSpacing: rh(14) * DEFAULT_LETTER_SPACING,
  },
});
export default DiscountCodes;
