import { Component } from '@angular/core';
import { HttpApiService } from '../services/http-api.service';

@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.css']
})
export class SubmitPageComponent {
  threadPost: any = {};

  constructor(private httpApi: HttpApiService) {
  }

  onSubmit() {
    this.httpApi.onSubmit(this.threadPost);
  }
}
