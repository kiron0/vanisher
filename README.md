# VanisherJS

A JavaScript library that gradually fades out websites and elements based on specified deadlines. Perfect for creating urgency, managing time-sensitive content, or implementing creative fade effects.

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

```javascript
import { createVanisher } from "vanisher";

const vanisher = createVanisher({
  deadline: "2025-01-01T23:59:59",
  targetElement: "#my-element"
});
```

## Documentation

**[Full Documentation](https://vanisher.js.org)** - Complete guides, API reference, and examples

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

_"VanisherJS: Fade out by deadline"_
