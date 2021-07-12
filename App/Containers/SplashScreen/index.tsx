import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, SafeAreaView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { media } from '../../assets/media';
import { useNavigation } from '@react-navigation/native';
import { requestIsLoggedIn } from 'App/Repositories/auth';
import { requestGetStoreInfo } from 'App/Repositories/store';
import { setUpRequestInterceptor } from 'App/Repositories';
import { logError } from 'App/Utils/error';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { updateStoreDataAction } from 'App/Redux/store/StoreActions';

type NavigatorParamList = {
  SplashScreen: undefined;
  LoginStack: { screen: string } | undefined;
  BottomTabStack: undefined;
};

const SplashScreens = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<NavigatorParamList, 'SplashScreen'>>();

  return (
    <SafeAreaView style={styles.container}>
      <Image source={media.logo_green} style={styles.logo} />
    </SafeAreaView>
  );
};

export default SplashScreens;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignSelf:"center"
    alignContent: 'center',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: '50%',
  },
});
