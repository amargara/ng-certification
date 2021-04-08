import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
})
export class AddLocationComponent implements OnInit {
  
  zipCodes$: Observable<Array<string>>;

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.zipCodes$ = this.dataService.zipCodes$;
  }

}
