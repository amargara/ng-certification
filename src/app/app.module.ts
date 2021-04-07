import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NumbersOnlyDirective } from './shared/numbers-only.directive';

@NgModule({
  imports:      
  [ 
    BrowserModule, 
    FormsModule, 
    AppRoutingModule, 
    HttpClientModule 
  ],
  declarations: 
  [ 
    AppComponent, 
    NumbersOnlyDirective, 
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
