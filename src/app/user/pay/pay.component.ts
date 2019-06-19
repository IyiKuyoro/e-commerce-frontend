import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StripePaymentService } from './services/StripePayment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit, AfterViewInit {
  totalCost: number;
  taxPercentage: number;
  tax: number;
  shipping: number;
  stripe: any;
  cardElement: any;
  cardholderName: string;
  cardholderAddress: string;
  formError: string;

  constructor(
    private toastr: ToastrService,
    private stripePaymentService: StripePaymentService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.formError = '';
  }

  ngOnInit() {
    this.totalCost = this.route.snapshot.data.resolvedOrder.orderShortDetails.order.total_amount;
    this.taxPercentage = this.route.snapshot.data.resolvedOrder.orderShortDetails.order.tax_percentage;
    this.tax = this.totalCost * (this.taxPercentage / 100);
    this.shipping = this.route.snapshot.data.resolvedOrder.orderShortDetails.order.shipping_cost;
  }

  ngAfterViewInit() {
    this.stripe = Stripe(environment.stipePK);

    const elements = this.stripe.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element');
  }

  grandTotal() {
    return +this.totalCost + +this.tax + +this.shipping;
  }

  onSubmitPayment() {
    this.stripe.createPaymentMethod('card', this.cardElement, {
      billing_details: {
        name: this.cardholderName,
      }
    }).then((result) => {
      if (result.error) {
        this.toastr.error(result.error.message);
      } else {
        this.stripePaymentService.confirmPayment(
          {
            paymentMethodId: result.paymentMethod.id,
            orderId: this.route.snapshot.data.resolvedOrder.orderShortDetails.order.order_id,
          }
        ).subscribe(
          this.handleServerResponse,
          (error) => {
            this.toastr.error(error.message);
          }
        );
      }
    });
  }

  handleServerResponse = (response: any) => {
    if (response.stripeResponse.error) {
      this.toastr.error(response.stripeResponse.error.message);
    } else if (response.stripeResponse.requires_action) {
      this.stripe.handleCardAction(
        response.stripeResponse.payment_intent_client_secret
      ).then((result) => {
        if (result.error) {
          this.formError = result.error.message;
        } else {
          this.stripePaymentService.confirmPayment(
            {
              orderId: this.route.snapshot.data.resolvedOrder.orderShortDetails.order.order_id,
              paymentIntentId: result.paymentIntent.id,
            }
          ).subscribe(
            this.handleServerResponse,
            (error) => {
              this.toastr.error(error.error.error.message);
            }
          );
        }
      });
    } else {
      this.router.navigateByUrl('/');
      this.toastr.success('Thanks for completing your order');
    }
  }
}
