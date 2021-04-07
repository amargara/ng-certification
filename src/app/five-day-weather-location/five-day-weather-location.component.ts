import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../shared/data.service';
import { Weather } from '../shared/weather-location.model';

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

  constructor(
    private route:ActivatedRoute,
    private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.zipCode = this.route.snapshot.params['zipcode'];
    this.getForecastByZipCode();
  }

  getForecastByZipCode(){
    this.dataService.callFiveDayForecast(this.zipCode)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data) => {
        this.cityName = data[0].name;
        this.data = data;
      }, 
      () => this.noResults = true
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
