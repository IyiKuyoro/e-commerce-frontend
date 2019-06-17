import { Component, OnInit } from '@angular/core';

import { CartService } from '../../services/Cart.Service';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.scss']
})
export class ShoppingBagComponent implements OnInit {
  public itemCount;
  public totalPrice;

  constructor(
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.cartService.totalPrice.subscribe((cost: number) => {
      this.totalPrice = cost;
    });

    this.cartService.itemCount.subscribe((count: number) => {
      this.itemCount = count;
    });
  }

}
