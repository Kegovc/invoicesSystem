import { UserService } from './shared/services/user.service';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { NavsComponent } from './navs/navs.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { CustomHttpService } from './shared/services/custom-http.service';
import { AuthService } from './shared/services/auth.service';


// tslint:disable-next-line:import-blacklist
import 'rxjs';
import { ValidatedInputDirective } from './shared/directives/validated-input.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavsComponent,
    InvoicesComponent,
    ValidatedInputDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    CustomHttpService,
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
