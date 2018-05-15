import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from './../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public data: any = {
    rfc: 'vico940131sp8'
  };
  public loginForm: FormGroup;
  public errorMessages: any = {};

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group( {
      rfc: ['', [Validators.required, Validators.pattern('\[a-z A-z]{3,4}[0-9]{6}[a-z A-Z 0-9]{3}')]]
    });
  }

  doLongin() {
    if (environment.debug) { console.log( 'DEBUG : ', this.data ); }

    this.doValidate();
  }

  doValidate() {
    this.showMessages();
    if (!this.loginForm.valid) {
      console.log('Error: ', this.errorMessages);
      return ;
    }
    // tslint:disable-next-line:one-line
    else {
      this.userService.login(this.data)
      .then(response => {
        console.log('DEBUG : ', response);
        if (response.fun.access) {
          this.authService.setToken(response.fun.token);
          this.router.navigate([`/invoices/${this.data['rfc']}`]);
        } else {
          this.toastr.error('RFC no valido');
        }
      })
      .catch(error => {
        console.error('Error : ', error);
      });
    }
  }



  hasError(controlName, error, force = false) {
    const control = this.loginForm.controls[controlName];
    try {
      if (!control.errors.hasOwnProperty('required')) {
        try {
          return control.errors[error] && (control.dirty || force);
        } catch (e) {
          return false;
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  }


  showMessages() {
    for (const k in this.loginForm.controls) {
      if (this.loginForm.controls.hasOwnProperty(k)) {
        this.errorMessages[k] = this.hasError(k, 'pattern', true);
      }
    }
    if (environment.debug) {
      console.log('Error: ', this.errorMessages);
    }
  }

}
