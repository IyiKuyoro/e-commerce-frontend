import { NgModule } from '@angular/core';
import { MatSidenavModule, MatListModule } from '@angular/material';

@NgModule({
  imports: [
    MatSidenavModule,
    MatListModule,
  ],
  exports: [
    MatSidenavModule,
    MatListModule,
  ]
})
export class AngularMaterialModule { }
