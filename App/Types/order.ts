export interface IOrder {
  status?: EStatusOrder;
  items: IItemOrder[];
  subTotal: number;
  shippingFee: number;
  total: number;
  customerDetails: ICustomerDetail;
  buyerDetails: IBuyerDetail;
  paymentData: IPaymentData;
  fulfillmentData: IFulfillmentData;
  remarks?: string;
  storeId?: string;
  createdAt?: string;
  updatedAt?: string;
  orderNumber?: number;
  id?: string;
}
interface IBuyerDetail {
  name: string;
}
export interface IItemOrder {
  productPhotoUrls: string[];
  productId: string;
  productName: string;
  selectedVariants: IVariantItem[];
  quantity: number;
  unitPrice: number;
  total: number;
  remarks: string;
}

export interface IVariantItem {
  appliedVariants: { name: string; option: string }[];
  addedPrice: number;
}

interface ICustomerDetail {
  name: string;
  address: string;
  phoneNumber: string;
  lineId?: string;
  email?: string;
}

interface IPaymentData {
  paymentTime: string;
  status: EPaymentStatus;
  receiptUrl: string;
}

export enum EPaymentStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
}

export enum EStatusOrder {
  NEW = 'NEW',
  ACCEPTED = 'ACCEPTED',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
}

export interface IFulfillmentData {
  isFulfilledManually: boolean;
  courier: string;
  courierTrackingUrl: string | null;
  trackingNumber: string;
}
