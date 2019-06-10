import { Component, OnInit } from '@angular/core';
import { faTimes, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from './services/Products.service';
import IProduct from 'src/app/shared/models/IProduct';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dispMobHero = false;
  products: IProduct[];
  faTimes = faTimes;
  faEnvelope = faEnvelope;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.products = this.route.snapshot.data.resolvedData.products;
  }

  toggleHero(): void {
    this.dispMobHero = !this.dispMobHero;
  }
}
