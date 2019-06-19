import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { GlobalService } from './shared/services/Global.Service';
import { CartService } from './shared/services/Cart.Service';
import { ProductService } from './user/products/services/Products.service';
import { AuthService } from './shared/services/Auth.Service';
import { RouterModule } from '@angular/router';
import { DepartmentService } from './user/products/services/Department.service';
import { CategoryService } from './user/products/services/Category.service';
import { ProductDetailsService } from './user/product/services/Product.service';
import { SocialRedirectComponent } from './social-redirect/social-redirect.component';
import { ProductSearchService } from './user/searched-products/Services/SearchProducts.service';
import { StripePaymentService } from './user/pay/services/StripePayment.service';
import { ProfileService } from './user/profile/services/Profile.service';
import { PaymentOrderService } from './user/pay/services/PaymentOrder.service';

@NgModule({
  declarations: [
    AppComponent,
    SocialRedirectComponent,
  ],
  imports: [
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthService,
    CartService,
    CategoryService,
    DepartmentService,
    GlobalService,
    ProductService,
    ProductDetailsService,
    ProductSearchService,
    StripePaymentService,
    ProfileService,
    PaymentOrderService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
