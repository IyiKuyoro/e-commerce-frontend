import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { IProductResolved } from 'src/app/shared/models/IApiResponse';
import { ProductSearchService } from '../Services/SearchProducts.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchResolverService implements Resolve<IProductResolved> {

  constructor(
    private productSearchService: ProductSearchService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductResolved> {
    const text = route.params.searchText;
    return this.productSearchService.searchProducts(text)
    .pipe(
      map(response => ({
        products: response.rows,
        pageMeta: response.pageMeta,
      }))
    );
  }
}
