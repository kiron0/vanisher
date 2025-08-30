import {
  type VanisherOptions,
  type VanisherResult,
  type VanisherWrapperProps,
} from "./types";

// Performance optimization: Cache frequently used values
const ONE_DAY_MS = 1000 * 60 * 60 * 24;
const ONE_HOUR_MS = 1000 * 60 * 60;
const MIN_OPACITY_CHANGE = 0.01;
const DEFAULT_UPDATE_INTERVAL = 1000 * 60 * 60; // 1 hour
const DEFAULT_FADE_DURATION = 300;

class Vanisher {
  private options: Required<VanisherOptions>;
  private targetElement: HTMLElement | null = null;
  private deadlineDate: Date;
  private initializedAt: Date;
  private updaterId: number | null = null;
  private rafId: number | null = null;
  private lastOpacity: number = 1;
  private lastUpdateTime: number = 0;
  private totalPeriod: number = 0;

  constructor(options: VanisherOptions) {
    this.deadlineDate =
      typeof options.deadline === "string"
        ? new Date(options.deadline)
        : options.deadline;

    this.validateDeadlineDate(this.deadlineDate);

    this.options = {
      deadline: this.deadlineDate,
      targetElement: options.targetElement || "body",
      onDeadlineReached: options.onDeadlineReached || (() => {}),
      updateIntervalMs: options.updateIntervalMs ?? DEFAULT_UPDATE_INTERVAL,
      fadeDurationMs: options.fadeDurationMs ?? DEFAULT_FADE_DURATION,
    };

    this.initializedAt = new Date();
    this.totalPeriod = this.calculateTotalPeriod();
    this.initialize();
  }

  private validateDeadlineDate(deadline: Date): void {
    if (isNaN(deadline.getTime())) {
      throw new Error(
        "Invalid deadline date provided. Please provide a valid Date object or date string.",
      );
    }
  }

  private initialize(): void {
    this.targetElement = this.getElement();

    if (this.targetElement) {
      this.setupElementStyles();
      this.applyOpacity();
      this.startAutoUpdater();
    } else {
      console.warn("Vanisher: Target element not found");
    }
  }

  private setupElementStyles(): void {
    if (!this.targetElement) return;

    // Only set transition if not already set
    if (!this.targetElement.style.transition) {
      this.targetElement.style.transition = `opacity ${this.options.fadeDurationMs}ms ease-in-out`;
    }
  }

  private getElement(): HTMLElement | null {
    if (typeof this.options.targetElement === "string") {
      return this.options.targetElement === "body"
        ? document.body
        : document.querySelector(this.options.targetElement);
    }
    return this.options.targetElement;
  }

  private getCurrentTime(): number {
    return Date.now();
  }

  private calculateTimeRemaining(currentTime: number = this.getCurrentTime()): {
    days: number;
    hours: number;
    totalMs: number;
  } {
    const timeDiff = this.deadlineDate.getTime() - currentTime;
    const days = Math.floor(timeDiff / ONE_DAY_MS);
    const hours = Math.floor((timeDiff % ONE_DAY_MS) / ONE_HOUR_MS);

    return {
      days,
      hours,
      totalMs: timeDiff,
    };
  }

  private calculateTotalPeriod(): number {
    const timeDiff = this.deadlineDate.getTime() - this.initializedAt.getTime();
    return Math.max(1, timeDiff);
  }

  private clamp(value: number, min = 0, max = 1): number {
    return Math.max(min, Math.min(max, value));
  }

  private calculateOpacity(
    currentTime: number = this.getCurrentTime(),
  ): number {
    const { totalMs } = this.calculateTimeRemaining(currentTime);
    if (totalMs <= 0) return 0;

    return this.clamp(totalMs / this.totalPeriod);
  }

  private applyOpacity(): void {
    if (!this.targetElement) return;

    const currentTime = this.getCurrentTime();

    // Throttle updates to prevent excessive calculations
    if (currentTime - this.lastUpdateTime < 16) {
      // ~60fps
      return;
    }

    this.lastUpdateTime = currentTime;

    const { totalMs } = this.calculateTimeRemaining(currentTime);
    const opacity = this.calculateOpacity(currentTime);

    // Only update if opacity change is significant
    if (Math.abs(this.lastOpacity - opacity) > MIN_OPACITY_CHANGE) {
      this.lastOpacity = opacity;

      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
      }

      this.rafId = requestAnimationFrame(() => {
        if (!this.targetElement) return;

        this.targetElement.style.opacity = opacity.toString();

        // Optimize: Only update pointer events when crossing the zero threshold
        if (
          opacity === 0 &&
          this.targetElement.style.pointerEvents !== "none"
        ) {
          this.targetElement.style.pointerEvents = "none";
          this.targetElement.style.userSelect = "none";
        } else if (
          opacity > 0 &&
          this.targetElement.style.pointerEvents === "none"
        ) {
          this.targetElement.style.pointerEvents = "";
          this.targetElement.style.userSelect = "";
        }
      });
    }

    if (totalMs <= 0) {
      this.options.onDeadlineReached();
      this.stopAutoUpdater();
    }
  }

  private startAutoUpdater(): void {
    if (this.updaterId !== null) return;

    this.updaterId = window.setInterval(() => {
      this.applyOpacity();
    }, this.options.updateIntervalMs);
  }

  private stopAutoUpdater(): void {
    if (this.updaterId !== null) {
      clearInterval(this.updaterId);
      this.updaterId = null;
    }

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  public getStatus(): VanisherResult {
    const currentTime = this.getCurrentTime();
    const { days: daysRemaining, hours: hoursRemaining } =
      this.calculateTimeRemaining(currentTime);
    const opacity = this.calculateOpacity(currentTime);

    return {
      opacity,
      daysRemaining: Math.max(0, daysRemaining),
      hoursRemaining: Math.max(0, hoursRemaining),
      isActive: daysRemaining > 0 || hoursRemaining > 0,
    };
  }

  public getDeadlineDate(): Date {
    return this.deadlineDate;
  }

  public getDaysRemaining(): number {
    return Math.max(0, this.calculateTimeRemaining().days);
  }

  public updateOptions(newOptions: Partial<VanisherOptions>): void {
    let needsReinitialization = false;

    if (newOptions.deadline) {
      const newDeadlineDate =
        typeof newOptions.deadline === "string"
          ? new Date(newOptions.deadline)
          : newOptions.deadline;

      this.validateDeadlineDate(newDeadlineDate);
      this.deadlineDate = newDeadlineDate;
      this.options.deadline = this.deadlineDate;
      this.initializedAt = new Date();
      this.totalPeriod = this.calculateTotalPeriod();
      needsReinitialization = true;
    }

    if (newOptions.targetElement !== undefined) {
      this.options.targetElement = newOptions.targetElement;
      this.targetElement = this.getElement();
      needsReinitialization = true;
    }

    if (newOptions.onDeadlineReached !== undefined) {
      this.options.onDeadlineReached = newOptions.onDeadlineReached;
    }

    if (newOptions.updateIntervalMs !== undefined) {
      this.options.updateIntervalMs = newOptions.updateIntervalMs;
      this.stopAutoUpdater();
      this.startAutoUpdater();
    }

    if (newOptions.fadeDurationMs !== undefined) {
      this.options.fadeDurationMs = newOptions.fadeDurationMs;
      if (this.targetElement) {
        this.targetElement.style.transition = `opacity ${this.options.fadeDurationMs}ms ease-in-out`;
      }
    }

    if (needsReinitialization) {
      this.setupElementStyles();
    }

    this.applyOpacity();
  }

  public reset(): void {
    if (this.targetElement) {
      this.targetElement.style.opacity = "1";
      this.targetElement.style.pointerEvents = "";
      this.targetElement.style.userSelect = "";
    }
    this.initializedAt = new Date();
    this.totalPeriod = this.calculateTotalPeriod();
    this.lastOpacity = 1;
    this.lastUpdateTime = 0;
    this.applyOpacity();
  }

  public destroy(): void {
    this.stopAutoUpdater();
    if (this.targetElement) {
      this.targetElement.style.opacity = "";
      this.targetElement.style.transition = "";
      this.targetElement.style.pointerEvents = "";
      this.targetElement.style.userSelect = "";
    }
    this.targetElement = null;
  }
}

// Optimized factory function
function createVanisher(options: VanisherOptions): Vanisher {
  return new Vanisher(options);
}

// Optimized global initialization
if (typeof window !== "undefined" && typeof document !== "undefined") {
  // Use a more efficient event listener
  const initVanisher = () => {
    try {
      const script = document.currentScript as HTMLScriptElement;
      if (script) {
        const deadline = script.getAttribute("data-deadline");
        if (deadline) {
          createVanisher({ deadline });
        }
      }
    } catch (error) {
      console.error("Vanisher initialization error:", error);
    }
  };

  // Use DOMContentLoaded or load event for better performance
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVanisher, { once: true });
  } else {
    initVanisher();
  }

  // Expose to global scope for script tag usage
  if (typeof (globalThis as any) !== "undefined") {
    (globalThis as any).Vanisher = Vanisher;
    (globalThis as any).createVanisher = createVanisher;
  }
}

export {
  createVanisher,
  Vanisher,
  type VanisherOptions,
  type VanisherResult,
  type VanisherWrapperProps,
};
