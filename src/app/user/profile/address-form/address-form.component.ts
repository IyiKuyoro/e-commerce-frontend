import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../services/Profile.service';
import { ToastrService } from 'ngx-toastr';
import { IShippingRegion } from 'src/app/shared/models/IShippingRegion';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  addressReadonly: boolean;
  addressForm: FormGroup;
  shippingRegions: IShippingRegion[] = [];

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private toastrService: ToastrService,
  ) {
    this.addressReadonly = true;

    this.addressForm = new FormGroup({
      address1: new FormControl(
        this.route.snapshot.data.resolvedCustomer.customerInfo.address_1,
        [Validators.required, Validators.pattern(/^[^+=!@#$%^&*()]+$/)]
      ),
      address2: new FormControl(
        this.route.snapshot.data.resolvedCustomer.customerInfo.address_2,
        [Validators.pattern(/^[^+=!@#$%^&*()]+$/)]
      ),
      city: new FormControl(
        this.route.snapshot.data.resolvedCustomer.customerInfo.city,
        [Validators.required, Validators.pattern(/^[^+=!@#$%^&*()]+$/)]
      ),
      region: new FormControl(
        this.route.snapshot.data.resolvedCustomer.customerInfo.region,
        [Validators.required, Validators.pattern(/^[^+=!@#$%^&*()]+$/)]
      ),
      postalCode: new FormControl(
        this.route.snapshot.data.resolvedCustomer.customerInfo.postal_code,
        [Validators.required, Validators.pattern(/^[^+=!@#$%^&*()]+$/)]
      ),
      country: new FormControl(
        this.route.snapshot.data.resolvedCustomer.customerInfo.country,
        [Validators.required, Validators.pattern(/^[^+=!@#$%^&*()]+$/)]
      ),
      shippingRegionId: new FormControl(
        this.route.snapshot.data.resolvedCustomer.customerInfo.shipping_region_id,
        [Validators.required, Validators.pattern(/^[0-9]+$/)]
      ),
    });

    const regions = this.route.snapshot.data.resolvedShippingRegions.shippingRegions;
    for (const region in regions) {
      if (regions.hasOwnProperty(region)
        && region !== 'success'
        && region !== '0') {
        this.shippingRegions.push(regions[region]);
      }
    }
  }

  ngOnInit() {
  }

  c(e: any) {
    console.log(e.target.value);
  }

  saveAddress() {
    console.log(this.addressForm);
    this.profileService.updateAddress({
      address1: this.addressForm.get('address1').value,
      address2: this.addressForm.get('address2').value,
      city: this.addressForm.get('city').value,
      region: this.addressForm.get('region').value,
      postalCode: this.addressForm.get('postalCode').value,
      country: this.addressForm.get('country').value,
      shippingRegionId: this.addressForm.get('shippingRegionId').value,
    }).subscribe(
      (res) => {
        if (res.success) {
          this.toastrService.success('Address saved!');
        } else {
          this.toastrService.error('Oops, could not save that!');
        }
      },
      () => {
        this.toastrService.error('Oops, could not save that!');
      },
    );
  }

}
