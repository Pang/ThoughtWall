import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  constructor() { }

  private navItemSource = new BehaviorSubject<number>(0);
  navItem$ = this.navItemSource.asObservable();

  changeNav(num: number) {
    this.navItemSource.next(num);
  }
}
