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

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/plain',
        Authorization: `Bearer ${this.authService.checkAuthentication().accessToken}`,
      }),
      withCredentials: true,
    };

    return this.http.post<IApiResponse>(
      url,
      JSON.stringify({
        shippingId,
        taxId,
      }),
      httpOptions,
    );
  }
}
