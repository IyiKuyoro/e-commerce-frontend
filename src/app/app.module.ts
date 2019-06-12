import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { GlobalService } from './shared/services/Global.Service';
import { CartService } from './shared/services/Cart.Service';
import { ProductService } from './user/home/services/Products.service';
import { AuthService } from './shared/services/Auth.Service';
import { RouterModule } from '@angular/router';
import { DepartmentService } from './user/home/services/Department.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    AuthService,
    CartService,
    DepartmentService,
    GlobalService,
    ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
