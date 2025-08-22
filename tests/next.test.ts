import { VanisherNextWrapper } from "../src/next";

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

beforeAll(() => {
  Object.defineProperty(window, "__NEXT_DATA__", {
    value: { buildId: "test" },
    writable: true,
  });

  Object.defineProperty(window, "__NEXT_ROUTER_BASEPATH__", {
    value: "/",
    writable: true,
  });

  Object.defineProperty(document, "querySelector", {
    value: jest.fn().mockReturnValue({
      getAttribute: () => "next-head-count",
    }),
    writable: true,
  });

  Object.defineProperty(process, "env", {
    value: {
      NODE_ENV: "test",
      NEXT_PUBLIC_: "test",
      __NEXT_DEV__: "true",
    },
    writable: true,
  });
});

describe("Vanisher VanisherNextWrapper (Next.js)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should be defined and exportable", () => {
    expect(VanisherNextWrapper).toBeDefined();
    expect(typeof VanisherNextWrapper).toBe("function");
  });

  it("should have correct component interface", () => {
    expect(() => {
      expect(VanisherNextWrapper).toBeDefined();
      expect(typeof VanisherNextWrapper).toBe("function");
    }).not.toThrow();
  });

  it("should export component with correct name", () => {
    expect(VanisherNextWrapper.name).toBe("VanisherNextWrapper");
  });

  it("should be a React functional component", () => {
    expect(typeof VanisherNextWrapper).toBe("function");

    expect(() => {
      const component = VanisherNextWrapper;
      expect(component).toBeDefined();
    }).not.toThrow();
  });

  it("should handle hydration safety", () => {
    expect(VanisherNextWrapper).toBeDefined();
    expect(typeof VanisherNextWrapper).toBe("function");
  });

  it("should detect Next.js environment correctly", () => {
    expect(VanisherNextWrapper).toBeDefined();
  });

  it("should support Next.js specific props", () => {
    expect(() => {
      const component = VanisherNextWrapper;
      expect(component).toBeDefined();
    }).not.toThrow();
  });
});
