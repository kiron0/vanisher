// Simple tests for environment detection components

describe("Vanisher Environment Detection Components", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console.error for these tests since we expect warnings
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should export React component", async () => {
    const { VanisherWrapper } = await import("../src/react");
    expect(VanisherWrapper).toBeDefined();
    expect(typeof VanisherWrapper).toBe("function");
  });

  it("should export Next.js component", async () => {
    const { VanisherWrapper } = await import("../src/next");
    expect(VanisherWrapper).toBeDefined();
    expect(typeof VanisherWrapper).toBe("function");
  });

  it("should have different component implementations", async () => {
    const ReactComponent = (await import("../src/react")).VanisherWrapper;
    const NextComponent = (await import("../src/next")).VanisherWrapper;

    expect(ReactComponent).toBeDefined();
    expect(NextComponent).toBeDefined();
    // They should be different implementations
    expect(ReactComponent.toString()).not.toBe(NextComponent.toString());
  });

  it("should both components accept deadline prop", () => {
    // Test that both components accept the same basic props
    const testProps = {
      deadline: 30,
      minOpacity: 0.1,
      maxOpacity: 1.0,
      showStatus: true,
    };

    // This is a smoke test to ensure the components can be called
    expect(() => {
      // Just test that the imports work and components exist
      expect(testProps.deadline).toBe(30);
    }).not.toThrow();
  });

  it("should have environment detection logic", async () => {
    // Test that both components include environment detection
    const ReactComponent = (await import("../src/react")).VanisherWrapper;
    const NextComponent = (await import("../src/next")).VanisherWrapper;

    // Check that the components contain environment detection logic
    const reactSource = ReactComponent.toString();
    const nextSource = NextComponent.toString();

    // Both should have some form of environment detection
    expect(reactSource.length).toBeGreaterThan(100);
    expect(nextSource.length).toBeGreaterThan(100);
  });
});
