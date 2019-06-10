import { Component, OnInit } from '@angular/core';
import { faTimes, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from './services/Products.service';
import IProduct from 'src/app/shared/models/IProduct';
import { ActivatedRoute } from '@angular/router';
import IApiResponse from 'src/app/shared/models/IApiResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dispMobHero = false;
  products: IProduct[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  pages: number[];
  faTimes = faTimes;
  faEnvelope = faEnvelope;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.products = this.route.snapshot.data.resolvedData.products;
    this.currentPage = this.route.snapshot.data.resolvedData.pageMeta.page;
    this.totalPages = this.route.snapshot.data.resolvedData.pageMeta.totalPages;
    this.totalProducts = this.route.snapshot.data.resolvedData.pageMeta.totalProducts;
    this.computePages();
  }

  toggleHero(): void {
    this.dispMobHero = !this.dispMobHero;
  }

  changePage(page: number) {
    this.productService.getProducts(page.toString(), '10', '50').subscribe((response: IApiResponse) => {
      this.products = response.rows;
      this.totalPages = response.pageMeta.totalPages;
      this.totalProducts = response.pageMeta.totalProducts;
      this.currentPage = response.pageMeta.page;
      this.computePages();
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
}
