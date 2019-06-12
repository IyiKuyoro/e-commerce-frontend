import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { ShoppingBagComponent } from './components/shopping-bag/shopping-bag.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule,
    AngularMaterialModule,
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    FontAwesomeModule,
    SearchComponent,
    ShoppingBagComponent,
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
