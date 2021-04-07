import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLocationComponent } from './weather-forecast/add-location/add-location.component';
import { FiveDayWeatherLocationComponent } from './weather-forecast/five-day-weather-location/five-day-weather-location.component';
import { BlockRouteService } from './core/guards/block-route.service';

const routes: Routes = [
  {
    path: 'forecast/:zipcode', 
    component: FiveDayWeatherLocationComponent, 
    canActivate:[BlockRouteService]
  },
  {path: '', component: AddLocationComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
