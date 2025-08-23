# Basic Usage

Learn the fundamentals with a basic HTML page that demonstrates core VanisherJS functionality.

## HTML Implementation

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VanisherJS Basic Example</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        line-height: 1.6;
      }

      .content {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px;
        border-radius: 12px;
        margin: 20px 0;
      }

      .status {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
      }

      .controls {
        display: flex;
        gap: 10px;
        margin: 20px 0;
      }

      button {
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        background: #007bff;
        color: white;
        cursor: pointer;
        font-size: 14px;
      }

      button:hover {
        background: #0056b3;
      }

      button:disabled {
        background: #6c757d;
        cursor: not-allowed;
      }

      .progress-bar {
        width: 100%;
        height: 20px;
        background: #e9ecef;
        border-radius: 10px;
        overflow: hidden;
        margin: 10px 0;
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #28a745, #20c997);
        transition: width 0.3s ease;
      }
    </style>
  </head>
  <body>
    <h1>🚀 VanisherJS Basic Example</h1>

    <div class="content" id="fade-content">
      <h2>This content will fade out!</h2>
      <p>
        This content will gradually become transparent until the deadline is
        reached.
      </p>
      <p>Set a deadline below and watch the magic happen!</p>
    </div>

    <div class="status">
      <h3>Current Status</h3>
      <div id="status-display">Not initialized</div>

      <div class="progress-bar">
        <div class="progress-fill" id="progress-bar"></div>
      </div>

      <div id="time-remaining">Set a deadline to see time remaining</div>
    </div>

    <div class="controls">
      <input
        type="datetime-local"
        id="deadline-input"
        value="2024-12-31T23:59"
      />
      <button onclick="startVanisher()">Start Fading</button>
      <button onclick="resetVanisher()" id="reset-btn" disabled>Reset</button>
      <button onclick="destroyVanisher()" id="destroy-btn" disabled>
        Destroy
      </button>
    </div>

    <div class="status">
      <h3>How It Works</h3>
      <ol>
        <li>Set a deadline using the datetime picker</li>
        <li>Click "Start Fading" to initialize VanisherJS</li>
        <li>Watch the content gradually fade out</li>
        <li>Monitor the progress bar and time remaining</li>
        <li>Use the controls to manage the vanisher instance</li>
      </ol>
    </div>

    <script type="module">
      import { createVanisher } from "https://unpkg.com/vanisher@latest/dist/index.esm.js";

      let vanisher = null;

      function startVanisher() {
        const deadlineInput = document.getElementById("deadline-input");
        const deadline = deadlineInput.value;

        if (!deadline) {
          alert("Please select a deadline");
          return;
        }

        try {
          // Destroy existing instance if any
          if (vanisher) {
            vanisher.destroy();
          }

          // Create new vanisher instance
          vanisher = createVanisher({
            deadline: deadline,
            targetElement: "#fade-content",
            updateIntervalMs: 1000 * 60, // Update every minute
            fadeDurationMs: 300,
            onDeadlineReached: () => {
              console.log("Deadline reached!");
              updateStatus("Deadline reached! Content is now invisible.");
            },
          });

          // Enable controls
          document.getElementById("reset-btn").disabled = false;
          document.getElementById("destroy-btn").disabled = false;

          // Start status updates
          updateStatus();
          setInterval(updateStatus, 1000); // Update every second
        } catch (error) {
          console.error("Error creating vanisher:", error);
          alert("Error: " + error.message);
        }
      }

      function resetVanisher() {
        if (vanisher) {
          vanisher.reset();
          updateStatus();
        }
      }

      function destroyVanisher() {
        if (vanisher) {
          vanisher.destroy();
          vanisher = null;

          // Reset UI
          document.getElementById("fade-content").style.opacity = "";
          document.getElementById("progress-bar").style.width = "0%";
          document.getElementById("status-display").textContent =
            "Not initialized";
          document.getElementById("time-remaining").textContent =
            "Set a deadline to see time remaining";

          // Disable controls
          document.getElementById("reset-btn").disabled = true;
          document.getElementById("destroy-btn").disabled = true;
        }
      }

      function updateStatus() {
        if (!vanisher) return;

        const status = vanisher.getStatus();
        const statusDisplay = document.getElementById("status-display");
        const progressBar = document.getElementById("progress-bar");
        const timeRemaining = document.getElementById("time-remaining");

        // Update status display
        statusDisplay.innerHTML = `
                <strong>Opacity:</strong> ${(status.opacity * 100).toFixed(1)}%<br>
                <strong>Days Remaining:</strong> ${status.daysRemaining}<br>
                <strong>Hours Remaining:</strong> ${status.hoursRemaining}<br>
                <strong>Active:</strong> ${status.isActive ? "Yes" : "No"}
            `;

        // Update progress bar
        const percentage = status.opacity * 100;
        progressBar.style.width = `${percentage}%`;

        // Update time remaining
        if (status.isActive) {
          timeRemaining.textContent = `${status.daysRemaining} days, ${status.hoursRemaining} hours remaining`;
        } else {
          timeRemaining.textContent = "Deadline reached!";
        }
      }

      // Make functions globally available
      window.startVanisher = startVanisher;
      window.resetVanisher = resetVanisher;
      window.destroyVanisher = destroyVanisher;
    </script>
  </body>
</html>
```

## Key Features Demonstrated

- **Deadline Setting**: Use datetime picker to set fade deadline
- **Real-time Updates**: Status updates every second showing current opacity
- **Progress Visualization**: Visual progress bar showing fade progress
- **Interactive Controls**: Start, reset, and destroy vanisher instances
- **Error Handling**: Graceful error handling for invalid dates
- **Status Monitoring**: Real-time display of days/hours remaining

## How to Run

1. Save the HTML code to a file (e.g., `basic-usage.html`)
2. Open it in a modern web browser
3. Set a deadline using the datetime picker
4. Click "Start Fading" to see the content fade out
5. Use the controls to experiment with different features

## Next Steps

- **[React Integration](/examples/react)** - Use VanisherJS with React
- **[Next.js Integration](/examples/next)** - Use VanisherJS with Next.js
- **[Advanced Scenarios](/examples/advanced)** - Complex use cases
- **[API Reference](/api/core-api)** - Complete API documentation
