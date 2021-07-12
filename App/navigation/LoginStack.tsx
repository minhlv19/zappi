import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from 'App/Containers/auth/LandingScreen/LandingScreen';
import WebviewScreen from 'App/Containers/auth/WebviewScreen/WebviewScreen';
import OTPScreen from 'App/Containers/auth/OTPScreen/OTPScreen';
import EnterPhoneScreen from 'App/Containers/auth/EnterPhoneScreen/EnterPhoneScreen';
import CreateAccountScreen from 'App/Containers/auth/CreateAccountScreen/CreateAccountScreen';
import StoreLocationScreen from 'App/Containers/auth/StoreLocationScreen/StoreLocationScreen';

const Stack = createStackNavigator();
const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'LandingScreen'} component={LandingScreen} options={{ headerShown: false }} />
      <Stack.Screen name={'EnterPhoneScreen'} component={EnterPhoneScreen} options={{ headerShown: false }} />
      <Stack.Screen name={'OTPScreen'} component={OTPScreen} options={{ headerShown: false }} />
      <Stack.Screen name={'CreateAccountScreen'} component={CreateAccountScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default LoginStack;
