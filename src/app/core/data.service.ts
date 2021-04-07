import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Weather } from '../shared/weather-location.model';

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

  checkLocalZipCodes(){
    const localZipCodes: string = localStorage.getItem('zipCodes');
    this.zipCodesArray =  localZipCodes ? localZipCodes.split(",") : [];
    this.zipArray$.next(this.zipCodesArray);
  }

  addZipCode(value: string){
    if (this.zipCodesArray.indexOf(value) < 0){
      this.zipCodesArray.push(value);
      localStorage.setItem('zipCodes',this.zipCodesArray.toString());
      this.zipArray$.next(this.zipCodesArray);
      return false;
    }else{
      return true;
    }
  }

  removeZipCode(value: string){
    const index = this.zipCodesArray.indexOf(value);
    if (index > -1){
      this.zipCodesArray.splice(index, 1);
      localStorage.setItem('zipCodes',this.zipCodesArray.toString());
      this.zipArray$.next(this.zipCodesArray);
      this.zipError$.next(true);
    }
  }

  callWeatherByZipCode(zipCode:string){
    return this.http.get<any>('https://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',us&appid=5a4b2d457ecbef9eb2a71e480b947604')
    .pipe(map(data => 
      {
        const weatherLocation: Weather = {
          name: data.name,
          currentConditions: data.weather[0].main.toLowerCase(),
          currentTemp: data.main.temp,
          minTemp: data.main.temp_min,
          maxTemp: data.main.temp_max
        };
        return weatherLocation;
      })
      ,catchError(()=> of({})));
  }

  callFiveDayForecast(zipCode: string){
    return this.http.get<any>('https://api.openweathermap.org/data/2.5/forecast?zip=' + zipCode + ',us&appid=5a4b2d457ecbef9eb2a71e480b947604')
    .pipe(map(data => 
      {
        let fiveDayForecast: Array<Weather>=[];  
        let weather: Weather;
        const chunk = 8;
        for (let i = 0; i < data.list.length; i+=chunk) {
          weather = {
            name: data.city.name,
            currentConditions: data.list[i].weather[0].main.toLowerCase(),
            minTemp: data.list[i].main.temp_min,
            maxTemp: data.list[i].main.temp_max,
            date: new Date(data.list[i].dt_txt)
          }
          fiveDayForecast.push(weather);
        }
        return fiveDayForecast;
      })
      ,catchError(()=> of([])));
    }

}
