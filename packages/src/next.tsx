"use client";

import * as React from "react";
import { Vanisher } from "./index";
import { type VanisherWrapperProps } from "./types";
import {
  createWarningFunction,
  isNextJS,
  NEXTJS_WARNING_CONFIG,
} from "./utils";

const showNextJSWarning = createWarningFunction(NEXTJS_WARNING_CONFIG);

// Memoized component to prevent unnecessary re-renders
const VanisherNextWrapper: React.FC<VanisherWrapperProps> = React.memo(
  ({
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
    const [isNextEnvironment, setIsNextEnvironment] = React.useState<
      boolean | null
    >(null);
    const [isClient, setIsClient] = React.useState(false);
    const [isMounted, setIsMounted] = React.useState(false);

    // Check if deadline has already passed
    const deadlineDate =
      typeof deadline === "string" ? new Date(deadline) : deadline;
    const isDeadlinePassed = deadlineDate.getTime() <= Date.now();

    // Memoize the vanisher options to prevent unnecessary re-initialization
    const vanisherOptions = React.useMemo(
      () => ({
        deadline,
        onDeadlineReached,
        updateIntervalMs,
        ...restProps,
      }),
      [deadline, onDeadlineReached, updateIntervalMs, restProps],
    );

    // Environment detection effect
    React.useEffect(() => {
      const nextDetected = isNextJS();
      setIsNextEnvironment(nextDetected);

      if (!nextDetected) {
        showNextJSWarning();
      }

      setIsMounted(true);
    }, []);

    // Client-side detection effect
    React.useEffect(() => {
      setIsClient(true);
    }, []);

    // Handle already passed deadline
    React.useEffect(() => {
      if (isDeadlinePassed && onDeadlineReached) {
        // Deadline has already passed, trigger callback immediately
        onDeadlineReached();
      }
    }, [isDeadlinePassed, onDeadlineReached]);

    // Vanisher initialization effect
    React.useEffect(() => {
      if (
        !isNextEnvironment ||
        !isClient ||
        !isMounted ||
        !containerRef.current
      ) {
        return;
      }

      try {
        // Clean up existing instance
        if (vanisherRef.current) {
          vanisherRef.current.destroy();
          vanisherRef.current = null;
        }

        // Create new instance
        vanisherRef.current = new Vanisher({
          ...vanisherOptions,
          targetElement: containerRef.current,
        });
      } catch (error) {
        console.error("Failed to initialize Vanisher:", error);
      }

      // Cleanup function
      return () => {
        if (vanisherRef.current) {
          vanisherRef.current.destroy();
          vanisherRef.current = null;
        }
      };
    }, [vanisherOptions, isNextEnvironment, isClient, isMounted]);

    // Early return for non-Next.js environment
    if (isNextEnvironment === false) {
      return <>{fallback}</>;
    }

    // Memoize the container style to prevent unnecessary style recalculations
    const containerStyle = React.useMemo(
      () => ({
        ...style,
        // If deadline has passed, immediately set opacity to 0
        opacity: isDeadlinePassed ? 0 : style.opacity,
        pointerEvents: isDeadlinePassed ? "none" : style.pointerEvents,
        userSelect: isDeadlinePassed ? "none" : style.userSelect,
      }),
      [style, isDeadlinePassed],
    );

    // Render without ref during SSR or before client hydration
    if (!isClient) {
      return (
        <div className={className} style={containerStyle}>
          {children}
        </div>
      );
    }

    return (
      <div ref={containerRef} className={className} style={containerStyle}>
        {children}
      </div>
    );
  },
);

VanisherNextWrapper.displayName = "VanisherNextWrapper";

export { VanisherNextWrapper, type VanisherWrapperProps };
