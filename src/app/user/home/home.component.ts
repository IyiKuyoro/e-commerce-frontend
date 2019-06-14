import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { GlobalService } from 'src/app/shared/services/Global.Service';
import { CartService } from 'src/app/shared/services/Cart.Service';
import { AuthService } from 'src/app/shared/services/Auth.Service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  totalPrice: number;
  itemCount: number;
  userName: string;

  constructor(
    private globalService: GlobalService,
    private cartService: CartService,
    private authService: AuthService,
  ) {}

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
