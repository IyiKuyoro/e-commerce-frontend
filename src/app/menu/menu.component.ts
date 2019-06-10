import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { GlobalService } from '../shared/services/Global.Service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  faBars = faBars;

  constructor(
    private globalService: GlobalService,
  ) { }

  ngOnInit() {
  }

  openSideNav() {
    this.globalService.changeSideNav(true);
  }
}
