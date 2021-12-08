import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './convoluted/list/list.component';
import { FormComponent } from './convoluted/form/form.component';
import { DetailComponent } from './convoluted/detail/detail.component';
import {ConvolutedRepository} from './convoluted/convoluted.repository';
import {AppRoutingModule} from './app.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DeathValleyModule} from 'death-valley';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FormComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DeathValleyModule
  ],
  providers: [
    ConvolutedRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
