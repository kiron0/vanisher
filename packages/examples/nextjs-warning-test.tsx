"use client";

import React from "react";

// This import will trigger warnings/errors in Next.js projects
// because it's designed for regular React only
import { VanisherWrapper } from "../src/react";

/**
 * 🚨 WARNING: This example demonstrates what happens when you try to use
 * the React component in a Next.js project.
 *
 * In a real Next.js project, you should use:
 * import { VanisherWrapper } from 'vanisher/next'
 *
 * This file is for testing the warning system only.
 */

function NextJSWarningTest() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🚨 Next.js Warning Test</h1>
      <p>This component will show warnings when used in a Next.js project.</p>

      <div
        style={{
          background: "#fff3cd",
          border: "1px solid #ffeaa7",
          padding: "15px",
          borderRadius: "5px",
          margin: "20px 0",
        }}
      >
        <strong>Expected Behavior:</strong>
        <ul>
          <li>Console error with detailed warning message</li>
          <li>Browser alert in development mode</li>
          <li>Runtime error in production mode</li>
        </ul>
      </div>

      <VanisherWrapper
        deadline={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
        onDeadlineReached={() => alert("Deadline reached!")}
      >
        <div
          style={{
            background: "linear-gradient(45deg, #667eea, #764ba2)",
            color: "white",
            padding: "40px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h2>This content will fade away</h2>
          <p>
            But first, you should see warnings about using React component in
            Next.js!
          </p>
        </div>
      </VanisherWrapper>
    </div>
  );
}

export default NextJSWarningTest;
