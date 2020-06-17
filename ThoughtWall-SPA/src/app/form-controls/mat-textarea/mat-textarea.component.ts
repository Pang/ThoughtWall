import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mat-textarea',
  template: `
    <form [formGroup]="formGroup">
      <mat-form-field>
        <mat-label>{{ placeholder }}</mat-label>
        <textarea matInput [formControlName]="formControlName" [type]="type" [placeholder]="placeholder" autocomplete="off"></textarea>
      </mat-form-field>
    </form>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
    }
  `]
})
export class MatTextareaComponent implements OnInit {
  @Input() formControlName: string;
  @Input() formGroup: FormGroup = new FormGroup({ default: new FormControl() });
  @Input() placeholder: string;
  @Input() autocomplete: string;
  @Input() type: string = 'text';

  constructor() { }

  ngOnInit() {
  }

}
