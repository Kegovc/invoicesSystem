import { environment } from './../../environments/environment';
import { InvoiceService } from './../shared/services/invoice.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  public spin = false;
  public files: any[];
  public root: string = environment.api;
  public empty = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private invoiceService: InvoiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getFileInFolder(params.rfc);
    });
  }
  getFileInFolder( rfc: any) {
    this.invoiceService.getFiles(rfc)
    .then(response => {
      if (response.fun.access) {
        this.files = response.fun.ls;
        this.empty = false;
        if (environment.debug) { console.log(this.files); }
      } else {
        this.accesssElse(response.fun.execute);
      }
      if (environment.debug) { console.log(response); }
      if (this.spin) {
          let s = Date.now();
          const e = Date.now() + 1000;
          while (s < e) {
            s = Date.now();
          }
          this.spin = false;
      }

    })
    .catch(error => {
      console.log('Error: ', error);
    });
  }
  accesssElse(execute: string) {
    switch (execute) {
      case 'logon': {
        this.router.navigate(['/logon']);
        break;
      }
      case 'empty': {
        this.toastr.warning('No existen facturas por consultar');
        this.empty = true;
        this.files = [];
        break;
      }
    }
  }

  onClick(): void {
    this.spin = true;
    this.activatedRoute.params.subscribe(params => {
      this.getFileInFolder(params.rfc);
    });
  }

}
