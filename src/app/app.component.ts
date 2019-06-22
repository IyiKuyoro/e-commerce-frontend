import { Component, OnInit } from '@angular/core';
import { CartService } from './shared/services/Cart.Service';
import IApiResponse from './shared/models/IApiResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit() {
    let cartId = localStorage.getItem('cartId');

    if (!cartId) {
      this.cartService.getCartId().subscribe((res: IApiResponse) => {
        cartId = res.cartId;

        localStorage.setItem('cartId', cartId);

      });
    }
  }
}
