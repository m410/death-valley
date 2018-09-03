import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './convoluted/list/list.component';
import { FormComponent } from './convoluted/form/form.component';
import { DetailComponent } from './convoluted/detail/detail.component';
import {ConvolutedRepository} from "./convoluted/convoluted.repository";

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FormComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ConvolutedRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
