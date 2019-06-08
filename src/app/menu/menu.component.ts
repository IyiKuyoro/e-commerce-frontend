import { Component, OnInit } from '@angular/core';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  faSearch = faSearch;
  faTimes = faTimes;
  public itemCount = 6;
  public totalPrice = 3.00;

  constructor() { }

  ngOnInit() {
  }

}
