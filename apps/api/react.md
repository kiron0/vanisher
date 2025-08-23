# React Components

VanisherJS provides React components for seamless integration with React applications.

## `VanisherReactWrapper`

A React component that wraps content and automatically fades it out based on a deadline.

### Props

| Prop                | Type             | Required | Description                                       |
| ------------------- | ---------------- | -------- | ------------------------------------------------- |
| `deadline`          | `Date \| string` | Yes      | The target date when opacity should reach 0       |
| `children`          | `ReactNode`      | No       | The content to wrap and fade                      |
| `className`         | `string`         | No       | CSS class name for the wrapper div                |
| `style`             | `CSSProperties`  | No       | Inline styles for the wrapper div                 |
| `onDeadlineReached` | `function`       | No       | Callback function called when deadline is reached |
| `updateIntervalMs`  | `number`         | No       | How often to update opacity in milliseconds       |
| `fadeDurationMs`    | `number`         | No       | CSS transition duration in milliseconds           |
| `fallback`          | `ReactNode`      | No       | Content to show in Next.js environments           |

### Basic Usage

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

### With Custom Styling

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
      }}
    >
      <h2>🎉 Special Offer!</h2>
      <p>This offer expires on December 31st, 2024</p>
    </VanisherReactWrapper>
  );
}
```

### With Callback

```jsx
import React from "react";
import { VanisherReactWrapper } from "vanisher/react";

function LimitedContent() {
  const handleDeadlineReached = () => {
    console.log("Content has expired!");
    // Show upgrade modal or redirect
  };

  return (
    <VanisherReactWrapper
      deadline="2024-12-31T23:59:59"
      onDeadlineReached={handleDeadlineReached}
    >
      <div className="limited-content">
        <h1>Exclusive Content</h1>
        <p>This content will fade out by the deadline</p>
      </div>
    </VanisherReactWrapper>
  );
}
```

### With Custom Configuration

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
      </div>
    </VanisherReactWrapper>
  );
}
```

### With Fallback for Next.js

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
      </div>
    </VanisherReactWrapper>
  );
}
```

## Next.js Compatibility

The `VanisherReactWrapper` automatically detects Next.js environments and provides a fallback to prevent SSR issues. In Next.js:

- The component renders the `fallback` prop instead of the main content
- No client-side JavaScript is executed
- Prevents hydration mismatches

## Performance Considerations

- The component only initializes VanisherJS on the client side
- Uses `useRef` to avoid unnecessary re-renders
- Automatically cleans up resources when unmounted
- Efficient opacity updates using `requestAnimationFrame`

## Error Handling

The component includes built-in error handling:

```jsx
import React from "react";
import { VanisherReactWrapper } from "vanisher/react";

function ErrorHandledContent() {
  return (
    <VanisherReactWrapper
      deadline="invalid-date"
      onDeadlineReached={() => console.log("Deadline reached")}
    >
      <div>This will show an error in console if deadline is invalid</div>
    </VanisherReactWrapper>
  );
}
```

## Styling Tips

- The wrapper div can be styled with `className` and `style` props
- CSS transitions are automatically applied for smooth opacity changes
- Consider using CSS-in-JS solutions for dynamic styling
- The wrapper maintains the original element structure

## Next Steps

- [Next.js Components](/api/next) - Next.js-specific components
- [Core API](/api/core-api) - Core VanisherJS functionality
- [Types](/api/types) - TypeScript type definitions
- [Examples](/examples/overview) - React usage examples
