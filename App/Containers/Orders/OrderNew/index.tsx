import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import NoOrderView from '../NoOrderView';
import { SwipeListView } from 'react-native-swipe-list-view';
import StyledText from 'App/Components/StyledText/StyledText';
import { useTranslation } from 'react-i18next';
import { Palette } from 'App/Theme/Palette';
import AcceptIcons from 'App/assets/icons/AcceptIcons.svg';
import RejectIcons from 'App/assets/icons/RejectIcons.svg';
import { ArrowDownIcon } from 'App/assets/svg';
import ArrowUpIcon from 'App/assets/icons/ArrowUpIcon.svg';
import { useNavigation } from '@react-navigation/native';
import ModalReject from 'App/Containers/Orders/OrderNew/ModalReject';
import { OrderReduxState } from 'App/Redux/order/orderReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import { EStatusOrder, IItemOrder, IOrder, IVariantItem } from 'App/Types/order';
import moment from 'moment';
import _, { padStart } from 'lodash';
import { requestAcceptOrder, requestRejectOrder } from 'App/Repositories/order';
import { fetchOrderList } from 'App/Redux/order/orderActions';
import { logError } from 'App/Utils/error';
import { useToast } from '@stratuscode/react-native-toast-hook';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { getOrderImage } from 'App/Utils/image';
import useIsFnb from 'App/Hooks/useIsFnb';
import FastImage from 'react-native-fast-image';
import { getOrderLeftHeaderText } from './Order.util';
import { DEFAULT_LETTER_SPACING } from 'App/Utils/constants';

const OrderNew = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [shouldShow, setShouldShow] = useState(true);
  const [isReject, setIsReject] = useState(false);
  const [listData, setListData] = useState<
    {
      date: string;
      data: IOrder[];
    }[]
  >([]);
  const [orderActive, setOrderActive] = useState<string>('');
  const isFnb = useIsFnb();
  const swipeListViewRef = useRef<any>(null);

  const { orders }: OrderReduxState = useSelector((state: RootState) => state.order);

  useEffect(() => {
    if (orders.length > 0) {
      let lstData = _(orders)
        .filter(v => v.status === EStatusOrder.NEW)
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

  const { queueToast } = useToast();
  const actionAccept = (orderId: string) => async () => {
    try {
      await requestAcceptOrder(orderId);
      swipeListViewRef.current?.closeAllOpenRows && swipeListViewRef.current.closeAllOpenRows();
      setOrderActive('');
      dispatch(fetchOrderList());
      queueToast({
        message: 'Confirmation message sent to buyer!',
        type: 'success',
        position: 'bottom',
      });
    } catch (error) {
      console.log('error', error);
      logError(error);
    }
  };

  const actionReject = (orderId: string) => () => {
    setIsReject(true);
    setOrderActive(orderId);
  };

  const onCloseModalReject = () => {
    setOrderActive('');
    setIsReject(false);
  };

  const onSubmit = async (reason: string) => {
    try {
      await requestRejectOrder(orderActive, reason);
      dispatch(fetchOrderList());
      queueToast({
        message: 'Rejection notification sent to buyer',
        type: 'success',
        position: 'bottom',
      });
    } catch (e) {
      logError(e?.response.data);
    }
  };

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
            <View>
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

  const renderHiddenItem = ({ item }: { index: number; item: IOrder }, rowMap: any) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity style={styles.btnAccept} onPress={actionAccept(item.id || '')}>
          <AcceptIcons style={styles.iconAccept} />
          <StyledText style={styles.txtAccept}>{t('Accept')}</StyledText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnReject} onPress={actionReject(item.id || '')}>
          <RejectIcons style={styles.iconAccept} />
          <StyledText style={styles.txtAccept}>{t('Reject')}</StyledText>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSectionHeader = ({ section }: { section: any }) => {
    return <StyledText style={styles.sectionHeader}>{t(`${section.date}`)}</StyledText>;
  };
  if (listData.length != 0) {
    return (
      <View style={styles.container}>
        <SwipeListView
          ref={swipeListViewRef}
          useSectionList
          sections={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          renderSectionHeader={renderSectionHeader}
          leftOpenValue={rw(63)}
          rightOpenValue={-rw(63)}
          keyExtractor={item => item.orderNumber + ''}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
        />
        <ModalReject onClose={onCloseModalReject} visible={isReject} onSubmit={onSubmit} />
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
  sectionHeader: {
    fontWeight: '600',
    fontSize: rh(14),
    alignItems: 'center',
    lineHeight: 18,
    display: 'flex',
    color: Palette.zaapi4,
    marginBottom: 14,
    marginTop: rh(15),
    letterSpacing: rh(14) * DEFAULT_LETTER_SPACING,
  },
  stylesviewTopItem: {
    flexDirection: 'row',
    backgroundColor: Palette.color_F5F5F5,
    height: 40,
    padding: 12,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: Palette.white,
    minHeight: 50,
    marginBottom: rh(10),
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
    color: Palette.zaapi4,
    display: 'flex',
    alignItems: 'center',
  },
  txtTime: {
    fontSize: 12,
    lineHeight: 15,
    color: Palette.zaapi4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBuyerName: {
    fontWeight: '600',
    color: Palette.zaapi4,
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
  orderImage: { borderRadius: rh(12), width: rh(62), height: rh(62) },
});
export default OrderNew;
