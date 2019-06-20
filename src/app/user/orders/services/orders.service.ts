import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import IApiResponse from 'src/app/shared/models/IApiResponse';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/Auth.Service';

@Injectable()
export class OrdersService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getOrders(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      `${environment.backendUrl}/orders/inCustomer`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.checkAuthentication().accessToken}`,
        }
      }
    );
  }

}
