import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { FaInputComponent } from './lib/fa-input/fa-input.component';
import { InputwrapperComponent } from './lib/inputwrapper/inputwrapper.component';
import { InputelementComponent } from './lib/inputelement/inputelement.component';
import { InputRefDirective } from './lib/common/input-ref.directive';

@NgModule({
  declarations: [
    AppComponent,
    FaInputComponent,
    InputwrapperComponent,
    InputelementComponent,
    InputRefDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
