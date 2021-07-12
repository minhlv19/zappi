import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Containers/Home/HomeScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default memo(HomeStack);
