import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/shared/data.service';
import { Weather } from '../../shared/weather-location.model';

@Component({
  selector: 'app-weather-location',
  templateUrl: './weather-location.component.html',
})
export class WeatherLocationComponent implements OnInit, OnDestroy {

  @Input() zipCode: string;
  data:Weather;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.getWeatherByZipCode();
  }

  getWeatherByZipCode(){
    this.dataService.callWeatherByZipCode(this.zipCode)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data: Weather) => {
        this.data = data;
        this.dataService.zipError.next(false);
      }, 
      () => this.dataService.removeZipCode(this.zipCode)
    );
  }

  removeItem(){
    this.dataService.removeZipCode(this.zipCode);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
