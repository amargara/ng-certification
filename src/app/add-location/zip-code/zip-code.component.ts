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
  addLocation: string;
  model: { addLocation:string } = { addLocation: '' };
  errorAlreadyAdded: boolean;

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.checkError();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(form: NgForm){
    this.form = form;
    this.formSubmitted = true;
    if (form.valid){
      this.errorAlreadyAdded = this.dataService.addZipCode(this.model.addLocation);
    }
  }

  cleanErrorMessage(){
    this.formSubmitted = false;
    this.error = false;
  }

  checkError(){
    this.dataService.zipCodeError$
    .pipe(takeUntil(this.destroy$))
    .subscribe((error:boolean) => {
      this.error = error;
      if (this.error === false && this.form){
        this.form.resetForm();
      }
    });
  }

}
