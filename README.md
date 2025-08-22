# Vanisher

Gradually fades out any website or element by reducing opacity over time until a specified deadline. Perfect for unpaid invoices, expiring offers, or time-sensitive content. Includes React and Next.js components, dynamic updates, and full TypeScript support.

## Features

- **Deadline-based fading**: Set any date when the website should be completely faded
- **Browser support**: Works in all modern browsers with automatic script tag detection
- **React component**: Easy integration with React applications
- **Next.js component**: Optimized for Next.js 13+ with App Router
- **Customizable**: Target any element, add callbacks, control fade duration and update intervals
- **Responsive**: Smooth transitions and mobile-friendly
- **Flexible**: Use as a library, standalone script, or React components
- **Dynamic updates**: Update options and reset functionality at runtime
- **Smart fading**: Automatically adjusts fading period based on your deadline - no hardcoded timeframes
- **Performance optimized**: Uses RequestAnimationFrame for smooth opacity updates
- **Memory management**: Proper cleanup and destroy methods

## Installation

```bash
npm install vanisher
# or
yarn add vanisher
# or
pnpm add vanisher
# or
bun add vanisher
```

## Usage

### For JavaScript/TypeScript Projects

#### Basic Usage

```typescript
import { createVanisher } from "vanisher";

const vanisher = createVanisher({
  deadline: new Date("2024-12-31"),
});
```

#### Advanced Configuration

```typescript
import { Vanisher } from "vanisher";

const vanisher = new Vanisher({
  deadline: new Date("2024-12-31"),
  targetElement: "#main-content", // or HTMLElement
  onDeadlineReached: () => {
    console.log("Website has completely faded away!");
  },
  updateIntervalMs: 5000, // Update every 5 seconds (default: 1 hour)
  fadeDurationMs: 1000,   // Fade transition duration (default: 300ms)
});

// Get current status
const status = vanisher.getStatus();
console.log(status);
// Output: { opacity: 0.8, daysRemaining: 6, hoursRemaining: 12, isActive: true }

// Update options dynamically
vanisher.updateOptions({
  deadline: new Date("2025-01-15"),
  updateIntervalMs: 10000, // Change update interval
  fadeDurationMs: 500,     // Change fade duration
});

// Reset to maximum opacity
vanisher.reset();

// Clean up when done
vanisher.destroy();
```

### Error Handling

The Vanisher class validates the deadline date and throws errors for invalid configurations:

```typescript
try {
  const vanisher = new Vanisher({
    deadline: "invalid-date", // Invalid date - will throw error
  });
} catch (error) {
  console.error("Validation error:", error.message);
  // Output: "Invalid deadline date provided. Please provide a valid Date object or date string."
}

// Valid usage with error handling
try {
  const vanisher = new Vanisher({
    deadline: new Date("2025-12-31"), // Any valid date - will work
  });
} catch (error) {
  console.error("Error initializing Vanisher:", error.message);
}
```

**Common validation errors:**

- **Invalid date**: Invalid date string or Date object

**Note:** Past dates are now allowed to enable recovery after deadline expiration.

### For React Applications

#### Basic React Component

```tsx
import { VanisherWrapper } from "vanisher/react";

function App() {
  return (
    <VanisherWrapper
      deadline={new Date("2024-12-31")}
      onDeadlineReached={() => alert("Time is up!")}
    >
      <div>Your website content here</div>
    </VanisherWrapper>
  );
}
```

> **⚠️ Important:** The React component (`vanisher/react`) will show warnings if used in Next.js projects. Use `vanisher/next` for Next.js applications.

#### Advanced React Usage

```tsx
import { VanisherWrapper } from "vanisher/react";

function App() {
  const handleDeadlineReached = () => {
    alert("Website has completely faded away!");
  };

  return (
    <VanisherWrapper
      deadline={new Date("2024-12-31")}
      onDeadlineReached={handleDeadlineReached}
      updateIntervalMs={5000}
      fadeDurationMs={1000}
      className="fade-container"
      style={{ minHeight: "100vh" }}
    >
      <header>Your Website</header>
      <main>Main content that will fade away</main>
      <footer>Footer content</footer>
    </VanisherWrapper>
  );
}
```

### For Next.js Applications

#### Basic Next.js Component

```tsx
import { VanisherWrapper } from "vanisher/next";

function NextJSPage() {
  return (
    <VanisherWrapper
      deadline={new Date("2024-12-31")}
      onDeadlineReached={() => alert("Time is up!")}
    >
      <div>Your Next.js page content here</div>
    </VanisherWrapper>
  );
}
```

> **⚠️ Important:** The Next.js component (`vanisher/next`) will show warnings if used in regular React projects. Use `vanisher/react` for React applications.

### For Direct Browser Usage

#### Script Tag with Data Attributes

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Fading Website</title>
  </head>
  <body>
    <h1>This website will fade away</h1>
    <p>Content here...</p>

    <script
      src="https://unpkg.com/vanisher@latest/dist/index.js"
      data-deadline="2024-12-31"
    ></script>
  </body>
</html>
```

#### Manual Script Initialization

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Fading Website</title>
  </head>
  <body>
    <h1>This website will fade away</h1>
    <p>Content here...</p>

    <script src="https://unpkg.com/vanisher@latest/dist/index.js"></script>
    <script>
      // Initialize manually
      const vanisher = new Vanisher({
        deadline: "2024-12-31",
        onDeadlineReached: () => {
          alert("Website has completely faded away!");
        },
      });
    </script>
  </body>
</html>
```

## API Reference

### Vanisher Class

#### Constructor Options

| Option              | Type                    | Default    | Description                                                                    |
| ------------------- | ----------------------- | ---------- | ------------------------------------------------------------------------------ |
| `deadline`          | `Date \| string`        | Required   | Date when website should be completely faded (past dates allowed for recovery) |
| `targetElement`     | `string \| HTMLElement` | `'body'`   | Element to apply opacity to                                                    |
| `onDeadlineReached` | `function`              | `() => {}` | Callback when deadline is reached                                              |
| `updateIntervalMs`  | `number`                | `3600000`  | Update interval in milliseconds (default: 1 hour)                              |
| `fadeDurationMs`    | `number`                | `300`      | CSS transition duration in milliseconds                                        |

#### Methods

- `getStatus()`: Returns current fade status with opacity, days remaining, hours remaining, and active state
- `getDeadlineDate()`: Returns the current deadline date
- `getDaysRemaining()`: Returns the number of days remaining
- `updateOptions(options)`: Update configuration dynamically and restart updater if needed
- `reset()`: Reset to maximum opacity and restart fading from current time
- `destroy()`: Clean up resources, remove event listeners, and restore element styles

### VanisherWrapper Props

Extends `VanisherOptions` with React-specific props:

| Prop        | Type            | Default | Description     |
| ----------- | --------------- | ------- | --------------- |
| `children`  | `ReactNode`     | -       | Content to wrap |
| `className` | `string`        | `''`    | CSS class names |
| `style`     | `CSSProperties` | `{}`    | Inline styles   |
| `fallback`  | `ReactNode`     | `null`  | Content to show if environment detection fails |

## Examples

### Invoice Overdue Scenario

```typescript
import { createVanisher } from "vanisher";

// Start fading immediately, complete by December 31st
const invoiceFade = createVanisher({
  deadline: new Date("2024-12-31"),
  updateIntervalMs: 300000, // Update every 5 minutes
  onDeadlineReached: () => {
    // Redirect to payment page or show payment modal
    window.location.href = "/payment";
  },
});
```

### Limited Time Offer

```tsx
import { VanisherWrapper } from "vanisher/react";

function LimitedOffer() {
  return (
    <VanisherWrapper
      deadline={new Date("2024-12-31")}
      updateIntervalMs: 10000, // Update every 10 seconds
      fadeDurationMs: 500,     // Smooth 500ms fade transitions
      onDeadlineReached={() => {
        alert("Offer expired!");
      }}
    >
      <div className="offer-banner">
        <h2>🎉 Special Offer!</h2>
        <p>This offer is fading away...</p>
        <button>Claim Now</button>
      </div>
    </VanisherWrapper>
  );
}
```

### Custom Element Targeting

```typescript
import { Vanisher } from "vanisher";

// Fade only the main content, not the navigation
const contentFade = new Vanisher({
  deadline: new Date("2024-12-31"),
  targetElement: "#main-content",
  updateIntervalMs: 60000, // Update every minute
});
```

### Dynamic Updates

```typescript
import { Vanisher } from "vanisher";

const vanisher = new Vanisher({
  deadline: new Date("2024-12-31"),
  updateIntervalMs: 300000, // 5 minutes
  fadeDurationMs: 1000,     // 1 second
});

// Extend the deadline
vanisher.updateOptions({
  deadline: new Date("2025-01-15"),
});

// Change update frequency
vanisher.updateOptions({
  updateIntervalMs: 60000, // 1 minute
});

// Check current status
const status = vanisher.getStatus();
console.log(
  `Days remaining: ${status.daysRemaining}, Hours remaining: ${status.hoursRemaining}, Opacity: ${status.opacity}`,
);

// Reset to full opacity
vanisher.reset();

// Clean up when done
vanisher.destroy();
```

### Recovery After Deadline

You can extend deadlines even after they've passed:

```typescript
const vanisher = new Vanisher({
  deadline: new Date("2024-12-01"), // Past deadline - website invisible
});

// Later, user pays invoice - extend deadline
function onPaymentReceived() {
  const newDeadline = new Date();
  newDeadline.setDate(newDeadline.getDate() + 30); // 30 days from now

  vanisher.updateOptions({
    deadline: newDeadline,
  });
  // Website immediately becomes visible and starts fading to new deadline!
}
```

## How It Works

### Simple Opacity Logic

Vanisher uses a straightforward opacity system:

- **Past deadline**: Website is completely invisible (opacity = 0)
- **Future deadline**: Website is fully visible (opacity = 1) and gradually fades to invisible as deadline approaches
- **No complex recovery**: Once invisible, website stays invisible until deadline is extended to future date
- **Reset functionality**: Use `reset()` to restart with full opacity

### Performance Features

- **RequestAnimationFrame**: Smooth opacity updates without blocking the main thread
- **Efficient updates**: Only updates opacity when there's a significant change (>0.01)
- **Smart intervals**: Configurable update frequency (default: 1 hour)
- **Memory cleanup**: Proper disposal of timers and animation frames

### Example Scenarios

- **Past deadline**: Website is invisible (opacity = 0)
- **Future deadline**: Website is visible and fades gradually to invisible
- **Extended deadline**: If you extend a past deadline to future date, website becomes visible again
- **Reset**: If you reset, website starts fresh with full opacity

This ensures predictable behavior: past deadlines = invisible, future deadlines = visible with gradual fading.

## Environment Detection & Warnings

The package includes intelligent environment detection to prevent misuse:

### React Component in Next.js

- **Warning**: Console error + browser alert in development
- **Error**: Runtime error in production
- **Fix**: Use `vanisher/next` instead

### Next.js Component in React

- **Warning**: Console error + browser alert in development
- **Error**: Runtime error in production
- **Fix**: Use `vanisher/react` instead

### Correct Usage

- **React projects**: `import { VanisherWrapper } from 'vanisher/react'`
- **Next.js projects**: `import { VanisherWrapper } from 'vanisher/next'`
- **Vanilla JS/TS**: `import { Vanisher } from 'vanisher'`

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Internet Explorer 11+ (with polyfills)

## License

MIT License - see [LICENSE](https://github.com/kiron0/vanisher/blob/main/LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Inspiration

This package was inspired by the [not-paid](https://github.com/kleampa/not-paid) project, which provides a similar functionality for unpaid invoices.
