import React, { useEffect, useState } from 'react';
import { useLayout } from '@react-native-community/hooks';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import HeaderHome from './HeaderHome';
import ViewStepHome from './ViewStepHome';
import ViewOrders from './ViewOrders';
import ViewAnalytics from './ViewAnalytics';
import ProductsRanking from './ProductsRanking';
import RecentOrder from './RecentOrder';
import LatestReviews from './LatestReviews';
import FeatureRequest from './FeatureRequest';
import ShareStore from './ShareStore';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'App/Redux';
import { Product, Store } from 'App/Types';
import { setProductDataAsyncAction } from 'App/Redux/product/ProductActions';
import DataStorage, { getStoredProperty } from 'App/Utils/storage';

const { height } = Dimensions.get('window');

const checkStoreCreationStepsComplete = (store: Partial<Store>, products: Product[]) => {
  return store.productSetName && store.paymentDetail && store.hasSharedStoreOnSocialMedia && products.length > 0;
};

const HomeScreen = ({}) => {
  const { top, bottom } = useSafeAreaInsets();
  const { onLayout: onLayoutHeader, height: heightHeader } = useLayout();
  const { onLayout: onLayoutShareStore, height: heightShareStore } = useLayout();
  const store = useSelector((state: RootState) => state.store);
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProductDataAsyncAction());
  }, []);
  console.log('store id', store?.id);
  // (async () => {
  //   console.log(await DataStorage.load({ key: 'accessToken' }));
  // })();

  useEffect(() => {
    (async () => {
      console.log('accessToken', await getStoredProperty('accessToken'));
    })();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderHome onLayout={onLayoutHeader} />
      <ShareStore onLayout={onLayoutShareStore} heightHeader={heightHeader} />

      <View
        style={[
          styles.viewContent,
          {
            height: height - top - bottom - heightHeader,
            top: heightHeader + top + 80,
          },
        ]}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={[styles.container, { paddingTop: heightShareStore - 20 }]}>
          {checkStoreCreationStepsComplete(store, products) ? (
            <>
              <ViewOrders />
              <ViewAnalytics />
              <ProductsRanking />
              <RecentOrder />
              <LatestReviews />
              <FeatureRequest />
              <View style={{ height: heightShareStore + 150 }} />
            </>
          ) : (
            <ViewStepHome />
          )}
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  viewContent: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#f5f5f5',
    position: 'absolute',
    width: '100%',
  },
  viewFooter: { height: rh(200) },
});

export default HomeScreen;
