# React Warning Test

Test the React environment detection and warning behavior of VanisherJS.

## Purpose

This example demonstrates how VanisherJS detects React environments and provides appropriate warnings when used in Next.js or other SSR frameworks.

## Test Component

```jsx
import React from "react";
import { VanisherReactWrapper } from "vanisher/react";

function ReactWarningTest() {
  return (
    <div>
      <h1>React Warning Test</h1>
      <p>This component tests the React environment detection.</p>

      <VanisherReactWrapper
        deadline="2024-12-31T23:59:59"
        fallback={<div>Fallback content for Next.js environments</div>}
      >
        <div className="test-content">
          <h2>Test Content</h2>
          <p>This content should fade out by December 31st, 2024</p>
          <p>
            In Next.js environments, you should see the fallback content
            instead.
          </p>
        </div>
      </VanisherReactWrapper>

      <div className="info">
        <h3>What to Expect</h3>
        <ul>
          <li>
            <strong>React (Client):</strong> Content will fade out normally
          </li>
          <li>
            <strong>Next.js (SSR):</strong> Fallback content will be displayed
          </li>
          <li>
            <strong>Console:</strong> Check for environment detection warnings
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ReactWarningTest;
```

## Environment Detection

VanisherJS automatically detects the environment:

### React Environment

- No warnings
- Normal fading behavior
- Client-side execution

### Next.js Environment

- Warning displayed in console
- Fallback content rendered
- No client-side JavaScript execution

## Console Output

### React Environment

```
VanisherJS: React environment detected
VanisherJS: Initializing normally
```

### Next.js Environment

```
⚠️ VanisherJS Warning ⚠️

You're importing from 'vanisher/react' in a Next.js environment.
This can cause SSR issues and hydration mismatches.

Recommended: Use 'vanisher/next' instead for Next.js applications.

Current import: vanisher/react
Recommended import: vanisher/next

For more information, visit: https://vanisher.js.org
```

## Testing in Different Environments

### 1. Pure React App

```bash
# Create React app
npx create-react-app vanisher-test
cd vanisher-test

# Install vanisher
npm install vanisher

# Add the test component and run
npm start
```

### 2. Next.js App

```bash
# Create Next.js app
npx create-next-app@latest vanisher-next-test
cd vanisher-next-test

# Install vanisher
npm install vanisher

# Add the test component and run
npm run dev
```

### 3. Vite + React

```bash
# Create Vite app
npm create vite@latest vanisher-vite-test -- --template react
npm install vanisher

# Add the test component and run
npm run dev
```

## Expected Behavior

### React (Client-Side)

- Component renders normally
- Fading effect works as expected
- No console warnings
- Smooth opacity transitions

### Next.js (SSR)

- Fallback content is displayed
- Console warning appears
- No client-side JavaScript execution
- No hydration mismatches

### Vite + React

- Component renders normally
- Fading effect works as expected
- No console warnings
- Smooth opacity transitions

## Debugging

### Check Environment Detection

```javascript
// Add this to your component to debug
console.log("Environment check:");
console.log("typeof window:", typeof window);
console.log("typeof document:", typeof document);
console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
```

### Force Environment

```javascript
// You can temporarily force an environment for testing
process.env.NODE_ENV = "development";
```

## Best Practices

### 1. Use Appropriate Import

```javascript
// For React apps
import { VanisherReactWrapper } from "vanisher/react";

// For Next.js apps
import { VanisherNextWrapper } from "vanisher/next";
```

### 2. Always Provide Fallback

```jsx
<VanisherReactWrapper
  deadline="2024-12-31T23:59:59"
  fallback={<div>Content has expired</div>}
>
  {/* Main content */}
</VanisherReactWrapper>
```

### 3. Test in Target Environment

Always test your components in the actual environment where they'll be deployed.

## Troubleshooting

### Warning Not Appearing

- Check console for other errors
- Ensure you're using the correct import
- Verify the environment detection logic

### Fallback Not Working

- Check that fallback prop is provided
- Verify the component is properly imported
- Test in the target environment

### Hydration Issues

- Use appropriate wrapper component
- Provide meaningful fallback content
- Test SSR behavior

## Next Steps

- **[Next.js Warning Test](/examples/nextjs-warning-test)** - Test Next.js environment detection
- **[React Integration](/examples/react)** - Use VanisherJS with React
- **[Next.js Integration](/examples/next)** - Use VanisherJS with Next.js
- **[API Reference](/api/react)** - React component documentation
