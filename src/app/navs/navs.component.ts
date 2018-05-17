import { AuthService } from './../shared/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';

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
    // tslint:disable-next-line:quotemark
    let rfc = "";
    authService.checkLogin.next(authService.isLoggedIn());
    const token = authService.getToken();
    if (token != null) {
      const a_token = token.split('/');
      rfc = ` RFC: ${a_token[1]}`;
    }
    if (environment.debug ) { console.log('token', token); }
    if (environment.debug ) { console.log('rfc', rfc); }
    authService.checkRFC.next(rfc);
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
