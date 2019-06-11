import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;

  constructor() {
    this.regForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern(/^[^+=!@#$%^&*()/0-9]+$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }

}
