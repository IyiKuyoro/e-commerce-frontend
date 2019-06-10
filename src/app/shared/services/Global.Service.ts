import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GlobalService {
  private openSideNavSource = new BehaviorSubject<boolean>(false);
  openNav = this.openSideNavSource.asObservable();

  constructor() { }

  changeSideNav(newValue: boolean) {
    this.openSideNavSource.next(newValue);
  }
}
