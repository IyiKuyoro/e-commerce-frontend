import IProduct from './IProduct';

export default interface IApiResponse {
  success: boolean;
  count?: number;
  pageMeta?: IPageMeta;
  error?: any;
  rows?: any[];
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
