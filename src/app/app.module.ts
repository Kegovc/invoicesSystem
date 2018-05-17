import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule, ModalModule, AlertModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { NavsComponent } from './navs/navs.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { CustomHttpService } from './shared/services/custom-http.service';
import { AuthService } from './shared/services/auth.service';
import { AccessGuard } from './shared/guards/access.guard';
import { SignInGuard } from './shared/guards/sign-in.guard';
import { InvoiceService } from './shared/services/invoice.service';
import { UserService } from './shared/services/user.service';



// tslint:disable-next-line:import-blacklist
import 'rxjs';
import { ValidatedInputDirective } from './shared/directives/validated-input.directive';
import { LogonComponent } from './logon/logon.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavsComponent,
    InvoicesComponent,
    ValidatedInputDirective,
    LogonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AlertModule.forRoot(),
    AngularFontAwesomeModule,
  ],
  providers: [
    CustomHttpService,
    AuthService,
    UserService,
    InvoiceService,
    AccessGuard,
    SignInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
