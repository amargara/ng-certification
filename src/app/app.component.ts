import { Component, OnInit } from '@angular/core';
import { DataService } from './core/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.checkZipCodes();
  }

  private checkZipCodes(): void {
    this.dataService.checkLocalZipCodes();
  }
}
