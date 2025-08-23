# Introduction

VanisherJS is a powerful JavaScript library that automatically fades out websites and elements based on time deadlines. It's designed to be simple to use while providing powerful customization options for various use cases.

## What is VanisherJS?

VanisherJS gradually reduces the opacity of target elements over time until a specified deadline is reached. When the deadline arrives, the element becomes completely transparent and non-interactive.

## Key Concepts

### 1. **Deadline-Based Fading**

The core concept is simple: set a deadline date, and VanisherJS will automatically calculate and apply the appropriate opacity based on how much time remains.

### 2. **Progressive Opacity Reduction**

Instead of an abrupt disappearance, elements fade out gradually, providing a better user experience and maintaining visual continuity.

### 3. **Automatic Updates**

The library continuously updates opacity values based on the current time, ensuring accurate fade progression without manual intervention.

## How It Works

1. **Initialization**: Create a Vanisher instance with a deadline and target element
2. **Time Calculation**: The library calculates time remaining until the deadline
3. **Opacity Computation**: Opacity is determined as a ratio of remaining time to total period
4. **Smooth Application**: CSS transitions are applied for smooth opacity changes
5. **Continuous Updates**: Regular intervals update the opacity as time progresses
6. **Deadline Handling**: When deadline is reached, opacity becomes 0 and cleanup occurs

## Basic Example

```javascript
import { createVanisher } from "vanisher";

const vanisher = createVanisher({
  deadline: "2024-12-31T23:59:59",
  targetElement: "#my-content",
});
```

In this example:

- The content will start fading on December 31st, 2024
- The target element is `#my-content`
- Opacity will gradually decrease as the deadline approaches
- At the deadline, the element becomes completely transparent

## Use Cases

- **Invoice Management**: Fade out unpaid invoices after due dates
- **Limited Offers**: Gradually hide promotional content as expiration approaches
- **Event Countdowns**: Create urgency with fading event pages
- **Trial Periods**: Soften access to expiring trial features
- **Seasonal Content**: Automatically hide seasonal promotions
- **Maintenance Windows**: Prepare users for scheduled downtime

## Next Steps

- **[Installation](/guide/installation)** - Learn how to install and set up VanisherJS
- **[Quick Start](/guide/quick-start)** - Get up and running in minutes
- **[How It Works](/guide/how-it-works)** - Deep dive into the internal mechanics
- **[Configuration](/guide/configuration)** - Customize behavior to your needs
- **[Deadlines](/guide/deadlines)** - Understand deadline formats and handling
