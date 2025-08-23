import React, { useState } from "react";
import { VanisherWrapper } from "../src/react";

// Example React component demonstrating vanisher functionality
function VanisherDemo() {
  const [deadline, setDeadline] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  ); // 7 days from now

  const handleDeadlineReached = () => {
    alert("⚠️ Time is up! Website has completely faded away.");
  };

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (newDate > new Date()) {
      setDeadline(newDate);
    } else {
      alert("Deadline must be in the future!");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: 0, padding: 20 }}>
      <VanisherWrapper
        deadline={deadline}
        onDeadlineReached={handleDeadlineReached}
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h1>🌅 React Vanisher Demo</h1>
          <p>
            This React component will gradually fade away until the deadline is
            reached.
          </p>

          <div
            style={{
              background: "rgba(0, 0, 0, 0.3)",
              padding: 20,
              borderRadius: 8,
              margin: 20,
            }}
          >
            <h3>Controls</h3>

            <div style={{ marginBottom: 15 }}>
              <label style={{ marginRight: 10 }}>
                Deadline:
                <input
                  type="date"
                  value={deadline.toISOString().split("T")[0]}
                  onChange={handleDeadlineChange}
                  min={
                    new Date(Date.now() + 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split("T")[0]
                  }
                  style={{
                    marginLeft: 5,
                    padding: 5,
                    borderRadius: 4,
                    width: 150,
                  }}
                />
              </label>
            </div>

            <div style={{ marginBottom: 15 }}>
              <p style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>
                Current deadline: {deadline.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div
            style={{
              background: "rgba(255, 193, 7, 0.2)",
              border: "1px solid #ffc107",
              padding: 15,
              borderRadius: 8,
              margin: 20,
            }}
          >
            <strong>⚠️ Demo Information:</strong>
            <ul style={{ textAlign: "left", display: "inline-block" }}>
              <li>This demonstrates the React component wrapper</li>
              <li>Adjust the deadline above to see real-time changes</li>
              <li>Perfect for creating urgency in React applications</li>
              <li>
                Can be used for invoices, offers, or any time-sensitive content
              </li>
            </ul>
          </div>

          <div style={{ marginTop: 40 }}>
            <h3>Use Cases:</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: 20,
                marginTop: 20,
              }}
            >
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.2)",
                  padding: 20,
                  borderRadius: 8,
                }}
              >
                <h4>💰 Unpaid Invoices</h4>
                <p>Gradually fade client websites until payment is received</p>
              </div>
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.2)",
                  padding: 20,
                  borderRadius: 8,
                }}
              >
                <h4>⏰ Limited Offers</h4>
                <p>Create urgency for time-sensitive promotions</p>
              </div>
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.2)",
                  padding: 20,
                  borderRadius: 8,
                }}
              >
                <h4>📅 Event Countdowns</h4>
                <p>Fade content as events approach</p>
              </div>
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.2)",
                  padding: 20,
                  borderRadius: 8,
                }}
              >
                <h4>🔒 Trial Expirations</h4>
                <p>Encourage upgrades as trial periods end</p>
              </div>
            </div>
          </div>
        </div>
      </VanisherWrapper>
    </div>
  );
}

export default VanisherDemo;
