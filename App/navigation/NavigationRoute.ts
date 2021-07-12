import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  PaymentSettingScreen: { showPaymentSuccess: () => void };
  CreateCategoryScreen: { isEdit?: boolean };
};

export type PaymentSettingScreenRouteProp = RouteProp<RootStackParamList, 'PaymentSettingScreen'>;
export type CreateCategoryScreenRouteProp = RouteProp<RootStackParamList, 'CreateCategoryScreen'>;
