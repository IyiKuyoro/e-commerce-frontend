import { NgModule } from '@angular/core';
import { MatSidenavModule, MatListModule, MatMenuModule } from '@angular/material';

@NgModule({
  imports: [
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
  ],
  exports: [
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
  ]
})
export class AngularMaterialModule { }
