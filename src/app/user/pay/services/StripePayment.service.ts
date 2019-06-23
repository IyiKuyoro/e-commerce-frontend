import { Injectable } from '@angular/core';
import IApiResponse from 'src/app/shared/models/IApiResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/Auth.Service';

interface IStripeInfo { paymentMethodId?: string; orderId: number; paymentIntentId?: string; }

@Injectable()
export class StripePaymentService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  confirmPayment(payload: IStripeInfo): Observable<IApiResponse> {
    const url = `${environment.backendUrl}/stripe/charge/${payload.orderId}`;

    return this.http.post<IApiResponse>(
      url,
      {
        paymentMethodId: payload.paymentMethodId,
        paymentIntentId: payload.paymentIntentId,
      },
      {
        headers: {
          Authorization: `Bearer ${this.authService.checkAuthentication().accessToken}`,
        }
      },
    );
  }
}
