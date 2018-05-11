import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken(): string {
    return localStorage.getItem('token');
  }
  clearToken() {
    localStorage.removeItem('token');
  }
  isLogged(): boolean {
    return !!this.getToken();
  }
}
