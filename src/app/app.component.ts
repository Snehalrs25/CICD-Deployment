import { Component, OnInit } from '@angular/core';
import { WebVitalsService } from './common/services/web-vitals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Snehal-demo-3';

  constructor(private webVitals: WebVitalsService) {}

  ngOnInit(): void {
    this.webVitals.init();
  }
}
