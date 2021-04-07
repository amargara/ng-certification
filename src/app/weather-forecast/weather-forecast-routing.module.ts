import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockRouteGuard } from '../core/guards/block-route.guard';
import { AddLocationComponent } from './add-location/add-location.component';
import { FiveDayWeatherLocationComponent } from './five-day-weather-location/five-day-weather-location.component';


const routes: Routes = [
  {
    path: 'forecast/:zipcode', 
    component: FiveDayWeatherLocationComponent, 
    canActivate:[BlockRouteGuard]
  },
  {
    path: '', 
    component: AddLocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherForecastRoutingModule { }
