/// <reference types="jest" />
// Minimal Jest setup: window mocks
Object.defineProperty(window, 'CSS', { value: null });

// Mock for matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: any) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Angular testing environment setup
import 'jest-preset-angular/setup-jest';
