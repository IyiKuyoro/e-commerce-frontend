import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ImagePipe } from '../shared/pipes/Image.pipe';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ProductComponent } from './product/product.component';
import { GoogleAuthComponent } from './google-auth/google-auth.component';
import { ProductsComponent } from './products/products.component';
import { SearchedProductsComponent } from './searched-products/searched-products.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PayComponent } from './pay/pay.component';
import { ProfileComponent } from './profile/profile.component';
import { BioFormComponent } from './profile/bio-form/bio-form.component';
import { AddressFormComponent } from './profile/address-form/address-form.component';
import { OrderComponent } from './order/order.component';
import { TaxService } from './order/service/Tax.service';
import { ShippingService } from './order/service/Shipping.service';
import { OrderService } from './order/service/Order.service';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    SharedModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [],
  declarations: [
    HomeComponent,
    ImagePipe,
    RegisterComponent,
    LoginComponent,
    ProductComponent,
    GoogleAuthComponent,
    ProductsComponent,
    SearchedProductsComponent,
    NotfoundComponent,
    ShoppingCartComponent,
    PayComponent,
    ProfileComponent,
    BioFormComponent,
    AddressFormComponent,
    OrderComponent,
  ],
  providers: [
    TaxService,
    ShippingService,
    OrderService,
  ],
})
export class UserModule { }
