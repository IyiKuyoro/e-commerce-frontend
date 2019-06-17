import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import IProduct from 'src/app/shared/models/IProduct';
import { CartService } from 'src/app/shared/services/Cart.Service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: IProduct;
  displayPicture: string;
  images: string[];
  discount: boolean;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.product = this.route.snapshot.data.resolvedProduct.product;

    this.images = [this.product.image, this.product.image_2];
    this.displayPicture = this.product.image;

    if (+this.product.discounted_price === 0.00) {
      this.discount = true;
    } else {
      this.discount = false;
    }
  }

  prevPics() {
    let i = this.images.indexOf(this.displayPicture);

    if (--i < 0) {
      i = this.images.length - 1;
    }

    this.displayPicture = this.images[i];
  }

  nextPics() {
    let i = this.images.indexOf(this.displayPicture);

    if (++i >= this.images.length) {
      i = 0;
    }

    this.displayPicture = this.images[i];
  }

  onAddProduct(event: any, productId: number) {
    event.stopPropagation();
    this.cartService.addProduct(productId).subscribe();
  }
}
