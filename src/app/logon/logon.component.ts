import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
