import { Injectable } from '@angular/core';
import IProduct from 'src/app/shared/models/IProduct';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import IApiResponse from '../../../shared/models/IApiResponse';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService {
  products: IProduct[];

  constructor(
    private http: HttpClient
  ) {}

  getProducts(page: string = '1', limit: string = '10', descriptionLength: string = '150'): Observable<IApiResponse> {
    const url = `${environment.backendUrl}/products`;

    return this.http.get<IApiResponse>(url, {
      params: {
        page,
        limit,
        descriptionLength,
      }
    })
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError(error.message);
  }
}
