import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { IOrdersResolved } from 'src/app/shared/models/IApiResponse';
import { OrdersService } from '../services/orders.service';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class OrdersResolverService implements Resolve<IOrdersResolved> {

  constructor(
    private ordersService: OrdersService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrdersResolved> {
    return this.ordersService.getOrders()
      .pipe(
        map(response => response),
        catchError(error => {
          this.toastr.error('Oops, something went wrong there');
          this.router.navigateByUrl('/');
          return throwError(error);
        })
      );
  }
}
