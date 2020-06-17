import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThreadService } from 'src/app/_services/thread/thread.service';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.css']
})
export class SubmitPageComponent {
  threadPostForm: FormGroup;

  constructor(private threadService: ThreadService, private router: Router) {
    this.threadPostForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      body: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(400)]),
    })
  }

  onSubmit() {
    this.threadService.postThread(this.threadPostForm.value).subscribe(
      () => {
        this.threadService.redirectTo(this.threadPostForm.get("title").value).subscribe(
          res => this.router.navigate([`/thread/${res}`]));
      },
      fail => {
        if (fail.status === 401) {
          console.log("401");
        } else {
          console.log(fail);
        }
      }
    );
  }
}
