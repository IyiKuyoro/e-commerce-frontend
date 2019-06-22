import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import IApiResponse from 'src/app/shared/models/IApiResponse';
import { AuthService } from 'src/app/shared/services/Auth.Service';
import { environment } from 'src/environments/environment';

@Injectable()
export class OrderService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  createOrder(shippingId: string, taxId: string): Observable<IApiResponse> {
    const url = `${environment.backendUrl}/orders`;

    return this.http.post<IApiResponse>(
      url,
      {
        shippingId,
        taxId,
      },
      {
        headers: {
          Authorization: `Bearer ${this.authService.checkAuthentication().accessToken}`,
          cartId: localStorage.getItem('cartId')
        }
      },
    );
  }
}
