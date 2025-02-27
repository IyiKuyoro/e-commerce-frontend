import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/Cart.Service';
import { AuthService } from '../shared/services/Auth.Service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public itemCount;
  public totalPrice;
  userName: string;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
  ) {
    this.itemCount = 0;
    this.totalPrice = 0;
  }

  ngOnInit() {
    this.cartService.totalPrice.subscribe((cost: number) => {
      this.totalPrice = cost;
    });

    this.cartService.itemCount.subscribe((count: number) => {
      this.itemCount = count;
    });
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
  }
}
