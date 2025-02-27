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
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guard/Auth.guard';
import { ProfileResolverService } from './profile/resolvers/Profile.resolver';
import { ShippingRegionsResolverService } from './profile/resolvers/ShippingRegions.resolver';
import { OrderComponent } from './order/order.component';
import { PaymentOrderResolverService } from './pay/resolver/PaymentOrder.resolver';
import { OrdersComponent } from './orders/orders.component';
import { OrdersResolverService } from './orders/resolver/orders.resolver';

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
        canActivate: [AuthGuard],
      },
      {
        path: 'order',
        component: OrderComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuard],
        resolve: {
          resolvedOrders: OrdersResolverService,
        }
      },
      {
        path: 'pay/:orderId',
        component: PayComponent,
        canActivate: [AuthGuard],
        resolve: {
          resolvedOrder: PaymentOrderResolverService,
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        resolve: {
          resolvedCustomer: ProfileResolverService,
          resolvedShippingRegions: ShippingRegionsResolverService,
        }
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
