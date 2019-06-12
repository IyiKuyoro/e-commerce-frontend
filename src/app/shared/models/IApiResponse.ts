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

export interface IDepartmentResolved {
  error?: any;
  departments?: IDepartment[];
}
