import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProductResolverService } from './home/resolvers/products.resolver';
import { LoginComponent } from './login/login.component';
import { AuthPagesGuard } from './guard/AuthPageGuard.guard';
import { DepartmentResolverService } from './home/resolvers/department.resolver';
import { ProductComponent } from './product/product.component';
import { ProductDetailsResolverService } from './product/resolvers/ProductDetails.resolver';
import { ProductsComponent } from './products/products.component';
import { SearchedProductsComponent } from './searched-products/searched-products.component';
import { ProductSearchResolverService } from './searched-products/resolver/SearchProducts.resolver';
import { NotfoundComponent } from './notfound/notfound.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PayComponent } from './pay/pay.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
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
      },
      {
        path: 'search/:searchText',
        component: SearchedProductsComponent,
        resolve: {
          resolvedProducts: ProductSearchResolverService
        }
      },
      {
        path: 'shoppingCart',
        component: ShoppingCartComponent,
      },
      {
        path: 'pay',
        component: PayComponent
      },
      {
        path: '',
        component: ProductsComponent,
        resolve: {
          resolvedData: ProductResolverService,
          resolvedDepartments: DepartmentResolverService,
        },
      },
      {
        path: '**',
        component: NotfoundComponent,
      },
    ],
  }
];
