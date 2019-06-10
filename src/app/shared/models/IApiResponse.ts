import IProduct from './IProduct';

export default interface IApiResponse {
  success: boolean;
  count?: number;
  pageMeta?: any;
  error?: any;
  rows?: any[];
}

export interface IProductResolved {
  error?: any;
  products: IProduct[];
}
