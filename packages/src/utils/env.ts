// Cache for environment detection results
let isNextJSCached: boolean | null = null;
let isClientCached: boolean | null = null;

const isNextJS = (): boolean => {
  // Return cached result if available
  if (isNextJSCached !== null) {
    return isNextJSCached;
  }

  // Server-side detection (Node.js environment)
  if (typeof window === "undefined") {
    // Check for Next.js specific environment variables
    if (typeof process !== "undefined" && process.env) {
      isNextJSCached = !!(
        process.env["NEXT_PUBLIC_"] ||
        process.env["__NEXT_DEV__"] ||
        process.env["__NEXT_PRIVATE__"]
      );
      return isNextJSCached;
    }
    isNextJSCached = false;
    return false;
  }

  // Client-side detection
  // 1. Check for Next.js data attribute (most reliable)
  if ((window as any).__NEXT_DATA__) {
    isNextJSCached = true;
    return true;
  }

  // 2. Check for Next.js router
  if ((window as any).next && (window as any).next.router) {
    isNextJSCached = true;
    return true;
  }

  // 3. Check for Next.js specific functions
  if (typeof (window as any).__NEXT_REGISTER_PAGE === "function") {
    isNextJSCached = true;
    return true;
  }

  // 4. Check for Next.js specific meta tags (only if document is available)
  try {
    if (typeof document !== "undefined") {
      const nextMeta = document.querySelector('meta[name="next-head-count"]');
      if (nextMeta) {
        isNextJSCached = true;
        return true;
      }
    }
  } catch (e) {
    // Ignore errors
  }

  isNextJSCached = false;
  return false;
};

const isClient = (): boolean => {
  // Return cached result if available
  if (isClientCached !== null) {
    return isClientCached;
  }

  isClientCached = typeof window !== "undefined";
  return isClientCached;
};

// Reset cache function for testing purposes
const resetCache = (): void => {
  isNextJSCached = null;
  isClientCached = null;
};

export { isClient, isNextJS, resetCache };
