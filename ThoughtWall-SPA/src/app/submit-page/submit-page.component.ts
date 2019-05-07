import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.css']
})
export class SubmitPageComponent implements OnInit {
  threadPost: any = {};

  constructor() { }
  ngOnInit() {}


  onSubmit() {
    console.log('123');
    console.log(this.threadPost.title);
  }
}
