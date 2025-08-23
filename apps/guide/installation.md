# Installation

VanisherJS can be installed via npm, yarn, or pnpm, and also supports direct script tag usage for quick prototyping.

## Package Manager Installation

### npm

```bash
npm install vanisher
```

### yarn

```bash
yarn add vanisher
```

### pnpm

```bash
pnpm add vanisher
```

### bun

```bash
bun add vanisher
```

## Import Methods

### ES Modules (Recommended)

```javascript
import { createVanisher, Vanisher } from "vanisher";
import { VanisherReactWrapper } from "vanisher/react";
import { VanisherNextWrapper } from "vanisher/next";
```

### CommonJS

```javascript
const { createVanisher, Vanisher } = require("vanisher");
const { VanisherReactWrapper } = require("vanisher/react");
const { VanisherNextWrapper } = require("vanisher/next");
```

### Script Tag (CDN)

For quick prototyping or when you can't use a package manager:

```html
<script src="https://unpkg.com/vanisher@latest/dist/index.js"></script>
<script>
  // Vanisher is now available globally
  const vanisher = new Vanisher({
    deadline: "2024-12-31T23:59:59",
  });
</script>
```

## Package Exports

VanisherJS provides multiple entry points for different use cases:

```json
{
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./react": {
      "import": "./dist/react.esm.js",
      "require": "./dist/react.js",
      "types": "./dist/react.d.ts"
    },
    "./next": {
      "import": "./dist/next.esm.js",
      "require": "./dist/next.js",
      "types": "./dist/next.d.ts"
    }
  }
}
```

## TypeScript Support

VanisherJS includes full TypeScript support out of the box. No additional `@types` package is required.

```typescript
import type { VanisherOptions, VanisherResult } from "vanisher";

const options: VanisherOptions = {
  deadline: new Date("2024-12-31T23:59:59"),
  targetElement: "#my-content",
};
```

## Browser Compatibility

VanisherJS supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Node.js Support

- Node.js 14.0.0 or higher
- Supports both CommonJS and ES Modules

## Peer Dependencies

When using React components, ensure you have the required peer dependencies:

```json
{
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}
```

## Development Dependencies

For development and testing, you might want to install:

```bash
npm install --save-dev @types/react @types/react-dom
```

## Next Steps

Now that you have VanisherJS installed, check out:

- **[Quick Start](/guide/quick-start)** - Get up and running in minutes
- **[API Reference](/api/core-api)** - Learn about all available options and methods
- **[Examples](/examples/overview)** - See real-world usage patterns
