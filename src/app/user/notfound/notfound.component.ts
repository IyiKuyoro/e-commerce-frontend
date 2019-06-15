import { Component, OnInit } from '@angular/core';
import IProduct from 'src/app/shared/models/IProduct';
import { ProductService } from '../products/services/Products.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {
  products: IProduct[];

  constructor(
    private productsService: ProductService,
  ) {
    this.productsService.getProducts(
      '1',
      '8',
      '10'
    );
  }

  ngOnInit() {
  }

}
