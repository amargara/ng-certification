import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-image',
  templateUrl: './weather-image.component.html',
})
export class WeatherImageComponent implements OnInit {
  @Input() weather: string;
  zipCode: string;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.zipCode = this.route.snapshot.params['zipcode'];
  }

}
