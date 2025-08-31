import type { WarningConfig } from "../types";

// Global warning registry to prevent duplicate warnings
const warningRegistry = new Set<string>();

const createWarningFunction = (config: WarningConfig) => {
  const warningKey = `${config.title}-${config.currentImport}`;

  return () => {
    // Prevent duplicate warnings (but allow in development for testing)
    if (
      warningRegistry.has(warningKey) &&
      process.env["NODE_ENV"] === "production"
    ) {
      return;
    }

    warningRegistry.add(warningKey);

    const warningMessage = `
┌─────────────────────────────────────────────────────────────────┐
│ 🚨 ${config.title.padEnd(54)} │
└─────────────────────────────────────────────────────────────────┘

${config.message}

┌─ QUICK FIX ─────────────────────────────────────────────────────┐
│                                                                 │
│  ❌ Current (incompatible):                                     │
│     ${config.currentImport.padEnd(52)} │
│                                                                 │
│  ✅ Replace with (recommended):                                 │
│     ${config.recommendedImport.padEnd(52)} │
│                                                                 │
│  💡 Alternative (universal):                                    │
│     import { Vanisher } from 'vanisher'                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

📚 Documentation: https://vanisher.js.org/examples/next
`;

    // Display warning in console
    console.error(warningMessage);

    // Also display as warning for visibility
    console.warn("🚨 VANISHER WARNING:", config.title);
  };
};

const REACT_WARNING_CONFIG: WarningConfig = {
  title: "INCOMPATIBLE COMPONENT DETECTED!",
  message:
    "You're importing 'vanisher/react' in a Next.js project, but this component is designed for regular React applications only.\n\nThis will cause issues with:\n• Server-side rendering (SSR)\n• Hydration mismatches\n• Next.js App Router compatibility\n• Performance optimizations",
  currentImport: "import { VanisherReactWrapper } from 'vanisher/react'",
  recommendedImport: "import { VanisherNextWrapper } from 'vanisher/next'",
  errorMessage:
    "vanisher/react component cannot be used in Next.js projects. Use vanisher/next for proper Next.js compatibility including SSR, hydration, and App Router support.",
};

const NEXTJS_WARNING_CONFIG: WarningConfig = {
  title: "NEXT.JS COMPONENT USED IN REGULAR REACT PROJECT!",
  message:
    "You're trying to use the Next.js-specific component in a regular React project.\nThis component requires Next.js 13+ with App Router for proper functionality.",
  currentImport: "vanisher/next",
  recommendedImport:
    "Use the regular React component instead: import { VanisherWrapper } from 'vanisher/react'",
  errorMessage:
    "Next.js component cannot be used in regular React projects. Use vanisher/react instead.",
};

// Function to clear warning registry (useful for testing)
const clearWarningRegistry = (): void => {
  warningRegistry.clear();
};

export {
  clearWarningRegistry,
  createWarningFunction,
  NEXTJS_WARNING_CONFIG,
  REACT_WARNING_CONFIG,
};
