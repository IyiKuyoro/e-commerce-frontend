import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
  ],
  exports: [],
  declarations: [HomeComponent],
  providers: [],
})
export class UserModule { }
