import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLocationComponent } from './add-location/add-location.component';
import { FiveDayWeatherLocationComponent } from './five-day-weather-location/five-day-weather-location.component';
import { BlockRouteService } from './shared/block-route.service';

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
