import { Injectable } from '@angular/core';
import IProduct from 'src/app/shared/models/IProduct';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import IApiResponse from '../../../shared/models/IApiResponse';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService {
  products: IProduct[];

  constructor(
    private http: HttpClient
  ) {
    // this.products = [{
    //   product_id: 1,
    //   name: 'Product',
    //   description: 'Some long descriptiong',
    //   price: 13.00,
    //   discounted_price: 0.00,
    //   thumbnail: '../../../../assets/images/products/images-shirt8.png',
    // }];
  }

  getProducts(): Observable<IApiResponse> {
    const url = `${environment.backendUrl}/products`;

    return this.http.get<IApiResponse>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError(error.message);
  }
}
