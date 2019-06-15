import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import IProduct from 'src/app/shared/models/IProduct';
import { ProductSearchService, AllWords } from './Services/SearchProducts.service';
import IApiResponse from 'src/app/shared/models/IApiResponse';

@Component({
  selector: 'app-searched-products',
  templateUrl: './searched-products.component.html',
  styleUrls: ['./searched-products.component.scss']
})
export class SearchedProductsComponent implements OnInit {
  products: IProduct[];
  currentPage: number;
  totalProducts: number;
  totalPages: number;
  pages: number[];
  text: string;

  constructor(
    private route: ActivatedRoute,
    private productSearchService: ProductSearchService,
    private router: Router,
  ) {
    this.text = this.route.snapshot.params.searchText;
    this.assignValues(
      this.route.snapshot.data.resolvedProducts.products,
      this.route.snapshot.data.resolvedProducts.pageMeta.page,
      this.route.snapshot.data.resolvedProducts.pageMeta.totalPages,
      this.route.snapshot.data.resolvedProducts.pageMeta.totalProducts,
    );
    this.computePages();
  }

  private assignValues(products: IProduct[], curPage: number, totPage: number, totProd: number) {
    this.products = products;
    this.currentPage = curPage;
    this.totalPages = totPage;
    this.totalProducts = totProd;
  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.text = param.searchText;
      this.productSearchService.searchProducts(param.searchText)
        .subscribe((res: IApiResponse) => {
          if (res.success) {
            this.assignValues(
              res.rows,
              res.pageMeta.page,
              res.pageMeta.totalPages,
              res.pageMeta.totalProducts,
            );
            if (res.rows.length === 0) {
              this.router.navigateByUrl('/notfound');
            }
          } else {
            this.assignValues([], 0, 0, 0);
          }
          this.computePages();
        });
    });
  }

  computePages() {
    let startPage = this.currentPage;
    const lastPage = +this.currentPage + 3;
    this.pages = [];

    if (this.currentPage > 1) {
      startPage = this.currentPage - 1;
    }

    for (let i = startPage; i <= this.totalPages; i++) {
      if (i <= lastPage) {
        this.pages.push(i);
      } else {
        break;
      }
    }
  }

  changePage(page: string = '1') {
    this.productSearchService.searchProducts(
      this.text,
      AllWords.on,
      page,
    ).subscribe((res: IApiResponse) => {
      if (res.success) {
        this.assignValues(
          res.rows,
          res.pageMeta.page,
          res.pageMeta.totalPages,
          res.pageMeta.totalProducts,
        );

        if (res.rows.length === 0) {
          this.router.navigateByUrl('/notfound');
        }
      }
      this.computePages();
    });
  }

  viewProduct(productId: number) {
    this.router.navigateByUrl(`/product/${productId}`);
  }
}
