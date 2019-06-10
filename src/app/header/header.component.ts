import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/Cart.Service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public itemCount = 6;
  public totalPrice = 3.00;

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.cartService.totalPrice.subscribe((cost: number) => {
      this.totalPrice = cost;
    });

    this.cartService.itemCount.subscribe((count: number) => {
      this.itemCount = count;
    });
  }

}
