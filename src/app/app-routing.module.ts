import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLocationComponent } from './add-location/add-location.component';
import { FiveDayWeatherLocationComponent } from './five-day-weather-location/five-day-weather-location.component';

const routes: Routes = [
  {path: 'forecast/:zipcode', component: FiveDayWeatherLocationComponent},
  {path: '', component: AddLocationComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
