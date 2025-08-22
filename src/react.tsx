/**
 * 🚨 REACT ONLY COMPONENT 🚨
 *
 * This component is specifically designed for regular React projects.
 * DO NOT use this in Next.js projects - use 'vanisher/next' instead.
 *
 * This component will show warnings/errors if used in Next.js projects.
 */

import * as React from "react";
import { Vanisher, type VanisherOptions } from "./index";

// Runtime environment detection
// More specific Next.js detection
const isNextJS = (): boolean => {
  // Server-side detection (Node.js environment)
  if (typeof window === "undefined") {
    // Check for Next.js specific environment variables
    if (typeof process !== "undefined" && process.env) {
      return !!(
        process.env["NEXT_PUBLIC_"] ||
        process.env["__NEXT_DEV__"] ||
        process.env["__NEXT_PRIVATE__"]
      );
    }
    return false;
  }

  // Client-side detection
  // 1. Check for Next.js data attribute (most reliable)
  if ((window as any).__NEXT_DATA__) {
    return true;
  }

  // 2. Check for Next.js router
  if ((window as any).next && (window as any).next.router) {
    return true;
  }

  // 3. Check for Next.js specific functions
  if (typeof (window as any).__NEXT_REGISTER_PAGE === "function") {
    return true;
  }

  // 4. Check for Next.js specific meta tags
  try {
    const nextMeta = document.querySelector('meta[name="next-head-count"]');
    if (nextMeta) {
      return true;
    }
  } catch (e) {
    // Ignore errors
  }

  return false;
};

// Warning function - memoized to prevent multiple executions
const showReactWarning = (() => {
  let hasWarned = false;

  return () => {
    if (hasWarned) return;
    hasWarned = true;

    const warningMessage = `
🚨 REACT COMPONENT USED IN NEXT.JS PROJECT!

You're trying to use the React-specific component in a Next.js project.
This component is designed for regular React projects and may not work properly with Next.js.

To fix this:
1. Use the Next.js component instead: import { VanisherWrapper } from 'vanisher/next'
2. Or use the base component: import { Vanisher } from 'vanisher'

Current import: vanisher/react
Recommended import: vanisher/next
`;

    // Show console error
    console.error(warningMessage);

    // Show browser alert in development
    if (
      process.env["NODE_ENV"] === "development" ||
      process.env["NODE_ENV"] === "test"
    ) {
      alert(
        "🚨 React component used in Next.js project! Check console for details.",
      );
    }

    // Throw error in production to prevent silent failures
    if (process.env["NODE_ENV"] === "production") {
      throw new Error(
        "React component should not be used in Next.js projects. Use vanisher/next instead.",
      );
    }
  };
})();

interface VanisherWrapperProps extends Omit<VanisherOptions, "targetElement"> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  fallback?: React.ReactNode; // Fallback UI for Next.js environments
}

const VanisherWrapper: React.FC<VanisherWrapperProps> = ({
  children,
  className = "",
  style = {},
  deadline,
  onDeadlineReached,
  updateIntervalMs,
  fallback = null,
  ...restProps
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const vanisherRef = React.useRef<Vanisher | null>(null);
  const [isNextEnvironment, setIsNextEnvironment] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  // Environment check on mount
  React.useEffect(() => {
    const nextDetected = isNextJS();
    setIsNextEnvironment(nextDetected);

    if (nextDetected) {
      showReactWarning();
    }

    setIsMounted(true);
  }, []);

  // Initialize vanisher
  React.useEffect(() => {
    if (isNextEnvironment || !isMounted || !containerRef.current) return;

    try {
      vanisherRef.current = new Vanisher({
        deadline,
        targetElement: containerRef.current,
        onDeadlineReached,
        updateIntervalMs,
        ...restProps,
      });
    } catch (error) {
      console.error("Failed to initialize Vanisher:", error);
    }

    return () => {
      if (vanisherRef.current) {
        vanisherRef.current.destroy();
        vanisherRef.current = null;
      }
    };
  }, [
    deadline,
    onDeadlineReached,
    updateIntervalMs,
    isNextEnvironment,
    isMounted,
    restProps,
  ]);

  // Don't render the vanisher in Next.js environments, show fallback instead
  if (isNextEnvironment) {
    return <>{fallback}</>;
  }

  return (
    <div ref={containerRef} className={className} style={style}>
      {children}
    </div>
  );
};

// Add display name for better debugging
VanisherWrapper.displayName = "VanisherWrapper";

// Default export
export { VanisherWrapper, type VanisherWrapperProps };
