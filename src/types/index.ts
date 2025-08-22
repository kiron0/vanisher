interface VanisherOptions {
  deadline: Date | string;
  targetElement?: string | HTMLElement;
  onDeadlineReached?: () => void;
  updateIntervalMs?: number;
  fadeDurationMs?: number;
}

interface VanisherResult {
  opacity: number;
  daysRemaining: number;
  hoursRemaining: number;
  isActive: boolean;
}

interface VanisherWrapperProps extends Omit<VanisherOptions, "targetElement"> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  fallback?: React.ReactNode;
}

interface EnvDetectionResult {
  isNextJS: boolean;
  isClient: boolean;
}

interface WarningConfig {
  title: string;
  message: string;
  currentImport: string;
  recommendedImport: string;
  errorMessage: string;
}

export {
  type EnvDetectionResult,
  type VanisherOptions,
  type VanisherResult,
  type VanisherWrapperProps,
  type WarningConfig,
};
