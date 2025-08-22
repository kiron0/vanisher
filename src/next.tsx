/**
 * 🚨 NEXT.JS ONLY COMPONENT 🚨
 *
 * This component is specifically designed for Next.js 13+ with App Router.
 * DO NOT use this in regular React projects - use 'vanisher/react' instead.
 *
 * This component will show warnings/errors if used outside of Next.js.
 */

"use client";

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
const showNextJSWarning = () => {
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

  // Throw error in strict mode
  if (process.env["NODE_ENV"] === "production") {
    throw new Error(
      "Next.js component cannot be used in regular React projects. Use vanisher/react instead.",
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
  const [isClient, setIsClient] = useState(false);
  const [environmentChecked, setEnvironmentChecked] = useState(false);

  // Environment check on mount
  useEffect(() => {
    if (!environmentChecked) {
      setEnvironmentChecked(true);

      // Check if we're in Next.js environment
      if (!isNextJS()) {
        showNextJSWarning();
      }
    }
  }, [environmentChecked]);

  // Next.js hydration safety
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run on client side
    if (!isClient || !containerRef.current) return;

    // Create vanisher instance with the container as target
    vanisherRef.current = new Vanisher({
      deadline,
      targetElement: containerRef.current,
      onDeadlineReached,
    });

    return () => {
      if (vanisherRef.current) {
        vanisherRef.current.reset();
      }
    };
  }, [isClient, deadline, onDeadlineReached]);

  // Don't render until client-side hydration is complete
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
