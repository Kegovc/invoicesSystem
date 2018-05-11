import { InvoicesComponent } from './invoices/invoices.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'invoices', component: InvoicesComponent}



];

export const routing = RouterModule.forRoot(appRoutes);
