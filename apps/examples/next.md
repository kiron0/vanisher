# Next.js Integration

Learn how to use VanisherJS with Next.js applications, including SSR considerations and optimization techniques.

## Basic Next.js Component

```jsx
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

## With Server-Side Rendering

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
        <p>Upgrade now to continue accessing all features</p>
        <button>Upgrade Now</button>
      </div>
    </VanisherNextWrapper>
  );
}
```

## With Custom Styling

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

## With Dynamic Deadlines

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
        <p>End date: {new Date(endDate).toLocaleDateString()}</p>
      </div>
    </VanisherNextWrapper>
  );
}

// Example usage with getServerSideProps
export async function getServerSideProps() {
  // Calculate end date (e.g., 30 days from now)
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);

  return {
    props: {
      endDate: endDate.toISOString(),
    },
  };
}
```

## With Callback Functions

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
        <p>Check the console for callback execution</p>
      </div>
    </VanisherNextWrapper>
  );
}
```

## App Router Implementation

```jsx
// app/page.tsx
"use client";

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

## Dynamic Routes

```jsx
// pages/offers/[id].tsx
import { VanisherNextWrapper } from "vanisher/next";

export default function OfferPage({ offer }) {
  return (
    <VanisherNextWrapper
      deadline={offer.expiryDate}
      fallback={<div>This offer has expired</div>}
    >
      <div className="offer-details">
        <h1>{offer.title}</h1>
        <p>{offer.description}</p>
        <p>Expires: {new Date(offer.expiryDate).toLocaleDateString()}</p>
        <button>Claim Offer</button>
      </div>
    </VanisherNextWrapper>
  );
}

export async function getServerSideProps({ params }) {
  // Fetch offer data from API
  const response = await fetch(`https://api.example.com/offers/${params.id}`);
  const offer = await response.json();

  return {
    props: {
      offer,
    },
  };
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

## Multiple Instances

```jsx
import { VanisherNextWrapper } from "vanisher/next";

export default function MultipleOffersPage() {
  return (
    <div>
      <h1>Current Offers</h1>

      <VanisherNextWrapper
        deadline="2024-12-31T23:59:59"
        fallback={<div>Holiday offer expired</div>}
      >
        <div className="offer holiday-offer">
          <h2>🎄 Holiday Special</h2>
          <p>Get 30% off all holiday items</p>
          <p>Expires December 31st, 2024</p>
        </div>
      </VanisherNextWrapper>

      <VanisherNextWrapper
        deadline="2025-01-15T23:59:59"
        fallback={<div>New Year offer expired</div>}
      >
        <div className="offer new-year-offer">
          <h2>🎊 New Year Sale</h2>
          <p>Start the year with 25% off</p>
          <p>Expires January 15th, 2025</p>
        </div>
      </VanisherNextWrapper>

      <VanisherNextWrapper
        deadline="2025-02-01T23:59:59"
        fallback={<div>Valentine offer expired</div>}
      >
        <div className="offer valentine-offer">
          <h2>💝 Valentine's Special</h2>
          <p>20% off all romantic items</p>
          <p>Expires February 1st, 2025</p>
        </div>
      </VanisherNextWrapper>
    </div>
  );
}
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
