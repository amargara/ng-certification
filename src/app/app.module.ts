import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NumbersOnlyDirective } from './shared/numbers-only.directive';
import { WeatherForecastModule } from './weather-forecast/weather-forecast.module';

@NgModule({
  imports:      
  [ 
    BrowserModule, 
    FormsModule, 
    AppRoutingModule, 
    HttpClientModule,
    WeatherForecastModule
  ],
  declarations: 
  [ 
    AppComponent, 
    NumbersOnlyDirective, 
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
