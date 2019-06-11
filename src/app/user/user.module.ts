import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ImagePipe } from '../shared/pipes/Image.pipe';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
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
  ],
  providers: [],
})
export class UserModule { }
