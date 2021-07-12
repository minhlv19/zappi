import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Linking,
  Platform,
  InteractionManager,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import StyleHeader from 'App/Components/Header/StyleHeader';
import BackIcon from 'App/assets/icons/BackIcon.svg';
import styles from './styles';
import StyledText from 'App/Components/StyledText/StyledText';
import { Palette } from 'App/Theme/Palette';
import CopyIcon from 'App/assets/icons/IconCopy.svg';
import AddRessIcon from 'App/assets/icons/Address.svg';
import GmailIcon from 'App/assets/icons/GmailIcon.svg';
import LineIcon from 'App/assets/icons/LineIcon.svg';
import PhoneIcon from 'App/assets/icons/PhoneIcon.svg';
import ShipIcon from 'App/assets/icons/ShipIcon.svg';
import StyledButton from 'App/Components/StyledButton/StyledButton';
import CallIcon from 'App/assets/icons/CallIcon.svg';
import MessageIcon from 'App/assets/icons/MessageIcon.svg';
import { media } from 'App/assets/media';
import SwitchCustom from 'App/Components/Switch/SwitchCustom';
import CheckBox from '@react-native-community/checkbox';
import StyledDropdownSelect, {
  StyleDropdownRowDataCustom,
} from 'App/Components/StyledDropdownSelect/StyledDropdownSelect';
import StyledTextInput from 'App/Components/StyledTextInput/StyledTextInput';
import NavigationService from 'App/navigation/NavigationService';
import ModalCancelOrder from 'App/Containers/Orders/OrderDetail/ModalCancelOrder';
import ModalRefunded from 'App/Containers/Orders/OrderDetail/ModalRefunded';
import ModalRefundbeforecancelling from 'App/Containers/Orders/OrderDetail/ModalRefundbeforecancelling';
import { EPaymentStatus, EStatusOrder, IItemOrder, IOrder } from 'App/Types/order';
import moment from 'moment';
import { OrderReduxState } from 'App/Redux/order/orderReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import _ from 'lodash';
import useBoolean from 'App/Hooks/useBoolean';
import { useToast } from '@stratuscode/react-native-toast-hook';
import { requestAcceptOrder, requestFulfillOrder, requestRejectOrder } from 'App/Repositories/order';
import { fetchOrderList } from 'App/Redux/order/orderActions';
import { ConfirmModalStateEnums, ConfirmModalTypeEnums, Store } from 'App/Types';
import { logError } from 'App/Utils/error';
import AcceptIcon from 'App/assets/svg/AcceptIcon';
import CloseIcon from 'App/assets/svg/CloseIcon';
import HeaderComponent from 'App/Components/Header/HeaderComponent';
import { useLayout } from '@react-native-community/hooks';
import Clipboard from '@react-native-community/clipboard';
import useIsFnb from 'App/Hooks/useIsFnb';
import { getCategoryImageDefault } from 'App/Utils/image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  resetConfirmModalData,
  updateConfirmModalData,
  updateErrorModalData,
} from 'App/Redux/appState/AppStateActions';

const courierService: StyleDropdownRowDataCustom<{ name: string; url?: string }>[] = [
  {
    title: 'Flash Express',
    value: { name: 'Flash Express', url: 'https://www.flashexpress.co.th/en/tracking/' },
  },
  {
    title: 'Kerry Express',
    value: { name: 'Kerry Express', url: 'https://th.kerryexpress.com/th/track/' },
  },
  {
    title: 'Thailand Post',
    value: { name: 'Thailand Post', url: 'https://track.thailandpost.co.th' },
  },
  {
    title: 'Alpha Fast',
    value: { name: 'Alpha Fast', url: 'https://www.alphafast.com/en/track/' },
  },
  {
    title: 'Ninja Van',
    value: { name: 'Ninja Van', url: 'https://www.ninjavan.co/en-th/tracking' },
  },
  {
    title: 'FedEx Thailand',
    value: { name: 'FedEx Thailand', url: 'https://www.fedex.com/en-th/tracking.html' },
  },
  {
    title: 'Dragon Courier',
    value: { name: 'Dragon Courier', url: 'https://dragoncouriertracking.com' },
  },
  {
    title: 'Grab Express',
    value: { name: 'Grab Express' },
  },
  {
    title: 'Lalamove',
    value: { name: 'Lalamove' },
  },
  {
    title: 'LineMan',
    value: { name: 'LineMan' },
  },
  {
    title: 'Other',
    value: { name: 'Other' },
  },
];
const OrderDetail = (props: any) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { queueToast } = useToast();
  const dispatch = useDispatch();
  const [order, setOrder] = useState<IOrder>();
  const orderId: string = props.route.params.orderId;
  const { productSetType }: Partial<Store> = useSelector((state: RootState) => state.store);
  const { orders }: OrderReduxState = useSelector((state: RootState) => state.order);
  const [isVisibleCancelOrder, showCancelOrder, hideCancelOrder] = useBoolean(false);
  const [isFnB, setIsFnB] = useState<boolean>();
  const [toogleMakeAsPaid, setToogleMakeAsPaid] = useState<boolean>();
  const [isFulfilledManually, setIsFulfilledManually] = useState<boolean>();
  const [courierServiceIndex, setCourierServiceIndex] = useState('-1');
  const [courierServiceOption, setCourierServiceOption] = useState<
    StyleDropdownRowDataCustom<{ name: string; url?: string }>
  >();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isVisibleRefund, showRefund, hideRefund] = useBoolean(false);
  const [isVisibleRefundBefore, showRefundBefore, hideRefundBefore] = useBoolean(false);

  const [imagePayment, setimagePayment] = useState('');
  const [value, setValue] = useState<boolean>(true);
  const [isSelected, setSelection] = useState(false);
  const isFnb = useIsFnb();
  const { confirmModalData } = useSelector((state: RootState) => state.appState);

  useEffect(() => {
    if (isFnB === undefined) {
      setIsFnB(productSetType === 'F&B');
    }
  }, [productSetType]);

  useEffect(() => {
    let orderTemp = _.find(orders, _.matchesProperty('id', orderId));
    setOrder(orderTemp);
    setToogleMakeAsPaid(orderTemp?.paymentData.status === EPaymentStatus.PAID ? true : false);
    setIsFulfilledManually(orderTemp?.fulfillmentData.isFulfilledManually);
    let optionIndex = _.findIndex(courierService, _.matchesProperty('title', orderTemp?.fulfillmentData.courier));
    if (optionIndex >= 0) {
      setCourierServiceIndex(optionIndex + '');
      setCourierServiceOption(courierService[optionIndex]);
    }
  }, [orders]);
  const onReject = () => {
    // showCancelOrder();
    dispatch(
      updateConfirmModalData({
        title: t('Are you sure you want to cancel this order?'),
        subtitle: '',
        display: true,
        type: ConfirmModalTypeEnums.CANCEL_ORDER_IN_ORDER_DETAIL,
      }),
    );
  };

  useEffect(() => {
    if (confirmModalData.type == ConfirmModalTypeEnums.CANCEL_ORDER_IN_ORDER_DETAIL) {
      if (confirmModalData.state == ConfirmModalStateEnums.CONFIRMED) {
        dispatch(resetConfirmModalData());
        InteractionManager.runAfterInteractions(async () => {
          if (
            order?.status === EStatusOrder.NEW ||
            (order?.status === EStatusOrder.ACCEPTED && order.paymentData.status === EPaymentStatus.UNPAID)
          ) {
            requestReject();
          } else {
            dispatch(
              updateConfirmModalData({
                title: t('Have you refunded this customer?'),
                subtitle: '',
                display: true,
                type: ConfirmModalTypeEnums.ASK_REFUND_ORDER_ORDER_DETAIL,
                confirmButtonTitle: t('Yes'),
                cancelButtonTitle: t('No'),
              }),
            );
          }
        });
      }
      if (confirmModalData.state == ConfirmModalStateEnums.CANCELLED) {
        dispatch(resetConfirmModalData());
      }
    }
  }, [confirmModalData]);

  useEffect(() => {
    if (confirmModalData.type == ConfirmModalTypeEnums.ASK_REFUND_ORDER_ORDER_DETAIL) {
      if (confirmModalData.state == ConfirmModalStateEnums.CONFIRMED) {
        requestReject();
        dispatch(resetConfirmModalData());
      }
      if (confirmModalData.state == ConfirmModalStateEnums.CANCELLED) {
        dispatch(resetConfirmModalData());
        setTimeout(() => {
          dispatch(
            updateErrorModalData({
              title: t('Please proceed to a refund before cancelling this order.'),
              subtitle: '',
              display: true,
            }),
          );
        }, 500);
      }
    }
  }, [confirmModalData]);

  const requestReject = async () => {
    await requestRejectOrder(order?.id || '', 'Other');
    dispatch(fetchOrderList());
    navigation.goBack();
    queueToast({
      message: 'Rejection notification sent to buyer',
      type: 'success',
      position: 'bottom',
    });
  };

  const onAccept = () => {
    navigation.goBack();
    requestAcceptOrder(order?.id || '');
    dispatch(fetchOrderList());
    queueToast({
      message: 'Confirmation message sent to buyer!',
      type: 'success',
      position: 'bottom',
    });
  };

  const onChangeToogleMakeAsPaid = (e: boolean) => {
    setToogleMakeAsPaid(e);
  };

  const onChangeIsFulfilledManually = (e: boolean) => {
    if (e) {
      setTrackingNumber('');
      setCourierServiceIndex('-1');
    }
    setIsFulfilledManually(e);
  };

  const onProductTypeSelect = (index: string, rowData: StyleDropdownRowDataCustom<{ name: string; url?: string }>) => {
    setCourierServiceIndex(index);
    setCourierServiceOption(rowData);
  };

  const onPressYesRefund = () => {
    hideRefund();
    InteractionManager.runAfterInteractions(async () => {
      requestReject();
    });
  };

  const onPressNoRefund = () => {
    hideRefund();
    InteractionManager.runAfterInteractions(() => {
      showRefundBefore();
    });
  };

  const onPressRefundBefore = () => {
    hideRefund();
    InteractionManager.runAfterInteractions(() => {
      navigation.goBack();
    });
  };

  const onPressFulfillOrder = async () => {
    if (_.isBoolean(isFulfilledManually) && courierServiceOption) {
      try {
        await requestFulfillOrder(
          {
            isFulfilledManually,
            courier: courierServiceOption?.value.name,
            courierTrackingUrl: courierServiceOption?.value.url || null,
            trackingNumber,
          },
          order?.id || '',
        );
        dispatch(fetchOrderList());
        navigation.goBack();
        queueToast({
          message: 'Order fulfilled successfully! Confirmation message sent',
          type: 'success',
          position: 'bottom',
        });
      } catch (e) {
        logError(e?.response.data);
      }
    }
  };

  const onPressResendConfirmation = () => {
    queueToast({
      message: 'Confirmation message sent to buyer',
      type: 'success',
      position: 'bottom',
    });
  };

  /////// //

  const [formErrors, setFormErrors] = useState({
    CourierService: '',
    TrackingNumber: '',
  });

  const onPressDisabled = () => {
    // setIsDisabledPressed(true);
    showFormErrors();
  };

  const showFormErrors = () => {
    setFormErrors({
      CourierService: courierServiceIndex == '-1' ? t('The field is required') : '',
      TrackingNumber: !trackingNumber ? t('Please fill the tracking number') : '',
    });
  };

  ///////
  const renderItem = ({ item }: { item: IItemOrder }) => {
    return (
      <View style={styles.viewItem}>
        <View style={styles.imageProduct}>
          <Image
            defaultSource={getCategoryImageDefault(isFnb)}
            source={
              item.productPhotoUrls.length > 0 ? { uri: item.productPhotoUrls[0] } : getCategoryImageDefault(isFnb)
            }
            style={{ width: 62, height: 62 }}
          />
        </View>

        <View style={styles.viewContentiem}>
          <StyledText style={styles.txtNameProduct}>
            {item.quantity} x {item.productName}
          </StyledText>
          {isFnB && item.selectedVariants.length > 0 ? (
            <></>
          ) : (
            item.selectedVariants[0].appliedVariants.map((v: { name: string; option: string }, index: number) => (
              <View style={{ flexDirection: 'row' }} key={index}>
                <StyledText style={styles.typeItem}>{v.name}</StyledText>
                <StyledText style={styles.typeContenItem}>{` - ${v.option}`}</StyledText>
              </View>
            ))
          )}
        </View>
        <View>
          <StyledText style={styles.txtPriceItem}>{item.total.toFixed(2)} THB</StyledText>
        </View>
      </View>
    );
  };
  const { onLayout, height } = useLayout();

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent
        onLayout={onLayout}
        styleViewBorder={styles.styleViewBorder}
        styleTitleBack={styles.styleTitleBack}
        titleBack={'Order Detail'}
      />
      <KeyboardAwareScrollView style={[styles.viewContainer, { top: height }]} showsVerticalScrollIndicator={false}>
        {order ? (
          <View>
            {order?.status === EStatusOrder.COMPLETED && (
              <View
                style={{
                  backgroundColor: '#CFF5DE',
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                }}>
                <View style={{ paddingTop: 20, paddingBottom: 22, flexDirection: 'row' }}>
                  <View style={{ marginLeft: 16, marginRight: 11 }}>
                    <AcceptIcon fill={Palette.zaapi2} width={21} height={21} />
                  </View>
                  <StyledText style={{ fontWeight: '600', fontSize: 18, color: Palette.zaapi2 }}>
                    Order Completed
                  </StyledText>
                </View>
              </View>
            )}
            {order?.status === EStatusOrder.REJECTED && (
              <View
                style={{
                  backgroundColor: Palette.color_E5E5E5,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                }}>
                <View style={{ paddingTop: 20, paddingBottom: 22, flexDirection: 'row' }}>
                  <View style={{ marginLeft: 16, marginRight: 11 }}>
                    <CloseIcon fill={Palette.zaapi4} width={21} height={21} />
                  </View>
                  <StyledText style={{ fontWeight: '600', fontSize: 18, color: Palette.zaapi4 }}>
                    Order Rejected
                  </StyledText>
                </View>
              </View>
            )}
            <View style={[styles.viewContent]}>
              <View style={styles.styleheaderConten}>
                <StyledText style={styles.txtOrderCode}>
                  Order{' '}
                  {`# ${(order.orderNumber + '').length < 3 ? 0 : ''}${(order.orderNumber + '').length < 2 ? 0 : ''}${
                    order.orderNumber
                  }`}{' '}
                  {'\u2022'} {moment(order?.createdAt).format('HH:mm')}
                </StyledText>
              </View>
              <View style={styles.line} />
              <View>
                <StyledText style={styles.txtlengListOrder}>{`${order.items.length} item`}</StyledText>
                <FlatList data={order.items} renderItem={renderItem} />
              </View>
              <View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  <StyledText style={styles.txttypetotal}>{t('Subtotal')}</StyledText>
                  <StyledText style={styles.txttotal}>{order.subTotal.toFixed(2)} THB</StyledText>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                  <StyledText style={styles.txttypetotal}>{t('Shipping Fee')}</StyledText>
                  <StyledText style={styles.txttotal}>{order.shippingFee.toFixed(2)} THB</StyledText>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                  <StyledText style={styles.txttypetotalall}>{t('Order Total')}</StyledText>
                  <StyledText style={styles.txttotalall}>{order.total.toFixed(2)} THB</StyledText>
                </View>
              </View>
            </View>
            <View style={styles.viewDeliveryAddress}>
              <StyledText style={styles.txtDeliveryAddress}>{t('Delivery Address')}</StyledText>
              <View style={styles.viewName}>
                <StyledText style={styles.txtName}>{order.customerDetails.name}</StyledText>
                <TouchableOpacity
                  style={styles.viewCopy}
                  onPress={() => {
                    Clipboard.setString(
                      `${order.customerDetails.name} \n \n${order.customerDetails.phoneNumber} \n \n${order.customerDetails.address}`,
                    );
                    queueToast({
                      message: 'Save customer information to clipboard',
                      type: 'success',
                      position: 'bottom',
                    });
                  }}>
                  <CopyIcon />
                  <StyledText style={styles.txtCopy}>{t('COPY')}</StyledText>
                </TouchableOpacity>
              </View>
              <View style={styles.ViewPhoneNumber}>
                <PhoneIcon {...styles.customerInfoIcon} />
                <StyledText style={styles.customerInfoText}>{order.customerDetails.phoneNumber}</StyledText>
              </View>
              <View style={styles.ViewAddress}>
                <AddRessIcon {...styles.customerInfoIcon} />
                <StyledText style={styles.customerInfoText}>
                  <StyledText style={styles.customerInfoText}>{order.customerDetails.address}</StyledText>
                </StyledText>
              </View>
              <View style={[styles.ViewAddress, { marginRight: 60 }]}>
                <ShipIcon {...styles.customerInfoIcon} />
                <StyledText style={styles.customerInfoText}>{order.remarks}</StyledText>
              </View>
              <View style={styles.customerInfoDivider} />
              {order.customerDetails.lineId && order.customerDetails.lineId.length > 0 && (
                <View style={[styles.ViewAddress, { marginRight: 60 }]}>
                  <LineIcon {...styles.customerInfoIcon} />
                  <StyledText style={styles.customerInfoText}>{order.customerDetails.lineId}</StyledText>
                </View>
              )}
              {order.customerDetails.email && order.customerDetails.email.length > 0 && (
                <View style={[styles.ViewAddress, { marginRight: 60 }]}>
                  <GmailIcon {...styles.customerInfoIcon} />
                  <StyledText style={styles.customerInfoText}>{order.customerDetails.email}</StyledText>
                </View>
              )}

              <View>
                <TouchableOpacity
                  style={styles.btnBottom}
                  onPress={() => {
                    Linking.openURL(`tel:${order.customerDetails.phoneNumber}`);
                  }}>
                  <CallIcon />
                  <StyledText style={styles.txtcall}>{t('Call')}</StyledText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btnBottom, { marginTop: 12 }]}
                  onPress={() => {
                    const separator = Platform.OS === 'ios' ? '&' : '?';
                    const url = `sms:${order.customerDetails.phoneNumber}${separator}body=`;
                    Linking.openURL(url);
                  }}>
                  <MessageIcon />
                  <StyledText style={styles.txtcall}>{t('Message')}</StyledText>
                </TouchableOpacity>
              </View>

              {order.status === EStatusOrder.NEW ? (
                <View style={styles.viewBottom}>
                  <StyledButton title={'Reject'} disabled={true} onPressDisabled={onReject} style={styles.btnReject} />
                  <StyledButton title={'Accept'} onPress={onAccept} style={styles.btnAccept} />
                </View>
              ) : null}
            </View>
            {order.status === EStatusOrder.NEW || order.status === EStatusOrder.REJECTED ? null : (
              <View style={styles.viewPaymentReject}>
                <View style={[styles.viewPayment, !toogleMakeAsPaid ? { flexDirection: 'row' } : {}]}>
                  <StyledText style={styles.txtPayment}>{t('Payment Receipt')}</StyledText>
                  {!toogleMakeAsPaid ? (
                    <StyledText style={styles.txtNopayment}>{t('No Payment Receipt Uploaded')}</StyledText>
                  ) : (
                    <View style={{ borderRadius: 12, width: 94, height: 94 }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('PaymentReceipt', {
                            makeAsPaid: toogleMakeAsPaid,
                          });
                        }}>
                        <Image source={media.PaymentReceipt} style={styles.imagePayment} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <View style={styles.viewMarkasPaid}>
                  <StyledText style={styles.txtMarkasPaid}>{t('Mark as paid')}</StyledText>
                  <SwitchCustom
                    disabled={order.status === EStatusOrder.COMPLETED || order.status === EStatusOrder.REJECTED}
                    onValueChange={onChangeToogleMakeAsPaid}
                    value={toogleMakeAsPaid}
                  />
                </View>
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    disabled={order.status === EStatusOrder.COMPLETED || order.status === EStatusOrder.REJECTED}
                    value={isFulfilledManually}
                    onValueChange={onChangeIsFulfilledManually}
                    style={styles.checkbox}
                    boxType={'square'}
                    onFillColor={Palette.zaapi2}
                    onTintColor={Palette.zaapi2}
                    tintColor={Palette.color_D6D6D6}
                    onCheckColor={Palette.white}
                  />
                  <Text style={styles.label}>{t('Order Fulfilled Manually')}</Text>
                </View>

                <View style={styles.formItem}>
                  <StyledText style={styles.formItemTitle}>
                    {t('Courier Service')}
                    <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                  </StyledText>
                  <StyledDropdownSelect
                    options={courierService}
                    style={styles.categoryTypeDropdownSelect}
                    dropdownStyle={styles.categoryTypeDropdownSelect}
                    placeholder={t('Choose courier service')}
                    selectedIndex={courierServiceIndex}
                    onSelect={onProductTypeSelect}
                    errorMessage={formErrors.CourierService}
                    disabled={
                      (order.status && [EStatusOrder.COMPLETED, EStatusOrder.REJECTED].includes(order.status)) ||
                      isFulfilledManually
                    }
                    accessible={false}
                  />
                </View>
                <View style={[styles.formItem]}>
                  <StyledText style={styles.formItemTitle}>
                    {t('Tracking Number')}
                    <StyledText style={styles.requiredMark}>{t('*')}</StyledText>
                  </StyledText>
                  <StyledTextInput
                    value={trackingNumber}
                    placeholder={t('Tracking Number')}
                    onChangeText={setTrackingNumber}
                    editable={
                      !(
                        (order.status && [EStatusOrder.COMPLETED, EStatusOrder.REJECTED].includes(order.status)) ||
                        isFulfilledManually
                      )
                    }
                    errorMessage={formErrors.TrackingNumber}
                    style={isSelected ? { backgroundColor: Palette.color_D6D6D6 } : {}}
                  />
                </View>

                <View style={styles.viewBottom}>
                  {order.status === EStatusOrder.ACCEPTED && (
                    <>
                      <StyledButton
                        title={'Cancel Order'}
                        disabled={true}
                        onPressDisabled={onReject}
                        style={styles.btnReject}
                      />
                      <StyledButton
                        title={'Fulfill Order'}
                        style={styles.btnAccept}
                        onPressDisabled={onPressDisabled}
                        onPress={onPressFulfillOrder}
                      />
                    </>
                  )}
                  {order.status === EStatusOrder.COMPLETED && (
                    <>
                      <StyledButton
                        title={'Resend Confirmation'}
                        disabled={true}
                        onPressDisabled={onPressResendConfirmation}
                        style={{ width: '100%' }}
                      />
                    </>
                  )}
                </View>
              </View>
            )}
          </View>
        ) : (
          <View />
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default OrderDetail;
