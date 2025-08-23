# VanisherJS

A JavaScript library that gradually fades out websites and elements based on specified deadlines. Perfect for creating urgency, managing time-sensitive content, or implementing creative fade effects.

## ✨ Features

- 🎯 Deadline-based opacity control
- ⚡ Lightweight with zero dependencies
- 🧩 Framework agnostic (vanilla JS, React, Next.js)
- 🔧 Full TypeScript support
- 📱 Responsive and customizable

## 🚀 Quick Start

```bash
npm install vanisher
```

```javascript
import { createVanisher } from "vanisher";

const vanisher = createVanisher({
  deadline: "2025-01-01T23:59:59",
  targetElement: "#my-element"
});
```

## 📚 Documentation

📖 **[Full Documentation](https://vanisher.js.org)** - Complete guides, API reference, and examples


## 🛠️ Development

```bash
# Install dependencies
npm install

# Start docs dev server
npm run docs:dev

# Build package
npm run package:build

# Run tests
npm run test
```

## 📦 Package Exports

```javascript
// Core functionality
import { createVanisher } from 'vanisher';

// React components
import { VanisherReactWrapper } from 'vanisher/react';

// Next.js components
import { VanisherNextWrapper } from 'vanisher/next';
```

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

_"VanisherJS: Fade out by deadline"_
