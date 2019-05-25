import { Component, Input } from '@angular/core';
import { HttpApiService } from 'src/app/services/http-api.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
})

export class ThreadComponent {
  @Input() threads: [];

  constructor(private httpApi: HttpApiService) {}
}