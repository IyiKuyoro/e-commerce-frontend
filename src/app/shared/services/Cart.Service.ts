import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, mergeMap } from 'rxjs/operators';

import IApiResponse, { ICartProduct } from '../models/IApiResponse';
import { environment } from 'src/environments/environment';

@Injectable()
export class CartService {
  itemCount = new BehaviorSubject<number>(0);
  totalPrice = new BehaviorSubject<number>(0.00);
  products = new BehaviorSubject<ICartProduct[]>([]);

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
          this.products.next(res.products);
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

  updateProduct(itemId: number, quantity: number): Observable<IApiResponse> {
    const url = `${environment.backendUrl}/shoppingcart/update/${itemId}`;
    const totPriceUrl = `${environment.backendUrl}/shoppingcart/totalAmount`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/plain',
      }),
      withCredentials: true,
    };

    return this.http.put<IApiResponse>(
      url,
      JSON.stringify({ quantity }),
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

  deleteProduct(itemId: number): Observable<IApiResponse> {
    const url = `${environment.backendUrl}/shoppingcart/removeProduct/${itemId}`;
    const totPriceUrl = `${environment.backendUrl}/shoppingcart/totalAmount`;

    const httpOptions = {
      withCredentials: true,
    };

    return this.http.delete<IApiResponse>(
      url,
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

  clearCart() {
    this.itemCount.next(0);
    this.totalPrice.next(0.00);
    this.products.next([]);
  }

  private changeSummary = (res: IApiResponse) => {
    if (res.success) {
      this.itemCount.next(res.products.length);
      this.products.next(res.products);
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
