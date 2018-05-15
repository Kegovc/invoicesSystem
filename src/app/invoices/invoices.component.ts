import { InvoiceService } from './../shared/services/invoice.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  public files: any[];
  public root: string = environment.api;
  public modalRef: BsModalRef;
  public modalData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private invoiceService: InvoiceService,
    private modalService: BsModalService
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
      }
      if (environment.debug) { console.log(response); }

    })
    .catch(error => {
      console.log('Error: ', error);
    });
  }
  openModal(template: TemplateRef<any>, row: number) {
    this.modalData.modalName = this.files[row].name;
    this.modalData.modalRow = row;
    this.modalRef = this.modalService.show(template);
  }
}
