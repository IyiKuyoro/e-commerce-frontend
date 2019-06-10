import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductResolverService } from './home/resolvers/products.resolver';

export const userRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { resolvedData: ProductResolverService }
  },
];
