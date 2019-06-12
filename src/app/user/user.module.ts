import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ImagePipe } from '../shared/pipes/Image.pipe';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    SharedModule,
    UserRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [
    HomeComponent,
    ImagePipe,
    RegisterComponent,
    LoginComponent,
  ],
  providers: [],
})
export class UserModule { }
