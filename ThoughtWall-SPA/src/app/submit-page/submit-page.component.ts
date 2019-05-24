import { Component } from '@angular/core';
import { HttpApiService } from '../services/http-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.css']
})
export class SubmitPageComponent {
  threadPost: any = {};
  errorMsg = [];

  constructor(private httpApi: HttpApiService, private router: Router) {
  }

  onSubmit() {
    this.errorMsg = [];
    this.httpApi.postThread(this.threadPost).subscribe(x => {
      this.httpApi.redirectTo(this.threadPost.title).subscribe(
        res => this.router.navigate([`/thread/${res['id']}`]));
      },
      err => {
        for(const error of err.error.errors.Title) {
          this.errorMsg.push(error);
        }
        for(const error of err.error.errors.Body) {
          this.errorMsg.push(error);
        }
      }
    );
  }
}
