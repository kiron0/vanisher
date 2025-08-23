# Deadlines

Understanding how to work with deadlines is crucial for effective use of VanisherJS. This guide covers all deadline formats, handling edge cases, and best practices.

## Deadline Formats

### Date Objects

The most reliable way to specify deadlines:

```javascript
import { createVanisher } from "vanisher";

// Using Date constructor
const vanisher = createVanisher({
  deadline: new Date("2024-12-31T23:59:59"),
  targetElement: "#content",
});

// Using Date methods
const deadline = new Date();
deadline.setFullYear(2024);
deadline.setMonth(11); // December (0-indexed)
deadline.setDate(31);
deadline.setHours(23, 59, 59, 999);

const vanisher = createVanisher({
  deadline: deadline,
  targetElement: "#content",
});
```

### ISO Strings

Standard ISO 8601 format for dates:

```javascript
// Full ISO string
deadline: "2024-12-31T23:59:59.999Z";

// ISO string without timezone
deadline: "2024-12-31T23:59:59";

// ISO date only
deadline: "2024-12-31";

// ISO with time only
deadline: "T23:59:59";
```

### Date Strings

Human-readable date formats:

```javascript
// Various date string formats
deadline: "December 31, 2024";
deadline: "Dec 31, 2024";
deadline: "31/12/2024";
deadline: "12/31/2024";
deadline: "2024-12-31";
deadline: "31-12-2024";
```

### Timestamps

Unix timestamps in milliseconds:

```javascript
// Current timestamp
deadline: Date.now();

// Specific timestamp
deadline: 1704067199000;

// Future timestamp (1 hour from now)
deadline: Date.now() + 1000 * 60 * 60;

// Past timestamp (for testing)
deadline: Date.now() - 1000 * 60 * 60;
```

## Deadline Calculations

### Relative Deadlines

Calculate deadlines relative to current time:

```javascript
// 30 days from now
const thirtyDaysFromNow = new Date();
thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

const vanisher = createVanisher({
  deadline: thirtyDaysFromNow,
  targetElement: "#content",
});

// 2 weeks from now
const twoWeeksFromNow = new Date();
twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);

// 6 hours from now
const sixHoursFromNow = new Date();
sixHoursFromNow.setHours(sixHoursFromNow.getHours() + 6);
```

### Business Logic Deadlines

Calculate deadlines based on business rules:

```javascript
// Invoice due in 30 days
function createInvoiceDeadline(invoiceDate) {
  const dueDate = new Date(invoiceDate);
  dueDate.setDate(dueDate.getDate() + 30);
  return dueDate;
}

// Trial period (14 days)
function createTrialDeadline(startDate) {
  const trialEnd = new Date(startDate);
  trialEnd.setDate(trialEnd.getDate() + 14);
  return trialEnd;
}

// Seasonal content (until end of month)
function createMonthlyDeadline() {
  const now = new Date();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999);
  return endOfMonth;
}
```

## Timezone Handling

### Local vs UTC

VanisherJS handles timezones automatically:

```javascript
// Local time (user's timezone)
deadline: "2024-12-31T23:59:59";

// UTC time
deadline: "2024-12-31T23:59:59Z";

// Specific timezone
deadline: "2024-12-31T23:59:59-05:00"; // EST
deadline: "2024-12-31T23:59:59+01:00"; // CET
```

### Best Practices for Timezones

```javascript
// Always use explicit timezone for global applications
const globalDeadline = "2024-12-31T23:59:59Z";

// Use local time for user-specific content
const localDeadline = "2024-12-31T23:59:59";

// Convert between timezones if needed
function convertToUserTimezone(utcDate, userTimezone) {
  const date = new Date(utcDate);
  return date.toLocaleString("en-US", { timeZone: userTimezone });
}
```

## Edge Cases and Validation

### Invalid Dates

Handle invalid date inputs:

```javascript
function validateDeadline(deadline) {
  const date = new Date(deadline);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid deadline date provided");
  }

  if (date <= new Date()) {
    throw new Error("Deadline must be in the future");
  }

  return date;
}

try {
  const vanisher = createVanisher({
    deadline: validateDeadline("invalid-date"),
    targetElement: "#content",
  });
} catch (error) {
  console.error("Deadline validation failed:", error.message);
}
```

### Past Deadlines

Handle deadlines that have already passed:

```javascript
function createVanisherWithValidation(options) {
  const deadline = new Date(options.deadline);
  const now = new Date();

  if (deadline <= now) {
    // Deadline has passed, show expired content immediately
    return {
      getStatus: () => ({
        opacity: 0,
        daysRemaining: 0,
        hoursRemaining: 0,
        isActive: false,
      }),
    };
  }

  return createVanisher(options);
}
```

### Dynamic Deadlines

Update deadlines based on user actions:

```javascript
const vanisher = createVanisher({
  deadline: "2024-12-31T23:59:59",
  targetElement: "#content",
});

// Extend deadline when user makes payment
function extendDeadline(additionalDays) {
  const currentDeadline = vanisher.getDeadlineDate();
  const newDeadline = new Date(currentDeadline);
  newDeadline.setDate(newDeadline.getDate() + additionalDays);

  vanisher.updateOptions({
    deadline: newDeadline,
  });
}

// Usage
extendDeadline(7); // Extend by 7 days
```

## Deadline Monitoring

### Status Checking

Monitor deadline progress:

```javascript
const vanisher = createVanisher({
  deadline: "2024-12-31T23:59:59",
  targetElement: "#content",
});

// Check status periodically
setInterval(
  () => {
    const status = vanisher.getStatus();

    if (status.daysRemaining <= 7) {
      showUrgencyWarning(status.daysRemaining);
    }

    if (status.daysRemaining <= 1) {
      showLastDayWarning();
    }
  },
  1000 * 60 * 60,
); // Check every hour
```

### Progress Indicators

Show visual progress to users:

```javascript
function updateProgressBar(vanisher) {
  const status = vanisher.getStatus();
  const progressBar = document.querySelector("#progress-bar");

  if (progressBar) {
    const percentage = Math.round(status.opacity * 100);
    progressBar.style.width = `${percentage}%`;
    progressBar.textContent = `${percentage}% remaining`;
  }
}

// Update progress every minute
setInterval(() => updateProgressBar(vanisher), 1000 * 60);
```

## Common Deadline Patterns

### Invoice Deadlines

```javascript
function createInvoiceVanisher(invoiceData) {
  const dueDate = new Date(invoiceData.issueDate);
  dueDate.setDate(dueDate.getDate() + invoiceData.paymentTerms);

  return createVanisher({
    deadline: dueDate,
    targetElement: `#invoice-${invoiceData.id}`,
    onDeadlineReached: () => {
      sendOverdueNotification(invoiceData.id);
      applyLateFees(invoiceData.id);
    },
  });
}
```

### Subscription Deadlines

```javascript
function createSubscriptionVanisher(subscription) {
  const renewalDate = new Date(subscription.startDate);
  renewalDate.setMonth(renewalDate.getMonth() + subscription.duration);

  return createVanisher({
    deadline: renewalDate,
    targetElement: `#subscription-${subscription.id}`,
    onDeadlineReached: () => {
      showRenewalModal(subscription.id);
      sendRenewalReminder(subscription.id);
    },
  });
}
```

### Event Deadlines

```javascript
function createEventVanisher(event) {
  const eventDate = new Date(event.date);
  const registrationDeadline = new Date(eventDate);
  registrationDeadline.setDate(registrationDeadline.getDate() - 7); // 7 days before

  return createVanisher({
    deadline: registrationDeadline,
    targetElement: `#event-${event.id}`,
    onDeadlineReached: () => {
      closeRegistration(event.id);
      showWaitlistOption(event.id);
    },
  });
}
```

## Next Steps

- [Configuration](/guide/configuration) - Customize behavior options
- [How It Works](/guide/how-it-works) - Deep dive into internal mechanics
- [API Reference](/api/core-api) - Complete deadline documentation
- [Examples](/examples/overview) - Deadline examples in action
