# Types

VanisherJS provides comprehensive TypeScript type definitions for all its functionality.

## Core Types

### `VanisherOptions`

Configuration options for creating a Vanisher instance.

```typescript
interface VanisherOptions {
  deadline: Date | string;
  targetElement?: string | HTMLElement;
  onDeadlineReached?: () => void;
  updateIntervalMs?: number;
  fadeDurationMs?: number;
}
```

**Properties:**

- `deadline`: The target date when opacity should reach 0 (required)
- `targetElement`: The DOM element to fade (optional, default: "body")
- `onDeadlineReached`: Callback function called when deadline is reached (optional)
- `updateIntervalMs`: How often to update opacity in milliseconds (optional, default: 3600000)
- `fadeDurationMs`: CSS transition duration in milliseconds (optional, default: 300)

### `VanisherResult`

The result object returned by the `getStatus()` method.

```typescript
interface VanisherResult {
  opacity: number;
  daysRemaining: number;
  hoursRemaining: number;
  isActive: boolean;
}
```

**Properties:**

- `opacity`: Current opacity value (0-1)
- `daysRemaining`: Number of days remaining until deadline
- `hoursRemaining`: Number of hours remaining until deadline
- `isActive`: Whether the vanisher is still active (deadline not reached)

### `VanisherWrapperProps`

Props for React and Next.js wrapper components.

```typescript
interface VanisherWrapperProps extends Omit<VanisherOptions, "targetElement"> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  fallback?: React.ReactNode;
}
```

**Properties:**

- Inherits all properties from `VanisherOptions` except `targetElement`
- `children`: The content to wrap and fade
- `className`: CSS class name for the wrapper div
- `style`: Inline styles for the wrapper div
- `fallback`: Content to show in Next.js environments or when content expires

## Utility Types

### `EnvDetectionResult`

Result of environment detection utilities.

```typescript
interface EnvDetectionResult {
  isNextJS: boolean;
  isClient: boolean;
}
```

**Properties:**

- `isNextJS`: Whether the code is running in a Next.js environment
- `isClient`: Whether the code is running on the client side

### `WarningConfig`

Configuration for warning messages.

```typescript
interface WarningConfig {
  title: string;
  message: string;
  currentImport: string;
  recommendedImport: string;
  errorMessage: string;
}
```

**Properties:**

- `title`: Title of the warning
- `message`: Warning message content
- `currentImport`: Current import path being used
- `recommendedImport`: Recommended import path
- `errorMessage`: Error message to display

## Class Types

### `Vanisher`

The main Vanisher class.

```typescript
class Vanisher {
  constructor(options: VanisherOptions);

  getStatus(): VanisherResult;
  getDeadlineDate(): Date;
  getDaysRemaining(): number;
  updateOptions(newOptions: Partial<VanisherOptions>): void;
  reset(): void;
  destroy(): void;
}
```

## Function Types

### `createVanisher`

Factory function to create Vanisher instances.

```typescript
function createVanisher(options: VanisherOptions): Vanisher;
```

## React Component Types

### `VanisherReactWrapper`

React component for wrapping content with fade functionality.

```typescript
const VanisherReactWrapper: React.FC<VanisherWrapperProps>;
```

### `VanisherNextWrapper`

Next.js component for wrapping content with fade functionality.

```typescript
const VanisherNextWrapper: React.FC<VanisherWrapperProps>;
```

## Usage Examples

### Basic Type Usage

```typescript
import type { VanisherOptions, VanisherResult } from "vanisher";

const options: VanisherOptions = {
  deadline: new Date("2024-12-31T23:59:59"),
  targetElement: "#my-content",
  onDeadlineReached: () => console.log("Deadline reached!"),
};

const vanisher = createVanisher(options);
const status: VanisherResult = vanisher.getStatus();
```

### React Component Types

```typescript
import type { VanisherWrapperProps } from 'vanisher';

const MyComponent: React.FC<VanisherWrapperProps> = (props) => {
  return (
    <VanisherReactWrapper {...props}>
      <div>My content</div>
    </VanisherReactWrapper>
  );
};
```

### Partial Updates

```typescript
import type { VanisherOptions } from "vanisher";

const vanisher = createVanisher({
  deadline: "2024-12-31T23:59:59",
});

// Update specific options
const updates: Partial<VanisherOptions> = {
  updateIntervalMs: 1000 * 60 * 5, // 5 minutes
  fadeDurationMs: 500,
};

vanisher.updateOptions(updates);
```

### Generic Type Constraints

```typescript
import type { VanisherOptions } from "vanisher";

function createVanisherWithDefaults<T extends Partial<VanisherOptions>>(
  options: T,
): VanisherOptions {
  return {
    deadline: options.deadline!,
    targetElement: options.targetElement || "body",
    onDeadlineReached: options.onDeadlineReached || (() => {}),
    updateIntervalMs: options.updateIntervalMs ?? 3600000,
    fadeDurationMs: options.fadeDurationMs ?? 300,
  };
}
```

## Type Guards

### Custom Type Guards

```typescript
import type { VanisherOptions } from "vanisher";

function isValidDeadline(deadline: unknown): deadline is Date | string {
  if (deadline instanceof Date) return true;
  if (typeof deadline === "string") {
    const date = new Date(deadline);
    return !isNaN(date.getTime());
  }
  return false;
}

function validateOptions(options: unknown): options is VanisherOptions {
  if (typeof options !== "object" || options === null) return false;
  const opts = options as any;
  return isValidDeadline(opts.deadline);
}
```

## Next Steps

- [Core API](/api/core-api) - Core VanisherJS functionality
- [React Components](/api/react) - React-specific API
- [Next.js Components](/api/next) - Next.js-specific API
- [Examples](/examples/overview) - TypeScript usage examples
