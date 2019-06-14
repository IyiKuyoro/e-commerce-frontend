import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { ProductService } from '../../products/services/Products.service';
import { IProductResolved } from 'src/app/shared/models/IApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<IProductResolved> {

  constructor(
    private productService: ProductService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductResolved> {
    return this.productService.getProducts()
      .pipe(
        map(response => ({
          products: response.rows,
          pageMeta: response.pageMeta,
        }))
      );
  }
}
