import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StripePaymentService } from './services/StripePayment.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit, AfterViewInit {
  itemCount: number;
  totalCost: number;
  address: string;
  stripe: any;
  cardElement: any;
  cardholderName: string;
  cardholderAddress: string;

  constructor(
    private toastr: ToastrService,
    private stripePaymentService: StripePaymentService,
  ) {}

  ngOnInit() {
    this.itemCount = 9;
    this.totalCost = 200.00;
    this.address = 'No 18, CAC Avenue, Irepo Estate Ikotun Lagos, Nigeria.'
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
