import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import IApiResponse from 'src/app/shared/models/IApiResponse';

@Injectable()
export class TaxService {

  constructor(
    private http: HttpClient,
  ) { }

  getTax(taxId: number = 1): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      `${environment.backendUrl}/tax/${taxId}`,
    );
  }
}
