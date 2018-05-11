import { UserService } from './shared/services/user.service';
import { BrowserModule } from '@angular/platform-browser';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavsComponent,
    InvoicesComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    CustomHttpService,
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
