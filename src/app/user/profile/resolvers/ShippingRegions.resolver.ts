import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { IShippingRegionsResolved } from 'src/app/shared/models/IApiResponse';
import { ProfileService } from '../services/Profile.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShippingRegionsResolverService implements Resolve<IShippingRegionsResolved> {

  constructor(
    private profileService: ProfileService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IShippingRegionsResolved> {
    return this.profileService.getShippingRegions()
      .pipe(
        map(response => ({
          shippingRegions: response,
        }))
      );
  }
}
