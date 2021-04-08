import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../../../core/data.service';

@Component({
  selector: 'app-zip-code',
  templateUrl: './zip-code.component.html',
  styles: ['.btn{ min-width: fit-content;}']
})
export class ZipCodeComponent implements OnInit, OnDestroy {

  formSubmitted: boolean;
  zipCodes: Array<string>;
  error: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
  addLocation: string;
  errorAlreadyAdded: boolean;
  zipCodeForm: FormGroup = new FormGroup({
  zipCode: new FormControl(
    '', 
    Validators.compose([
      Validators.required, 
      Validators.maxLength(5), 
      Validators.minLength(5),
      Validators.pattern('^[0-9]*$')
    ])),
  });

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.checkError();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public onSubmit(): void {
    this.formSubmitted = true;
    if (this.zipCodeForm.valid){
      this.errorAlreadyAdded = this.dataService.addZipCode(this.zipCodeForm.value.zipCode);
    }
  }

  public cleanErrorMessage(): void {
    this.formSubmitted = false;
    this.error = false;
    this.errorAlreadyAdded = false;
  }

  private checkError(): void {
    this.dataService.zipCodeError$
    .pipe(takeUntil(this.destroy$))
    .subscribe((error: boolean) => {
      this.error = error;
      if (this.error === false){
        this.zipCodeForm.reset();
        this.cleanErrorMessage();
      }
    });
  }

}
