import { Routes } from '@angular/router';
import { ListComponent } from './convoluted/list/list.component';
import { DetailComponent } from './convoluted/detail/detail.component';
import { FormComponent } from './convoluted/form/form.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'convoluted', pathMatch: 'full' },
  { path: 'convoluted/new', component: FormComponent },
  { path: 'convoluted/:id', component: DetailComponent },
  { path: 'convoluted', component: ListComponent },
];
