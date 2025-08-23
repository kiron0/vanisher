# How It Works

Understanding how VanisherJS works internally will help you make the most of its features and troubleshoot any issues.

## Core Architecture

VanisherJS is built around a simple but powerful concept: **time-based opacity calculation**. The library continuously calculates how much time remains until a deadline and applies the appropriate opacity to target elements.

## Internal Workflow

### 1. Initialization Phase

```javascript
const vanisher = createVanisher({
  deadline: "2024-12-31T23:59:59",
  targetElement: "#my-content",
});
```

**What happens:**

- Validates the deadline date
- Finds the target element in the DOM
- Sets up CSS transitions for smooth opacity changes
- Initializes the internal timer system
- Applies the initial opacity

### 2. Time Calculation

The library calculates time remaining using this formula:

```javascript
const timeDiff = deadlineDate.getTime() - currentDate.getTime();
const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
```

**Key points:**

- Uses JavaScript's `Date.getTime()` for precise calculations
- Calculates both days and hours remaining
- Handles timezone differences automatically
- Updates calculations in real-time

### 3. Opacity Computation

Opacity is calculated as a ratio of remaining time to total period:

```javascript
const totalPeriod = deadlineDate.getTime() - initializedAt.getTime();
const opacity = Math.max(0, Math.min(1, timeRemaining / totalPeriod));
```

**How it works:**

- Total period is from initialization to deadline
- Current opacity = remaining time / total period
- Clamped between 0 and 1 for valid CSS values
- Smooth linear progression from 1 to 0

### 4. CSS Application

Opacity changes are applied using CSS transitions:

```javascript
// Set up transition
element.style.transition = `opacity ${fadeDurationMs}ms ease-in-out`;

// Apply opacity
element.style.opacity = opacity.toString();
```

**Benefits:**

- Hardware-accelerated animations
- Smooth, professional appearance
- Configurable duration and easing
- Automatic cleanup when deadline is reached

### 5. Update Cycle

The library updates opacity at regular intervals:

```javascript
setInterval(() => {
  this.applyOpacity();
}, updateIntervalMs);
```

**Default behavior:**

- Updates every hour (3,600,000 milliseconds)
- Uses `requestAnimationFrame` for smooth visual updates
- Prevents unnecessary DOM manipulation
- Configurable update frequency

## Performance Optimizations

### RequestAnimationFrame

Opacity updates use `requestAnimationFrame` for optimal performance:

```javascript
this.rafId = requestAnimationFrame(() => {
  this.targetElement.style.opacity = opacity.toString();
});
```

**Benefits:**

- Synchronized with browser's refresh rate
- Pauses when tab is inactive
- Smooth 60fps animations
- Better battery life on mobile devices

### Change Detection

The library only updates the DOM when necessary:

```javascript
if (Math.abs(this.lastOpacity - opacity) > 0.01) {
  // Only update if opacity changed significantly
  this.applyOpacity();
}
```

**Threshold:**

- 0.01 opacity difference threshold
- Prevents unnecessary DOM updates
- Maintains smooth visual experience
- Reduces CPU usage

### Memory Management

Automatic cleanup prevents memory leaks:

```javascript
destroy() {
  this.stopAutoUpdater();
  if (this.targetElement) {
    this.targetElement.style.opacity = '';
    this.targetElement.style.transition = '';
  }
}
```

**Cleanup includes:**

- Stopping interval timers
- Canceling animation frames
- Resetting CSS properties
- Removing event listeners

## Error Handling

### Deadline Validation

Invalid dates are caught early:

```javascript
private validateDeadlineDate(deadline: Date): void {
  if (isNaN(deadline.getTime())) {
    throw new Error(
      "Invalid deadline date provided. Please provide a valid Date object or date string."
    );
  }
}
```

**Validation checks:**

- Ensures date is parseable
- Catches invalid date strings
- Provides helpful error messages
- Prevents runtime failures

### Element Fallbacks

Missing elements are handled gracefully:

```javascript
private getElement(): HTMLElement | null {
  if (typeof this.options.targetElement === "string") {
    return this.options.targetElement === "body"
      ? document.body
      : document.querySelector(this.options.targetElement);
  }
  return this.options.targetElement;
}
```

**Fallback strategy:**

- Defaults to `document.body` if no target specified
- Handles both CSS selectors and DOM elements
- Graceful degradation for missing elements
- Console warnings for debugging

## Browser Compatibility

### CSS Transitions

VanisherJS automatically sets up CSS transitions:

```javascript
if (!this.targetElement.style.transition) {
  this.targetElement.style.transition = `opacity ${this.options.fadeDurationMs}ms ease-in-out`;
}
```

**Compatibility:**

- Works in all modern browsers
- Graceful fallback for older browsers
- Configurable transition duration
- Smooth opacity changes

### JavaScript APIs

Uses standard web APIs for maximum compatibility:

- `Date` object for time calculations
- `setInterval` for updates
- `requestAnimationFrame` for animations
- `querySelector` for element selection

## Next Steps

- [Configuration](/guide/configuration) - Customize behavior options
- [Deadlines](/guide/deadlines) - Understand deadline formats
- [API Reference](/api/core-api) - Complete method documentation
- [Examples](/examples/overview) - See the concepts in action
