# Testing Patterns - Organized Structure

This directory contains the modularized testing patterns split from the original `generic-testing-pattern.json` for better organization and step-by-step implementation.

## 📁 File Structure

### Core Configuration
- **`metadata.json`** - Version info, purpose, scope, and coverage targets
- **`framework-guidelines.json`** - Test runners, UI libraries, and mocking libraries for Angular/React/Node

### Pattern Categories

#### Essential Patterns (Priority 1-2)
- **`core-patterns.json`** - API communication, Component UI, Business logic (Priority 1-2)
- **`auth-state-patterns.json`** - Authentication, State management, Local storage/caching (Priority 2-3)

#### Navigation & Error Handling (Priority 3-4)
- **`routing-error-patterns.json`** - Routing, Error logging, Configuration/environment (Priority 3-4)

#### Performance & Accessibility (Priority 5-6)
- **`performance-a11y-patterns.json`** - Performance edge cases, DOM & accessibility (Priority 5-6)

#### Advanced Patterns (Priority 2-5)
- **`advanced-patterns.json`** - Analytics, Form validation, Async state, i18n, File upload, Real-time, PWA, Security, Responsive design, Third-party integration, Coverage completion (Priority 1-5)

### Testing Infrastructure
- **`mock-factories.json`** - Reusable mock factories for HTTP, storage, analytics, WebSocket, file APIs, etc.
- **`automation-rules.json`** - File management rules, detection rules, test generator configuration
- **`prompt-templates.json`** - Copilot/LLM prompt templates (short, detailed, coverage gap)
- **`test-examples.json`** - Example test skeletons and pseudocode
- **`quality-ci.json`** - CI/CD configuration, coverage enforcement, reporting
- **`extension-points.json`** - Framework adapters, custom pattern structure
- **`usage-guide.json`** - Step-by-step usage instructions

## 🚀 How to Use

### Step 1: Start with Core Patterns
```bash
# Focus on high-priority patterns first
1. core-patterns.json (API_COMM, COMPONENT_UI, BUSINESS_LOGIC)
2. auth-state-patterns.json (AUTH, STATE_MANAGEMENT)
```

### Step 2: Add Navigation & Error Handling
```bash
3. routing-error-patterns.json (ROUTING_NAV, ERROR_LOGGING, CONFIG_ENV)
```

### Step 3: Implement Advanced Patterns
```bash
4. advanced-patterns.json (FORM_VALIDATION, ANALYTICS_TRACKING, ASYNC_STATE, etc.)
```

### Step 4: Address Performance & Accessibility
```bash
5. performance-a11y-patterns.json (PERFORMANCE_EDGE, DOM_A11Y)
```

### Step 5: Use Supporting Files
- Refer to **`mock-factories.json`** for mocking implementations
- Use **`prompt-templates.json`** for AI-generated tests
- Follow **`automation-rules.json`** for file management
- Check **`test-examples.json`** for test structure guidance

## 📊 Pattern Priority Guide

| Priority | Focus Area | Files |
|----------|-----------|-------|
| **1** | API & UI Core | core-patterns.json |
| **2** | Auth, Business Logic, Forms, Security | core-patterns.json, auth-state-patterns.json, advanced-patterns.json |
| **3** | State, Storage, Routing, Async | auth-state-patterns.json, routing-error-patterns.json, advanced-patterns.json |
| **4** | Error Handling, Config, Analytics, i18n | routing-error-patterns.json, advanced-patterns.json |
| **5** | Performance, PWA, Responsive | performance-a11y-patterns.json, advanced-patterns.json |
| **6** | Accessibility | performance-a11y-patterns.json |

## 🎯 Coverage Targets by Pattern

- **100%**: Business Logic / Utilities
- **95%**: Form Validation, Coverage Completion
- **90%**: API Communication, Component UI, Auth, State Management, Security
- **85%**: Analytics, Async State
- **80%**: Local Storage, Routing, Error Logging, Config, File Upload, Real-time
- **75%**: i18n, Third-party Integration
- **70%**: Performance Edge, PWA/Offline
- **65%**: Responsive Breakpoints
- **60%**: DOM & Accessibility

## 🔧 Integration with Original File

All patterns maintain the same structure and content as the original `generic-testing-pattern.json`. No functionality has been added or removed - only reorganized for better usability.

## 📝 Notes

- Each pattern file is self-contained and can be used independently
- Files follow the same JSON schema as the original
- Framework adapters in `extension-points.json` support Angular, React, and Node.js
- Mock factories can be imported and reused across all test patterns
