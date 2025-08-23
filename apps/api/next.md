# Next.js Components

VanisherJS provides Next.js-optimized components for seamless integration with Next.js applications.

## `VanisherNextWrapper`

A Next.js component that wraps content and automatically fades it out based on a deadline, with built-in SSR considerations.

### Props

| Prop                | Type             | Required | Description                                                |
| ------------------- | ---------------- | -------- | ---------------------------------------------------------- |
| `deadline`          | `Date \| string` | Yes      | The target date when opacity should reach 0                |
| `children`          | `ReactNode`      | No       | The content to wrap and fade                               |
| `className`         | `string`         | No       | CSS class name for the wrapper div                         |
| `style`             | `CSSProperties`  | No       | Inline styles for the wrapper div                          |
| `onDeadlineReached` | `function`       | No       | Callback function called when deadline is reached          |
| `updateIntervalMs`  | `number`         | No       | How often to update opacity in milliseconds                |
| `fadeDurationMs`    | `number`         | No       | CSS transition duration in milliseconds                    |
| `fallback`          | `ReactNode`      | No       | Content to show during SSR and when JavaScript is disabled |

### Basic Usage

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

### With Server-Side Rendering

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

### With Custom Styling

```jsx
import { VanisherNextWrapper } from "vanisher/next";

export default function PromotionalPage() {
  return (
    <VanisherNextWrapper
      deadline="2024-12-31T23:59:59"
      className="promo-wrapper"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "2rem",
        borderRadius: "12px",
      }}
    >
      <h1>🎉 Limited Time Offer!</h1>
      <p>Get 50% off until December 31st, 2024</p>
      <button className="cta-button">Claim Offer</button>
    </VanisherNextWrapper>
  );
}
```

### With Dynamic Deadlines

```jsx
import { VanisherNextWrapper } from "vanisher/next";

export default function DynamicPage({ endDate }) {
  return (
    <VanisherNextWrapper
      deadline={endDate}
      fallback={<div>Offer has expired</div>}
    >
      <div className="dynamic-content">
        <h1>Dynamic Content</h1>
        <p>This content will fade out based on the provided end date</p>
      </div>
    </VanisherNextWrapper>
  );
}
```

### With Callback Functions

```jsx
import { VanisherNextWrapper } from "vanisher/next";

export default function CallbackPage() {
  const handleDeadlineReached = () => {
    // This will only run on the client side
    console.log("Deadline reached!");
    // You could trigger analytics, show modals, etc.
  };

  return (
    <VanisherNextWrapper
      deadline="2024-12-31T23:59:59"
      onDeadlineReached={handleDeadlineReached}
      fallback={<div>Content expired</div>}
    >
      <div className="callback-content">
        <h1>Content with Callback</h1>
        <p>This will trigger a callback when the deadline is reached</p>
      </div>
    </VanisherNextWrapper>
  );
}
```

## SSR Considerations

The `VanisherNextWrapper` is specifically designed for Next.js applications:

### Automatic Environment Detection

- Detects Next.js environment automatically
- Provides fallback content during SSR
- Prevents hydration mismatches

### Fallback Strategy

- Always renders fallback content during SSR
- Switches to main content on client-side hydration
- Ensures consistent rendering across environments

### Performance Benefits

- No JavaScript execution during SSR
- Faster initial page loads
- Better SEO and accessibility

## Best Practices

### 1. Always Provide Fallback

```jsx
<VanisherNextWrapper
  deadline="2024-12-31T23:59:59"
  fallback={<div>Content has expired</div>}
>
  {/* Main content */}
</VanisherNextWrapper>
```

### 2. Use Meaningful Fallback Content

```jsx
<VanisherNextWrapper
  deadline="2024-12-31T23:59:59"
  fallback={
    <div className="expired-message">
      <h2>This offer has expired</h2>
      <p>Check back for new offers soon!</p>
    </div>
  }
>
  {/* Expired content */}
</VanisherNextWrapper>
```

### 3. Handle Edge Cases

```jsx
<VanisherNextWrapper
  deadline={isValidDate(endDate) ? endDate : "2024-12-31T23:59:59"}
  fallback={<div>Invalid date provided</div>}
>
  {/* Content */}
</VanisherNextWrapper>
```

## Integration with Next.js Features

### App Router

```jsx
// app/page.tsx
import { VanisherNextWrapper } from "vanisher/next";

export default function Page() {
  return (
    <VanisherNextWrapper deadline="2024-12-31T23:59:59">
      <h1>App Router Page</h1>
    </VanisherNextWrapper>
  );
}
```

### Pages Router

```jsx
// pages/index.tsx
import { VanisherNextWrapper } from "vanisher/next";

export default function HomePage() {
  return (
    <VanisherNextWrapper deadline="2024-12-31T23:59:59">
      <h1>Pages Router Page</h1>
    </VanisherNextWrapper>
  );
}
```

### Dynamic Routes

```jsx
// pages/offers/[id].tsx
import { VanisherNextWrapper } from "vanisher/next";

export default function OfferPage({ offer }) {
  return (
    <VanisherNextWrapper deadline={offer.expiryDate}>
      <h1>{offer.title}</h1>
      <p>{offer.description}</p>
    </VanisherNextWrapper>
  );
}
```

## Next Steps

- [React Components](/api/react) - React-specific components
- [Core API](/api/core-api) - Core VanisherJS functionality
- [Types](/api/types) - TypeScript type definitions
- [Examples](/examples/overview) - Next.js usage examples
