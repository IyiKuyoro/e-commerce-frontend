import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './user/user.module#UserModule',
  },
];
