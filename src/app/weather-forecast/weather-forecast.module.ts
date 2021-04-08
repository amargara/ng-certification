import { NgModule } from '@angular/core';
import { FiveDayWeatherLocationComponent } from './five-day-weather-location/five-day-weather-location.component';
import { CurrentWeatherLocationComponent } from './add-location/current-weather-location/current-weather-location.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { ZipCodeComponent } from './add-location/zip-code/zip-code.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherForecastRoutingModule } from './weather-forecast-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports:
  [ 
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    WeatherForecastRoutingModule
  ],
  declarations: 
  [ 
    ZipCodeComponent, 
    AddLocationComponent, 
    CurrentWeatherLocationComponent, 
    FiveDayWeatherLocationComponent 
  ]
})
export class WeatherForecastModule { }
