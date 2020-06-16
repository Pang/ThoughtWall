import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-mat-input',
  template: `
    <form [formGroup]="formGroup">
      <mat-form-field>
        <mat-label>{{ placeholder }}</mat-label>
        <input matInput [formControlName]="formControlName" type="text" [placeholder]="placeholder" autocomplete="off">
      </mat-form-field>
    </form>
  `,
  styleUrls: ['./mat-input.component.css'],
})
export class MatInputComponent implements OnInit {
  @Input() formControlName: string;
  @Input() formGroup: FormGroup = new FormGroup({ default: new FormControl() });
  @Input() placeholder: string;
  @Input() autocomplete: string;

  constructor() { }

  ngOnInit() {
    console.log(this.formGroup);
    console.log(this.formControlName);
  }

}
