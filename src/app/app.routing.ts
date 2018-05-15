import { AccessGuard } from './shared/guards/access.guard';
import { InvoicesComponent } from './invoices/invoices.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'invoices/:rfc', component: InvoicesComponent, canActivate: [AccessGuard],
    data: {
      resource: 'todos',
// tslint:disable-next-line:indent
			permissions: ['list']
    }
  }



];

export const routing = RouterModule.forRoot(appRoutes);
