import { Component } from '@angular/core';
import { HttpApiService } from '../services/http-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thread-page',
  templateUrl: './thread-page.component.html',
  styleUrls: ['./thread-page.component.css']
})
export class ThreadPageComponent {
  thread = {};

  constructor(private route: ActivatedRoute, private httpApi: HttpApiService) {
    this.httpApi.getFullThread(this.route.snapshot.paramMap.get('id')).subscribe(res => {
      this.thread = res[0];
      console.log(this.thread);
    });
  }


}
