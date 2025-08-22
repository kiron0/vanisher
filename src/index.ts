export interface VanisherOptions {
  deadline: Date | string; // Date when website should be completely faded
  targetElement?: string | HTMLElement;
  onDeadlineReached?: () => void;
  updateIntervalMs?: number; // auto-update interval in milliseconds
}

export interface VanisherResult {
  opacity: number;
  daysRemaining: number;
  isActive: boolean;
}

export class Vanisher {
  private options: Required<VanisherOptions>;
  private targetElement: HTMLElement | null = null;
  private deadlineDate: Date;
  private initializedAt: Date;
  private updaterId: number | null = null;

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
      updateIntervalMs: options.updateIntervalMs ?? 1000 * 60 * 60 * 24, // default: 1 day
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
      if (!this.targetElement.style.transition) {
        this.targetElement.style.transition = "opacity 0.3s ease-in-out";
      }
      this.applyOpacity();
      this.startAutoUpdater();
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

  private calculateDaysRemaining(
    currentDate: Date = this.getCurrentDate(),
  ): number {
    const timeDiff = this.deadlineDate.getTime() - currentDate.getTime();
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  }

  private calculateTotalPeriod(): number {
    const timeDiff = this.deadlineDate.getTime() - this.initializedAt.getTime();
    return Math.max(1, Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
  }

  private clamp(value: number, min = 0, max = 1): number {
    return Math.max(min, Math.min(max, value));
  }

  private calculateOpacity(currentDate: Date = this.getCurrentDate()): number {
    const daysRemaining = this.calculateDaysRemaining(currentDate);
    if (daysRemaining <= 0) return 0;
    return this.clamp(daysRemaining / this.calculateTotalPeriod());
  }

  private applyOpacity(): void {
    if (!this.targetElement) return;

    const currentDate = this.getCurrentDate();
    const daysRemaining = this.calculateDaysRemaining(currentDate);
    const opacity = this.calculateOpacity(currentDate);

    this.targetElement.style.opacity = opacity.toString();
    this.targetElement.style.pointerEvents = opacity === 0 ? "none" : "";
    this.targetElement.style.userSelect = opacity === 0 ? "none" : "";
    document.body.style.overflow = opacity === 0 ? "hidden" : "";
    document.body.style.touchAction = opacity === 0 ? "none" : "";
    document.body.style.cursor = opacity === 0 ? "default" : "";

    if (daysRemaining <= 0) {
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
  }

  public getStatus(): VanisherResult {
    const currentDate = this.getCurrentDate();
    const daysRemaining = this.calculateDaysRemaining(currentDate);
    const opacity = this.calculateOpacity(currentDate);

    return {
      opacity,
      daysRemaining: Math.max(0, daysRemaining),
      isActive: daysRemaining > 0,
    };
  }

  public getDeadlineDate(): Date {
    return this.deadlineDate;
  }

  public getDaysRemaining(): number {
    return this.calculateDaysRemaining();
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

    this.applyOpacity();
  }

  public reset(): void {
    if (this.targetElement) {
      this.targetElement.style.opacity = "1";
    }
    this.initializedAt = new Date();
    this.applyOpacity();
  }

  public destroy(): void {
    this.stopAutoUpdater();
  }
}

// Convenience function
export function createVanisher(options: VanisherOptions): Vanisher {
  return new Vanisher(options);
}

// Auto-init from script tag attributes
if (typeof window !== "undefined" && typeof document !== "undefined") {
  const script = document.currentScript as HTMLScriptElement;
  if (script) {
    const deadline = script.getAttribute("data-deadline");
    if (deadline) {
      createVanisher({ deadline });
    }
  }

  if (typeof (globalThis as any) !== "undefined") {
    (globalThis as any).Vanisher = Vanisher;
    (globalThis as any).createVanisher = createVanisher;
  }
}
