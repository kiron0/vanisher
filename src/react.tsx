/**
 * 🚨 REACT ONLY COMPONENT 🚨
 *
 * This component is specifically designed for regular React projects.
 * DO NOT use this in Next.js projects - use 'vanisher/next' instead.
 *
 * This component will show warnings/errors if used in Next.js projects.
 */

import React, { useEffect, useRef, useState } from "react";
import { Vanisher, type VanisherOptions } from "./index";

// Runtime environment detection
const isNextJS = () => {
  // Check for Next.js specific globals
  if (typeof window !== "undefined") {
    // Check for Next.js router (using type assertion)
    if (
      (window as any).__NEXT_DATA__ ||
      (window as any).__NEXT_ROUTER_BASEPATH__
    ) {
      return true;
    }

    // Check for Next.js specific meta tags
    const nextMeta = document.querySelector('meta[name="next-head-count"]');
    if (nextMeta) {
      return true;
    }
  }

  // Check for Next.js build-time constants
  if (typeof process !== "undefined" && process.env) {
    if (process.env["NEXT_PUBLIC_"] || process.env["__NEXT_DEV__"]) {
      return true;
    }
  }

  return false;
};

// Warning function
const showReactWarning = () => {
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

  // Throw error in strict mode
  if (process.env["NODE_ENV"] === "production") {
    throw new Error(
      "React component should not be used in Next.js projects. Use vanisher/next instead.",
    );
  }
};

export interface VanisherWrapperProps
  extends Omit<VanisherOptions, "targetElement"> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const VanisherWrapper: React.FC<VanisherWrapperProps> = ({
  children,
  className = "",
  style = {},
  deadline,
  onDeadlineReached,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const vanisherRef = useRef<Vanisher | null>(null);
  const [environmentChecked, setEnvironmentChecked] = useState(false);

  // Environment check on mount
  useEffect(() => {
    if (!environmentChecked) {
      setEnvironmentChecked(true);

      // Check if we're in Next.js environment
      if (isNextJS()) {
        showReactWarning();
      }
    }
  }, [environmentChecked]);

  useEffect(() => {
    // Create vanisher instance with the container as target
    if (containerRef.current) {
      vanisherRef.current = new Vanisher({
        deadline,
        targetElement: containerRef.current,
        onDeadlineReached,
      });
    }

    return () => {
      if (vanisherRef.current) {
        vanisherRef.current.reset();
      }
    };
  }, [deadline, onDeadlineReached]);

  return (
    <div ref={containerRef} className={className} style={style}>
      {children}
    </div>
  );
};
