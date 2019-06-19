import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import IApiResponse from 'src/app/shared/models/IApiResponse';
import { environment } from 'src/environments/environment';

@Injectable()
export class ShippingService {

  constructor(
    private http: HttpClient,
  ) { }

  getShippingTypes(regionId: number): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      `${environment.backendUrl}/shipping/regions/${regionId}`,
    );
  }
}
