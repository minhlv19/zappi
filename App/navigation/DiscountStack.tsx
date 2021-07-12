import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DiscountScreen from '../Containers/Discounts/DiscountScreen';
import CreateDiscountScreen from '../Containers/Discounts/CreateDiscountScreen/CreateDiscountScreen';

import CreateAutomaticDiscount from 'App/Containers/Discounts/CreateAutomaticDiscount';
import DiscountAddProducts from 'App/Containers/Discounts/DiscountAddProducts';
import DiscountSpecificCustomers from 'App/Containers/Discounts/DiscountSpecificCustomers';

const Stack = createStackNavigator();
const DiscountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'DiscountScreen'} component={DiscountScreen} options={{ headerShown: false }} />
      <Stack.Screen name={'CreateDiscountScreen'} component={CreateDiscountScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name={'CreateAutomaticDiscount'}
        component={CreateAutomaticDiscount}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={'DiscountAddProducts'} component={DiscountAddProducts} options={{ headerShown: false }} />
      <Stack.Screen
        name={'DiscountSpecificCustomers'}
        component={DiscountSpecificCustomers}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DiscountStack;
