# Next.js Warning Test

Test the Next.js environment detection and fallback behavior of VanisherJS.

## Purpose

This example demonstrates how VanisherJS detects Next.js environments and provides appropriate fallback content to prevent SSR issues.

## Test Component

```jsx
import { VanisherNextWrapper } from "vanisher/next";

export default function NextJSWarningTest() {
  return (
    <div>
      <h1>Next.js Warning Test</h1>
      <p>This component tests the Next.js environment detection.</p>

      <VanisherNextWrapper
        deadline="2024-12-31T23:59:59"
        fallback={<div>Fallback content for SSR environments</div>}
      >
        <div className="test-content">
          <h2>Test Content</h2>
          <p>This content should fade out by December 31st, 2024</p>
          <p>
            In Next.js environments, you should see the fallback content during
            SSR.
          </p>
        </div>
      </VanisherNextWrapper>

      <div className="info">
        <h3>What to Expect</h3>
        <ul>
          <li>
            <strong>SSR (Server):</strong> Fallback content will be rendered
          </li>
          <li>
            <strong>Hydration (Client):</strong> Main content will be displayed
          </li>
          <li>
            <strong>Console:</strong> Check for environment detection logs
          </li>
          <li>
            <strong>No Warnings:</strong> Next.js wrapper prevents SSR issues
          </li>
        </ul>
      </div>
    </div>
  );
}
```

## Environment Detection

VanisherJS automatically detects Next.js environments:

### Next.js Environment

- No warnings
- Fallback content during SSR
- Main content after hydration
- Smooth client-side execution

### Other Environments

- Normal React behavior
- No SSR considerations
- Direct client-side execution

## Console Output

### Next.js Environment

```
VanisherJS: Next.js environment detected
VanisherJS: Using fallback content for SSR
VanisherJS: Client-side initialization complete
```

### Other Environments

```
VanisherJS: React environment detected
VanisherJS: Initializing normally
```

## Testing in Different Environments

### 1. Next.js App

```bash
# Create Next.js app
npx create-next-app@latest vanisher-next-test
cd vanisher-next-test

# Install vanisher
npm install vanisher

# Add the test component and run
npm run dev
```

### 2. Pure React App

```bash
# Create React app
npx create-react-app vanisher-test
cd vanisher-test

# Install vanisher
npm install vanisher

# Add the test component and run
npm start
```

### 3. Vite + React

```bash
# Create Vite app
npm create vite@latest vanisher-vite-test -- --template react
cd vanisher-vite-test

# Install vanisher
npm install vanisher

# Add the test component and run
npm run dev
```

## Expected Behavior

### Next.js (SSR + Hydration)

- **Server-side**: Fallback content rendered
- **Client-side**: Main content displayed after hydration
- **No warnings**: Clean console output
- **Smooth transitions**: Fading effect works normally

### React (Client-Side Only)

- Component renders normally
- Fading effect works as expected
- No console warnings
- Smooth opacity transitions

### Vite + React

- Component renders normally
- Fading effect works as expected
- No console warnings
- Smooth opacity transitions

## SSR vs Hydration

### Server-Side Rendering (SSR)

```jsx
// During SSR, this renders:
<div>Fallback content for SSR environments</div>
```

### Client-Side Hydration

```jsx
// After hydration, this renders:
<div className="test-content">
  <h2>Test Content</h2>
  <p>This content should fade out by December 31st, 2024</p>
  <p>
    In Next.js environments, you should see the fallback content during SSR.
  </p>
</div>
```

## Debugging

### Check Environment Detection

```javascript
// Add this to your component to debug
console.log('Environment check:');
console.log('typeof window:', typeof window);
console.log('typeof document:', typeof document);
console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
console.log('process.env.NEXT_PUBLIC_*:', process.env.NEXT_PUBLIC_*);
```

### Force Environment

```javascript
// You can temporarily force an environment for testing
process.env.NODE_ENV = "development";
```

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

### 2. Meaningful Fallback Content

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

### 3. Test Both SSR and Client

- Check server-side rendering
- Verify client-side hydration
- Test fading behavior
- Monitor console output

## Troubleshooting

### Fallback Not Working

- Check that fallback prop is provided
- Verify the component is properly imported
- Test in Next.js environment
- Check for build errors

### Hydration Issues

- Ensure fallback content matches main content structure
- Avoid complex state in fallback
- Test with different content types
- Monitor hydration warnings

### Performance Issues

- Keep fallback content lightweight
- Avoid expensive operations in fallback
- Use appropriate image optimization
- Monitor bundle size

## Advanced Usage

### Dynamic Fallbacks

```jsx
export default function DynamicFallback({ userRole }) {
  const getFallback = () => {
    switch (userRole) {
      case "premium":
        return <div>Premium content expired</div>;
      case "basic":
        return <div>Basic content expired</div>;
      default:
        return <div>Content expired</div>;
    }
  };

  return (
    <VanisherNextWrapper
      deadline="2024-12-31T23:59:59"
      fallback={getFallback()}
    >
      {/* Main content */}
    </VanisherNextWrapper>
  );
}
```

### Conditional Rendering

```jsx
export default function ConditionalTest({ showContent }) {
  if (!showContent) {
    return <div>Content not available</div>;
  }

  return (
    <VanisherNextWrapper
      deadline="2024-12-31T23:59:59"
      fallback={<div>Content expired</div>}
    >
      {/* Main content */}
    </VanisherNextWrapper>
  );
}
```

## Next Steps

- **[React Warning Test](/examples/react-warning-test)** - Test React environment detection
- **[Next.js Integration](/examples/next)** - Use VanisherJS with Next.js
- **[React Integration](/examples/react)** - Use VanisherJS with React
- **[API Reference](/api/next)** - Next.js component documentation
