import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/core/data.service';
import { Weather } from '../../../shared/weather-location.model';
import { BlockRouteGuard } from 'src/app/core/guards/block-route.guard';

@Component({
  selector: 'app-current-weather-location',
  templateUrl: './current-weather-location.component.html',
  styles: ['.link{ cursor: pointer; }']
})
export class CurrentWeatherLocationComponent implements OnInit, OnDestroy {

  @Input() zipCode: string;
  data:Weather;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly dataService: DataService,
    private readonly router: Router,
    private readonly blockRouteGuard: BlockRouteGuard
    ) { }

  ngOnInit(): void {
    this.getWeatherByZipCode();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getWeatherByZipCode(){
    this.dataService.callWeatherByZipCode(this.zipCode)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data: Weather) => {
        if (Object.keys(data).length > 0){
          this.data = data;
          this.dataService.zipError$.next(false);
        }else{
          this.dataService.removeZipCode(this.zipCode);
        }
      }
    );
  }

  removeItem(){
    this.dataService.removeZipCode(this.zipCode);
  }

  goToForecast(){
    this.blockRouteGuard.allowingRoute(true);
    this.router.navigate(["/forecast", this.zipCode]);
  }

}
