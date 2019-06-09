import { Component, OnInit } from '@angular/core';
import { faTimes, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dispMobHero = false;
  faTimes = faTimes;
  faEnvelope = faEnvelope;

  constructor() { }

  ngOnInit() {
  }

  toggleHero(): void {
    this.dispMobHero = !this.dispMobHero;
  }
}
