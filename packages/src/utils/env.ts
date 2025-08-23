const isNextJS = (): boolean => {
  // Server-side detection (Node.js environment)
  if (typeof window === "undefined") {
    // Check for Next.js specific environment variables
    if (typeof process !== "undefined" && process.env) {
      return !!(
        process.env["NEXT_PUBLIC_"] ||
        process.env["__NEXT_DEV__"] ||
        process.env["__NEXT_PRIVATE__"]
      );
    }
    return false;
  }

  // Client-side detection
  // 1. Check for Next.js data attribute (most reliable)
  if ((window as any).__NEXT_DATA__) {
    return true;
  }

  // 2. Check for Next.js router
  if ((window as any).next && (window as any).next.router) {
    return true;
  }

  // 3. Check for Next.js specific functions
  if (typeof (window as any).__NEXT_REGISTER_PAGE === "function") {
    return true;
  }

  // 4. Check for Next.js specific meta tags
  try {
    const nextMeta = document.querySelector('meta[name="next-head-count"]');
    if (nextMeta) {
      return true;
    }
  } catch (e) {
    // Ignore errors
  }

  return false;
};

const isClient = (): boolean => {
  return typeof window !== "undefined";
};

export { isClient, isNextJS };
