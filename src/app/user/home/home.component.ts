import { Component, OnInit } from '@angular/core';
import { faTimes, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from './services/Products.service';
import IProduct from 'src/app/shared/models/IProduct';
import { ActivatedRoute } from '@angular/router';
import IApiResponse from 'src/app/shared/models/IApiResponse';
import { IDepartment } from 'src/app/shared/models/IDepartment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dispMobHero = false;
  products: IProduct[];
  departments: IDepartment[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  pages: number[];
  selectedDepartment: number;
  faTimes = faTimes;
  faEnvelope = faEnvelope;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.selectedDepartment = 0;
    this.products = this.route.snapshot.data.resolvedData.products;
    this.currentPage = this.route.snapshot.data.resolvedData.pageMeta.page;
    this.totalPages = this.route.snapshot.data.resolvedData.pageMeta.totalPages;
    this.totalProducts = this.route.snapshot.data.resolvedData.pageMeta.totalProducts;
    this.departments = this.route.snapshot.data.resolvedDepartments.departments;
    this.computePages();
  }

  toggleHero(): void {
    this.dispMobHero = !this.dispMobHero;
  }

  changePage(page: number) {
    if (+this.selectedDepartment === 0) {
      this.productService.getProducts(page.toString()).subscribe((response: IApiResponse) => {
        this.products = response.rows;
        this.totalPages = response.pageMeta.totalPages;
        this.totalProducts = response.pageMeta.totalProducts;
        this.currentPage = response.pageMeta.page;
        this.computePages();
      });
    } else {
        this.productService.getProductsByDepartment(
          this.selectedDepartment,
          page.toString(),
        ).subscribe((response: IApiResponse) => {
          this.products = response.rows;
          this.totalPages = response.pageMeta.totalPages;
          this.totalProducts = response.pageMeta.totalProducts;
          this.currentPage = response.pageMeta.page;
          this.computePages();
        });
    }
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

  onDepartmentChange(event: any) {
    this.selectedDepartment = event.value;
    if (+event.value !== 0) {
      this.productService.getProductsByDepartment(event.value)
        .subscribe((response: IApiResponse) => {
          this.currentPage = response.pageMeta.page;
          this.totalPages = response.pageMeta.totalPages;
          this.totalProducts = response.pageMeta.totalProducts;
          this.products = response.rows;

          this.computePages();
        });
    } else {
      this.productService.getProducts()
        .subscribe((response: IApiResponse) => {
          this.currentPage = response.pageMeta.page;
          this.totalPages = response.pageMeta.totalPages;
          this.totalProducts = response.pageMeta.totalProducts;
          this.products = response.rows;

          this.computePages();
        });
    }
  }
}
