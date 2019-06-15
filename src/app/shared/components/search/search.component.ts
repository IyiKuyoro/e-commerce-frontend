import { Component, OnInit, ViewChild } from '@angular/core';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/Global.Service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;
  faTimes = faTimes;
  searchText: string;

  constructor(
    private globalService: GlobalService,
    private router: Router,
  ) {
    this.searchText = '';
  }

  ngOnInit() {
  }

  onChange() {
    this.router.navigateByUrl(`/search/${this.searchText}`);
    this.globalService.changeSideNav(false);
  }

  clearBox() {
    this.searchText = '';
  }
}
