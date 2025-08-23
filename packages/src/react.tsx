import * as React from "react";
import { Vanisher } from "./index";
import { type VanisherWrapperProps } from "./types";
import { createWarningFunction, isNextJS, REACT_WARNING_CONFIG } from "./utils";

const showReactWarning = createWarningFunction(REACT_WARNING_CONFIG);

const VanisherReactWrapper: React.FC<VanisherWrapperProps> = ({
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

  React.useEffect(() => {
    const nextDetected = isNextJS();
    setIsNextEnvironment(nextDetected);

    if (nextDetected) {
      showReactWarning();
    }

    setIsMounted(true);
  }, []);

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

  if (isNextEnvironment) {
    return <>{fallback}</>;
  }

  return (
    <div ref={containerRef} className={className} style={style}>
      {children}
    </div>
  );
};

VanisherReactWrapper.displayName = "VanisherReactWrapper";

export { VanisherReactWrapper, type VanisherWrapperProps };
