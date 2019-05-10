import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.css']
})
export class SubmitPageComponent implements OnInit {
  threadPost: any = {};

  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit() {}

  onSubmit() {
    this.http.post('http://localhost:5000/api/values/submit', this.threadPost).subscribe(
      x => this.router.navigate(['']),
      err => console.log(err));
  }
}
