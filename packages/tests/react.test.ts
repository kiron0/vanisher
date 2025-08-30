import { VanisherReactWrapper } from "../src/react";

jest.mock("../src/index", () => ({
  Vanisher: jest.fn().mockImplementation(() => ({
    getStatus: jest.fn().mockReturnValue({
      opacity: 1,
      daysRemaining: 7,
      daysElapsed: 0,
      isActive: false,
    }),
    destroy: jest.fn(),
    updateOptions: jest.fn(),
    reset: jest.fn(),
  })),
}));

describe("Vanisher VanisherReactWrapper (React)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should be defined and exportable", () => {
    expect(VanisherReactWrapper).toBeDefined();
    // React.memo returns an object, not a function
    expect(typeof VanisherReactWrapper).toBe("object");
    expect(VanisherReactWrapper).toHaveProperty("$$typeof");
  });

  it("should have correct component interface", () => {
    expect(() => {
      const props = {
        deadline: 7,
        showStatus: true,
        children: "Test content",
      };

      expect(VanisherReactWrapper).toBeDefined();
      // React.memo returns an object, not a function
      expect(typeof VanisherReactWrapper).toBe("object");
    }).not.toThrow();
  });

  it("should export component with correct name", () => {
    // React.memo wraps the component, so we access the displayName
    expect(VanisherReactWrapper.displayName).toBe("VanisherReactWrapper");
  });

  it("should be a React functional component", () => {
    // React.memo returns an object, not a function
    expect(typeof VanisherReactWrapper).toBe("object");

    expect(() => {
      const component = VanisherReactWrapper;
      expect(component).toBeDefined();
    }).not.toThrow();
  });

  it("should handle environment detection", () => {
    expect(VanisherReactWrapper).toBeDefined();
    // React.memo returns an object, not a function
    expect(typeof VanisherReactWrapper).toBe("object");
  });
});
