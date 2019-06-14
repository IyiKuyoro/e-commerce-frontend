import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import ICustomer from '../models/ICustomer';
import IApiResponse from '../models/IApiResponse';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string) {
    const url = `${environment.backendUrl}/customers/login`;

    return this.http.post(url, {
      email,
      password,
    })
    .pipe(
      tap(this.saveUser),
    );
  }

  register(name: string, email: string, password: string) {
    const url = `${environment.backendUrl}/customers`;

    return this.http.post(url, {
      name,
      email,
      password,
    })
    .pipe(
      tap(this.saveUser),
    );
  }

  logOut() {
    localStorage.clear();
  }

  private saveUser(res: IApiResponse) {
    if (res.success) {
      const user: ICustomer = {};
      let accessToken: string;

      user.customer_id = res.customer.schema.customer_id;
      user.name = res.customer.schema.name;
      user.email = res.customer.schema.email;
      accessToken = res.accessToken;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
    }
  }

  checkAuthentication() {
    const user = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');

    if (user) {
      return {
        user,
        accessToken,
      };
    } else {
      return null;
    }
  }

  socialAuth(media: string, code: string, scope: string) {
    const url = `${environment.backendUrl}/auth/${media}/callback?code=${code}&scope=${scope}`;

    console.log(url);

    return this.http.get<IApiResponse>(url)
      .pipe(
        tap(this.saveUser),
      );
  }

  handleError(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError(error.message);
  }
}
