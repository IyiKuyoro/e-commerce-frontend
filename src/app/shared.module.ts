import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
  ],
  declarations: [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
  ],
  providers: [],
})
export class SharedModule { }
