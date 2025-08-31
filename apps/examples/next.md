# Next.js Integration

Learn how to use VanisherJS with Next.js applications, including SSR considerations and optimization techniques.

## Basic Next.js Component

```jsx
"use client";

import { VanisherNextWrapper } from "vanisher/next";

export default function EventPage() {
  return (
    <VanisherNextWrapper deadline="2024-12-31T23:59:59">
      <div className="event-details">
        <h1>Annual Conference</h1>
        <p>Join us for an amazing event!</p>
        <p>Registration closes on December 31st</p>
        <p>This content will gradually fade out as the deadline approaches.</p>
      </div>
    </VanisherNextWrapper>
  );
}
```

## With Custom Styling

```jsx
"use client";

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
        margin: "2rem 0",
      }}
    >
      <h1>🎉 Limited Time Offer!</h1>
      <p>Get 50% off until December 31st, 2024</p>
      <p>This offer will gradually disappear as time runs out</p>
      <button className="cta-button">Claim Offer</button>
    </VanisherNextWrapper>
  );
}
```

## With Callback Functions

```jsx
"use client";

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
        <p>Check the console for callback execution</p>
      </div>
    </VanisherNextWrapper>
  );
}
```

## Next.js Router Compatibility

### App Router vs Pages Router

VanisherJS works with both Next.js routing systems:

- **App Router (Next.js 13+)**: Requires `"use client"` directive for client-side features
- **Pages Router (Traditional)**: No directive needed, works automatically

### App Router Implementation

```jsx
// app/page.tsx
"use client"; // Only needed for Next.js App Router client components

import { VanisherNextWrapper } from "vanisher/next";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Our App</h1>

      <VanisherNextWrapper
        deadline="2024-12-31T23:59:59"
        fallback={<div>Welcome offer has expired</div>}
      >
        <div className="welcome-offer">
          <h2>🎁 Welcome Offer!</h2>
          <p>New users get 20% off their first purchase</p>
          <p>This offer expires on December 31st, 2024</p>
        </div>
      </VanisherNextWrapper>

      <div className="regular-content">
        <h2>Regular Content</h2>
        <p>This content will always be visible</p>
      </div>
    </div>
  );
}
```

## Pages Router Implementation

```jsx
// pages/index.tsx
// No "use client" directive needed for Pages Router
import { VanisherNextWrapper } from "vanisher/next";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Our App</h1>

      <VanisherNextWrapper
        deadline="2024-12-31T23:59:59"
        fallback={<div>Welcome offer has expired</div>}
      >
        <div className="welcome-offer">
          <h2>🎁 Welcome Offer!</h2>
          <p>New users get 20% off their first purchase</p>
          <p>This offer expires on December 31st, 2024</p>
        </div>
      </VanisherNextWrapper>

      <div className="regular-content">
        <h2>Regular Content</h2>
        <p>This content will always be visible</p>
      </div>
    </div>
  );
}
```

## With TypeScript

```tsx
// pages/offers/[id].tsx
import { NextPage } from "next";
import { VanisherNextWrapper } from "vanisher/next";

interface Offer {
  id: string;
  title: string;
  description: string;
  expiryDate: string;
  discount: number;
}

interface OfferPageProps {
  offer: Offer;
}

const OfferPage: NextPage<OfferPageProps> = ({ offer }) => {
  return (
    <VanisherNextWrapper
      deadline={offer.expiryDate}
      fallback={<div>This offer has expired</div>}
    >
      <div className="offer-details">
        <h1>{offer.title}</h1>
        <p>{offer.description}</p>
        <p>Discount: {offer.discount}%</p>
        <p>Expires: {new Date(offer.expiryDate).toLocaleDateString()}</p>
        <button>Claim Offer</button>
      </div>
    </VanisherNextWrapper>
  );
};

export default OfferPage;
```

## With CSS-in-JS

```jsx
import { VanisherNextWrapper } from "vanisher/next";

export default function StyledPage() {
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
    },
    offer: {
      background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
      color: "white",
      padding: "30px",
      borderRadius: "15px",
      margin: "20px 0",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    },
    title: {
      fontSize: "28px",
      margin: "0 0 16px 0",
      fontWeight: "600",
    },
    description: {
      fontSize: "16px",
      lineHeight: "1.6",
      margin: "0 0 20px 0",
      opacity: "0.9",
    },
    button: {
      background: "white",
      color: "#ff6b6b",
      border: "none",
      padding: "12px 24px",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <VanisherNextWrapper
        deadline="2024-12-31T23:59:59"
        fallback={<div>Offer has expired</div>}
      >
        <div style={styles.offer}>
          <h1 style={styles.title}>🎉 Flash Sale!</h1>
          <p style={styles.description}>
            Don't miss this incredible offer! Get up to 50% off selected items.
            This sale will gradually disappear as time runs out.
          </p>
          <button style={styles.button}>Shop Now</button>
        </div>
      </VanisherNextWrapper>
    </div>
  );
}
```

## Next Steps

- **[React Integration](/examples/react)** - Use VanisherJS with React
- **[Advanced Scenarios](/examples/advanced)** - Complex use cases
- **[Basic Usage](/examples/basic-usage)** - HTML implementation
- **[API Reference](/api/next)** - Next.js component documentation
