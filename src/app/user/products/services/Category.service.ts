import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import IApiResponse from 'src/app/shared/models/IApiResponse';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategoryService {

  constructor(
    private http: HttpClient,
  ) { }

  getCategories(departmentId: number): Observable<IApiResponse> {
    const url = `${environment.backendUrl}/categories/inDepartments/${departmentId}`;

    return this.http.get<IApiResponse>(url).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error.message);
  }
}
