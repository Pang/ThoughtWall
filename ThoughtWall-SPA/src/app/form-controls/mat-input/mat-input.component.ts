import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mat-input',
  template: `
    <form [formGroup]="formGroup">
      <mat-form-field color="accent">
        <mat-label>{{ placeholder }}</mat-label>
        <input matInput [formControlName]="formControlName" [type]="type" [placeholder]="placeholder" autocomplete="off">
      </mat-form-field>
    </form>
  `
})
export class MatInputComponent{
  @Input() formControlName: string;
  @Input() formGroup: FormGroup = new FormGroup({ default: new FormControl() });
  @Input() placeholder: string;
  @Input() autocomplete: string;
  @Input() type = 'text';

  constructor() { }
}
