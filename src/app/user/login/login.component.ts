import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AuthService } from 'src/app/shared/services/Auth.Service';
import IApiResponse from 'src/app/shared/models/IApiResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginErrorMessage: string;
  loginForm: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      if (param.socialAuth && param.socialAuth === 'failure') {
        this.loginErrorMessage = 'Google authentication failed!';
      }
    });
  }

  onSubmit() {
    this.loading = true;

    // Log user in
    this.authService.login(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value,
    )
    .pipe(
      catchError(this.handleError)
    )
    .subscribe((res: IApiResponse) => {
      if (res.success) {
        this.router.navigate(['/']);
      } else {
        this.loginErrorMessage = res.error.message;
      }
      this.loading = false;
    });
  }

  handleError = (error: HttpErrorResponse) => {
    this.loading = false;
    this.loginErrorMessage = error.error.error.message;
    return throwError(error.message);
  }
}
