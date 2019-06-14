import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dispMobHero = false;

  constructor() {}

  ngOnInit() {
  }

  toggleHero(): void {
    this.dispMobHero = !this.dispMobHero;
  }
}
