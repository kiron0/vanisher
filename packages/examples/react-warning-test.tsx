import React from "react";

// This import will trigger warnings/errors in regular React projects
// because it's designed for Next.js only
import { VanisherWrapper } from "../src/next";

/**
 * 🚨 WARNING: This example demonstrates what happens when you try to use
 * the Next.js component in a regular React project.
 *
 * In a real React project, you should use:
 * import { VanisherWrapper } from 'vanisher/react'
 *
 * This file is for testing the warning system only.
 */

function ReactWarningTest() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🚨 React Warning Test</h1>
      <p>
        This component will show warnings when used in a regular React project.
      </p>

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
            But first, you should see warnings about using Next.js component in
            React!
          </p>
        </div>
      </VanisherWrapper>
    </div>
  );
}

export default ReactWarningTest;
