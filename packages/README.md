# VanisherJS

Gradually fades out any website or element by reducing opacity over time until a specified deadline. Perfect for unpaid invoices, expiring offers, or time-sensitive content. Includes React and Next.js components, dynamic updates, and full TypeScript support.

## Features

- Deadline-based opacity control
- Lightweight with zero dependencies
- Framework agnostic (vanilla JS, React, Next.js)
- Full TypeScript support
- Responsive and customizable

## Quick Start

```bash
npm install vanisher
```

### Basic Usage

```javascript
import { createVanisher } from "vanisher";

const vanisher = createVanisher({
  deadline: "2025-01-01T23:59:59",
  targetElement: "#my-element"
});
```

### React Component

```jsx
import { VanisherReactWrapper } from "vanisher/react";

function App() {
  return (
    <VanisherReactWrapper deadline="2025-01-01T23:59:59">
      <h1>This content will fade out by January 1st, 2025</h1>
    </VanisherReactWrapper>
  );
}
```

### Next.js Component

```jsx
"use client";

import { VanisherNextWrapper } from "vanisher/next";

export default function Page() {
  return (
    <VanisherNextWrapper
      deadline="2025-01-01T23:59:59"
      fallback={<div>Content has expired</div>}
    >
      <h1>Next.js optimized fading content</h1>
    </VanisherNextWrapper>
  );
}
```

## Package Exports

```javascript
// Core functionality
import { createVanisher } from 'vanisher';

// React components
import { VanisherReactWrapper } from 'vanisher/react';

// Next.js components
import { VanisherNextWrapper } from 'vanisher/next';
```

## Documentation

**[Full Documentation](https://vanisher.js.org)** - Complete guides, API reference, and examples

## License

MIT License - see [LICENSE](https://github.com/kiron0/vanisher/blob/main/LICENSE) for details.

---

_"VanisherJS: Fade out by deadline"_
