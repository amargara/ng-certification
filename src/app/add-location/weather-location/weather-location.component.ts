import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as EventEmitter from 'events';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BlockRouteService } from 'src/app/shared/block-route.service';
import { DataService } from 'src/app/shared/data.service';
import { Weather } from '../../shared/weather-location.model';

@Component({
  selector: 'app-weather-location',
  templateUrl: './weather-location.component.html',
  styles: ['.link{ cursor: pointer; }']
})
export class WeatherLocationComponent implements OnInit, OnDestroy {

  @Input() zipCode: string;
  data:Weather;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly dataService: DataService,
    private readonly router: Router,
    private readonly blockRouteService: BlockRouteService
    ) { }

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

  goToForecast(){
    this.blockRouteService.allowingRoute(true);
    this.router.navigate(["/forecast", this.zipCode]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
