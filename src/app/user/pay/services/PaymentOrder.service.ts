import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import IApiResponse from 'src/app/shared/models/IApiResponse';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/Auth.Service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PaymentOrderService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getOrderDetails(orderId: string): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      `${environment.backendUrl}/orders/shortDetail/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.checkAuthentication().accessToken}`,
        }
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError(error.message);
  }
}
