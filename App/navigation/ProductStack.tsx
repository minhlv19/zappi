import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from 'App/Containers/auth/LandingScreen/LandingScreen';

import ProductScreen from 'App/Containers/Products/ProductScreen';
import AddProduct from 'App/Containers/Products/AddProduct';
import ProductDescription from 'App/Containers/Products/ProductDescription';
import AddVariants from 'App/Containers/Variants/VariantsScreen';

import CreateCategory from 'App/Containers/Products/CreateCategory';
import VariantCategory from 'App/Containers/Variants/VariantCategory';

import CreateNewDeliveryProfile from 'App/Containers/Products/CreateNewDeliveryProfile';
const Stack = createStackNavigator();
const ProductStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'ProductScreen'} component={ProductScreen} options={{ headerShown: false }} />
      <Stack.Screen name={'AddProduct'} component={AddProduct} options={{ headerShown: false }} />
      <Stack.Screen name={'ProductDescription'} component={ProductDescription} options={{ headerShown: false }} />

      <Stack.Screen name={'AddVariants'} component={AddVariants} options={{ headerShown: false }} />
      <Stack.Screen name={'VariantCategory'} component={VariantCategory} options={{ headerShown: false }} />

      <Stack.Screen name={'CreateCategory'} component={CreateCategory} options={{ headerShown: false }} />
      <Stack.Screen name={'ProductInCategoryScreen'} component={ProductScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name={'CreateNewDeliveryProfile'}
        component={CreateNewDeliveryProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProductStack;
