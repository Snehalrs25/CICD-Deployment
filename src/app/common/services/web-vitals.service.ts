import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { onCLS, onLCP, onFCP, onINP, onTTFB, type Metric } from 'web-vitals';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WebVitalsService {
  private currentRoute = '/';

  constructor(private router: Router) {}

  init(): void {
    if (!environment.enableWebVitals) {
      return;
    }

    this.currentRoute = this.router.url;
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e) => (this.currentRoute = (e as NavigationEnd).urlAfterRedirects));

    const log = (metric: Metric) => {
      // eslint-disable-next-line no-console
      console.log(`[WebVitals] ${metric.name}`, {
        route: this.currentRoute,
        id: metric.id,
        value: metric.value,
        rating: (metric as any).rating,
        navigationType: (metric as any).navigationType,
      });
    };

    onCLS(log, { reportAllChanges: true });
    onLCP(log);
    onFCP(log);
    onINP(log, { reportAllChanges: true });
    onTTFB(log);
  }
}