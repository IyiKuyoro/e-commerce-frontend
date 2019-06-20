import IProduct from './IProduct';
import { IDepartment } from './IDepartment';
import ICustomer from './ICustomer';

export default interface IApiResponse {
  success: boolean;
  count?: number;
  pageMeta?: IPageMeta;
  error?: any;
  rows?: any[];
  customer?: any;
  accessToken?: string;
  expiresIn?: string;

  product_id?: number;
  name?: string;
  description?: string;
  price?: number;
  discounted_price?: number;
  image?: string;
  image2?: string;
  thumbnail?: string;

  cartId?: string;
  products?: ICartProduct[];

  totalAmount?: number;

  tax?: ITax[];

  shipping?: IShipping[];

  orderId?: number;

  order?: IOrder;

  orders?: IOrder[];
}

export interface IOrder {
  order_id?: number;
  total_amount?: number;
  created_on?: string;
  shipped_on?: string;
  status?: number;
}

export interface IShipping {
  shipping_id: number;
  shipping_type: string;
  shipping_cost: number;
  shipping_region_id: number;
}

export interface ITax {
  tax_id: number;
  tax_type: string;
  tax_percentage: number;
}

export interface IOrdersResolved {
  orders?: IOrder[];
  error?: any;
}

export interface IOrderShortDetails {
  order_id: number;
  total_amount: number;
  created_on: string;
  shipped_on: string;
  status: string;
  name: string;
}

export interface ICartProduct {
  item_id: number;
  name: string;
  attributes: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface IPageMeta {
  page: number;
  totalPages: number;
  pageSize: number;
  totalProducts: number;
}

export interface IProductResolved {
  error?: any;
  products?: IProduct[];
  pageMeta?: IPageMeta;
}

export interface IProductDetailsResolved {
  error?: any;
  product?: IApiResponse;
}

export interface IOrderResolved {
  error?: any;
  orderShortDetails?: IApiResponse;
}

export interface ICustomerInfoResolved {
  error?: any;
  customerInfo?: ICustomer;
}

export interface IDepartmentResolved {
  error?: any;
  departments?: IDepartment[];
}

export interface IShippingRegionsResolved {
  error?: any;
  shippingRegions?: any;
}
