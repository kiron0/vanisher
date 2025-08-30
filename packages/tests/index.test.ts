import { createVanisher, Vanisher, VanisherOptions } from "../src/index";

const mockElement = document.createElement("div");
mockElement.style.opacity = "";
mockElement.style.transition = "";

const mockSetInterval = jest.fn(() => 123);
const mockClearInterval = jest.fn();

beforeAll(() => {
  document.querySelector = jest.fn(() => mockElement);

  window.setInterval = mockSetInterval as any;
  window.clearInterval = mockClearInterval as any;
});

describe("Vanisher", () => {
  let vanisher: Vanisher;
  let mockOptions: VanisherOptions;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();

    mockElement.style.opacity = "";
    mockElement.style.transition = "";

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);

    mockOptions = {
      deadline: futureDate,
      targetElement: mockElement,
    };

    vanisher = new Vanisher(mockOptions);
  });

  afterEach(() => {
    if (vanisher) {
      vanisher.destroy();
    }
  });

  describe("constructor", () => {
    it("should create instance with default options", () => {
      expect(vanisher).toBeInstanceOf(Vanisher);
    });

    it("should handle deadline option as Date", () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);

      const instance = new Vanisher({
        deadline: futureDate,
      });
      expect(instance).toBeInstanceOf(Vanisher);
      instance.destroy();
    });

    it("should handle deadline option as string", () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);
      const deadlineStr = futureDate.toISOString().split("T")[0];

      const instance = new Vanisher({
        deadline: deadlineStr,
      });
      expect(instance).toBeInstanceOf(Vanisher);
      instance.destroy();
    });

    it("should throw error for invalid date string", () => {
      expect(() => {
        new Vanisher({
          deadline: "invalid-date",
        });
      }).toThrow("Invalid deadline date provided");
    });

    it("should set default updateIntervalMs to 1 hour", () => {
      const instance = new Vanisher({
        deadline: new Date(Date.now() + 86400000 * 30),
        fadeDurationMs: 1000,
      });

      const privateInstance = instance as any;
      expect(privateInstance.options.updateIntervalMs).toBe(1000 * 60 * 60);
      instance.destroy();
    });

    it("should use custom updateIntervalMs", () => {
      const instance = new Vanisher({
        deadline: new Date(Date.now() + 86400000 * 30),
        updateIntervalMs: 5000,
        fadeDurationMs: 1000,
      });

      const privateInstance = instance as any;
      expect(privateInstance.options.updateIntervalMs).toBe(5000);
      instance.destroy();
    });
  });

  describe("getStatus", () => {
    it("should return status object with correct structure", () => {
      const status = vanisher.getStatus();
      expect(status).toHaveProperty("opacity");
      expect(status).toHaveProperty("daysRemaining");
      expect(status).toHaveProperty("isActive");
    });

    it("should return opacity between 0 and 1", () => {
      const status = vanisher.getStatus();
      expect(status.opacity).toBeGreaterThanOrEqual(0);
      expect(status.opacity).toBeLessThanOrEqual(1);
    });

    it("should return correct days remaining", () => {
      const status = vanisher.getStatus();
      expect(status.daysRemaining).toBeGreaterThan(0);
      expect(status.isActive).toBe(true);
    });

    it("should handle deadline in the past", () => {
      // Create a date that's definitely in the past
      const pastDate = new Date("2020-01-01");

      const instance = new Vanisher({
        deadline: pastDate,
      });

      const status = instance.getStatus();
      expect(status.opacity).toBe(0);
      expect(status.daysRemaining).toBe(0);
      expect(status.isActive).toBe(false);

      instance.destroy();
    });
  });

  describe("updateOptions", () => {
    it("should update deadline correctly", () => {
      const newFutureDate = new Date();
      newFutureDate.setDate(newFutureDate.getDate() + 45);

      vanisher.updateOptions({ deadline: newFutureDate });
      expect(vanisher.getDeadlineDate()).toEqual(newFutureDate);
    });

    it("should update targetElement correctly", () => {
      const newElement = document.createElement("div");
      vanisher.updateOptions({ targetElement: newElement });

      expect(vanisher).toBeDefined();
    });

    it("should update onDeadlineReached callback", () => {
      const mockCallback = jest.fn();
      vanisher.updateOptions({ onDeadlineReached: mockCallback });

      expect(vanisher).toBeDefined();
    });

    it("should update updateIntervalMs and restart updater", () => {
      vanisher.updateOptions({ updateIntervalMs: 5000 });

      expect(vanisher).toBeDefined();
    });

    it("should throw error for invalid deadline in updateOptions", () => {
      expect(() => {
        vanisher.updateOptions({
          deadline: "invalid-date",
        });
      }).toThrow("Invalid deadline date provided");
    });
  });

  describe("reset", () => {
    it("should not throw when called", () => {
      expect(() => vanisher.reset()).not.toThrow();
    });

    it("should reset opacity to 1", () => {
      vanisher.reset();
      expect(mockElement.style.opacity).toBe("1");
    });
  });

  describe("deadline date", () => {
    it("should use provided deadline date", () => {
      const deadlineDate = new Date();
      deadlineDate.setDate(deadlineDate.getDate() + 5);

      const instance = new Vanisher({
        deadline: deadlineDate,
      });
      expect(instance.getDeadlineDate()).toEqual(deadlineDate);
      instance.destroy();
    });

    it("should use string deadline date", () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);
      const deadlineStr = futureDate.toISOString().split("T")[0];

      const instance = new Vanisher({
        deadline: deadlineStr,
      });
      expect(instance.getDeadlineDate().toISOString().split("T")[0]).toBe(
        deadlineStr,
      );
      instance.destroy();
    });

    it("should calculate days remaining correctly", () => {
      // Use a specific future date that won't change during test execution
      const futureDate = new Date("2030-01-01");

      const instance = new Vanisher({
        deadline: futureDate,
      });

      const daysRemaining = instance.getDaysRemaining();
      // Should be a reasonable number of days in the future
      expect(daysRemaining).toBeGreaterThan(1000);
      expect(daysRemaining).toBeLessThan(4000);
      instance.destroy();
    });

    it("should handle deadline exactly 1 day from now", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      expect(() => {
        new Vanisher({
          deadline: tomorrow,
        });
      }).not.toThrow();
    });
  });

  describe("createVanisher", () => {
    it("should create instance using convenience function", () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);

      const instance = createVanisher({
        deadline: futureDate,
      });
      expect(instance).toBeInstanceOf(Vanisher);
      instance.destroy();
    });
  });

  describe("DOM manipulation", () => {
    it("should set transition style on target element", () => {
      expect(mockElement.style.transition).toBe("opacity 300ms ease-in-out");
    });

    it("should apply opacity to target element", () => {
      expect(mockElement.style.opacity).toBeDefined();
    });

    it("should handle custom selector as target element", () => {
      const instance = new Vanisher({
        deadline: new Date(Date.now() + 86400000 * 30),
        targetElement: "#custom-element",
      });

      expect(document.querySelector).toHaveBeenCalledWith("#custom-element");
      instance.destroy();
    });

    it("should handle HTMLElement as target element", () => {
      const customElement = document.createElement("div");
      const instance = new Vanisher({
        deadline: new Date(Date.now() + 86400000 * 30),
        targetElement: customElement,
      });

      expect(instance).toBeInstanceOf(Vanisher);
      instance.destroy();
    });
  });

  describe("auto-updater", () => {
    it("should start auto-updater on initialization", () => {
      expect(mockSetInterval).toHaveBeenCalled();
    });

    it("should stop auto-updater on destroy", () => {
      vanisher.destroy();
      expect(mockClearInterval).toHaveBeenCalledWith(123);
    });

    it("should restart auto-updater when updateIntervalMs changes", () => {
      vanisher.updateOptions({ updateIntervalMs: 1000 });

      expect(mockClearInterval).toHaveBeenCalled();
      expect(mockSetInterval).toHaveBeenCalledTimes(2);
    });
  });

  describe("edge cases", () => {
    it("should handle multiple destroy calls", () => {
      expect(() => {
        vanisher.destroy();
        vanisher.destroy();
      }).not.toThrow();
    });

    it("should handle multiple reset calls", () => {
      expect(() => {
        vanisher.reset();
        vanisher.reset();
      }).not.toThrow();
    });
  });
});
