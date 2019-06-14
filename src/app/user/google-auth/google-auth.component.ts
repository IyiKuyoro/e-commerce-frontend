import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss']
})
export class GoogleAuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    const url = `${environment.backendUrl}/auth/google`;

    window.location.href = url;
  }
}
