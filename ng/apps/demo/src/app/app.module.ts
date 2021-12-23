import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ListComponent} from './convoluted/list/list.component';
import {FormComponent} from './convoluted/form/form.component';
import {DetailComponent} from './convoluted/detail/detail.component';
import {ConvolutedRepository} from './convoluted/convoluted.repository';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DeathValleyModule} from '@m410/death-valley';
import {HttpClientModule} from "@angular/common/http";
import {appRoutes} from "./app.routing";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FormComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    DeathValleyModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ConvolutedRepository],
  bootstrap: [AppComponent],
})
export class AppModule {
}
