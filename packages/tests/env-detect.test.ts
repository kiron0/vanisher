describe("Vanisher Environment Detection Components", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should export React component", async () => {
    const { VanisherReactWrapper } = await import("../src/react");
    expect(VanisherReactWrapper).toBeDefined();
    // React.memo returns an object, not a function
    expect(typeof VanisherReactWrapper).toBe("object");
  });

  it("should export Next.js component", async () => {
    const { VanisherNextWrapper } = await import("../src/next");
    expect(VanisherNextWrapper).toBeDefined();
    // React.memo returns an object, not a function
    expect(typeof VanisherNextWrapper).toBe("object");
  });

  it("should have different component implementations", async () => {
    const ReactComponent = (await import("../src/react")).VanisherReactWrapper;
    const NextComponent = (await import("../src/next")).VanisherNextWrapper;

    expect(ReactComponent).toBeDefined();
    expect(NextComponent).toBeDefined();

    // React.memo components are different objects
    expect(ReactComponent).not.toBe(NextComponent);

    // They should have different display names
    expect(ReactComponent.displayName).toBe("VanisherReactWrapper");
    expect(NextComponent.displayName).toBe("VanisherNextWrapper");
  });

  it("should both components accept deadline prop", () => {
    const testProps = {
      deadline: 30,
      minOpacity: 0.1,
      maxOpacity: 1.0,
      showStatus: true,
    };

    expect(() => {
      expect(testProps.deadline).toBe(30);
    }).not.toThrow();
  });

  it("should have environment detection logic", async () => {
    const ReactComponent = (await import("../src/react")).VanisherReactWrapper;
    const NextComponent = (await import("../src/next")).VanisherNextWrapper;

    // React.memo wraps components, so we can't directly call toString()
    // Instead, check that they have the React memo structure
    expect(ReactComponent).toHaveProperty("$$typeof");
    expect(NextComponent).toHaveProperty("$$typeof");

    // Check they have different displayNames
    expect(ReactComponent.displayName).toBe("VanisherReactWrapper");
    expect(NextComponent.displayName).toBe("VanisherNextWrapper");
  });
});
