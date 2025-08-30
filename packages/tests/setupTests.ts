// Setup file for Jest tests
// This file runs before each test file
import "@testing-library/jest-dom";

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Uncomment to suppress console.log in tests
  // log: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};

// Mock Date.now() for consistent testing - but allow override in individual tests
// const mockDate = new Date("2024-01-15T12:00:00Z");
// jest.spyOn(Date, "now").mockImplementation(() => mockDate.getTime());

// Mock performance.now() if needed
if (typeof performance !== "undefined") {
  jest.spyOn(performance, "now").mockImplementation(() => Date.now());
}

// Mock window properties for environment detection
Object.defineProperty(window, "__NEXT_DATA__", {
  value: undefined,
  writable: true,
});

Object.defineProperty(window, "__NEXT_ROUTER_BASEPATH__", {
  value: undefined,
  writable: true,
});

// Mock document.querySelector for environment detection
Object.defineProperty(document, "querySelector", {
  value: jest.fn().mockReturnValue(null),
  writable: true,
});

// Mock process.env for environment detection
Object.defineProperty(process, "env", {
  value: {
    NODE_ENV: "test",
    NEXT_PUBLIC_: undefined,
    __NEXT_DEV__: undefined,
  },
  writable: true,
});

// Reset environment detection cache before each test
beforeEach(() => {
  // Reset cache for environment detection
  jest.clearAllMocks();

  // Clear any warning registry
  try {
    const { clearWarningRegistry } = require("../src/utils/warnings");
    clearWarningRegistry();
  } catch (e) {
    // Ignore if not available
  }

  // Reset environment detection cache
  try {
    const { resetCache } = require("../src/utils/env");
    resetCache();
  } catch (e) {
    // Ignore if not available
  }
});
