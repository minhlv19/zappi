import React, { memo, useCallback, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { enableAllPlugins } from 'immer';
import { setCustomTextInput, setCustomText } from 'react-native-global-props';

import { setCustomFlatList } from 'App/Utils/customs/setCustomFlatList';
import Navigation from 'App/navigation';
import store from 'App/store';
import { setCustomSectionList } from 'App/Utils/customs/setCustomSectionList';
import { setCustomScrollView } from 'App/Utils/customs/setCustomScrollView';
import setupI18N from 'App/Utils/i18n';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import NavigationService from 'App/navigation/NavigationService';
import * as Sentry from '@sentry/react-native';
import { SENTRY_DSN, INSTABUG_API_KEY } from '@env';
import Instabug from 'instabug-reactnative';
import codePush from 'react-native-code-push';
import { ToastProvider } from '@stratuscode/react-native-toast-hook';
import { Dimensions, View } from 'react-native';
import StyledText from 'App/Components/StyledText/StyledText';
import { ToastProps } from '@stratuscode/react-native-toast-hook/types';
import { responsiveByWidth as rw, responsiveByHeight as rh } from 'App/Utils/style';
import { Palette } from 'App/Theme/Palette';
import AcceptIcon from 'App/assets/svg/AcceptIcon';
Sentry.init({
  dsn: SENTRY_DSN,
});

setupI18N();
enableAllPlugins();
enableScreens();
setCustomFlatList({
  keyExtractor: (item: any, index: number) => index.toString(),
  showsHorizontalScrollIndicator: false,
});
setCustomSectionList({
  keyExtractor: (item: any, index: number) => index.toString(),
  showsHorizontalScrollIndicator: false,
});
setCustomScrollView({ showsHorizontalScrollIndicator: false });
setCustomTextInput({ style: { fontFamily: 'SourceSansPro-Regular' } });
setCustomText({ style: { fontFamily: 'SourceSansPro-Regular' } });

const screenWidth = Dimensions.get('screen').width;

const toastConfig = {
  success: (toast: ToastProps) => (
    <View
      style={{
        width: screenWidth - rw(16) * 2,
        backgroundColor: Palette.zaapi2,
        opacity: 0.9,
        marginBottom: rh(21),
        paddingVertical: rh(12),
        borderRadius: 12,
        flexDirection: 'row',
      }}>
      <View style={{ marginLeft: rw(10), marginRight: rw(8) }}>
        <AcceptIcon />
      </View>
      <StyledText style={{ fontWeight: '600', color: Palette.white }}>{toast.message}</StyledText>
    </View>
  ),
};

const App = () => {
  const navigationRef = useRef<NavigationContainerRef>();
  const routeNameRef = useRef<string>();

  const ref = useCallback(refNavigaiton => {
    Instabug.startWithToken(INSTABUG_API_KEY, [Instabug.invocationEvent.shake]);
    navigationRef.current = refNavigaiton;
    NavigationService.setTopLevelNavigator(refNavigaiton);
  }, []);

  const onStateChange = useCallback(async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName) {
    }

    routeNameRef.current = currentRouteName;
  }, []);

  const onReady = useCallback(() => {
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
  }, []);

  return (
    <SafeAreaProvider>
      <ToastProvider customToasts={toastConfig}>
        <Provider store={store}>
          <NavigationContainer onReady={onReady} onStateChange={onStateChange} ref={ref}>
            <Navigation />
          </NavigationContainer>
        </Provider>
      </ToastProvider>
    </SafeAreaProvider>
  );
};

export default codePush(App);
