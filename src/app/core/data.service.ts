import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Weather } from '../shared/weather-location.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private zipArray$: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>([]);    
  public zipCodes$: Observable<Array<string>> = this.zipArray$.asObservable();  
  public zipError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);    
  public zipCodeError$: Observable<boolean> = this.zipError$.asObservable();   
  private zipCodesArray: Array<string>;

  constructor(private readonly http: HttpClient) { }

  public checkLocalZipCodes(): void {
    const localZipCodes: string = localStorage.getItem('zipCodes');
    this.zipCodesArray =  localZipCodes ? localZipCodes.split(',') : [];
    this.zipArray$.next(this.zipCodesArray);
  }

  public addZipCode(value: string): boolean {
    if (this.zipCodesArray.indexOf(value) < 0){
      this.zipCodesArray.push(value);
      localStorage.setItem('zipCodes', this.zipCodesArray.toString());
      this.zipArray$.next(this.zipCodesArray);
      return false;
    }else{
      return true;
    }
  }

  public removeZipCode(value: string, fromCardClose: boolean): void {
    const index = this.zipCodesArray.indexOf(value);
    if (index > -1){
      this.zipCodesArray.splice(index, 1);
      localStorage.setItem('zipCodes', this.zipCodesArray.toString());
      this.zipArray$.next(this.zipCodesArray);
      this.zipError$.next(!fromCardClose);
    }
  }

  public callWeatherByZipCode(zipCode: string): Observable< Weather | {} > {
    return this.http.get<any>(environment.APIUrl + 'weather?zip=' + zipCode + ',us&appid=' + environment.APIKey)
    .pipe(map(data => 
      {
        const weatherLocation: Weather = {
          name: data.name,
          currentConditions: data.weather[0].main.toLowerCase(),
          currentTemp: data.main.temp,
          minTemp: data.main.temp_min,
          maxTemp: data.main.temp_max,
          imgSrc: this.setImgSrc(data.weather[0].main.toLowerCase())
        };
        return weatherLocation;
      })
      , catchError(() => of({})));
  }

  public callFiveDayForecast(zipCode: string): Observable<Array<Weather> | []> {
    return this.http.get<any>(environment.APIUrl + 'forecast?zip=' + zipCode + ',us&appid=' + environment.APIKey)
    .pipe(map(data => 
      {
        const fiveDayForecast: Array<Weather> = [];  
        let weather: Weather;
        const chunk = 8;
        for (let i = 0; i < data.list.length; i += chunk) {
          weather = {
            name: data.city.name,
            currentConditions: data.list[i].weather[0].main.toLowerCase(),
            minTemp: data.list[i].main.temp_min,
            maxTemp: data.list[i].main.temp_max,
            date: new Date(data.list[i].dt_txt),
            imgSrc: this.setImgSrc(data.list[i].weather[0].main.toLowerCase())
          };
          fiveDayForecast.push(weather);
        }
        return fiveDayForecast;
      })
      , catchError(() => of([])));
    }

  private setImgSrc(condition): string {
    if (condition === 'clear'){
      return environment.imgSources + 'sun.png';
    }else{
      return environment.imgSources + condition + '.png';
    }
  }
}
