# Advanced Scenarios

Discover advanced patterns for complex applications, including dynamic deadlines, multiple instances, and sophisticated use cases.

## Dynamic Deadline Management

### Real-time Deadline Updates

```javascript
import { createVanisher } from "vanisher";

class DeadlineManager {
  constructor() {
    this.vanishers = new Map();
    this.deadlines = new Map();
  }

  // Add content with deadline
  addContent(contentId, element, deadline, options = {}) {
    const vanisher = createVanisher({
      deadline,
      targetElement: element,
      ...options,
    });

    this.vanishers.set(contentId, vanisher);
    this.deadlines.set(contentId, deadline);

    return vanisher;
  }

  // Update deadline for existing content
  updateDeadline(contentId, newDeadline) {
    const vanisher = this.vanishers.get(contentId);
    if (vanisher) {
      vanisher.updateOptions({ deadline: newDeadline });
      this.deadlines.set(contentId, newDeadline);
      console.log(`Updated deadline for ${contentId} to ${newDeadline}`);
    }
  }

  // Extend deadline by specified amount
  extendDeadline(contentId, daysToAdd) {
    const vanisher = this.vanishers.get(contentId);
    if (vanisher) {
      const currentDeadline = vanisher.getDeadlineDate();
      const newDeadline = new Date(currentDeadline);
      newDeadline.setDate(newDeadline.getDate() + daysToAdd);

      this.updateDeadline(contentId, newDeadline);
    }
  }

  // Get all active vanishers
  getActiveVanishers() {
    return Array.from(this.vanishers.entries()).filter(
      ([_, vanisher]) => vanisher.getStatus().isActive,
    );
  }

  // Cleanup expired vanishers
  cleanupExpired() {
    for (const [contentId, vanisher] of this.vanishers.entries()) {
      if (!vanisher.getStatus().isActive) {
        vanisher.destroy();
        this.vanishers.delete(contentId);
        this.deadlines.delete(contentId);
        console.log(`Cleaned up expired content: ${contentId}`);
      }
    }
  }
}

// Usage
const manager = new DeadlineManager();

// Add content
manager.addContent("invoice-123", "#invoice-123", "2024-12-31T23:59:59", {
  onDeadlineReached: () => console.log("Invoice expired"),
});

// Update deadline
manager.updateDeadline("invoice-123", "2025-01-15T23:59:59");

// Extend deadline
manager.extendDeadline("invoice-123", 7); // Add 7 days
```

## Multi-Instance Orchestration

### Content Lifecycle Management

```javascript
import { createVanisher } from "vanisher";

class ContentOrchestrator {
  constructor() {
    this.instances = new Map();
    this.configs = new Map();
  }

  // Create multiple vanisher instances with different configurations
  createBatch(configs) {
    configs.forEach((config) => {
      const vanisher = createVanisher(config);
      this.instances.set(config.id, vanisher);
      this.configs.set(config.id, config);
    });
  }

  // Pause all instances
  pauseAll() {
    for (const vanisher of this.instances.values()) {
      vanisher.updateOptions({ updateIntervalMs: Infinity });
    }
  }

  // Resume all instances
  resumeAll() {
    for (const [id, vanisher] of this.instances.entries()) {
      const config = this.configs.get(id);
      vanisher.updateOptions({ updateIntervalMs: config.updateIntervalMs });
    }
  }

  // Get status of all instances
  getAllStatuses() {
    const statuses = {};
    for (const [id, vanisher] of this.instances.entries()) {
      statuses[id] = vanisher.getStatus();
    }
    return statuses;
  }

  // Destroy all instances
  destroyAll() {
    for (const [id, vanisher] of this.instances.entries()) {
      vanisher.destroy();
    }
    this.instances.clear();
    this.configs.clear();
  }
}

// Usage
const orchestrator = new ContentOrchestrator();

orchestrator.createBatch([
  {
    id: "promo-1",
    deadline: "2024-12-31T23:59:59",
    targetElement: "#promo-1",
    updateIntervalMs: 1000 * 60 * 5,
  },
  {
    id: "promo-2",
    deadline: "2025-01-15T23:59:59",
    targetElement: "#promo-2",
    updateIntervalMs: 1000 * 60 * 10,
  },
]);

// Pause all during maintenance
orchestrator.pauseAll();

// Resume after maintenance
orchestrator.resumeAll();
```

## Conditional Fading

### User Role-Based Fading

```javascript
import { createVanisher } from "vanisher";

class RoleBasedVanisher {
  constructor(userRole) {
    this.userRole = userRole;
    this.vanishers = new Map();
  }

  // Create vanisher based on user role
  createRoleBasedVanisher(contentId, element, deadline, roleConfig) {
    const { roles, fallbackDeadline } = roleConfig;

    // Check if user has access to this content
    if (roles.includes(this.userRole)) {
      const vanisher = createVanisher({
        deadline,
        targetElement: element,
        onDeadlineReached: () => this.handleExpired(contentId),
      });

      this.vanishers.set(contentId, vanisher);
      return vanisher;
    } else {
      // Use fallback deadline for users without access
      const vanisher = createVanisher({
        deadline: fallbackDeadline,
        targetElement: element,
        onDeadlineReached: () => this.handleExpired(contentId),
      });

      this.vanishers.set(contentId, vanisher);
      return vanisher;
    }
  }

  handleExpired(contentId) {
    console.log(`Content ${contentId} expired for user role: ${this.userRole}`);
    // Custom logic for expired content
  }
}

// Usage
const userRole = "premium"; // or 'basic', 'admin'
const roleBasedVanisher = new RoleBasedVanisher(userRole);

roleBasedVanisher.createRoleBasedVanisher(
  "exclusive-content",
  "#exclusive",
  "2024-12-31T23:59:59",
  {
    roles: ["premium", "admin"],
    fallbackDeadline: "2024-12-25T23:59:59", // Earlier deadline for basic users
  },
);
```

## Performance Optimization

### Lazy Loading Vanishers

```javascript
import { createVanisher } from "vanisher";

class LazyVanisherManager {
  constructor() {
    this.vanishers = new Map();
    this.observers = new Map();
  }

  // Create vanisher only when element is visible
  createLazyVanisher(contentId, element, deadline, options = {}) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.initializeVanisher(contentId, element, deadline, options);
          observer.unobserve(element);
        }
      });
    });

    this.observers.set(contentId, observer);
    observer.observe(element);
  }

  initializeVanisher(contentId, element, deadline, options) {
    const vanisher = createVanisher({
      deadline,
      targetElement: element,
      ...options,
    });

    this.vanishers.set(contentId, vanisher);
    console.log(`Lazy initialized vanisher for ${contentId}`);
  }

  // Cleanup
  destroy(contentId) {
    const vanisher = this.vanishers.get(contentId);
    const observer = this.observers.get(contentId);

    if (vanisher) {
      vanisher.destroy();
      this.vanishers.delete(contentId);
    }

    if (observer) {
      observer.disconnect();
      this.observers.delete(contentId);
    }
  }
}

// Usage
const lazyManager = new LazyVanisherManager();

lazyManager.createLazyVanisher(
  "lazy-content",
  "#lazy-content",
  "2024-12-31T23:59:59",
  {
    onDeadlineReached: () => console.log("Lazy content expired"),
  },
);
```

## Advanced React Patterns

### Custom Hook for Vanisher

```jsx
import React, { useEffect, useRef, useState } from "react";
import { createVanisher } from "vanisher";

function useVanisher(deadline, targetRef, options = {}) {
  const vanisherRef = useRef(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!targetRef.current) return;

    const vanisher = createVanisher({
      deadline,
      targetElement: targetRef.current,
      ...options,
    });

    vanisherRef.current = vanisher;

    // Update status periodically
    const updateStatus = () => {
      setStatus(vanisher.getStatus());
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000 * 60); // Every minute

    return () => {
      clearInterval(interval);
      if (vanisherRef.current) {
        vanisherRef.current.destroy();
      }
    };
  }, [deadline, options]);

  const updateDeadline = (newDeadline) => {
    if (vanisherRef.current) {
      vanisherRef.current.updateOptions({ deadline: newDeadline });
    }
  };

  const reset = () => {
    if (vanisherRef.current) {
      vanisherRef.current.reset();
    }
  };

  return {
    status,
    updateDeadline,
    reset,
    vanisher: vanisherRef.current,
  };
}

// Usage in component
function AdvancedComponent() {
  const targetRef = useRef(null);
  const { status, updateDeadline, reset } = useVanisher(
    "2024-12-31T23:59:59",
    targetRef,
    {
      onDeadlineReached: () => console.log("Deadline reached!"),
    },
  );

  return (
    <div>
      <div ref={targetRef} className="fading-content">
        <h1>Advanced Fading Content</h1>
        <p>This content uses a custom hook</p>
      </div>

      {status && (
        <div className="status">
          <p>Opacity: {(status.opacity * 100).toFixed(1)}%</p>
          <p>Days remaining: {status.daysRemaining}</p>
          <p>Hours remaining: {status.hoursRemaining}</p>
        </div>
      )}

      <div className="controls">
        <button onClick={() => updateDeadline("2025-01-15T23:59:59")}>
          Extend Deadline
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
```

## Error Handling and Recovery

### Robust Error Handling

```javascript
import { createVanisher } from "vanisher";

class RobustVanisherManager {
  constructor() {
    this.vanishers = new Map();
    this.errorHandlers = new Map();
  }

  // Create vanisher with error handling
  createRobustVanisher(contentId, element, deadline, options = {}) {
    try {
      const vanisher = createVanisher({
        deadline,
        targetElement: element,
        onDeadlineReached: () => this.handleDeadlineReached(contentId),
        ...options,
      });

      this.vanishers.set(contentId, vanisher);

      // Set up error handler
      this.errorHandlers.set(contentId, (error) => {
        console.error(`Error in vanisher ${contentId}:`, error);
        this.handleVanisherError(contentId, error);
      });

      return vanisher;
    } catch (error) {
      console.error(`Failed to create vanisher for ${contentId}:`, error);
      this.handleCreationError(contentId, error);
      return null;
    }
  }

  handleDeadlineReached(contentId) {
    console.log(`Deadline reached for ${contentId}`);
    // Custom logic for deadline reached
  }

  handleVanisherError(contentId, error) {
    // Attempt to recover
    const element = document.querySelector(`#${contentId}`);
    if (element) {
      element.style.opacity = "0.5";
      element.style.pointerEvents = "none";
    }
  }

  handleCreationError(contentId, error) {
    // Fallback behavior
    const element = document.querySelector(`#${contentId}`);
    if (element) {
      element.style.opacity = "0.8";
      element.innerHTML +=
        '<p style="color: red;">Error: Could not initialize fading</p>';
    }
  }

  // Retry failed vanisher creation
  retryCreation(contentId, element, deadline, options = {}) {
    const vanisher = this.createRobustVanisher(
      contentId,
      element,
      deadline,
      options,
    );
    if (vanisher) {
      console.log(`Successfully retried creation for ${contentId}`);
    }
    return vanisher;
  }
}

// Usage
const robustManager = new RobustVanisherManager();

const vanisher = robustManager.createRobustVanisher(
  "robust-content",
  "#robust-content",
  "2024-12-31T23:59:59",
);

if (!vanisher) {
  // Retry after a delay
  setTimeout(() => {
    robustManager.retryCreation(
      "robust-content",
      "#robust-content",
      "2024-12-31T23:59:59",
    );
  }, 5000);
}
```

## Next Steps

- **[React Integration](/examples/react)** - Use VanisherJS with React
- **[Next.js Integration](/examples/next)** - Use VanisherJS with Next.js
- **[Basic Usage](/examples/basic-usage)** - HTML implementation
- **[API Reference](/api/core-api)** - Complete API documentation
