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

// Mock Date.now() for consistent testing
const mockDate = new Date("2024-01-15T12:00:00Z");
jest.spyOn(Date, "now").mockImplementation(() => mockDate.getTime());

// Mock performance.now() if needed
if (typeof performance !== "undefined") {
  jest.spyOn(performance, "now").mockImplementation(() => Date.now());
}
