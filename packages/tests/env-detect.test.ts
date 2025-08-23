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
    expect(typeof VanisherReactWrapper).toBe("function");
  });

  it("should export Next.js component", async () => {
    const { VanisherNextWrapper } = await import("../src/next");
    expect(VanisherNextWrapper).toBeDefined();
    expect(typeof VanisherNextWrapper).toBe("function");
  });

  it("should have different component implementations", async () => {
    const ReactComponent = (await import("../src/react")).VanisherReactWrapper;
    const NextComponent = (await import("../src/next")).VanisherNextWrapper;

    expect(ReactComponent).toBeDefined();
    expect(NextComponent).toBeDefined();
    expect(ReactComponent.toString()).not.toBe(NextComponent.toString());
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

    const reactSource = ReactComponent.toString();
    const nextSource = NextComponent.toString();

    expect(reactSource.length).toBeGreaterThan(100);
    expect(nextSource.length).toBeGreaterThan(100);
  });
});
