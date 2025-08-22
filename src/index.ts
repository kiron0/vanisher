export interface VanisherOptions {
  deadline: Date | string; // Date when website should be completely faded
  targetElement?: string | HTMLElement;
  onDeadlineReached?: () => void;
  updateIntervalMs?: number; // auto-update interval in milliseconds
  fadeDurationMs?: number; // duration of fade transition
}

export interface VanisherResult {
  opacity: number;
  daysRemaining: number;
  hoursRemaining: number;
  isActive: boolean;
}

export class Vanisher {
  private options: Required<VanisherOptions>;
  private targetElement: HTMLElement | null = null;
  private deadlineDate: Date;
  private initializedAt: Date;
  private updaterId: number | null = null;
  private rafId: number | null = null;
  private lastOpacity: number = 1;

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
      updateIntervalMs: options.updateIntervalMs ?? 1000 * 60 * 60, // default: 1 hour (more frequent)
      fadeDurationMs: options.fadeDurationMs ?? 300, // default fade duration
    };

    this.initializedAt = new Date();
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
      // Set up transition only once
      if (!this.targetElement.style.transition) {
        this.targetElement.style.transition = `opacity ${this.options.fadeDurationMs}ms ease-in-out`;
      }
      this.applyOpacity();
      this.startAutoUpdater();
    } else {
      console.warn("Vanisher: Target element not found");
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

  private getCurrentDate(): Date {
    return new Date();
  }

  private calculateTimeRemaining(currentDate: Date = this.getCurrentDate()): {
    days: number;
    hours: number;
    totalMs: number;
  } {
    const timeDiff = this.deadlineDate.getTime() - currentDate.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    return {
      days,
      hours,
      totalMs: timeDiff,
    };
  }

  private calculateTotalPeriod(): number {
    const timeDiff = this.deadlineDate.getTime() - this.initializedAt.getTime();
    return Math.max(1, timeDiff); // Return milliseconds for more precision
  }

  private clamp(value: number, min = 0, max = 1): number {
    return Math.max(min, Math.min(max, value));
  }

  private calculateOpacity(currentDate: Date = this.getCurrentDate()): number {
    const { totalMs } = this.calculateTimeRemaining(currentDate);
    if (totalMs <= 0) return 0;

    const totalPeriod = this.calculateTotalPeriod();
    return this.clamp(totalMs / totalPeriod);
  }

  private applyOpacity(): void {
    if (!this.targetElement) return;

    const currentDate = this.getCurrentDate();
    const { days: daysRemaining, totalMs } =
      this.calculateTimeRemaining(currentDate);
    const opacity = this.calculateOpacity(currentDate);

    // Only update if opacity has changed significantly
    if (Math.abs(this.lastOpacity - opacity) > 0.01) {
      this.lastOpacity = opacity;

      // Use requestAnimationFrame for smoother updates
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
      }

      this.rafId = requestAnimationFrame(() => {
        this.targetElement!.style.opacity = opacity.toString();

        if (opacity === 0) {
          this.targetElement!.style.pointerEvents = "none";
          this.targetElement!.style.userSelect = "none";
        } else {
          this.targetElement!.style.pointerEvents = "";
          this.targetElement!.style.userSelect = "";
        }
      });
    }

    if (totalMs <= 0) {
      this.options.onDeadlineReached();
      this.stopAutoUpdater();
    }
  }

  private startAutoUpdater(): void {
    if (this.updaterId !== null) return; // already running

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
    const currentDate = this.getCurrentDate();
    const { days: daysRemaining, hours: hoursRemaining } =
      this.calculateTimeRemaining(currentDate);
    const opacity = this.calculateOpacity(currentDate);

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
    if (newOptions.deadline) {
      const newDeadlineDate =
        typeof newOptions.deadline === "string"
          ? new Date(newOptions.deadline)
          : newOptions.deadline;

      this.validateDeadlineDate(newDeadlineDate);
      this.deadlineDate = newDeadlineDate;
      this.options.deadline = this.deadlineDate;
      this.initializedAt = new Date();
    }

    if (newOptions.targetElement !== undefined) {
      this.options.targetElement = newOptions.targetElement;
      this.targetElement = this.getElement();
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

    this.applyOpacity();
  }

  public reset(): void {
    if (this.targetElement) {
      this.targetElement.style.opacity = "1";
      this.targetElement.style.pointerEvents = "";
      this.targetElement.style.userSelect = "";
    }
    this.initializedAt = new Date();
    this.lastOpacity = 1;
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
  }
}

// Convenience function
export function createVanisher(options: VanisherOptions): Vanisher {
  return new Vanisher(options);
}

// Auto-init from script tag attributes with better error handling
if (typeof window !== "undefined" && typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
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
  });

  if (typeof (globalThis as any) !== "undefined") {
    (globalThis as any).Vanisher = Vanisher;
    (globalThis as any).createVanisher = createVanisher;
  }
}
