import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.css']
})
export class SubmitPageComponent implements OnInit {
  threadPost: any = {};

  constructor(private http: HttpClient) { }
  ngOnInit() {}

  onSubmit() {
    this.http.post('http://localhost:5000/api/values/submit', this.threadPost).subscribe(
      x => console.log(this.threadPost),
      err => console.log(err));
  }
}
