import type { WarningConfig } from "../types";

const createWarningFunction = (config: WarningConfig) => {
  let hasWarned = false;

  return () => {
    if (hasWarned) return;
    hasWarned = true;

    const warningMessage = `
🚨 ${config.title}

${config.message}

To fix this:
1. ${config.recommendedImport}
2. Or use the base component: import { Vanisher } from 'vanisher'

Current import: ${config.currentImport}
Recommended import: ${config.recommendedImport}
`;

    console.error(warningMessage);

    if (
      process.env["NODE_ENV"] === "development" ||
      process.env["NODE_ENV"] === "test"
    ) {
      alert(`🚨 ${config.title}! Check console for details.`);
    }

    if (process.env["NODE_ENV"] === "production") {
      throw new Error(config.errorMessage);
    }
  };
};

const REACT_WARNING_CONFIG: WarningConfig = {
  title: "REACT COMPONENT USED IN NEXT.JS PROJECT!",
  message:
    "You're trying to use the React-specific component in a Next.js project.\nThis component is designed for regular React projects and may not work properly with Next.js.",
  currentImport: "vanisher/react",
  recommendedImport:
    "Use the Next.js component instead: import { VanisherWrapper } from 'vanisher/next'",
  errorMessage:
    "React component should not be used in Next.js projects. Use vanisher/next instead.",
};

const NEXTJS_WARNING_CONFIG: WarningConfig = {
  title: "NEXT.JS COMPONENT USED IN REGULAR REACT PROJECT!",
  message:
    "You're trying to use the Next.js-specific component in a regular React project.\nThis component requires Next.js 13+ with App Router for proper functionality.",
  currentImport: "vanisher/next",
  recommendedImport:
    "Use the regular React component instead: import { VanisherWrapper } from 'vanisher/react'",
  errorMessage:
    "Next.js component cannot be used in regular React projects. Use vanisher/react instead.",
};

export { createWarningFunction, NEXTJS_WARNING_CONFIG, REACT_WARNING_CONFIG };
