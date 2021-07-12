export interface Product {
  id?: string;
  name: string;
  description: string;
  unitPrice: number;
  numberInStock: number;
  unitType: string;
  unitDetail: string;
  displayProductEnabled: boolean;
  deliveryProfileId: string;
  categoryIds: string[];
  storeId?: string;
  createdAt?: string;
  updatedAt?: string;
  slug?: string;
  photoUrls: string[];
  isInStock: boolean;
}

export interface DailyWorkingPeriod {
  start: number; // in minutes
  end: number; // in minutes
}

export enum BusinessHoursKeyEnums {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN',
}

export interface BusinessHoursSetting {
  MON: DailyWorkingPeriod[];
  TUE: DailyWorkingPeriod[];
  WED: DailyWorkingPeriod[];
  THU: DailyWorkingPeriod[];
  FRI: DailyWorkingPeriod[];
  SAT: DailyWorkingPeriod[];
  SUN: DailyWorkingPeriod[];
}

export interface Store {
  businessName: string;
  businessType: string;
  productSetType: string;
  productSetName: string;
  email: string;
  anytimeOrderEnabled: boolean;
  deliveryType: DeliveryType;
  address: Address;
  userId: string;
  createdAt: string;
  updatedAt: string;
  paymentDetail?: PaymentDetail;
  slug?: string;
  logoUrl?: string;
  logoId?: string;
  id: string;
  hasSharedStoreOnSocialMedia?: boolean;
  allowPickupEnabled?: boolean;
  displayLocationOnlineEnabled?: boolean;
  businessHours: BusinessHoursSetting;
  onHolidayEnabled?: boolean;
  qrCodeUrl?: string;
}

export interface DeliveryType {
  type: string;
  radius?: number;
}

export interface Address {
  addressDetails: string;
  longitude: string;
  latitude: string;
}

export interface PaymentDetail {
  promptPay?: PromptPay;
  bankAccount?: BankAccount;
}

export interface PromptPay {
  promptPayNumber: string;
  enabled: boolean;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
  enabled: boolean;
}

export interface UpdateLogo {
  logoId: string;
  logoUrl: string;
  status: string;
}

export enum ProductOrderByEnums {
  PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH',
  PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW',
  DATE_CREATED = 'CREATED_DATE_NEW_TO_OLD',
  DEFAULT = '',
}

export enum ProductFilterEnums {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  IN_STOCK = 'IN_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  ALL = 'ALL',
}

export enum CategoryFilterEnums {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  ALL = 'ALL',
}

export type ActionResponse = {
  errorCode: string;
  statusCode: number;
  message: string;
};

export interface DeliveryProfile {
  name: string;
  feeType?: string;
  flatFee?: number;
  distanceBasedFees?: (DistanceBasedFees | null)[];
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DistanceBasedFees {
  minDist?: number;
  fee?: number;
}

export interface Category {
  name: string;
  photoUrl?: string;
  id?: string;
  displayCategoryEnabled?: boolean;
  productCount?: number;
  order?: number;
}
export type ProductFilterInputParams = {
  searchText?: string;
  filter?: ProductFilterEnums;
  orderBy?: ProductOrderByEnums;
  categoryId?: string;
};

export type CategoryFilterInputParams = {
  searchText?: string;
  filter?: CategoryFilterEnums;
};

export interface Variant {
  name: string;
  storeId?: string;
  categoryName: string;
  options: VariantOption[];
  createdAt?: string;
  updatedAt?: string;
  id?: string;
}

export interface VariantOption {
  name: string;
  available: boolean;
}

export interface VariantOptionProps {
  title?: string;
  checked?: boolean;
  // isAddBtn?: boolean;
  // isEmptyBtn?: boolean; // typing box
  isNullBtn?: boolean; //for fullfill
  // ref?: React.RefObject<TextInput>;
}
export type UploadPhotoResponse = {
  photoUrl: string;
  status: string;
};

export interface ErrorModalData {
  title: string;
  subtitle: string;
  dismissButtonTitle: string;
  display: boolean;
}

export enum ConfirmModalTypeEnums {
  PRODUCT_REORDER_UNSAVED = 'PRODUCT_REORDER_UNSAVED',
  PRODUCT_DISABLE_TOGGLE = 'PRODUCT_DISABLE_TOGGLE',
  NONE = '',
  DISCOUNT_DELETE = 'DISCOUNT_DELETE',
  CANCEL_ORDER_IN_ORDER_DETAIL = 'CANCEL_ORDER',
  ASK_REFUND_ORDER_ORDER_DETAIL = 'ASK_REFUND_ORDER_ORDER_DETAIL',
  ACCOUNT_SETTING_EXIT = 'ACCOUNT_SETTING_EXIT',
}

export enum ConfirmModalStateEnums {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export interface ConfirmModalData {
  title: string;
  subtitle: string;
  confirmButtonTitle: string;
  cancelButtonTitle: string;
  type: ConfirmModalTypeEnums;
  display: boolean;
  state?: ConfirmModalStateEnums;
  metadata?: any;
}

export interface SuccessModalData {
  title: string;
  display: boolean;
  metadata?: any;
}

export type AppState = {
  showProductBottomSheet: boolean;
  isDraggingCategory: boolean;
  errorModalData: ErrorModalData;
  isDraggingProduct: boolean;
  confirmModalData: ConfirmModalData;
  successModalData: SuccessModalData;
};

export type Transaction = {
  response?: any;
  errorResponse?: ActionResponse;
};
