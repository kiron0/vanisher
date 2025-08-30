import * as React from "react";
import { Vanisher } from "./index";
import { type VanisherWrapperProps } from "./types";
import { createWarningFunction, isNextJS, REACT_WARNING_CONFIG } from "./utils";

const showReactWarning = createWarningFunction(REACT_WARNING_CONFIG);

// Memoized component to prevent unnecessary re-renders
const VanisherReactWrapper: React.FC<VanisherWrapperProps> = React.memo(
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
    const [isMounted, setIsMounted] = React.useState(false);

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

      if (nextDetected) {
        showReactWarning();
      }

      setIsMounted(true);
    }, []);

    // Vanisher initialization effect
    React.useEffect(() => {
      if (isNextEnvironment || !isMounted || !containerRef.current) return;

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
    }, [vanisherOptions, isNextEnvironment, isMounted]);

    // Early return for Next.js environment
    if (isNextEnvironment) {
      return <>{fallback}</>;
    }

    // Memoize the container style to prevent unnecessary style recalculations
    const containerStyle = React.useMemo(
      () => ({
        ...style,
      }),
      [style],
    );

    return (
      <div ref={containerRef} className={className} style={containerStyle}>
        {children}
      </div>
    );
  },
);

VanisherReactWrapper.displayName = "VanisherReactWrapper";

export { VanisherReactWrapper, type VanisherWrapperProps };
