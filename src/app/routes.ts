import { Routes } from '@angular/router';
import { SocialRedirectComponent } from './social-redirect/social-redirect.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './user/user.module#UserModule',
  },
  {
    path: 'google/redirect',
    component: SocialRedirectComponent,
  }
];
