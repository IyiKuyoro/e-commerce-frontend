import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile/services/Profile.service';
import { CartService } from 'src/app/shared/services/Cart.Service';
import { TaxService } from './service/Tax.service';
import IApiResponse, { IShipping, ITax } from 'src/app/shared/models/IApiResponse';
import { ShippingService } from './service/Shipping.service';
import { OrderService } from './service/Order.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  itemCount: number;
  itemCost: number;
  address: string;
  tax: number;
  taxInfo: ITax;
  shippingRegionId: number;
  shippingTypes: IShipping[];
  shipping: number;
  shippingCost: number;

  constructor(
    private cartService: CartService,
    private profileService: ProfileService,
    private taxService: TaxService,
    private shippingService: ShippingService,
    private orderService: OrderService,
    private toastrService: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.cartService.itemCount.subscribe((value) => {
      this.itemCount = value;
    });
    this.profileService.getUserInfo().subscribe((userInfo: any) => {
      this.address = `${userInfo.address_1}, ${userInfo.city}, ${userInfo.region}, ${userInfo.country}`;
      this.shippingRegionId = userInfo.shipping_region_id;
      this.getShippingTypes();
    });
    this.cartService.totalPrice.subscribe((value) => {
      this.itemCost = value;
    });
    this.computeTax();
  }

  computeTax() {
    this.taxService.getTax()
      .subscribe((res: IApiResponse) => {
        this.taxInfo = res.tax[0];
        this.tax = this.itemCost * (res.tax[0].tax_percentage / 100);
      });
  }

  getShippingTypes() {
    this.shippingService.getShippingTypes(this.shippingRegionId).subscribe((res: IApiResponse) => {
      this.shippingTypes = res.shipping;
      this.shipping = res.shipping[0].shipping_id;
      this.shippingCost = res.shipping[0].shipping_cost;
    });
  }

  onChangeShipping() {
    const shippingInfo = this.shippingTypes.find((value) => {
      return value.shipping_id === +this.shipping;
    });
    this.shippingCost = shippingInfo.shipping_cost;
  }

  onSubmit() {
    this.orderService.createOrder(
      this.shipping.toString(),
      this.taxInfo.tax_id.toString(),
    ).subscribe((res: IApiResponse) => {
      this.cartService.clearCart();
      this.router.navigateByUrl(`/pay/${res.orderId}`);
    }, () => {
      this.toastrService.error('Could not create that order at this time.');
    });
  }

  totalCost() {
    return this.itemCost + this.tax + +this.shippingCost;
  }
}
