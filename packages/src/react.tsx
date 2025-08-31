import * as React from "react";
import { Vanisher } from "./index";
import { type VanisherWrapperProps } from "./types";
import { createWarningFunction, isNextJS, REACT_WARNING_CONFIG } from "./utils";

const showReactWarning = createWarningFunction(REACT_WARNING_CONFIG);

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

      if (nextDetected) {
        showReactWarning();
      }

      setIsMounted(true);
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

    // Always call hooks in the same order - render different content based on environment
    if (isNextEnvironment) {
      return (
        <div
          style={{
            background: "#dc2626",
            color: "white",
            padding: "20px",
            margin: "0",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "14px",
            lineHeight: "1.5",
            border: "2px solid #b91c1c",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            maxWidth: "800px",
            width: "90%",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h3 style={{ margin: "0 0 15px 0", fontSize: "16px" }}>
            🚨 INCOMPATIBLE COMPONENT DETECTED
          </h3>
          <p style={{ margin: "0 0 15px 0" }}>
            You&apos;re using <code>vanisher/react</code> in a Next.js project.
            This component is incompatible with Next.js and will cause
            SSR/hydration issues.
          </p>
          <div
            style={{
              background: "#b91c1c",
              padding: "10px",
              borderRadius: "4px",
              margin: "10px 0",
            }}
          >
            <strong>Quick Fix:</strong>
            <br />
            Replace:{" "}
            <code>
              import &#123; VanisherReactWrapper &#125; from
              &apos;vanisher/react&apos;
            </code>
            <br />
            With:{" "}
            <code>
              import &#123; VanisherNextWrapper &#125; from
              &apos;vanisher/next&apos;
            </code>
          </div>
          <p style={{ margin: "0", fontSize: "12px", opacity: "0.9" }}>
            Check:{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
              href="https://vanisher.js.org/examples/next"
            >
              https://vanisher.js.org/examples/next
            </a>
          </p>
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

VanisherReactWrapper.displayName = "VanisherReactWrapper";

export { VanisherReactWrapper, type VanisherWrapperProps };
