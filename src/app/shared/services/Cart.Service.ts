import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import IApiResponse from '../models/IApiResponse';
import { environment } from 'src/environments/environment';
import { catchError, tap, mergeMap } from 'rxjs/operators';

@Injectable()
export class CartService {
  itemCount = new BehaviorSubject<number>(0);
  totalPrice = new BehaviorSubject<number>(0.00);

  constructor(
    private http: HttpClient,
  ) {
    this.getProducts();
    this.getCartId().subscribe();
  }

  private getCartId(): Observable<IApiResponse> {
    const url = `${environment.backendUrl}/shoppingcart/generateUniqueId`;

    return this.http.get<IApiResponse>(url, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  private getProducts() {
    const url = `${environment.backendUrl}/shoppingcart`;
    const totPriceUrl = `${environment.backendUrl}/shoppingcart/totalAmount`;

    this.http.get<IApiResponse>(url, { withCredentials: true })
      .pipe(
        tap((res: IApiResponse) => {
          this.itemCount.next(res.products.length);
        }),
        mergeMap(() => this.http.get<IApiResponse>(
          totPriceUrl,
          { withCredentials: true },
        )),
        tap((res: IApiResponse) => {
          this.totalPrice.next(res.totalAmount);
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  addProduct(productId: number): Observable<IApiResponse> {
    const url = `${environment.backendUrl}/shoppingcart/add`;
    const totPriceUrl = `${environment.backendUrl}/shoppingcart/totalAmount`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/plain',
      }),
      withCredentials: true,
    };

    return this.http.post<IApiResponse>(
      url,
      JSON.stringify({ productId }),
      httpOptions,
    )
      .pipe(
        tap(this.changeSummary),
        mergeMap(() => this.http.get<IApiResponse>(
          totPriceUrl,
          { withCredentials: true },
        )),
        tap(this.changeTotal),
        catchError(this.handleError)
      );
  }

  private changeSummary = (res: IApiResponse) => {
    if (res.success) {
      this.itemCount.next(res.products.length);
    }
  }

  private changeTotal = (res: IApiResponse) => {
    if (res.success) {
      this.totalPrice.next(res.totalAmount);
    }
  }

  handleError(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError(error.message);
  }
}
