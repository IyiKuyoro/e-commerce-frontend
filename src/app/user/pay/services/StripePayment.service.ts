import { Injectable } from '@angular/core';
import IApiResponse from 'src/app/shared/models/IApiResponse';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class StripePaymentService {

  constructor(
    private http: HttpClient,
  ) { }

  confirmPayment(payload: { paymentMethodId: string}): Observable<IApiResponse> {
    const url = `${environment.backendUrl}/stipe/confirm`;

    return this.http.post<IApiResponse>(
      url,
      payload,
    );
  }
}
