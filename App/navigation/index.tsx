import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabStack from './BottomTabStack';
import LoginStack from './LoginStack';
import CropAvatarScreen from 'App/Containers/Home/CropAvatarScreen';
import NavigationService from './NavigationService';
import PaymentSettingScreen from 'App/Containers/Home/PaymentSettingScreen';
import SetBusinessHoursScreen from 'App/Containers/auth/SetBusinessHoursScreen';

import CreateAccountScreen from 'App/Containers/auth/CreateAccountScreen/CreateAccountScreen';
import { ZAAPI_WEB_DOMAIN } from '@env';
import { requestIsLoggedIn } from 'App/Repositories/auth';
import { setUpRequestInterceptor } from 'App/Repositories';
import { requestGetStoreInfo } from 'App/Repositories/store';
import { updateStoreDataAction } from 'App/Redux/store/StoreActions';
import SplashScreen from 'react-native-splash-screen';
import { logError } from 'App/Utils/error';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import StyledModalConfirm from 'App/Components/StyledModalConfirm/StyledModalConfirm';
import { RootState } from 'App/Redux';
import {
  updateConfirmModalData,
  updateErrorModalData,
  updateSuccessModalData,
} from 'App/Redux/appState/AppStateActions';
import { useTranslation } from 'react-i18next';
import { ConfirmModalStateEnums, ConfirmModalTypeEnums } from 'App/Types';
import StyledModalSuccess from 'App/Components/StyledModalSuccess/StyledModalSuccess';
import StoreInformationScreen from 'App/Containers/auth/StoreInformationScreen/StoreInformationScreen';
import StoreLocationScreen from 'App/Containers/auth/StoreLocationScreen/StoreLocationScreen';
import WebviewScreen from 'App/Containers/auth/WebviewScreen/WebviewScreen';

const config = {
  screens: {
    LoginStack: {
      screens: {
        WebviewScreen: 'webview',
      },
    },
  },
};

const linking = {
  prefixes: [`https://${ZAAPI_WEB_DOMAIN}`, 'zaapi://'],
  config,
};

const Stack = createStackNavigator();
const Navigation = () => {
  const dispatch = useDispatch();
  const { errorModalData, confirmModalData, successModalData } = useSelector((state: RootState) => state.appState);
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        const startTime = moment().valueOf();
        const isLoggedIn = await requestIsLoggedIn();
        if (isLoggedIn) {
          await setUpRequestInterceptor();
          const storeInfoData = await requestGetStoreInfo();
          dispatch(updateStoreDataAction(storeInfoData));
          console.log('storeInfoData', JSON.stringify(storeInfoData, null, 2));

          if (storeInfoData) {
            NavigationService.replace('BottomTabStack');
          } else {
            NavigationService.replace('LoginStack', { screen: 'CreateAccountScreen' });
          }
        } else {
          //NavigationService.replace('BottomTabStack');
          NavigationService.replace('LoginStack');
        }
        const splashWaitTime = Math.max(0, startTime + 2000 - moment().valueOf());
        setTimeout(() => SplashScreen.hide(), splashWaitTime);
      } catch (error) {
        logError(error);
      }
    })();
  }, []);

  return (
    <>
      <Stack.Navigator initialRouteName={'LoginStack'}>
        <Stack.Screen name={'CreateAccountScreen'} component={CreateAccountScreen} options={{ headerShown: false }} />
        <Stack.Screen name={'LoginStack'} component={LoginStack} options={{ headerShown: false }} />
        <Stack.Screen
          name={'StoreInformationScreen'}
          component={StoreInformationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={'BottomTabStack'} component={BottomTabStack} options={{ headerShown: false }} />
        <Stack.Screen name={'CropAvatarScreen'} component={CropAvatarScreen} options={{ headerShown: false }} />
        <Stack.Screen name={'PaymentSettingScreen'} component={PaymentSettingScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name={'SetBusinessHoursScreen'}
          component={SetBusinessHoursScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen name={'webview'} component={WebviewScreen} options={{ headerShown: false }} />
        <Stack.Screen name={'StoreLocationScreen'} component={StoreLocationScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StyledModalConfirm
        title={errorModalData.title}
        subtitle={errorModalData.subtitle}
        isVisible={errorModalData.display}
        onClose={() => {}}
        onConfirm={() => dispatch(updateErrorModalData({ display: false }))}
        canCancel={false}
        confirmButtonTitle={errorModalData.dismissButtonTitle || t('Got it')}
      />
      <StyledModalConfirm
        title={confirmModalData.title}
        subtitle={confirmModalData.subtitle}
        isVisible={confirmModalData.display}
        cancelButtonTitle={confirmModalData.cancelButtonTitle || t('Cancel')}
        onClose={() => dispatch(updateConfirmModalData({ state: ConfirmModalStateEnums.CANCELLED }))}
        onConfirm={() => dispatch(updateConfirmModalData({ state: ConfirmModalStateEnums.CONFIRMED }))}
        confirmButtonTitle={confirmModalData.confirmButtonTitle || t('Confirm')}
        canCancel={true}
      />
      <StyledModalSuccess
        title={successModalData.title || t('Update Successful')}
        isVisible={successModalData.display}
        onClose={() => dispatch(updateSuccessModalData({ display: false }))}
      />
    </>
  );
};

export default Navigation;
