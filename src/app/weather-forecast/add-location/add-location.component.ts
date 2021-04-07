import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
})
export class AddLocationComponent implements OnInit, OnDestroy {
  
  zipCodes: Array<string>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.getZipCodes();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getZipCodes(){
    this.dataService.zipCodes$
    .pipe(takeUntil(this.destroy$))
    .subscribe(zipCodes => this.zipCodes = zipCodes);
  }

}
