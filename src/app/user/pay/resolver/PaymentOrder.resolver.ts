import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { IOrderResolved } from 'src/app/shared/models/IApiResponse';
import { PaymentOrderService } from '../services/PaymentOrder.service';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PaymentOrderResolverService implements Resolve<IOrderResolved> {
  constructor(
    private paymentOrderService: PaymentOrderService,
    private toastrService: ToastrService,
    private router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrderResolved> {
    const orderId = route.params.orderId;

    return this.paymentOrderService.getOrderDetails(orderId)
      .pipe(
        map(response => {
          if (response.order.status !== 0) {
            this.toastrService.info('That order has been paid for');
            this.router.navigateByUrl('/');
          }
          return { orderShortDetails: response };
        }),
        catchError((error) => {
          this.toastrService.error('Sorry, could not find that order');
          this.router.navigateByUrl('/');
          return throwError(error);
        })
      );
  }
}
