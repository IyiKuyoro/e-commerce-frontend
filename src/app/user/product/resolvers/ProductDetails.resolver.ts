import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductDetailsResolved } from 'src/app/shared/models/IApiResponse';
import { ProductDetailsService } from '../services/Product.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsResolverService implements Resolve<IProductDetailsResolved> {

  constructor(
    private productDetailsService: ProductDetailsService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductDetailsResolved> {
    const productId = route.params.productId;

    return this.productDetailsService.getProductDetails(productId)
      .pipe(
        map(response => ({
          product: response
        }))
      );
  }
}
