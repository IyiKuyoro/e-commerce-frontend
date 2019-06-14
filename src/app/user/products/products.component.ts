import { Component, OnInit } from '@angular/core';
import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';

import IProduct from 'src/app/shared/models/IProduct';
import { IDepartment } from 'src/app/shared/models/IDepartment';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/shared/models/ICategory';
import IApiResponse from 'src/app/shared/models/IApiResponse';
import { ProductService } from './services/Products.service';
import { CategoryService } from './services/Category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: IProduct[];
  departments: IDepartment[];
  categories: ICategory[] = [];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  pages: number[];
  selectedDepartment: number;
  selectedCategory: number;
  faEnvelope = faEnvelope;
  dispMobHero = false;
  faTimes = faTimes;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.selectedDepartment = 0;
    this.selectedCategory = 0;
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
    if (+event.value === 0) {
      this.categories = [];
      this.getProducts();
    } else {
      this.getCategories(+event.value);
    }
    this.selectedDepartment = event.value;
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.value;
    this.getProductsByCategory(+event.value);
  }

  private getCategories(departmentId: number) {
    this.categoryService.getCategories(departmentId)
        .subscribe((res: IApiResponse) => {
          this.categories = res.rows;
        });
  }

  changePage(page: number) {
    if (+this.selectedDepartment === 0) {
      this.getProducts(page.toString());
    } else if (+this.selectedCategory !== 0) {
      this.getProductsByCategory(this.selectedCategory, page.toString());
    } else {
      this.getProductsByDepartment(this.selectedDepartment, page.toString());
    }
  }

  private getProducts(page: string = '1') {
    this.productService.getProducts(page)
        .subscribe((response: IApiResponse) => {
          this.renderProducts(response);
        });
  }

  private getProductsByDepartment(departmentId: number, page: string = '1') {
    this.productService.getProductsByDepartment(departmentId, page)
        .subscribe((response: IApiResponse) => {
          this.renderProducts(response);
        });
  }

  private getProductsByCategory(categoryId: number, page: string = '1') {
    this.productService.getProductsByCategory(categoryId, page)
        .subscribe((res: IApiResponse) => {
          this.renderProducts(res);
        });
  }

  private renderProducts(response: IApiResponse) {
    this.currentPage = response.pageMeta.page;
    this.totalPages = response.pageMeta.totalPages;
    this.totalProducts = response.pageMeta.totalProducts;
    this.products = response.rows;
    this.computePages();
  }
}
