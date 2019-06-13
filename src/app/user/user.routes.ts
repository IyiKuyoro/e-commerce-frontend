import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProductResolverService } from './home/resolvers/products.resolver';
import { LoginComponent } from './login/login.component';
import { AuthPagesGuard } from './guard/AuthPageGuard.guard';
import { DepartmentResolverService } from './home/resolvers/department.resolver';
import { ProductComponent } from './product/product.component';
import { ProductDetailsResolverService } from './product/resolvers/ProductDetails.resolver';

export const userRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      resolvedData: ProductResolverService,
      resolvedDepartments: DepartmentResolverService,
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthPagesGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthPagesGuard],
  },
  {
    path: 'product/:productId',
    component: ProductComponent,
    resolve: {
      resolvedProduct: ProductDetailsResolverService,
    }
  }
];
