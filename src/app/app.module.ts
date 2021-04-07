import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NumbersOnlyDirective } from './shared/numbers-only.directive';
import { WeatherForecastModule } from './weather-forecast/weather-forecast.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports:      
  [ 
    BrowserModule,
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
