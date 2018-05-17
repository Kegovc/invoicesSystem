import { AuthService } from './../shared/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navs',
  templateUrl: './navs.component.html',
  styleUrls: ['./navs.component.css']
})
export class NavsComponent implements OnInit {
  public isLoggedIn: boolean;
  public rfc: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    authService.checkLogin.next(authService.isLoggedIn());
    const token = authService.getToken();
    const a_token = token.split('/');
    const rfc = a_token[1];
    authService.checkRFC.next(` RFC: ${rfc}`);
  }

  ngOnInit() {
    this.authService.checkLogin.subscribe(res => {
      this.isLoggedIn = res;
    });
    this.authService.checkRFC.subscribe(res => {
      this.rfc = res;
    });
  }

  onLogon() {
    this.router.navigate(['/logon']);
  }
}
