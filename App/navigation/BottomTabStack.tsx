import React, { useState } from 'react';
import { StyleSheet, Text, Image, StyleProp, TextStyle, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FastImage from 'react-native-fast-image';

import HomeStack from './HomeStack';
import OrderStack from './OrderStack';
import ProductStack from './ProductStack';
import DiscountStack from './DiscountStack';
import StoreStack from './StoreStack';
import { media } from '../assets/media';
import { Palette } from '../Theme/Palette';
import { useTranslation } from 'react-i18next';
import { getBottomBarHeight } from 'App/Utils/style';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';

const screensHideBottomBar = [
  'AddProduct',
  'ProductDescription',
  'CreateCategory',
  'CreateNewDeliveryProfile',
  'ProductInCategoryScreen',
  'CreateDiscountScreen',
  'Language',
  'Referfriends',
  'AccountSettings',
  'DiscountAddProducts',
  'DiscountSpecificCustomers',
  'PaymentReceipt',
];

const Tab = createBottomTabNavigator();
const BottomTabStack = () => {
  const { t } = useTranslation();
  const getTabBarVisibility = (route: any) => {
    const routeName = route.state ? route.state.routes[route.state.index].name : '';

    if (screensHideBottomBar.includes(routeName)) {
      return false;
    }

    return true;
  };

  return (
    <Tab.Navigator
      screenOptions={{ tabBarButton: props => <TouchableOpacity {...props} /> }}
      tabBarOptions={{
        activeTintColor: Palette.color_54B56F,
        inactiveTintColor: Palette.zaapi3,
        labelStyle: {
          fontSize: rh(11),
          fontWeight: '600',
          fontFamily: 'SourceSansPro-Regular',
          lineHeight: rh(13),
          marginTop: -rh(13),
        },
        style: {
          height: getBottomBarHeight(),
          borderTopLeftRadius: rh(20),
          borderTopRightRadius: rh(20),
        },
      }}>
      <Tab.Screen
        name={'Home'}
        component={HomeStack}
        options={({ route }) => ({
          title: t('Home'),
          tabBarIcon: ({ focused }) => (
            <FastImage source={focused ? media.Home_Active : media.Home_isActive} style={styles.imageBottomBar} />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name={'Orders'}
        component={OrderStack}
        options={({ route }) => ({
          title: t('Orders'),
          tabBarIcon: ({ focused }) => (
            <FastImage source={focused ? media.Order_Active : media.Order_isActive} style={styles.imageBottomBar} />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name={'Products'}
        component={ProductStack}
        options={({ route }) => ({
          title: t('Products'),
          tabBarIcon: ({ focused }) => (
            <FastImage source={focused ? media.Product_Active : media.Product_isActive} style={styles.imageBottomBar} />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name={'Discount'}
        component={DiscountStack}
        options={({ route }) => ({
          title: t('Discount'),
          tabBarIcon: ({ focused }) => (
            <FastImage
              source={focused ? media.Discount_Active : media.Discount_isActive}
              style={styles.imageBottomBar}
            />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name={'Store'}
        component={StoreStack}
        options={({ route }) => ({
          title: t('Store'),
          tabBarIcon: ({ focused }) => (
            <FastImage source={focused ? media.Store_Active : media.Store_isActive} style={styles.imageBottomBar} />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  imageBottomBar: { width: 22, height: 22, resizeMode: 'contain' },
  tabBarLabelStyle: {},
});

export default BottomTabStack;
