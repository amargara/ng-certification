import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-zip-code',
  templateUrl: './zip-code.component.html',
  styles: ['.btn{ min-width: fit-content;}']
})
export class ZipCodeComponent implements OnInit, OnDestroy {
  formSubmitted: boolean;
  zipCodes: Array<string>;
  form: NgForm;
  error: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.checkError();
  }

  onSubmit(form: NgForm){
    this.form = form;
    this.formSubmitted = true;
    if (form.valid){
      this.dataService.addZipCode(this.form.value.addLocation);
    }
  }

  cleanErrorMessage(){
    this.formSubmitted = false;
    this.error = false;
  }

  checkError(){
    this.dataService.zipCodeError
    .pipe(takeUntil(this.destroy$))
    .subscribe((error:boolean) => {
      this.error = error;
      if (this.error === false && this.form){
        this.form.resetForm();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
