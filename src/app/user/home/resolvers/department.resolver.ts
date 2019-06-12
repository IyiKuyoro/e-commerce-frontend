import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { IDepartmentResolved } from 'src/app/shared/models/IApiResponse';
import { map } from 'rxjs/operators';
import { DepartmentService } from '../services/Department.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentResolverService implements Resolve<IDepartmentResolved> {

  constructor(
    private departmentService: DepartmentService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDepartmentResolved> {
    return this.departmentService.getDepartments()
    .pipe(
      map(response => ({
        departments: response.rows,
      }))
    );
  }
}
