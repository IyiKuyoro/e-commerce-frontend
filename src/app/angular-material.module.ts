import { NgModule } from '@angular/core';
import { MatSidenavModule, MatListModule, MatMenuModule, MatRadioModule } from '@angular/material';

@NgModule({
  imports: [
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
  ],
  exports: [
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
  ]
})
export class AngularMaterialModule { }
