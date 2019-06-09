import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { ShoppingBagComponent } from './components/shopping-bag/shopping-bag.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    SearchComponent,
  ],
  declarations: [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    SearchComponent,
    ShoppingBagComponent,
  ],
  providers: [],
})
export class SharedModule { }
