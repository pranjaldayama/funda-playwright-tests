# Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
npx playwright install chromium
```

### 2. Configure User Agent

The user agent is required to bypass Funda's robot detection.

**Setup**:
1. Open `playwright.config.ts`
2. Find this line at the top:
   ```typescript
   const USER_AGENT = 'USER_AGENT';
   ```
3. Replace `'USER_AGENT'` with your actual user agent string:
   ```typescript
   const USER_AGENT = 'your-actual-user-agent-here';
   ```

### 3. Run Tests

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- tests/smoke/01-homepage.spec.ts

# Run in headed mode (see the browser)
npm run test:headed

# Run in debug mode
npm run test:debug
```

---

## User Agent Configuration

### Where to Configure

File: `playwright.config.ts`

Location: Top of the file, line ~4

```typescript
// ⚠️ REPLACE THIS WITH YOUR ACTUAL USER AGENT
const USER_AGENT = 'USER_AGENT';
```

**Important**: 
- This is the ONLY place you need to change
- Replace the string `'USER_AGENT'` with your actual user agent
- Keep the quotes around your user agent string

---

## For New Team Members

1. Clone the repository
2. Run `npm install`
3. Run `npx playwright install chromium`
4. Open `playwright.config.ts`
5. Ask team lead for the user agent value
6. Replace `'USER_AGENT'` with the actual value
7. Run `npm test` to verify setup

---