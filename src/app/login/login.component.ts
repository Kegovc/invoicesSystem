import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from './../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public data: any = {
    rfc: 'vico940131sk8'
  };
  public loginForm: FormGroup;
  public errorMessages: any = {};

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.formBuilder.group( {
      key: ['', Validators.required],
      rfc: ['', [Validators.required, Validators.pattern('\[a-zA-z]{3,4}')]]
    });
  }

  doLongin() {
    if (environment.debug) { console.log( 'DEBUG : ', this.data ); }

    const _success: boolean = this.doValidate();

    if ( _success ) {
      this.router.navigate(['/invoices']);
    }

  }

  hasError(controlName, error, force = false) {
    const control = this.loginForm.controls[controlName];

    try {
      return control.errors[error] && (control.dirty || force);
    } catch (e) {
      return false;
    }
  }


  showMessages() {
    for (const k in this.loginForm.controls) {
      if (this.loginForm.controls.hasOwnProperty(k)) {
        this.errorMessages[k] = this.hasError(k, 'required', true);
      }
    }
  }


  doValidate() {

    console.log('Form: ', this.loginForm);
    this.showMessages();
    if (!this.loginForm.valid) {
      console.log('Error: ', this.errorMessages);
      return;
    }
    // tslint:disable-next-line:one-line
    else {
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
}
