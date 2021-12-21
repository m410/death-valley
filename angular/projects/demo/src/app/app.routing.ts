import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './convoluted/list/list.component';
import { DetailComponent } from './convoluted/detail/detail.component';
import { FormComponent } from './convoluted/form/form.component';

const routes: Routes = [
  { path: 'convolute', component: ListComponent },
  { path: 'convolute/new', component: FormComponent },
  { path: 'convolute/{id}', component: DetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
