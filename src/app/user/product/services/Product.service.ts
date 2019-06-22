import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import IApiResponse from 'src/app/shared/models/IApiResponse';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductDetailsService {

  constructor(
    private http: HttpClient,
  ) { }

  getProductDetails(productId: number): Observable<IApiResponse> {
    const url = `${environment.backendUrl}/products/${productId}`;

    return this.http.get<IApiResponse>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error.message);
  }
}
