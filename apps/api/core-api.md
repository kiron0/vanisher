# Core API

The core VanisherJS API provides the main functionality for fading elements based on deadlines.

## `createVanisher(options)`

The main function to create a Vanisher instance that automatically fades elements until a specified deadline.

### Parameters

| Parameter           | Type                    | Required | Description                                                    |
| ------------------- | ----------------------- | -------- | -------------------------------------------------------------- |
| `deadline`          | `Date \| string`        | Yes      | The target date when opacity should reach 0                    |
| `targetElement`     | `string \| HTMLElement` | No       | The DOM element to fade (default: "body")                      |
| `onDeadlineReached` | `function`              | No       | Callback function called when deadline is reached              |
| `updateIntervalMs`  | `number`                | No       | How often to update opacity in milliseconds (default: 3600000) |
| `fadeDurationMs`    | `number`                | No       | CSS transition duration in milliseconds (default: 300)         |

### Return Value

Returns a `Vanisher` instance that can be used to control the fade effect.

### Example

```javascript
import { createVanisher } from "vanisher";

const vanisher = createVanisher({
  deadline: "2024-12-31T23:59:59",
  targetElement: "#my-element",
  onDeadlineReached: () => console.log("Deadline reached!"),
  updateIntervalMs: 1000 * 60 * 5, // Update every 5 minutes
  fadeDurationMs: 500, // 500ms fade transition
});
```

## `Vanisher` Class

The main class that handles the fading logic.

### Constructor

```javascript
new Vanisher(options);
```

Creates a new Vanisher instance with the specified options.

### Methods

#### `getStatus()`

Returns the current status of the vanisher.

**Returns:** `VanisherResult`

```javascript
const status = vanisher.getStatus();
console.log(`Opacity: ${status.opacity}`);
console.log(`Days remaining: ${status.daysRemaining}`);
console.log(`Hours remaining: ${status.hoursRemaining}`);
console.log(`Is active: ${status.isActive}`);
```

#### `getDeadlineDate()`

Returns the deadline date.

**Returns:** `Date`

```javascript
const deadline = vanisher.getDeadlineDate();
console.log(`Deadline: ${deadline.toISOString()}`);
```

#### `getDaysRemaining()`

Returns the number of days remaining until the deadline.

**Returns:** `number`

```javascript
const daysLeft = vanisher.getDaysRemaining();
console.log(`Days left: ${daysLeft}`);
```

#### `updateOptions(newOptions)`

Updates the vanisher options dynamically.

**Parameters:**

- `newOptions`: `Partial<VanisherOptions>` - Partial options to update

```javascript
vanisher.updateOptions({
  deadline: "2025-01-15T23:59:59",
  updateIntervalMs: 1000 * 60 * 10, // Update every 10 minutes
});
```

#### `reset()`

Resets the vanisher to its initial state.

```javascript
vanisher.reset();
```

#### `destroy()`

Destroys the vanisher instance and cleans up resources.

```javascript
vanisher.destroy();
```

## Global Auto-Initialization

When using the script tag version, VanisherJS automatically initializes if a `data-deadline` attribute is present:

```html
<script
  src="https://unpkg.com/vanisher@latest/dist/index.js"
  data-deadline="2024-12-31T23:59:59"
></script>
```

## Next Steps

- [React Components](/api/react) - React-specific API
- [Next.js Components](/api/next) - Next.js-specific API
- [Types](/api/types) - TypeScript type definitions
- [Examples](/examples/overview) - See the API in action
