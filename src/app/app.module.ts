import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ZipCodeComponent } from './add-location/zip-code/zip-code.component';
import { NumbersOnlyDirective } from './add-location/zip-code/numbers-only.directive';
import { AddLocationComponent } from './add-location/add-location.component';
import { WeatherLocationComponent } from './add-location/weather-location/weather-location.component';
import { FiveDayWeatherLocationComponent } from './five-day-weather-location/five-day-weather-location.component';
import { WeatherImageComponent } from './weather-image/weather-image.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, HttpClientModule ],
  declarations: [ AppComponent, ZipCodeComponent, NumbersOnlyDirective, AddLocationComponent, WeatherLocationComponent, FiveDayWeatherLocationComponent, WeatherImageComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
