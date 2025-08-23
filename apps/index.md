---
layout: home
title: "VanisherJS - Fade out by deadline"
titleTemplate: false

hero:
  name: VanisherJS
  text: Fade out by deadline
  tagline: Gradually reduce opacity over time until a specified deadline. Perfect for unpaid invoices, expiring offers, or time-sensitive content.
  image:
    src: "/vanisher/logo.png"
    alt: "VanisherJS Logo"
    width: 1024
    height: 1024
  actions:
    - theme: brand
      text: Get Started
      link: /guide/introduction
    - theme: alt
      text: View on GitHub
      link: https://github.com/kiron0/vanisher/tree/main/packages

features:
  - icon: 🕐
    title: Deadline-Based Fading
    details: Set a specific date/time for complete fade-out. VanisherJS automatically calculates and applies opacity based on time remaining.
  - icon: 🎯
    title: Element Targeting
    details: Target specific elements or entire websites. Choose which content to fade with CSS selectors or DOM elements.
  - icon: ⚡
    title: Smooth Transitions
    details: Configurable fade duration and update intervals. Uses CSS transitions for hardware-accelerated animations.
  - icon: 🔄
    title: Dynamic Updates
    details: Real-time opacity calculations based on time remaining. Continuous monitoring with configurable update frequency.
  - icon: ⚛️
    title: React Integration
    details: Seamless React component wrapper with automatic environment detection and SSR considerations.
  - icon: 🚀
    title: Next.js Support
    details: Optimized Next.js components with built-in SSR handling and fallback content support.
  - icon: 📱
    title: Universal Support
    details: Works with vanilla JavaScript, React, Next.js, and script tags. No framework dependencies required.
  - icon: 🔧
    title: TypeScript Ready
    details: Full TypeScript support with comprehensive type definitions and IntelliSense support.
  - icon: 📦
    title: Lightweight & Fast
    details: Zero dependencies, minimal bundle size, and blazing fast performance.
---

## Quick Examples

### Basic Usage

```html
<div id="vanisher-element">This element will fade out by the deadline</div>
```

```javascript
import { createVanisher } from "vanisher";

const vanisher = createVanisher({
  deadline: "2025-01-01T23:59:59",
  targetElement: "#vanisher-element",
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

## Why VanisherJS?

VanisherJS is a powerful JavaScript library that automatically fades out websites and elements based on time deadlines. It's designed to be simple to use while providing powerful customization options for various use cases.

## Key Features

- **Deadline-Based Fading**: Set a deadline date, and VanisherJS automatically calculates and applies the appropriate opacity
- **Lightweight & Fast**: Zero dependencies, minimal bundle size, and optimized performance
- **Framework Agnostic**: Works with any framework or library, or no framework at all
- **TypeScript Ready**: Full type safety with comprehensive type definitions
- **Universal Support**: Browser, React, Next.js, and script tag compatibility
- **Customizable**: Fine-tune behavior with extensive configuration options

## Use Cases

- **Invoice Management**: Fade out unpaid invoices after due dates
- **Limited Offers**: Gradually hide promotional content as expiration approaches
- **Event Countdowns**: Create urgency with fading event pages
- **Trial Periods**: Soften access to expiring trial features
- **Seasonal Content**: Automatically hide seasonal promotions
- **Maintenance Windows**: Prepare users for scheduled downtime

## Package Exports

```javascript
// Core functionality
import { createVanisher, Vanisher } from 'vanisher';

// React components
import { VanisherReactWrapper } from 'vanisher/react';

// Next.js components
import { VanisherNextWrapper } from 'vanisher/next';

// TypeScript types
import type { VanisherOptions, VanisherResult } from 'vanisher';
```

---

_"VanisherJS: Fade out by deadline"_
