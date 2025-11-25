import { AppComponent } from './app.component';

describe('AppComponent (unit)', () => {
  it('should create the app and have correct title', () => {
    const mockWebVitals = { init: jest.fn() } as any;
    const app = new AppComponent(mockWebVitals);
    expect(app).toBeTruthy();
    expect(app.title).toEqual('Snehal-demo-3');
  });

  it('ngOnInit should call webVitals.init', () => {
    const mockWebVitals = { init: jest.fn() } as any;
    const app = new AppComponent(mockWebVitals);
    app.ngOnInit();
    expect(mockWebVitals.init).toHaveBeenCalled();
  });
});
