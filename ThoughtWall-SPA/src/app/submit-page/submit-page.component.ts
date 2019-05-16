import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.css']
})
export class SubmitPageComponent implements OnInit {
  threadPost: any = {};

  constructor(private http: HttpClient, private router: Router, private newPost: DataService) {
  }

  ngOnInit() {}

  onSubmit() {
    this.http.post('http://localhost:5000/api/values/submit', this.threadPost).subscribe(
      x => {this.router.navigate(['']), this.newPost.checkNewPost(true); },
      err => console.log(err));
  }
}
