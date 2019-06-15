import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import IApiResponse from 'src/app/shared/models/IApiResponse';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

export enum AllWords {
  'on',
  'off',
}

@Injectable()
export class ProductSearchService {

  constructor(
    private http: HttpClient,
  ) { }

  searchProducts(text: string, allWords: AllWords = AllWords.on, page: string = '1', limit: string = '5'): Observable<IApiResponse> {
    const url = `${environment.backendUrl}/products/search?queryString=${text}&${allWords}`;

    return this.http.get<IApiResponse>(url, {
      params: {
        page,
        limit,
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
