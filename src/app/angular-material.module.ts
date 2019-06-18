import { NgModule } from '@angular/core';
import { MatSidenavModule, MatListModule, MatMenuModule, MatRadioModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
  ],
  exports: [
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
  ]
})
export class AngularMaterialModule { }
