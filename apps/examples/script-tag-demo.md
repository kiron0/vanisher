# Script Tag Demo

See how to use VanisherJS without a package manager using script tags and CDN.

## Basic HTML Implementation

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VanisherJS Script Tag Demo</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        line-height: 1.6;
      }

      .demo-section {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px;
        border-radius: 12px;
        margin: 20px 0;
      }

      .controls {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        padding: 20px;
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
        margin: 5px;
      }

      button:hover {
        background: #0056b3;
      }

      button:disabled {
        background: #6c757d;
        cursor: not-allowed;
      }

      input[type="datetime-local"] {
        padding: 8px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 14px;
        margin: 5px;
      }

      .status {
        background: #e9ecef;
        border-radius: 8px;
        padding: 15px;
        margin: 10px 0;
      }
    </style>
  </head>
  <body>
    <h1>🚀 VanisherJS Script Tag Demo</h1>

    <div class="demo-section" id="fade-content">
      <h2>This content will fade out!</h2>
      <p>
        This content will gradually become transparent until the deadline is
        reached.
      </p>
      <p>
        Use the controls below to set deadlines and control the fading behavior.
      </p>
    </div>

    <div class="controls">
      <h3>Controls</h3>
      <div>
        <label for="deadline-input">Set Deadline: </label>
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

      <div class="status" id="status-display">
        <strong>Status:</strong> Not initialized
      </div>
    </div>

    <div class="demo-section" id="auto-fade">
      <h2>Auto-Initialized Content</h2>
      <p>
        This content uses the data-deadline attribute for automatic
        initialization.
      </p>
      <p>It will start fading automatically when the page loads.</p>
    </div>

    <!-- VanisherJS CDN Script -->
    <script
      src="https://unpkg.com/vanisher@latest/dist/index.js"
      data-deadline="2024-12-31T23:59:59"
    ></script>

    <script>
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

          // Create new vanisher instance using global Vanisher
          vanisher = new Vanisher({
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
          document.getElementById("status-display").innerHTML =
            "<strong>Status:</strong> Not initialized";

          // Disable controls
          document.getElementById("reset-btn").disabled = true;
          document.getElementById("destroy-btn").disabled = true;
        }
      }

      function updateStatus() {
        if (!vanisher) return;

        const status = vanisher.getStatus();
        const statusDisplay = document.getElementById("status-display");

        statusDisplay.innerHTML = `
                <strong>Status:</strong> Active<br>
                <strong>Opacity:</strong> ${(status.opacity * 100).toFixed(1)}%<br>
                <strong>Days Remaining:</strong> ${status.daysRemaining}<br>
                <strong>Hours Remaining:</strong> ${status.daysRemaining}<br>
                <strong>Active:</strong> ${status.isActive ? "Yes" : "No"}
            `;
      }

      // Check if Vanisher is available globally
      window.addEventListener("load", () => {
        if (typeof Vanisher !== "undefined") {
          console.log("VanisherJS loaded successfully from CDN");
        } else {
          console.error("VanisherJS failed to load from CDN");
        }
      });
    </script>
  </body>
</html>
```

## Key Features Demonstrated

- **CDN Loading**: Load VanisherJS directly from unpkg CDN
- **Global Access**: Use `Vanisher` class globally without imports
- **Auto-Initialization**: Content with `data-deadline` attribute fades automatically
- **Manual Control**: Create and manage vanisher instances programmatically
- **Interactive Controls**: Start, reset, and destroy vanisher instances
- **Real-time Status**: Monitor opacity and time remaining

## How It Works

### 1. CDN Loading

```html
<script src="https://unpkg.com/vanisher@latest/dist/index.js"></script>
```

The script tag loads VanisherJS from the unpkg CDN, making the `Vanisher` class available globally.

### 2. Auto-Initialization

```html
<script
  src="https://unpkg.com/vanisher@latest/dist/index.js"
  data-deadline="2024-12-31T23:59:59"
></script>
```

When a script tag has a `data-deadline` attribute, VanisherJS automatically initializes with that deadline.

### 3. Global Class Usage

```javascript
const vanisher = new Vanisher({
  deadline: deadline,
  targetElement: "#fade-content",
});
```

Use the global `Vanisher` class to create instances programmatically.

## Alternative CDN Sources

### jsDelivr

```html
<script src="https://cdn.jsdelivr.net/npm/vanisher@latest/dist/index.js"></script>
```

### UNPKG (Alternative Format)

```html
<script src="https://unpkg.com/vanisher@latest"></script>
```

### Specific Version

```html
<script src="https://unpkg.com/vanisher@1.0.1/dist/index.js"></script>
```

## Browser Compatibility

The CDN version works in all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Considerations

- **Caching**: CDN files are cached across websites
- **Compression**: Files are automatically compressed
- **Global Availability**: Multiple CDN options for redundancy
- **Version Pinning**: Use specific versions for production stability

## Production Usage

For production applications, consider:

```html
<!-- Use specific version for stability -->
<script src="https://unpkg.com/vanisher@1.0.1/dist/index.js"></script>

<!-- Or host locally for complete control -->
<script src="/js/vanisher.js"></script>
```

## Next Steps

- **[Basic Usage](/examples/basic-usage)** - HTML implementation with modules
- **[React Integration](/examples/react)** - Use VanisherJS with React
- **[Next.js Integration](/examples/next)** - Use VanisherJS with Next.js
- **[API Reference](/api/core-api)** - Complete API documentation
