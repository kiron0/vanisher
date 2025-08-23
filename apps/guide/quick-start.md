# Quick Start

Get up and running with VanisherJS in minutes! This guide will walk you through the most common use cases and get you familiar with the core concepts.

## Basic Vanilla JavaScript Usage

### 1. Simple Element Fading

```javascript
import { createVanisher } from "vanisher";

// Fade out an element until December 31st, 2024
const vanisher = createVanisher({
  deadline: "2024-12-31T23:59:59",
  targetElement: "#my-content",
});
```

### 2. Fade Entire Website

```javascript
import { createVanisher } from "vanisher";

// Fade out the entire website body
const vanisher = createVanisher({
  deadline: new Date("2024-12-31T23:59:59"),
  targetElement: "body",
});
```

### 3. With Custom Callback

```javascript
import { createVanisher } from "vanisher";

const vanisher = createVanisher({
  deadline: "2024-12-31T23:59:59",
  targetElement: "#invoice",
  onDeadlineReached: () => {
    console.log("Invoice has expired!");
    // Redirect to payment page
    window.location.href = "/payment";
  },
});
```

## React Integration

### 1. Basic React Component

```jsx
import React from "react";
import { VanisherReactWrapper } from "vanisher/react";

function InvoicePage() {
  return (
    <VanisherReactWrapper deadline="2024-12-31T23:59:59">
      <div className="invoice">
        <h1>Invoice #12345</h1>
        <p>Amount: $500.00</p>
        <p>Due Date: December 31st, 2024</p>
      </div>
    </VanisherReactWrapper>
  );
}
```

### 2. With Custom Styling

```jsx
import React from "react";
import { VanisherReactWrapper } from "vanisher/react";

function PromotionalBanner() {
  return (
    <VanisherReactWrapper
      deadline="2024-12-31T23:59:59"
      className="promo-banner"
      style={{
        padding: "20px",
        backgroundColor: "#ff6b6b",
        color: "white",
      }}
    >
      <h2>🎉 Special Offer!</h2>
      <p>This offer expires on December 31st, 2024</p>
    </VanisherReactWrapper>
  );
}
```

### 3. With Fallback for Next.js

```jsx
import React from "react";
import { VanisherReactWrapper } from "vanisher/react";

function LimitedContent() {
  return (
    <VanisherReactWrapper
      deadline="2024-12-31T23:59:59"
      fallback={<div>Content has expired</div>}
    >
      <div className="limited-content">
        <h1>Exclusive Content</h1>
        <p>This content will fade out by the deadline</p>
      </div>
    </VanisherReactWrapper>
  );
}
```

## Next.js Integration

### 1. Basic Next.js Component

```jsx
import { VanisherNextWrapper } from "vanisher/next";

export default function EventPage() {
  return (
    <VanisherNextWrapper deadline="2024-12-31T23:59:59">
      <div className="event-details">
        <h1>Annual Conference</h1>
        <p>Join us for an amazing event!</p>
        <p>Registration closes on December 31st</p>
      </div>
    </VanisherNextWrapper>
  );
}
```

### 2. With Server-Side Rendering

```jsx
import { VanisherNextWrapper } from "vanisher/next";

export default function TrialPage() {
  return (
    <VanisherNextWrapper
      deadline="2024-12-31T23:59:59"
      fallback={<div>Trial period has ended</div>}
    >
      <div className="trial-content">
        <h1>Free Trial</h1>
        <p>Enjoy premium features until December 31st</p>
        <button>Upgrade Now</button>
      </div>
    </VanisherNextWrapper>
  );
}
```

## Script Tag Usage

### 1. Basic HTML Implementation

```html
<!DOCTYPE html>
<html>
  <head>
    <title>VanisherJS Demo</title>
  </head>
  <body>
    <div id="content">
      <h1>This content will fade out</h1>
      <p>By December 31st, 2024, this will be invisible</p>
    </div>

    <script src="https://unpkg.com/vanisher@latest/dist/index.js"></script>
    <script>
      const vanisher = new Vanisher({
        deadline: "2024-12-31T23:59:59",
        targetElement: "#content",
      });
    </script>
  </body>
</html>
```

### 2. With Data Attributes

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Auto-Initialized VanisherJS</title>
  </head>
  <body>
    <script
      src="https://unpkg.com/vanisher@latest/dist/index.js"
      data-deadline="2024-12-31T23:59:59"
    ></script>

    <div id="auto-fade">
      <h1>Auto-fading content</h1>
      <p>This will fade out automatically</p>
    </div>
  </body>
</html>
```

## Advanced Configuration

### 1. Custom Update Intervals

```javascript
import { createVanisher } from "vanisher";

const vanisher = createVanisher({
  deadline: "2024-12-31T23:59:59",
  targetElement: "#content",
  updateIntervalMs: 1000 * 60 * 5, // Update every 5 minutes
  fadeDurationMs: 500, // 500ms fade transition
});
```

### 2. Dynamic Deadline Updates

```javascript
import { createVanisher } from "vanisher";

const vanisher = createVanisher({
  deadline: "2024-12-31T23:59:59",
  targetElement: "#content",
});

// Update deadline dynamically
vanisher.updateOptions({
  deadline: "2025-01-15T23:59:59",
});
```

### 3. Status Monitoring

```javascript
import { createVanisher } from "vanisher";

const vanisher = createVanisher({
  deadline: "2024-12-31T23:59:59",
  targetElement: "#content",
});

// Check current status
const status = vanisher.getStatus();
console.log(`Opacity: ${status.opacity}`);
console.log(`Days remaining: ${status.daysRemaining}`);
console.log(`Hours remaining: ${status.hoursRemaining}`);
console.log(`Is active: ${status.isActive}`);
```

## Common Patterns

### 1. Invoice Management

```javascript
import { createVanisher } from "vanisher";

function createInvoiceVanisher(invoiceId, dueDate) {
  return createVanisher({
    deadline: dueDate,
    targetElement: `#invoice-${invoiceId}`,
    onDeadlineReached: () => {
      // Send reminder email
      sendReminderEmail(invoiceId);
      // Show payment modal
      showPaymentModal(invoiceId);
    },
  });
}

// Usage
const invoice1 = createInvoiceVanisher("123", "2024-12-31T23:59:59");
```

### 2. Seasonal Content

```javascript
import { createVanisher } from "vanisher";

function createSeasonalVanisher(endDate) {
  return createVanisher({
    deadline: endDate,
    targetElement: ".seasonal-content",
    onDeadlineReached: () => {
      // Hide seasonal content
      document.querySelector(".seasonal-content").style.display = "none";
    },
  });
}

// Christmas content until January 1st
const christmasContent = createSeasonalVanisher("2025-01-01T00:00:00");
```

## Next Steps

Now that you have the basics, explore:

- **[How It Works](/guide/how-it-works)** - Understand the internal mechanics
- **[Configuration](/guide/configuration)** - Fine-tune behavior options
- **[API Reference](/api/core-api)** - Complete method documentation
- **[Examples](/examples/overview)** - Real-world implementation patterns
