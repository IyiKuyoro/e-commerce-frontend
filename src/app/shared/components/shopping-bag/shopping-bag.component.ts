import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.scss']
})
export class ShoppingBagComponent implements OnInit {
  public itemCount = 6;
  public totalPrice = 3.00;

  constructor() { }

  ngOnInit() {
  }

}
