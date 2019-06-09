import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { GlobalService } from './shared/services/Global.Service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private globalService: GlobalService,
  ) {}

  ngOnInit() {
    this.globalService.openNav.subscribe((newValue) => {
      if (newValue === true) {
        this.sidenav.open();
      } else {
        this.sidenav.close();
      }
    });
  }

  closeSideNav() {
    this.globalService.changeSideNav(false);
  }

}
