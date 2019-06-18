import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-bio-form',
  templateUrl: './bio-form.component.html',
  styleUrls: ['./bio-form.component.scss']
})
export class BioFormComponent implements OnInit {
  bioReadonly: boolean;
  bioForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.bioReadonly = true;

    this.bioForm = new FormGroup({
      name: new FormControl(
        this.route.snapshot.data.resolvedCustomer.customerInfo.name,
        [Validators.required, Validators.pattern(/^[^+=!@#$%^&*()/0-9]+$/)]
      ),
      email: new FormControl(
        this.route.snapshot.data.resolvedCustomer.customerInfo.email,
        [Validators.required, Validators.email]
      ),
    });
  }

  ngOnInit() {
  }

}
