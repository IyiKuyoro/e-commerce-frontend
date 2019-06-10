import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CartService {
  itemCount = new BehaviorSubject<number>(6);
  totalPrice = new BehaviorSubject<number>(14.00);

  constructor() { }
}
