# Configuration

VanisherJS provides extensive configuration options to customize behavior for different use cases.

## Basic Configuration

### Required Options

#### `deadline`

The target date when opacity should reach 0.

```typescript
deadline: Date | string;
```

**Examples:**

```javascript
// Date object
deadline: new Date("2024-12-31T23:59:59");

// ISO string
deadline: "2024-12-31T23:59:59";

// Date string
deadline: "December 31, 2024";

// Timestamp
deadline: "1704067199000";
```

### Optional Options

#### `targetElement`

The DOM element to fade out.

```typescript
targetElement?: string | HTMLElement
```

**Examples:**

```javascript
// CSS selector
targetElement: "#my-content";
targetElement: ".fade-out";
targetElement: "[data-fade]";

// DOM element
targetElement: document.getElementById("my-content");
targetElement: document.querySelector(".fade-out");

// Default (entire body)
targetElement: "body";
```

#### `onDeadlineReached`

Callback function executed when the deadline is reached.

```typescript
onDeadlineReached?: () => void
```

**Examples:**

```javascript
onDeadlineReached: () => {
  console.log("Deadline reached!");
  // Custom logic here
};

onDeadlineReached: () => {
  // Redirect to payment page
  window.location.href = "/payment";
};

onDeadlineReached: () => {
  // Show modal
  showExpiredModal();
  // Send analytics
  analytics.track("content_expired");
};
```

#### `updateIntervalMs`

How often to update opacity in milliseconds.

```typescript
updateIntervalMs?: number
```

**Examples:**

```javascript
// Update every minute
updateIntervalMs: 1000 * 60;

// Update every 5 minutes
updateIntervalMs: 1000 * 60 * 5;

// Update every hour (default)
updateIntervalMs: 1000 * 60 * 60;

// Update every 6 hours
updateIntervalMs: 1000 * 60 * 60 * 6;

// Update every day
updateIntervalMs: 1000 * 60 * 60 * 24;
```

#### `fadeDurationMs`

CSS transition duration in milliseconds.

```typescript
fadeDurationMs?: number
```

**Examples:**

```javascript
// Instant changes (no transition)
fadeDurationMs: 0;

// Quick fade (100ms)
fadeDurationMs: 100;

// Smooth fade (300ms - default)
fadeDurationMs: 300;

// Slow fade (500ms)
fadeDurationMs: 500;

// Very slow fade (1000ms)
fadeDurationMs: 1000;
```

## Advanced Configuration

### Dynamic Configuration Updates

You can update configuration options after initialization:

```javascript
const vanisher = createVanisher({
  deadline: "2024-12-31T23:59:59",
  targetElement: "#content",
});

// Update deadline
vanisher.updateOptions({
  deadline: "2025-01-15T23:59:59",
});

// Update multiple options
vanisher.updateOptions({
  updateIntervalMs: 1000 * 60 * 5, // 5 minutes
  fadeDurationMs: 500, // 500ms
  onDeadlineReached: () => console.log("New deadline reached!"),
});
```

### Environment-Specific Configuration

Configure differently for development and production:

```javascript
const isDevelopment = process.env.NODE_ENV === "development";

const vanisher = createVanisher({
  deadline: "2024-12-31T23:59:59",
  targetElement: "#content",
  updateIntervalMs: isDevelopment ? 1000 * 60 : 1000 * 60 * 60, // 1 min in dev, 1 hour in prod
  fadeDurationMs: isDevelopment ? 100 : 300, // Faster in dev for testing
});
```

### Conditional Configuration

Configure based on user preferences or conditions:

```javascript
const userPreferences = getUserPreferences();
const isHighPerformance = userPreferences.performance === "high";

const vanisher = createVanisher({
  deadline: "2024-12-31T23:59:59",
  targetElement: "#content",
  updateIntervalMs: isHighPerformance ? 1000 * 60 : 1000 * 60 * 60,
  fadeDurationMs: isHighPerformance ? 200 : 500,
});
```

## Configuration Patterns

### Invoice Management

```javascript
function createInvoiceVanisher(invoiceId, dueDate, amount) {
  return createVanisher({
    deadline: dueDate,
    targetElement: `#invoice-${invoiceId}`,
    updateIntervalMs: 1000 * 60 * 60, // Update every hour
    fadeDurationMs: 300,
    onDeadlineReached: () => {
      sendReminderEmail(invoiceId, amount);
      showPaymentModal(invoiceId);
    },
  });
}
```

### Seasonal Content

```javascript
function createSeasonalVanisher(endDate, season) {
  return createVanisher({
    deadline: endDate,
    targetElement: `.${season}-content`,
    updateIntervalMs: 1000 * 60 * 60 * 6, // Update every 6 hours
    fadeDurationMs: 500,
    onDeadlineReached: () => {
      hideSeasonalContent(season);
      showNextSeasonContent(season);
    },
  });
}
```

### Trial Periods

```javascript
function createTrialVanisher(trialEndDate, userId) {
  return createVanisher({
    deadline: trialEndDate,
    targetElement: ".trial-features",
    updateIntervalMs: 1000 * 60 * 60 * 12, // Update every 12 hours
    fadeDurationMs: 400,
    onDeadlineReached: () => {
      trackTrialExpired(userId);
      showUpgradeModal();
      disableTrialFeatures();
    },
  });
}
```

## Performance Considerations

### Update Frequency

Choose appropriate update intervals:

```javascript
// High precision (every minute) - for countdowns
updateIntervalMs: 1000 * 60;

// Medium precision (every hour) - for daily content
updateIntervalMs: 1000 * 60 * 60;

// Low precision (every 6 hours) - for long-term content
updateIntervalMs: 1000 * 60 * 60 * 6;
```

### Transition Duration

Balance smoothness with responsiveness:

```javascript
// Instant - for testing or high-performance needs
fadeDurationMs: 0;

// Quick - for responsive interfaces
fadeDurationMs: 100;

// Smooth - for professional appearance (default)
fadeDurationMs: 300;

// Slow - for dramatic effects
fadeDurationMs: 500;
```

## Error Handling

### Invalid Deadlines

Handle invalid dates gracefully:

```javascript
try {
  const vanisher = createVanisher({
    deadline: "invalid-date",
    targetElement: "#content",
  });
} catch (error) {
  console.error("Invalid deadline:", error.message);
  // Fallback to default behavior
  showError("Please provide a valid date");
}
```

### Missing Elements

Handle missing target elements:

```javascript
const vanisher = createVanisher({
  deadline: "2024-12-31T23:59:59",
  targetElement: "#non-existent-element",
});

// Check if element was found
if (!vanisher.getStatus().isActive) {
  console.warn("Target element not found");
}
```

## Next Steps

- [Deadlines](/guide/deadlines) - Understand deadline formats and handling
- [How It Works](/guide/how-it-works) - Deep dive into internal mechanics
- [API Reference](/api/core-api) - Complete configuration documentation
- [Examples](/examples/overview) - Configuration examples in action
