import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { GlobalService } from './shared/services/Global.Service';
import { CartService } from './shared/services/Cart.Service';
import { AuthService } from './shared/services/Auth.Service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  totalPrice: number;
  itemCount: number;
  userName: string;

  constructor(
    private globalService: GlobalService,
    private cartService: CartService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.globalService.openNav.subscribe((newValue) => {
      if (newValue === true) {
        this.sidenav.open();
      } else {
        this.sidenav.close();
      }
    });

    this.cartService.totalPrice.subscribe((cost: number) => {
      this.totalPrice = cost;
    });
  }

  closeSideNav() {
    this.globalService.changeSideNav(false);
  }

  getUser() {
    const userData = this.authService.checkAuthentication();

    if (userData) {
      this.userName = JSON.parse(userData.user).name;
      return true;
    }

    return false;
  }

  onLogOut() {
    this.authService.logOut();
    this.closeSideNav();
  }
}
