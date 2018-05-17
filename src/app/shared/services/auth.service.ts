import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  public checkLogin = new BehaviorSubject(false);
  public checkRFC = new BehaviorSubject('');
  constructor() { }

  setToken(token: string) {
    const a_token = token.split('/');
    const rfc = a_token[1];
    this.checkLogin.next(true);
    this.checkRFC.next(` RFC: ${rfc}`);
    localStorage.setItem('token', token);
  }
  getToken(): string {
    return localStorage.getItem('token');
  }
  clearToken() {
    this.checkLogin.next(false);
    this.checkRFC.next('');
    localStorage.removeItem('token');
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
