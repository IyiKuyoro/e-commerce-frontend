import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/IApiResponse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: IOrder[];

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.orders = this.route.snapshot.data.resolvedOrders.orders;
  }

  comingSoon() {
    this.toastr.info('This feature is coming soon');
  }

}
