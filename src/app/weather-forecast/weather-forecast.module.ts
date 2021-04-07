import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WeatherImageComponent } from './shared/weather-image/weather-image.component';
import { FiveDayWeatherLocationComponent } from './five-day-weather-location/five-day-weather-location.component';
import { CurrentWeatherLocationComponent } from './add-location/current-weather-location/current-weather-location.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { ZipCodeComponent } from './add-location/zip-code/zip-code.component';


@NgModule({
  imports:      
  [ 
    BrowserModule, 
  ],
  declarations: 
  [ 
    ZipCodeComponent, 
    AddLocationComponent, 
    CurrentWeatherLocationComponent, 
    FiveDayWeatherLocationComponent, 
    WeatherImageComponent 
  ]
})
export class WeatherForecastModule { }
