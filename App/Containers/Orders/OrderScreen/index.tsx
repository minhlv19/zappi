import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import StyleHeader from 'App/Components/Header/StyleHeader';
import HeaderComponent from 'App/Components/Header/HeaderComponent';
import ViewHeaderProduct from './ViewHeaderOrder';
import styles from './styles';
import { useLayout } from '@react-native-community/hooks';
import { useToggle } from 'react-use';
import useBoolean from 'App/Hooks/useBoolean';
import HeaderListOrder from 'App/Containers/Orders/OrderScreen/HeaderListOrder';
import OrderNew from 'App/Containers/Orders/OrderNew';
import OrderAccepted from 'App/Containers/Orders/OrderAccepted';
import OrderCompleted from 'App/Containers/Orders/OrderCompleted';
import OrderRejected from 'App/Containers/Orders/OrderRejected';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderList } from 'App/Redux/order/orderActions';
import { OrderReduxState } from 'App/Redux/order/orderReducer';
import { RootState } from 'App/Redux';
import { EStatusOrder, IOrder } from 'App/Types/order';
import ViewHeaderOrder from './ViewHeaderOrder';

const OrderScreen = () => {
  const { onLayout, height } = useLayout();
  const [index, setIndex] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrderList());
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent
        onLayout={onLayout}
        disabledBack
        styleViewBorder={styles.styleViewBorder}
        hideBackIcon
        styleTitleBack={styles.styleTitleBack}
        titleBack={'Order'}
        header={<ViewHeaderOrder index={index} />}
      />
      <View style={[styles.viewContainer, { top: height }]}>
        <HeaderListOrder
          index={index}
          New={() => setIndex(1)}
          Accepted={() => setIndex(2)}
          Completed={() => setIndex(3)}
          Rejected={() => setIndex(4)}
        />
        {index === 1 ? (
          <OrderNew />
        ) : index === 2 ? (
          <OrderAccepted />
        ) : index === 3 ? (
          <OrderCompleted />
        ) : (
          <OrderRejected />
        )}
      </View>
    </View>
  );
};

export default OrderScreen;
