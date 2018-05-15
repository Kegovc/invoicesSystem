import { CustomHttpService } from './custom-http.service';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Http } from '@angular/http';


@Injectable()
export class UserService {

  constructor(
    private cHttp: CustomHttpService,
    private http: Http
  ) { }

  login(data: any) {
    return this.http.post(`${environment.api}login`, data)
    .map(response => response.json())
    .toPromise();
  }
  json2Get(data: any): string {
    return `${JSON.stringify(data)}`.replace(/{/g, '').replace(/}/g, '').replace(/"/g, '').replace(/:/g, '=').replace(/,/g, '&');
  }
}
