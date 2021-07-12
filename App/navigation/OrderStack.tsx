import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrderScreen from 'App/Containers/Orders/OrderScreen';
import OrderDetail from 'App/Containers/Orders/OrderDetail';
import PaymentReceipt from 'App/Containers/Orders/PaymentReceipt';
const Stack = createStackNavigator();
const OrderStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'OrderScreen'} component={OrderScreen} options={{ headerShown: false }} />
      <Stack.Screen name={'OrderDetail'} component={OrderDetail} options={{ headerShown: false }} />
      <Stack.Screen name={'PaymentReceipt'} component={PaymentReceipt} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default OrderStack;
