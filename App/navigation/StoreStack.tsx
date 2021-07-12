import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import StoreScreen from '../Containers/Store/StoreScreen';
import Language from 'App/Containers/Store/Language';
import Referfriends from 'App/Containers/Store/Referfriends';
import AccountSettings from 'App/Containers/Store/AccountSettings';
const Stack = createStackNavigator();
const StoreStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'StoreScreen'} component={StoreScreen} options={{ headerShown: false }} />
      <Stack.Screen name={'Language'} component={Language} options={{ headerShown: false }} />
      <Stack.Screen name={'Referfriends'} component={Referfriends} options={{ headerShown: false }} />
      <Stack.Screen name={'AccountSettings'} component={AccountSettings} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default StoreStack;
