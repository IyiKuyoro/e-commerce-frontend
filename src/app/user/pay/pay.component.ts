import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StripePaymentService } from './services/StripePayment.service';
import { CartService } from 'src/app/shared/services/Cart.Service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit, AfterViewInit {
  totalCost: number;
  stripe: any;
  cardElement: any;
  cardholderName: string;
  cardholderAddress: string;

  constructor(
    private toastr: ToastrService,
    private stripePaymentService: StripePaymentService,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.cartService.totalPrice.subscribe((value) => {
      this.totalCost = value;
    });
  }

  ngAfterViewInit() {
    this.stripe = Stripe('pk_test_Aqc0LGeHxoGYpOs62YZ6vpjm00ouE9scPx');

    const elements = this.stripe.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element');
  }

  onSubmitPayment() {
    this.stripe.createPaymentMethod('card', this.cardElement, {
      billing_details: {
        name: this.cardholderName,
        address: this.cardholderAddress,
      }
    }).then((result) => {
      if (result.error) {
        this.toastr.error(result.error.message);
      } else {
        this.stripePaymentService.confirmPayment(
          { paymentMethodId: result.paymentMethod.id }
        ).subscribe((res) => {
          // Handle Server response.
        });
      }
    });
  }
}
