import IProduct from './IProduct';
import { IDepartment } from './IDepartment';

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

export interface IDepartmentResolved {
  error?: any;
  departments?: IDepartment[];
}
