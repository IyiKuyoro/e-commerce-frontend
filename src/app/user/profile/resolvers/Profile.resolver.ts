import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { ICustomerInfoResolved } from 'src/app/shared/models/IApiResponse';
import { ProfileService } from '../services/Profile.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<ICustomerInfoResolved> {

  constructor(
    private profileService: ProfileService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICustomerInfoResolved> {
    return this.profileService.getUserInfo()
      .pipe(
        map(response => ({
          customerInfo: response
        }))
      );
  }
}
