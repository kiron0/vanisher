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

const VanisherNextWrapper: React.FC<VanisherWrapperProps> = ({
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
  const [isNextEnvironment, setIsNextEnvironment] = React.useState(true);
  const [isClient, setIsClient] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    const nextDetected = isNextJS();
    setIsNextEnvironment(nextDetected);

    if (!nextDetected) {
      showNextJSWarning();
    }

    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

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

  if (!isNextEnvironment) {
    return <>{fallback}</>;
  }

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

VanisherNextWrapper.displayName = "VanisherNextWrapper";

export { VanisherNextWrapper, type VanisherWrapperProps };
