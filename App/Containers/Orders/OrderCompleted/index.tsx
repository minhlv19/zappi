import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableHighlight,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import NoOrderView from 'App/Containers/Orders/NoOrderView';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import StyledText from 'App/Components/StyledText/StyledText';
import { Palette } from 'App/Theme/Palette';
import { ArrowDownIcon } from 'App/assets/svg';
import ArrowUpIcon from 'App/assets/icons/ArrowUpIcon.svg';
import { SwipeListView } from 'react-native-swipe-list-view';
import { EPaymentStatus, EStatusOrder, IItemOrder, IOrder } from 'App/Types/order';
import { OrderReduxState } from 'App/Redux/order/orderReducer';
import { RootState } from 'App/Redux';
import { useSelector } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import useIsFnb from 'App/Hooks/useIsFnb';
import { getCategoryImageDefault, getOrderImage } from 'App/Utils/image';
import { Switch } from 'react-native-switch';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { getOrderLeftHeaderText } from '../OrderNew/Order.util';
import FastImage from 'react-native-fast-image';
import CompletedBadgeIcon from 'App/assets/icons/CompletedBadgeIcon.svg';
import { DEFAULT_LETTER_SPACING } from 'App/Utils/constants';

const OrderCompleted = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [shouldShow, setShouldShow] = useState(true);
  const [listData, setListData] = useState<
    {
      date: string;
      data: IOrder[];
    }[]
  >([]);

  const { orders }: OrderReduxState = useSelector((state: RootState) => state.order);
  const isFnb = useIsFnb();

  useEffect(() => {
    if (orders.length > 0) {
      let lstData = _(orders)
        .filter(v => v.status === EStatusOrder.COMPLETED)
        .groupBy(item => moment(item.createdAt).format('DD MMM YYYY'))
        .toPairs()
        .map(v => ({
          date: v[0],
          data: v[1],
        }))
        .value();
      setListData(lstData);
    } else {
      setListData([]);
    }
  }, [orders]);

  const renderItem = ({ item }: { item: IOrder }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
        style={styles.rowFront}>
        <View>
          <View style={styles.stylesviewTopItem}>
            <StyledText style={styles.txtOrderNumber}>{getOrderLeftHeaderText(item)}</StyledText>
            <StyledText style={styles.txtBuyerName}>{item.buyerDetails.name}</StyledText>
          </View>
          <View style={styles.viewContent}>
            <View style={{ borderRadius: 12, width: 62, height: 62 }}>
              <FastImage source={getOrderImage(item, isFnb)} style={styles.orderImage} />
            </View>
            <View style={styles.viewRightContent}>
              <View style={{ flexDirection: 'row' }}>
                <StyledText style={styles.txtLengthProduct}>{`${item.items.length} items`}</StyledText>
                <StyledText style={styles.txtToalMoney}>{item.total.toFixed(2)} THB</StyledText>
              </View>
              <View>
                <FlatList
                  data={shouldShow ? item.items.slice(0, 3) : item.items}
                  renderItem={({ item }: { item: IItemOrder }) => (
                    <StyledText style={styles.txtitemListOrder}>
                      {item.quantity} x {item.productName}
                    </StyledText>
                  )}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderTopWidth: 1,
              paddingHorizontal: 12,
              borderColor: Palette.color_F5F5F5,
              paddingVertical: 16,
            }}>
            {item.paymentData.status === EPaymentStatus.UNPAID ? (
              <StyledText style={styles.noPayment}>{t('No Payment Receipt Uploaded')}</StyledText>
            ) : (
              <TouchableOpacity
                style={{ display: 'flex', flex: 1 }}
                onPress={() => {
                  navigation.navigate('PaymentReceipt');
                }}>
                <StyledText style={[styles.noPayment, { color: Palette.zaapi2 }]}>
                  {t('View Payment Receipt')}
                </StyledText>
              </TouchableOpacity>
            )}

            <View style={styles.completedBadge}>
              <CompletedBadgeIcon width={rh(13)} height={rh(13)} style={styles.completedBadgeIcon} />
              <StyledText style={styles.completedBadgeText}>{t('Completed')}</StyledText>
            </View>
          </View>
          {item.items.length > 3 ? (
            <View>
              <TouchableOpacity style={styles.viewAll} onPress={() => setShouldShow(!shouldShow)}>
                <StyledText style={styles.txtShoulShow}>{shouldShow ? t('View All') : t('Hide All')}</StyledText>
                {shouldShow ? <ArrowDownIcon style={styles.arrowIcon} /> : <ArrowUpIcon style={styles.arrowIcon} />}
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({ section }: { section: any }) => {
    return <StyledText style={styles.sectionHeader}>{t(`${section.date}`)}</StyledText>;
  };
  if (listData.length != 0) {
    return (
      <View style={styles.container}>
        {/* <StatusBar backgroundColor="#FF6347" barStyle="light-content"/> */}
        <SwipeListView
          useSectionList
          sections={listData}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          //leftOpenValue={63}
          //rightOpenValue={-63}
          // previewRowKey={"0"}
          // previewOpenValue={-40}
          // previewOpenDelay={3000}
          // onRowDidOpen={onRowDidOpen}
        />
      </View>
    );
  } else {
    return (
      <SafeAreaView>
        <NoOrderView />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Palette.color_F5F5F5,
    flex: 1,
    paddingHorizontal: 16,
  },
  outerCircleStyle: {
    width: 10,
  },
  sectionHeader: {
    fontWeight: '600',
    fontSize: 14,
    alignItems: 'center',
    lineHeight: 18,
    display: 'flex',
    color: Palette.zaapi4,
    marginBottom: 14,
    marginTop: rh(25),
  },
  stylesviewTopItem: {
    flexDirection: 'row',
    backgroundColor: Palette.zaapi2,
    height: 40,
    padding: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    //borderRadius: 12,
    backgroundColor: Palette.white,
    minHeight: 50,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.65,
    elevation: 4,
    borderRadius: 12,
  },
  txtOrderNumber: {
    fontSize: 12,
    lineHeight: 15,
    color: Palette.white,
    display: 'flex',
    alignItems: 'center',
  },
  txtTime: {
    fontSize: 12,
    lineHeight: 15,
    color: Palette.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBuyerName: {
    fontWeight: '600',
    color: Palette.white,
    fontSize: 12,
    textAlign: 'right',
    alignItems: 'center',
    flex: 1,
  },
  txtToalMoney: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'right',
    flex: 1,
    color: Palette.zaapi2,
  },
  txtitemListOrder: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    alignItems: 'center',
    color: Palette.zaapi4,
  },
  viewAll: {
    backgroundColor: Palette.color_F5F5F5,
    borderRadius: 12,
    width: 87,
    height: 24,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  txtShoulShow: {
    textAlign: 'center',
    color: Palette.zaapi4,
    justifyContent: 'center',
    alignContent: 'center',
  },

  arrowIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 8,
  },
  viewContent: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  txtLengthProduct: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    color: Palette.zaapi4,
    display: 'flex',
    alignItems: 'center',
  },
  viewRightContent: {
    marginLeft: 19,
    flex: 1,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: Palette.white,
    flex: 1,
    flexDirection: 'row',
    // paddingLeft: 15,
    marginBottom: 10,
    borderRadius: 12,
    justifyContent: 'space-between',
  },
  btnAccept: {
    backgroundColor: Palette.zaapi2,
    height: '100%',
    width: 63,
    alignSelf: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  btnReject: {
    backgroundColor: Palette.color_FA3D54,
    height: '100%',
    width: 63,
    alignSelf: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },

  iconAccept: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  txtAccept: {
    fontSize: 10,
    fontWeight: 'bold',
    display: 'flex',
    lineHeight: 13,
    alignItems: 'center',
    textAlign: 'center',
    color: Palette.white,
    marginTop: 4,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    borderTopRightRadius: 12,
  },
  noPayment: {
    fontSize: rh(12),
    lineHeight: rh(15),
    color: Palette.grey,
  },
  orderImage: { borderRadius: rh(12), width: rh(62), height: rh(62) },
  completedBadge: {
    // width: rw(87),
    paddingHorizontal: rw(6),
    backgroundColor: Palette.zaapi2,
    borderRadius: rh(12),
    height: rh(24),
    alignItems: 'center',
    flexDirection: 'row',
  },
  completedBadgeIcon: {
    marginRight: rw(3),
  },
  completedBadgeText: {
    color: Palette.white,
    fontSize: rh(12),
    letterSpacing: rh(12) * DEFAULT_LETTER_SPACING,
  },
});

export default OrderCompleted;
