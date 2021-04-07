import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLocationComponent } from './weather-forecast/add-location/add-location.component';
import { FiveDayWeatherLocationComponent } from './weather-forecast/five-day-weather-location/five-day-weather-location.component';
import { BlockRouteGuard } from './core/guards/block-route.guard';

const routes: Routes = [
  {
    path: 'forecast/:zipcode', 
    component: FiveDayWeatherLocationComponent, 
    canActivate:[BlockRouteGuard]
  },
  {path: '', component: AddLocationComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
