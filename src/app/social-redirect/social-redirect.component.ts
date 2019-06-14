import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/Auth.Service';

@Component({
  selector: 'app-social-redirect',
  templateUrl: './social-redirect.component.html',
  styleUrls: ['./social-redirect.component.scss']
})
export class SocialRedirectComponent implements OnInit {
  authCode: string;
  scope: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    // Acquire the social auth code and send it to the backend for authentication
    this.route.queryParams.subscribe((params) => {
      if (params.code) {
        this.authCode = params.code;
        this.scope = params.scope;
        console.log(this.authCode);
        console.log(this.scope);
        this.authService.socialAuth('google', this.authCode, this.scope)
          .subscribe((res) => {
            if (res.success) {
              this.router.navigate(['/']);
            } else {
              this.router.navigateByUrl('/login?socialAuth=failure');
            }
          });
      } else {
        this.router.navigateByUrl('/login?socialAuth=failure');
      }
    });
  }

}
