import { Component, OnInit } from '@angular/core';
import { StateKey } from '@angular/platform-browser';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from './../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { debug } from 'util';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public data: any = {
    rfc: 'vico940131sk8'
};

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
  }
  doLongin() {
    if (environment.debug) { console.log( 'DEBUG : ', this.data ); }

    const _success: boolean = this.doValidate();

    if ( _success ) {
      this.router.navigate(['/invoices']);
    }

  }

  doValidate() {
    this.userService.login(this.data)
    .then(response => {
      console.log('DEBUG : ', response);
      return true;
    })
    .catch(error => {
      console.error('Error : ', error);
      return false;
    });
    return false;
  }
}
