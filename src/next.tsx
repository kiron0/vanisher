/**
 * 🚨 NEXT.JS ONLY COMPONENT 🚨
 *
 * This component is specifically designed for Next.js 13+ with App Router.
 * DO NOT use this in regular React projects - use 'vanisher/react' instead.
 *
 * This component will show warnings/errors if used outside of Next.js.
 */

"use client";

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
const showNextJSWarning = (() => {
  let hasWarned = false;

  return () => {
    if (hasWarned) return;
    hasWarned = true;

    const warningMessage = `
🚨 NEXT.JS COMPONENT USED IN REGULAR REACT PROJECT!

You're trying to use the Next.js-specific component in a regular React project.
This component requires Next.js 13+ with App Router for proper functionality.

To fix this:
1. Use the regular React component instead: import { VanisherWrapper } from 'vanisher/react'
2. Or upgrade your project to Next.js 13+ with App Router

Current import: vanisher/next
Recommended import: vanisher/react
`;

    // Show console error
    console.error(warningMessage);

    // Show browser alert in development
    if (
      process.env["NODE_ENV"] === "development" ||
      process.env["NODE_ENV"] === "test"
    ) {
      alert(
        "🚨 Next.js component used in React project! Check console for details.",
      );
    }

    // Throw error in production to prevent silent failures
    if (process.env["NODE_ENV"] === "production") {
      throw new Error(
        "Next.js component cannot be used in regular React projects. Use vanisher/react instead.",
      );
    }
  };
})();

interface VanisherWrapperProps extends Omit<VanisherOptions, "targetElement"> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  fallback?: React.ReactNode; // Fallback UI for non-Next.js environments
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
  const [isNextEnvironment, setIsNextEnvironment] = React.useState(true); // Assume Next.js by default
  const [isClient, setIsClient] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  // Environment check on mount
  React.useEffect(() => {
    const nextDetected = isNextJS();
    setIsNextEnvironment(nextDetected);

    if (!nextDetected) {
      showNextJSWarning();
    }

    setIsMounted(true);
  }, []);

  // Next.js hydration safety
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize vanisher
  React.useEffect(() => {
    if (!isNextEnvironment || !isClient || !isMounted || !containerRef.current)
      return;

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
    isNextEnvironment,
    isClient,
    isMounted,
    deadline,
    onDeadlineReached,
    updateIntervalMs,
    restProps,
  ]);

  // Don't render the vanisher in non-Next.js environments, show fallback instead
  if (!isNextEnvironment) {
    return <>{fallback}</>;
  }

  // Don't apply vanisher effects until client-side hydration is complete
  if (!isClient) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
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
