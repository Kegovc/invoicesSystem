import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class InvoiceService {

  constructor(
    private http: Http
  ) { }

  getFiles(RFC: string) {
    return this.http.get(`${environment.api}getFilesInFolder/${RFC}`)
    .map(response => response.json())
    .toPromise();
  }
}
