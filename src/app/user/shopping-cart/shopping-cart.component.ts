import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { CartService } from 'src/app/shared/services/Cart.Service';
import { ICartProduct } from 'src/app/shared/models/IApiResponse';
import { AuthService } from 'src/app/shared/services/Auth.Service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  products: ICartProduct[];
  totalPrice: number;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.cartService.products.subscribe((products: ICartProduct[]) => {
      this.products = products;
    });
    this.cartService.totalPrice.subscribe((totalPrice: number) => {
      this.totalPrice = totalPrice;
    });
  }

  itemCount(): number {
    let total = 0;
    this.products.forEach((product) => {
      total += product.quantity;
    });

    return total;
  }

  addProduct(itemId: number, quantity: number) {
    this.cartService.updateProduct(itemId, (+quantity + 1)).subscribe(
      () => {},
      () => {
        this.toastr.error('Oops!, Something went wrong there.');
      }
    );
  }

  subtractProduct(itemId: number, quantity: number) {
    this.cartService.updateProduct(itemId, (+quantity - 1)).subscribe(
      () => {},
      () => {
        this.toastr.error('Oops!, Something went wrong there.');
      }
    );
  }

  removeItem(itemId: number) {
    this.cartService.deleteProduct(itemId).subscribe(
      () => {},
      () => {
        this.toastr.error('Oops!, Could not remove that item.');
      }
    );
  }

  checkAuth() {
    if (this.authService.checkAuthentication()) {
      return true;
    }

    return false;
  }
}
