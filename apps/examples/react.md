# React Integration

Explore how to integrate VanisherJS with React applications using the React wrapper component.

## Basic React Component

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
        <p>This invoice will gradually fade out as the due date approaches.</p>
      </div>
    </VanisherReactWrapper>
  );
}

export default InvoicePage;
```

## With Custom Styling

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
        borderRadius: "8px",
        margin: "20px 0",
      }}
    >
      <h2>🎉 Special Offer!</h2>
      <p>This offer expires on December 31st, 2024</p>
      <p>Don't miss out on this amazing deal!</p>
    </VanisherReactWrapper>
  );
}

export default PromotionalBanner;
```

## With Callback Functions

```jsx
import React from "react";
import { VanisherReactWrapper } from "vanisher/react";

function LimitedContent() {
  const handleDeadlineReached = () => {
    console.log("Content has expired!");
    // You could trigger analytics, show modals, etc.
  };

  return (
    <VanisherReactWrapper
      deadline="2024-12-31T23:59:59"
      onDeadlineReached={handleDeadlineReached}
    >
      <div className="limited-content">
        <h1>Exclusive Content</h1>
        <p>This content will fade out by the deadline</p>
        <p>Make sure to read it while you can!</p>
      </div>
    </VanisherReactWrapper>
  );
}

export default LimitedContent;
```

## With Custom Configuration

```jsx
import React from "react";
import { VanisherReactWrapper } from "vanisher/react";

function CustomVanisher() {
  return (
    <VanisherReactWrapper
      deadline="2024-12-31T23:59:59"
      updateIntervalMs={1000 * 60 * 5} // Update every 5 minutes
      fadeDurationMs={800} // 800ms fade transition
      onDeadlineReached={() => {
        // Custom logic when deadline is reached
        window.location.href = "/expired";
      }}
    >
      <div className="custom-content">
        <h1>Custom Fading Content</h1>
        <p>This will fade out with custom settings</p>
        <p>More frequent updates and slower transitions</p>
      </div>
    </VanisherReactWrapper>
  );
}

export default CustomVanisher;
```

## With Fallback for Next.js

```jsx
import React from "react";
import { VanisherReactWrapper } from "vanisher/react";

function NextJSContent() {
  return (
    <VanisherReactWrapper
      deadline="2024-12-31T23:59:59"
      fallback={<div>Content has expired</div>}
    >
      <div className="nextjs-content">
        <h1>Next.js Optimized Content</h1>
        <p>This content will fade out by the deadline</p>
        <p>Includes fallback for Next.js environments</p>
      </div>
    </VanisherReactWrapper>
  );
}

export default NextJSContent;
```

## Dynamic Deadlines

```jsx
import React, { useState } from "react";
import { VanisherReactWrapper } from "vanisher/react";

function DynamicDeadline() {
  const [deadline, setDeadline] = useState("2024-12-31T23:59:59");

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="deadline">Set Deadline: </label>
        <input
          type="datetime-local"
          id="deadline"
          value={deadline}
          onChange={handleDeadlineChange}
        />
      </div>

      <VanisherReactWrapper deadline={deadline}>
        <div className="dynamic-content">
          <h1>Dynamic Deadline Content</h1>
          <p>This content will fade out based on the selected deadline</p>
          <p>Current deadline: {new Date(deadline).toLocaleString()}</p>
        </div>
      </VanisherReactWrapper>
    </div>
  );
}

export default DynamicDeadline;
```

## Multiple Instances

```jsx
import React from "react";
import { VanisherReactWrapper } from "vanisher/react";

function MultipleInstances() {
  return (
    <div>
      <VanisherReactWrapper deadline="2024-12-31T23:59:59">
        <div
          className="content-1"
          style={{ padding: "20px", backgroundColor: "#e3f2fd" }}
        >
          <h2>Content 1</h2>
          <p>This content expires on December 31st, 2024</p>
        </div>
      </VanisherReactWrapper>

      <VanisherReactWrapper deadline="2025-01-15T23:59:59">
        <div
          className="content-2"
          style={{ padding: "20px", backgroundColor: "#f3e5f5" }}
        >
          <h2>Content 2</h2>
          <p>This content expires on January 15th, 2025</p>
        </div>
      </VanisherReactWrapper>

      <VanisherReactWrapper deadline="2025-02-01T23:59:59">
        <div
          className="content-3"
          style={{ padding: "20px", backgroundColor: "#e8f5e8" }}
        >
          <h2>Content 3</h2>
          <p>This content expires on February 1st, 2025</p>
        </div>
      </VanisherReactWrapper>
    </div>
  );
}

export default MultipleInstances;
```

## With Hooks

```jsx
import React, { useState, useEffect } from "react";
import { VanisherReactWrapper } from "vanisher/react";

function VanisherWithHooks() {
  const [isVisible, setIsVisible] = useState(true);
  const [deadline] = useState("2024-12-31T23:59:59");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const deadlineDate = new Date(deadline);

      if (now >= deadlineDate) {
        setIsVisible(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  if (!isVisible) {
    return <div>Content has expired</div>;
  }

  return (
    <VanisherReactWrapper deadline={deadline}>
      <div className="hooks-content">
        <h1>Content with Hooks</h1>
        <p>This demonstrates using VanisherJS with React hooks</p>
        <p>Combines automatic fading with manual visibility control</p>
      </div>
    </VanisherReactWrapper>
  );
}

export default VanisherWithHooks;
```

## Styling with CSS Modules

```jsx
import React from "react";
import { VanisherReactWrapper } from "vanisher/react";
import styles from "./VanisherContent.module.css";

function VanisherContent() {
  return (
    <VanisherReactWrapper
      deadline="2024-12-31T23:59:59"
      className={styles.vanisherWrapper}
    >
      <div className={styles.content}>
        <h1 className={styles.title}>Styled Content</h1>
        <p className={styles.description}>
          This content uses CSS modules for styling
        </p>
      </div>
    </VanisherReactWrapper>
  );
}

export default VanisherContent;
```

## CSS Module Example

```css
/* VanisherContent.module.css */
.vanisherWrapper {
  border: 2px solid #007bff;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.vanisherWrapper:hover {
  border-color: #0056b3;
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
}

.content {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.title {
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 600;
}

.description {
  margin: 0;
  line-height: 1.6;
  opacity: 0.9;
}
```

## Next Steps

- **[Next.js Integration](/examples/next)** - Use VanisherJS with Next.js
- **[Advanced Scenarios](/examples/advanced)** - Complex use cases
- **[Basic Usage](/examples/basic-usage)** - HTML implementation
- **[API Reference](/api/react)** - React component documentation
