import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import IApiResponse from 'src/app/shared/models/IApiResponse';
import { environment } from 'src/environments/environment';

@Injectable()
export class DepartmentService {

  constructor(
    private http: HttpClient
  ) {}

  getDepartments(): Observable<IApiResponse> {
    const url = `${environment.backendUrl}/departments`;

    return this.http.get<IApiResponse>(url).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError(error.message);
  }
}
