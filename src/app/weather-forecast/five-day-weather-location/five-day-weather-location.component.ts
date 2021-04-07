import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../../core/data.service';
import { Weather } from '../../shared/weather-location.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-five-day-weather-location',
  templateUrl: './five-day-weather-location.component.html',
})
export class FiveDayWeatherLocationComponent implements OnInit, OnDestroy {

  zipCode: string;
  cityName: string;
  data: Array<Weather>;
  noResults: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
  loading: boolean = true;

  constructor(
    private location: Location,
    private route:ActivatedRoute,
    private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.zipCode = this.route.snapshot.params['zipcode'];
    this.getForecastByZipCode();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getForecastByZipCode(){
    this.dataService.callFiveDayForecast(this.zipCode)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data: Array<Weather>) => {
        if (data.length > 0){
          this.cityName = data[0].name;
          this.data = data;
          this.loading = false;
        }else{
          this.noResults = true;
          this.loading = false;
        }
      });
  }

  goBack(){
    this.location.back();
  }

}
