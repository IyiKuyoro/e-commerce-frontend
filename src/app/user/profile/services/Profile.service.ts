import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import IApiResponse from 'src/app/shared/models/IApiResponse';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/Auth.Service';

@Injectable()
export class ProfileService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getUserInfo(): Observable<IApiResponse> {
    const url = `${environment.backendUrl}/customers`;

    return this.http.get<IApiResponse>(
      url,
      {
        headers: {
          Authorization: `Bearer ${this.authService.checkAuthentication().accessToken}`,
        }
      }
    );
  }

  updateAddress(addressInfo): Observable<IApiResponse> {
    const url = `${environment.backendUrl}/customers/address`;

    return this.http.put<IApiResponse>(
      url,
      {
        address1: addressInfo.address1,
        address2: addressInfo.address2,
        city: addressInfo.city,
        region: addressInfo.region,
        postalCode: addressInfo.postalCode,
        country: addressInfo.country,
        shippingRegionId: addressInfo.shippingRegionId.toString(),
      },
      {
        headers: {
          Authorization: `Bearer ${this.authService.checkAuthentication().accessToken}`,
        }
      }
    );
  }

  getShippingRegions(): Observable<IApiResponse> {
    const url = `${environment.backendUrl}/shipping/regions`;

    return this.http.get<IApiResponse>(
      url,
    );
  }
}
