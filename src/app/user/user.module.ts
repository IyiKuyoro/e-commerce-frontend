import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ImagePipe } from '../shared/pipes/Image.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
  ],
  exports: [],
  declarations: [
    HomeComponent,
    ImagePipe,
  ],
  providers: [],
})
export class UserModule { }
