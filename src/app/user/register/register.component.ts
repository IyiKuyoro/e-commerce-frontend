import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from 'src/app/shared/services/Auth.Service';
import IApiResponse from 'src/app/shared/models/IApiResponse';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regErrorMessage: string;
  regForm: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.regForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern(/^[^+=!@#$%^&*()/0-9]+$/)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true;

    this.authService.register(
      this.regForm.get('name').value,
      this.regForm.get('email').value,
      this.regForm.get('password').value
    )
    .pipe(
      catchError(this.handleError)
    )
    .subscribe((res: IApiResponse) => {
      if (res.success) {
        this.router.navigate(['/']);
      } else {
        this.regErrorMessage = res.error.message;
      }
      this.loading = false;
    });
  }

  handleError = (error: HttpErrorResponse) => {
    this.loading = false;
    this.regErrorMessage = error.error.error.message;
    return throwError(error.message);
  }

  validFrom() {
    return (this.regForm.valid
      && (this.regForm.get('confirmPassword').value === this.regForm.get('password').value));
  }
}
