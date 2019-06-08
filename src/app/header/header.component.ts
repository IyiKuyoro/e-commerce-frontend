import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public itemCount = 6;
  public totalPrice = 3.00;

  constructor() { }

  ngOnInit() {
  }

}
