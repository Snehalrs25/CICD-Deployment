# Web Vitals Package Guide

## Package Information

- **Package Name**: web-vitals
- **Version**: 5.1.0
- **License**: Apache-2.0
- **Bundle Size**: ~2KB (brotli'd), 381KB unpacked
- **Dependencies**: 0 (zero dependencies)
- **TypeScript Support**: Built-in type declarations included
- **Weekly Downloads**: 10.4M+
- **Maintenance**: Actively maintained by Google (GoogleChrome/web-vitals)
- **Repository**: https://github.com/GoogleChrome/web-vitals

## Purpose

Web Vitals is a tiny, modular library for measuring all Web Vitals metrics on real users, in a way that accurately matches how they're measured by Chrome and reported to Google tools (Chrome User Experience Report, PageSpeed Insights, Search Console).

### Core Web Vitals Measured

1. **CLS** (Cumulative Layout Shift) - Visual stability
2. **INP** (Interaction to Next Paint) - Interactivity
3. **LCP** (Largest Contentful Paint) - Loading performance

### Additional Metrics

- **FCP** (First Contentful Paint)
- **TTFB** (Time to First Byte)

## Compatibility

### Angular 16 Compatibility: ✅ COMPATIBLE
- Framework-agnostic library (works with any JavaScript framework)
- Uses Baseline Widely Available APIs
- TypeScript support out of the box
- No conflicts with Angular 16.2.x

### Node.js Compatibility: ✅ COMPATIBLE
- Works with Node 18.20.8
- Zero dependencies means no version conflicts
- ES modules and UMD builds available

## Installation

```bash
npm install web-vitals
```

**Installed on**: November 20, 2025  
**Project**: Snehal-demo-3  
**Status**: Successfully installed ✅

## Usage in Angular

### 1. Basic Implementation in app.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'snehal-demo-3';

  ngOnInit() {
    // Initialize Web Vitals monitoring
    this.initWebVitals();
  }

  private initWebVitals() {
    // Monitor Core Web Vitals
    onCLS(this.sendToAnalytics);
    onINP(this.sendToAnalytics);
    onLCP(this.sendToAnalytics);
    
    // Optional: Monitor additional metrics
    onFCP(this.sendToAnalytics);
    onTTFB(this.sendToAnalytics);
  }

  private sendToAnalytics(metric: any) {
    console.log('Web Vital:', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id
    });

    // Send to your analytics endpoint
    // Example: this.http.post('/api/analytics', metric).subscribe();
  }
}
```

### 2. With Angular Analytics Service

Create a dedicated service:

```bash
ng generate service services/web-vitals
```

**src/app/services/web-vitals.service.ts:**

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

@Injectable({
  providedIn: 'root'
})
export class WebVitalsService {

  constructor(private http: HttpClient) {}

  initMonitoring() {
    onCLS((metric) => this.sendMetric(metric));
    onINP((metric) => this.sendMetric(metric));
    onLCP((metric) => this.sendMetric(metric));
    onFCP((metric) => this.sendMetric(metric));
    onTTFB((metric) => this.sendMetric(metric));
  }

  private sendMetric(metric: any) {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType
    });

    // Use navigator.sendBeacon for reliability during page unload
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics', body);
    } else {
      // Fallback to HTTP POST
      this.http.post('/api/analytics', body).subscribe();
    }
  }
}
```

**Use in app.component.ts:**

```typescript
import { Component, OnInit } from '@angular/core';
import { WebVitalsService } from './services/web-vitals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private webVitals: WebVitalsService) {}

  ngOnInit() {
    this.webVitals.initMonitoring();
  }
}
```

### 3. Send to Google Analytics 4

```typescript
import { onCLS, onINP, onLCP } from 'web-vitals';

function sendToGoogleAnalytics({ name, delta, value, id }: any) {
  // Assumes gtag() is available
  gtag('event', name, {
    value: delta, // Use delta so values can be summed
    metric_id: id, // Needed to aggregate events
    metric_value: value,
    metric_delta: delta
  });
}

// In ngOnInit
onCLS(sendToGoogleAnalytics);
onINP(sendToGoogleAnalytics);
onLCP(sendToGoogleAnalytics);
```

### 4. With Attribution Build (Advanced Debugging)

For detailed debugging information:

```typescript
import { onCLS, onINP, onLCP } from 'web-vitals/attribution';

function sendWithAttribution({ name, delta, value, id, attribution }: any) {
  const eventParams = {
    value: delta,
    metric_id: id,
    metric_value: value,
    metric_delta: delta
  };

  // Add debug information
  switch (name) {
    case 'CLS':
      eventParams.debug_target = attribution.largestShiftTarget;
      break;
    case 'INP':
      eventParams.debug_target = attribution.interactionTarget;
      break;
    case 'LCP':
      eventParams.debug_target = attribution.element;
      break;
  }

  console.log('Web Vital with attribution:', eventParams);
}

onCLS(sendWithAttribution);
onINP(sendWithAttribution);
onLCP(sendWithAttribution);
```

## Configuration Options

### reportAllChanges

Report every change to the metric (useful for debugging):

```typescript
import { onCLS } from 'web-vitals';

onCLS(console.log, { reportAllChanges: true });
```

### durationThreshold (INP only)

Set minimum duration for interaction events:

```typescript
import { onINP } from 'web-vitals';

onINP(console.log, { durationThreshold: 40 }); // Default is 40ms
```

## Browser Support

| Function | Browser Support |
|----------|----------------|
| onCLS() | Chromium-based browsers only |
| onFCP() | Chromium, Firefox, Safari |
| onINP() | Chromium-based browsers only |
| onLCP() | Chromium, Firefox |
| onTTFB() | Chromium, Firefox, Safari |

## Metric Rating Thresholds

Import thresholds for manual rating calculations:

```typescript
import { CLSThresholds, INPThresholds, LCPThresholds } from 'web-vitals';

console.log(CLSThresholds);  // [0.1, 0.25]
console.log(INPThresholds);  // [200, 500]
console.log(LCPThresholds);  // [2500, 4000]
```

Rating interpretation:
- **Good**: value ≤ threshold[0]
- **Needs Improvement**: threshold[0] < value ≤ threshold[1]
- **Poor**: value > threshold[1]

## Important Notes

### Performance Considerations

✅ **Pros:**
- Only ~2KB minified and compressed
- Zero dependencies
- Tree-shakeable (import only what you need)
- Uses PerformanceObserver with buffered flag (no need to load early)
- Negligible performance impact

⚠️ **Best Practices:**
- Call each function (onCLS, onINP, etc.) only ONCE per page load
- Calling multiple times can cause memory leaks
- Defer library loading until after critical resources

### Limitations

- No visibility into iframe content (including same-origin iframes)
- CLS technically measures DCLS (Document CLS) if iframes are present
- INP not reported if user never interacts with page
- CLS, FCP, LCP not reported if page loaded in background

### Callback Behavior

- **Multiple calls**: Callbacks may be called multiple times (e.g., when page visibility changes to hidden)
- **Never called**: Some metrics may never report (INP if no interaction, CLS/FCP/LCP if page in background)
- **Timing**: Some metrics require user interaction or page state changes

## Testing & Debugging

### Local Testing

Start the development server:
```bash
npm start
```

Navigate to `http://localhost:4200/` and open DevTools Console to see Web Vitals metrics logged.

### Test Server Commands

View metrics in production build:
```bash
ng build --configuration production
npm install -g http-server
http-server dist/snehal-demo-3 -p 8080
```

### Manual Testing Checklist

- [ ] Test LCP by reloading page
- [ ] Test INP by clicking/typing on page
- [ ] Test CLS by scrolling during page load
- [ ] Test FCP by checking initial paint
- [ ] Test TTFB in Network tab
- [ ] Verify metrics appear in console
- [ ] Check that callbacks fire on visibility change
- [ ] Test back/forward cache navigation

## Integration Examples

### Batch Multiple Reports

```typescript
const queue = new Set();

function addToQueue(metric: any) {
  queue.add(metric);
}

function flushQueue() {
  if (queue.size > 0) {
    const body = JSON.stringify([...queue]);
    navigator.sendBeacon('/api/analytics', body);
    queue.clear();
  }
}

onCLS(addToQueue);
onINP(addToQueue);
onLCP(addToQueue);

// Flush when page is hidden
addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    flushQueue();
  }
});
```

### Delta-Only Reporting

```typescript
function logDelta({ name, id, delta }: any) {
  console.log(`${name} matching ID ${id} changed by ${delta}`);
}

onCLS(logDelta);
onINP(logDelta);
onLCP(logDelta);
```

## Alternatives Considered

| Package | Size | Dependencies | Maintenance | Verdict |
|---------|------|--------------|-------------|---------|
| web-vitals | ~2KB | 0 | Active (Google) | ✅ CHOSEN |
| perfume.js | ~7KB | 0 | Active | Good alternative |
| speedcurve-lux | ~10KB | N/A | Active | Commercial solution |
| custom implementation | Varies | Varies | Self | More maintenance |

**Why web-vitals?**
- Official Google library
- Smallest bundle size
- Zero dependencies
- Matches Chrome's measurement methodology
- Built-in TypeScript support
- Industry standard (10M+ weekly downloads)

## Security & Compliance

- **License**: Apache-2.0 (permissive, commercial-friendly)
- **No known vulnerabilities** (checked November 20, 2025)
- **Privacy**: No data collection by library itself (you control where metrics are sent)
- **GDPR**: Metrics are anonymous by default, no PII collected

## Additional Resources

- [Official Documentation](https://github.com/GoogleChrome/web-vitals)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Measure Performance in the Field](https://web.dev/articles/debug-performance-in-the-field)
- [Chrome UX Report](https://developers.google.com/web/tools/chrome-user-experience-report)
- [PageSpeed Insights](https://pagespeed.web.dev/)

## Support & Troubleshooting

### Common Issues

**1. Metrics not appearing in console**
- Check if browser supports the metric (see Browser Support table)
- Try switching tabs or interacting with page
- Enable "Preserve log" in DevTools Console

**2. Callback called multiple times**
- This is expected behavior when visibility changes
- Use delta values for incremental reporting
- Track metric IDs to dedupe on backend

**3. Build size concerns**
- Only import metrics you need: `import { onLCP } from 'web-vitals'`
- Library is already tiny (~2KB compressed)
- Tree-shaking removes unused code

### Getting Help

- GitHub Issues: https://github.com/GoogleChrome/web-vitals/issues
- Stack Overflow: Tag with `web-vitals`
- Chrome DevTools: Check Performance tab

## Package Installation Summary

✅ **Installation Status**: SUCCESS  
✅ **Compatibility Check**: PASSED  
✅ **Bundle Size Impact**: MINIMAL (~2KB)  
✅ **Dependencies Added**: 0  
✅ **Type Definitions**: INCLUDED  
✅ **Security Review**: CLEAN  

---

**Generated**: November 20, 2025  
**Project**: Snehal-demo-3 (Angular 16.2.12)  
**Node Version**: 18.20.8  
**Package Version**: web-vitals@5.1.0
