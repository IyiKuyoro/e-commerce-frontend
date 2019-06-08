import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
  ],
  declarations: [
    HeaderComponent,
    MenuComponent,
  ],
  providers: [],
})
export class SharedModule { }
