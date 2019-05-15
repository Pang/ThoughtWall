import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  newThread = false;

  constructor(private newPost: DataService) {}

  ngOnInit() {
    this.newPost.dataSource.subscribe(x => {
      if (x === true) {
        console.log('It worked');
      }
    });
  }
}
