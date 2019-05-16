import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private newPostSource = new BehaviorSubject<boolean>(false);
  newPost = this.newPostSource.asObservable();

  constructor() { }

  checkNewPost(state: boolean) {
    this.newPostSource.next(state);
  }

}
