# Security Audit Report - Azulita Holistics Website

**Audit Date:** December 10, 2025
**Auditor:** Security Analysis (Comprehensive Review)
**Codebase Version:** main branch (commit: ccce0b7)
**Application Type:** Next.js 16.0.7 Static Website with i18n

---

## Executive Summary

This comprehensive security audit examined the Azulita Holistics website codebase across all critical security domains. The application is a **static marketing website** built with Next.js 16, React 19, and TypeScript, featuring bilingual support (English/Spanish) and external booking integration via Cal.com.

### Overall Risk Assessment: **LOW TO MEDIUM**

The codebase demonstrates generally good security practices with no critical vulnerabilities identified. However, several areas require attention to harden the application against potential attacks and improve security posture.

**Key Findings:**

- **0 Critical vulnerabilities**
- **1 High-severity issue** (Third-party script injection without integrity checks)
- **4 Medium-severity issues** (Missing security headers, XSS risks, localStorage usage without validation)
- **5 Low-severity issues** (Missing CSP, incomplete error handling, accessibility concerns)
- **3 Informational items** (Best practices and hardening recommendations)

**Good Security Practices Observed:**

- No vulnerable dependencies (npm audit: 0 vulnerabilities)
- No hardcoded secrets or API keys
- Proper .gitignore configuration
- TypeScript strict mode enabled
- No API routes (attack surface minimized)
- No file uploads or database connections
- Proper use of Next.js Image component
- External links use proper rel attributes

---

## Detailed Findings by Category

### 1. INPUT VALIDATION & SANITIZATION

#### MEDIUM - Insufficient Input Validation on User-Controlled Data

**Location:** `/Users/adj/Documents/Code/app-development/azulita/lib/i18n/useLanguageToggle.ts:28-30`

**Description:**
The `useLanguageToggle` hook manipulates URL pathnames based on user-selected language without proper validation. While Next.js routing provides some protection, the pathname manipulation could potentially be exploited if pathname contains malicious characters or unexpected patterns.

```typescript
// Line 28-30 in useLanguageToggle.ts
if (pathname.startsWith("/es")) {
  const newPath = pathname.replace(/^\/es/, "") || "/";
  router.push(newPath);
}
```

**Risk:**
An attacker could potentially craft URLs with path traversal sequences or special characters that might bypass route matching or cause unexpected behavior. The regex replacement is basic and doesn't account for edge cases.

**Attack Vector:**

```
// Potential exploitation vectors:
http://azulitaholistics.com/es/../../admin
http://azulitaholistics.com/es/%2e%2e%2f
http://azulitaholistics.com/es//services (double slashes)
```

**Remediation:**

```typescript
const toggleLanguage = () => {
  const newLang = language === "en" ? "es" : "en";
  setLanguage(newLang);

  // Validate pathname first
  const validPathPattern = /^\/(?:es\/)?(?:services|about)?$/;
  if (!validPathPattern.test(pathname)) {
    // Log suspicious activity
    console.warn(`Invalid pathname detected: ${pathname}`);
    router.push(newLang === "es" ? "/es" : "/");
    return;
  }

  // Convert current path to new language
  if (newLang === "es") {
    if (!pathname.startsWith("/es")) {
      const newPath = pathname === "/" ? "/es" : `/es${pathname}`;
      router.push(newPath);
    }
  } else {
    if (pathname.startsWith("/es")) {
      const newPath = pathname.replace(/^\/es/, "").replace(/^$/, "/");
      router.push(newPath);
    }
  }
};
```

---

#### MEDIUM - Translation Key Path Traversal Risk

**Location:** `/Users/adj/Documents/Code/app-development/azulita/lib/i18n/useLanguage.ts:13-28`

**Description:**
The `t()` translation function accepts arbitrary dot-notation key paths from user code and traverses the content object without sanitization. While not directly user-controllable, this pattern is dangerous if any user input could influence the keyPath parameter.

```typescript
// Lines 13-28 in useLanguage.ts
const t = (keyPath: string): string => {
  const keys = keyPath.split(".");
  let value: any = content;

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      console.warn(`Translation key not found: ${keyPath}`);
      return keyPath;
    }
  }

  return typeof value === "string" ? value : keyPath;
};
```

**Risk:**
Prototype pollution or object traversal attacks could occur if user input influences the keyPath. The function accesses object properties dynamically without protection against `__proto__`, `constructor`, or `prototype` pollution.

**Proof of Concept:**

```typescript
// If keyPath could be influenced by user input:
t("__proto__.polluted"); // Could access prototype chain
t("constructor.prototype.polluted"); // Prototype pollution vector
```

**Remediation:**

```typescript
const DANGEROUS_KEYS = new Set(["__proto__", "constructor", "prototype"]);

const t = (keyPath: string): string => {
  const keys = keyPath.split(".");

  // Validate keys before traversal
  for (const key of keys) {
    if (DANGEROUS_KEYS.has(key)) {
      console.error(`Dangerous key path detected: ${keyPath}`);
      return keyPath;
    }
  }

  let value: any = content;

  for (const key of keys) {
    // Use Object.hasOwnProperty for safe checking
    if (
      value &&
      typeof value === "object" &&
      Object.prototype.hasOwnProperty.call(value, key)
    ) {
      value = value[key];
    } else {
      console.warn(`Translation key not found: ${keyPath}`);
      return keyPath;
    }
  }

  return typeof value === "string" ? value : keyPath;
};
```

---

#### LOW - No Input Validation on Query Parameters

**Location:** Application-wide (no validation layer found)

**Description:**
The application doesn't implement any query parameter validation or sanitization layer. While Next.js provides some protection, query parameters are not validated before being used in routing decisions.

**Risk:**
Query parameters could contain XSS payloads or be used for open redirect attacks if the application logic changes in the future.

**Remediation:**
Implement a middleware or utility function to sanitize query parameters:

```typescript
// lib/validation/queryParams.ts
export function sanitizeQueryParams(
  params: Record<string, string | string[]>
): Record<string, string | string[]> {
  const sanitized: Record<string, string | string[]> = {};

  for (const [key, value] of Object.entries(params)) {
    // Remove potentially dangerous characters
    const cleanKey = key.replace(/[<>"'&]/g, "");

    if (Array.isArray(value)) {
      sanitized[cleanKey] = value.map((v) => v.replace(/[<>"'&]/g, ""));
    } else {
      sanitized[cleanKey] = value.replace(/[<>"'&]/g, "");
    }
  }

  return sanitized;
}
```

---

### 2. AUTHENTICATION & AUTHORIZATION

#### INFORMATIONAL - No Authentication Mechanisms Present

**Status:** Not Applicable

**Description:**
The application is a static marketing website with no authentication, user accounts, or protected resources. All content is public. This is appropriate for the application's purpose.

**Recommendation:**
If authentication is added in the future, implement:

- Next-Auth or similar proven authentication library
- Secure session management with httpOnly cookies
- CSRF protection
- Rate limiting on auth endpoints

---

### 3. DATA HANDLING & XSS PROTECTION

#### LOW - Potential XSS Risk in Structured Data

**Location:** `/Users/adj/Documents/Code/app-development/azulita/components/StructuredData.tsx:144-148`

**Description:**
Structured data is injected into the page using `dangerouslySetInnerHTML` with JSON.stringify. While the data is from static content files, this pattern is inherently risky.

```typescript
// Lines 144-148 in StructuredData.tsx
<script
  key={index}
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
```

**Risk:**
If the schema object ever contains user-generated content or data from external sources, XSS could occur. JSON.stringify doesn't escape HTML entities like `</script>` which could break out of the script tag.

**Proof of Concept:**

```typescript
// If schema contained:
const maliciousSchema = {
  "@type": "Organization",
  name: "</script><script>alert('XSS')</script><script>",
};
// Would break out of the JSON-LD script tag
```

**Remediation:**

```typescript
function safeJSONStringify(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/\//g, "\\u002f");
}

export function StructuredData({ type, lang = "en" }: StructuredDataProps) {
  // ... schema generation ...

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJSONStringify(schema) }}
        />
      ))}
    </>
  );
}
```

---

#### MEDIUM - LocalStorage Usage Without Validation

**Location:** `/Users/adj/Documents/Code/app-development/azulita/lib/i18n/LanguageContext.tsx:26-28`

**Description:**
Language preference is read from localStorage without validation, assuming it's a trusted Language type. If an attacker can modify localStorage (via XSS or browser extensions), invalid data could be injected.

```typescript
// Lines 26-28 in LanguageContext.tsx
const stored = localStorage.getItem("language") as Language | null;
if (stored === "en" || stored === "es") {
  setLanguageState(stored);
}
```

**Risk:**
While the code does validate against 'en' or 'es', relying on localStorage for application state without additional integrity checks could lead to issues if the validation is incomplete or if the code changes.

**Attack Scenario:**

1. Attacker finds XSS vulnerability (future code changes)
2. Executes: `localStorage.setItem('language', '<script>alert(1)</script>')`
3. If validation is removed or bypassed in future updates, XSS occurs

**Remediation:**

```typescript
const VALID_LANGUAGES = ["en", "es"] as const;

React.useEffect(() => {
  setIsClient(true);
  try {
    const stored = localStorage.getItem("language");

    // Strict validation and sanitization
    if (stored && typeof stored === "string") {
      const trimmed = stored.trim().toLowerCase();
      if (VALID_LANGUAGES.includes(trimmed as Language)) {
        setLanguageState(trimmed as Language);
      } else {
        // Log suspicious activity
        console.warn(`Invalid language preference detected: ${stored}`);
        // Clear corrupted value
        localStorage.removeItem("language");
      }
    }
  } catch (error) {
    // Handle localStorage access errors (privacy mode, etc.)
    console.error("Failed to access localStorage:", error);
  }
}, []);
```

---

### 4. DEPENDENCIES & SUPPLY CHAIN

#### INFORMATIONAL - Clean Dependency Audit

**Status:** PASS

**Description:**
Dependency audit shows zero vulnerabilities:

```json
{
  "vulnerabilities": {
    "critical": 0,
    "high": 0,
    "moderate": 0,
    "low": 0,
    "info": 0,
    "total": 0
  },
  "dependencies": {
    "prod": 16,
    "dev": 377,
    "total": 428
  }
}
```

**Dependencies:**

- next: 16.0.7 (latest)
- react: 19.2.0 (latest)
- react-dom: 19.2.0 (latest)
- TypeScript: 5.x (latest)
- Tailwind CSS: 4.x (latest)

**Recommendation:**

- Continue monitoring with `npm audit` regularly
- Enable Dependabot or Renovate for automated dependency updates
- Pin exact versions in package.json for production builds
- Review package-lock.json in pull requests for unexpected changes

---

### 5. CONFIGURATION & SECRETS MANAGEMENT

#### INFORMATIONAL - No Secrets or API Keys Found

**Status:** PASS

**Description:**
Comprehensive search found no hardcoded secrets, API keys, or credentials in the codebase. The .gitignore properly excludes environment files.

**Verification:**

```bash
grep -r "password\|secret\|apikey\|api_key\|token\|credential" -i
# Result: No matches in application code
```

**Constants Reviewed:**

- `BOOKING_URL`: Public Cal.com URL (not sensitive)
- `SOCIAL_LINKS`: Public social media URLs
- `siteConfig`: Public metadata only

**Recommendations:**

- If secrets are needed in the future, use Next.js environment variables with `NEXT_PUBLIC_` prefix for client-side only
- Store sensitive keys server-side only (never in client bundles)
- Use environment variable validation library like `zod` or `envalid`

---

### 6. CLIENT-SIDE SECURITY

#### HIGH - Third-Party Script Injection Without Integrity

**Location:** `/Users/adj/Documents/Code/app-development/azulita/components/CalEmbed.tsx:22-29`

**Description:**
The Cal.com embed script is loaded dynamically without Subresource Integrity (SRI) checks, exposing users to supply chain attacks if the Cal.com CDN is compromised.

```typescript
// Lines 22-29 in CalEmbed.tsx
const script = document.createElement("script");
script.src = "https://app.cal.com/embed/embed.js";
script.async = true;
script.onload = () => setIsLoaded(true);
script.onerror = () => {
  console.error("Failed to load Cal.com embed script");
  setIsLoaded(false);
};
```

**Risk:**
If the Cal.com CDN is compromised or MITM'd, malicious JavaScript could be injected into your users' browsers. This is a **supply chain attack vector**.

**Attack Scenario:**

1. Attacker compromises Cal.com CDN or performs MITM attack
2. Serves malicious `embed.js` instead of legitimate script
3. Malicious code executes in context of azulitaholistics.com
4. Can steal user data, inject ads, or perform phishing attacks

**Remediation:**

Option 1 - Add SRI Hash (Recommended):

```typescript
useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://app.cal.com/embed/embed.js";
  script.async = true;

  // Add SRI integrity check
  script.integrity = "sha384-[HASH_HERE]"; // Get from Cal.com or compute
  script.crossOrigin = "anonymous";

  script.onload = () => setIsLoaded(true);
  script.onerror = () => {
    console.error(
      "Failed to load Cal.com embed script - integrity check failed"
    );
    setIsLoaded(false);
  };

  document.body.appendChild(script);

  return () => {
    if (document.body.contains(script)) {
      document.body.removeChild(script);
    }
  };
}, []);
```

Option 2 - Use Next.js Script Component:

```typescript
import Script from "next/script";

export function CalEmbed({ calLink, className }: CalEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`cal-embed-container ${className}`}>
      <Script
        src="https://app.cal.com/embed/embed.js"
        strategy="lazyOnload"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          console.error("Failed to load Cal.com embed script");
          setIsLoaded(false);
        }}
      />
      {!isLoaded && (
        <div className="cal-loading">
          <p>Loading booking calendar...</p>
        </div>
      )}
      <div
        data-cal-link={calLink}
        data-cal-config='{"layout":"month_view"}'
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
      />
    </div>
  );
}
```

---

#### MEDIUM - Missing Nonce for Inline Styles

**Location:** `/Users/adj/Documents/Code/app-development/azulita/components/CalEmbed.tsx:51`

**Description:**
Inline styles are used without a nonce, which would be blocked by a strict Content Security Policy.

```typescript
// Line 51 in CalEmbed.tsx
style={{ width: '100%', height: '100%', overflow: 'scroll' }}
```

**Risk:**
If CSP is implemented (recommended), inline styles without nonces will be blocked, breaking the calendar embed.

**Remediation:**

```typescript
// Move styles to CSS file instead of inline
// components/CalEmbed.module.css
.calEmbedFrame {
  width: 100%;
  height: 100%;
  overflow: scroll;
}

// CalEmbed.tsx
import styles from './CalEmbed.module.css';

<div
  data-cal-link={calLink}
  data-cal-config='{"layout":"month_view"}'
  className={styles.calEmbedFrame}
/>
```

---

#### LOW - No Clickjacking Protection

**Location:** `next.config.ts` and root layout (missing headers)

**Description:**
The application doesn't set `X-Frame-Options` or `Content-Security-Policy: frame-ancestors` headers to prevent clickjacking attacks.

**Risk:**
An attacker could embed your website in an iframe on a malicious site and trick users into performing unintended actions (clickjacking).

**Attack Scenario:**

1. Attacker creates malicious site with hidden iframe of azulitaholistics.com
2. Overlays invisible buttons over booking CTA
3. User thinks they're clicking attacker's site but actually interacting with your booking form
4. Could lead to unintended bookings or data exposure

**Remediation:**

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

### 7. API ROUTES & SERVER-SIDE SECURITY

#### INFORMATIONAL - No API Routes Present

**Status:** Not Applicable

**Description:**
The application is a pure static website with no API routes, server actions, or backend endpoints. This significantly reduces the attack surface.

**Verification:**

```bash
find app/api -type f
# Result: No api directory found
```

**Recommendation:**
If API routes are added in the future, implement:

- Rate limiting (e.g., using `next-rate-limit`)
- CORS restrictions
- Input validation with schema validation library (Zod, Yup)
- Authentication and authorization
- Logging and monitoring

---

### 8. FILE OPERATIONS

#### INFORMATIONAL - No File Upload/Download Functionality

**Status:** Not Applicable

**Description:**
The application has no file upload or download features, eliminating an entire class of vulnerabilities (path traversal, arbitrary file upload, XXE, etc.).

---

### 9. CORS & CSP POLICIES

#### MEDIUM - Missing Content Security Policy

**Location:** `next.config.ts` (not configured)

**Description:**
The application doesn't implement a Content Security Policy (CSP), which is the primary defense against XSS attacks.

**Risk:**
Without CSP, if an XSS vulnerability is introduced, attackers have unrestricted ability to:

- Execute arbitrary JavaScript
- Load malicious external resources
- Exfiltrate sensitive data
- Perform CSRF attacks

**Remediation:**

Implement a strict CSP in `next.config.ts`:

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://app.cal.com", // Cal.com embed
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // Google Fonts
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:", // Allow images from HTTPS sources
              "connect-src 'self' https://app.cal.com", // Cal.com API
              "frame-src https://app.cal.com", // Cal.com iframe
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

**Note:** The CSP above includes `'unsafe-inline'` for scripts and styles. To properly harden:

1. Use nonces for inline scripts/styles
2. Extract all inline styles to CSS files
3. Use Next.js Script component for third-party scripts
4. Remove `'unsafe-inline'` and `'unsafe-eval'` directives

---

#### LOW - CORS Not Configured (Low Risk for Static Site)

**Location:** `next.config.ts` (not configured)

**Description:**
The application doesn't explicitly configure CORS headers. For a static site with no API, this is low risk but should be configured if API routes are added.

**Current Status:** Acceptable for static site

**Recommendation for Future API Routes:**

```typescript
// next.config.ts
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: 'https://azulitaholistics.com' },
        { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
        { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        { key: 'Access-Control-Max-Age', value: '86400' },
      ],
    },
  ];
},
```

---

### 10. BUSINESS LOGIC FLAWS

#### LOW - No Rate Limiting on Language Toggle

**Location:** `/Users/adj/Documents/Code/app-development/azulita/components/Navigation.tsx:23` and `LanguageBanner.tsx:12`

**Description:**
The language toggle buttons have no rate limiting or debouncing, allowing rapid clicking that could trigger excessive route changes and localStorage writes.

**Risk:**
While low impact, rapid toggling could:

- Cause UI thrashing
- Exhaust localStorage quota if combined with other issues
- Create denial-of-service on client side
- Generate excessive client-side errors in logging

**Remediation:**

```typescript
// lib/hooks/useDebounce.ts
import { useCallback, useRef } from "react";

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    ((...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }) as T,
    [callback, delay]
  );
}

// useLanguageToggle.ts
export function useLanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [isToggling, setIsToggling] = useState(false);

  const toggleLanguage = useCallback(() => {
    // Prevent rapid toggling
    if (isToggling) return;

    setIsToggling(true);
    const newLang = language === "en" ? "es" : "en";
    setLanguage(newLang);

    // Convert current path to new language
    if (newLang === "es") {
      if (!pathname.startsWith("/es")) {
        const newPath = pathname === "/" ? "/es" : `/es${pathname}`;
        router.push(newPath);
      }
    } else {
      if (pathname.startsWith("/es")) {
        const newPath = pathname.replace(/^\/es/, "") || "/";
        router.push(newPath);
      }
    }

    // Reset toggle lock after navigation
    setTimeout(() => setIsToggling(false), 500);
  }, [language, setLanguage, router, pathname, isToggling]);

  return { toggleLanguage, language, isToggling };
}
```

---

#### INFORMATIONAL - External Booking Dependency

**Location:** `lib/constants.ts:9` and all booking CTAs

**Description:**
The entire booking flow depends on an external service (Cal.com). If Cal.com experiences downtime or security issues, the booking functionality is unavailable.

**Current Implementation:**

```typescript
export const BOOKING_URL =
  "https://cal.com/azulitaholistics-xzejuw/free-consultation";
```

**Risk:**

- Single point of failure for critical business function
- No fallback if Cal.com is down
- User data passes through third-party service
- Privacy implications of external dependency

**Recommendations:**

1. Add monitoring for Cal.com availability
2. Implement fallback contact form if booking iframe fails to load
3. Display clear privacy notice about Cal.com usage
4. Consider self-hosting booking solution in the future

Example fallback implementation:

```typescript
// components/CalEmbed.tsx
export function CalEmbed({ calLink, className }: CalEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;

    const timeout = setTimeout(() => {
      if (!isLoaded) {
        console.error("Cal.com embed timeout - showing fallback");
        setHasError(true);
      }
    }, 10000); // 10 second timeout

    script.onload = () => {
      setIsLoaded(true);
      clearTimeout(timeout);
    };

    script.onerror = () => {
      console.error("Failed to load Cal.com embed script");
      setHasError(true);
      clearTimeout(timeout);
    };

    document.body.appendChild(script);

    return () => {
      clearTimeout(timeout);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (hasError) {
    return (
      <div className="cal-fallback bg-primary-light p-8 rounded-lg text-center">
        <h3 className="text-xl font-bold mb-4">
          Booking Temporarily Unavailable
        </h3>
        <p className="mb-4">
          Please contact us directly to schedule your consultation:
        </p>
        <a href="mailto:azulitaholistics@gmail.com" className="btn-primary">
          Email Us
        </a>
      </div>
    );
  }

  return (
    <div className={`cal-embed-container ${className}`}>
      {!isLoaded && (
        <div className="cal-loading">
          <p>Loading booking calendar...</p>
        </div>
      )}
      <div
        data-cal-link={calLink}
        data-cal-config='{"layout":"month_view"}'
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
      />
    </div>
  );
}
```

---

### 11. ERROR HANDLING & INFORMATION DISCLOSURE

#### LOW - Error Messages Expose Internal Structure

**Location:** Multiple files with `console.error` and `console.warn` statements

**Examples:**

- `/Users/adj/Documents/Code/app-development/azulita/components/CalEmbed.tsx:27`
- `/Users/adj/Documents/Code/app-development/azulita/lib/i18n/useLanguage.ts:22`

```typescript
// CalEmbed.tsx line 27
console.error("Failed to load Cal.com embed script");

// useLanguage.ts line 22
console.warn(`Translation key not found: ${keyPath}`);
```

**Risk:**
Console messages in production can leak information about the application structure, file paths, and internal logic to attackers who inspect the browser console.

**Remediation:**

Implement a logging utility that only logs in development:

```typescript
// lib/utils/logger.ts
const isDevelopment = process.env.NODE_ENV === "development";

export const logger = {
  error: (...args: any[]) => {
    if (isDevelopment) {
      console.error("[App Error]", ...args);
    }
    // In production, send to monitoring service
    // e.g., Sentry.captureException(args[0]);
  },
  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn("[App Warning]", ...args);
    }
  },
  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info("[App Info]", ...args);
    }
  },
};

// Usage in CalEmbed.tsx
import { logger } from "@/lib/utils/logger";

script.onerror = () => {
  logger.error("Failed to load Cal.com embed script");
  setIsLoaded(false);
};
```

---

#### LOW - Missing Error Boundaries

**Location:** Application-wide (no error boundaries implemented)

**Description:**
The application lacks React Error Boundaries to gracefully handle runtime errors and prevent the entire app from crashing.

**Risk:**
If a component throws an error, the entire page becomes blank, creating a poor user experience and potentially exposing error stack traces.

**Remediation:**

```typescript
// components/ErrorBoundary.tsx
"use client";

import { Component, ReactNode } from "react";
import { logger } from "@/lib/utils/logger";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error("Error boundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="error-container p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="mb-4">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Refresh Page
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// app/layout.tsx - Wrap entire app
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ErrorBoundary>
          <LanguageProvider>
            <Layout>{children}</Layout>
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

---

### 12. ADDITIONAL SECURITY OBSERVATIONS

#### LOW - Missing Referrer Policy

**Location:** `next.config.ts` and root layout

**Description:**
The application doesn't set a Referrer-Policy header to control what information is sent in the Referer header.

**Risk:**
Without a referrer policy, full URLs (including query parameters) may be sent to external sites when users click external links, potentially leaking sensitive information.

**Remediation:**
Add to security headers in `next.config.ts` (included in CSP recommendation above):

```typescript
{
  key: 'Referrer-Policy',
  value: 'strict-origin-when-cross-origin',
}
```

---

#### INFORMATIONAL - Accessibility Could Improve Security

**Location:** Various components

**Description:**
Several accessibility improvements would also enhance security:

1. **Skip Navigation Link**: Present but could be improved

   - Location: `/Users/adj/Documents/Code/app-development/azulita/components/Layout.tsx:16-21`
   - Good: Provides keyboard navigation
   - Improvement: Add focus trap for modals to prevent focus escape

2. **ARIA Labels**: Present on buttons

   - Location: Navigation and LanguageBanner components
   - Good: Proper aria-label usage
   - Maintains: Better user awareness of actions

3. **Form Accessibility**: N/A (no forms in current implementation)
   - Future: If forms are added, use proper labels and ARIA attributes

**Security Benefit:**
Better accessibility means users can more easily verify actions they're taking, reducing social engineering attack success rates.

---

## Summary of Recommendations by Priority

### CRITICAL PRIORITY (Implement Immediately)

None identified in current codebase.

---

### HIGH PRIORITY (Implement Within 1 Week)

1. **Add Subresource Integrity to Cal.com Script**
   - File: `components/CalEmbed.tsx`
   - Action: Add SRI hash and crossorigin attribute
   - Impact: Prevents supply chain attacks

---

### MEDIUM PRIORITY (Implement Within 2-4 Weeks)

2. **Implement Content Security Policy**

   - File: `next.config.ts`
   - Action: Add CSP headers as specified
   - Impact: Primary XSS defense

3. **Add Security Headers**

   - File: `next.config.ts`
   - Action: Add X-Frame-Options, X-Content-Type-Options, etc.
   - Impact: Defense in depth against common attacks

4. **Validate Pathname Manipulation**

   - File: `lib/i18n/useLanguageToggle.ts`
   - Action: Add pathname validation before routing
   - Impact: Prevents potential path traversal

5. **Harden LocalStorage Usage**

   - File: `lib/i18n/LanguageContext.tsx`
   - Action: Add try-catch and stricter validation
   - Impact: Prevents data corruption and edge case bugs

6. **Sanitize JSON in Structured Data**
   - File: `components/StructuredData.tsx`
   - Action: Escape HTML entities in JSON
   - Impact: Prevents script breakout XSS

---

### LOW PRIORITY (Implement Within 1-3 Months)

7. **Implement Error Boundaries**

   - Action: Add React Error Boundaries
   - Impact: Better error handling and UX

8. **Add Production Logging**

   - Action: Replace console.\* with production-safe logger
   - Impact: Prevents information leakage

9. **Add Rate Limiting to Language Toggle**

   - File: `lib/i18n/useLanguageToggle.ts`
   - Action: Debounce toggle function
   - Impact: Prevents client-side DoS

10. **Improve Translation Function Security**
    - File: `lib/i18n/useLanguage.ts`
    - Action: Block dangerous keys in object traversal
    - Impact: Defense against prototype pollution

---

### INFORMATIONAL (Consider for Future)

11. **Monitor Dependencies**

    - Action: Set up Dependabot or Renovate
    - Impact: Automated security updates

12. **Add Booking Fallback**

    - File: `components/CalEmbed.tsx`
    - Action: Implement email fallback when Cal.com is down
    - Impact: Business continuity

13. **Consider Self-Hosted Analytics**
    - Action: If analytics are added, use privacy-focused solution
    - Impact: User privacy protection

---

## Testing & Verification

### Recommended Security Tests

1. **Manual Testing**

   - [ ] Test language toggle with various URL patterns
   - [ ] Verify external links open in new tabs with proper rel attributes
   - [ ] Test booking embed loads correctly and fails gracefully
   - [ ] Verify no errors in browser console in production build

2. **Automated Testing**

   ```bash
   # Dependency audit
   npm audit

   # Check for secrets
   git secrets --scan-history

   # Lint security
   npm run lint

   # Type check
   npm run typecheck
   ```

3. **Browser Security Headers Check**
   Use https://securityheaders.com/ to verify headers after implementing recommendations

4. **CSP Validator**
   Use https://csp-evaluator.withgoogle.com/ to validate CSP policy

---

## Compliance & Privacy Considerations

### GDPR / Privacy

**Current Status:** Good

The website collects minimal user data:

- Language preference (stored in localStorage)
- Booking data (handled by Cal.com)

**Recommendations:**

1. Add Privacy Policy page explaining Cal.com data sharing
2. Add Cookie Banner if tracking cookies are used (currently none detected)
3. Ensure Cal.com is GDPR compliant (verify with Cal.com documentation)

### WCAG Accessibility

**Current Status:** Good foundation

Accessibility features present:

- Semantic HTML structure
- Proper heading hierarchy
- Alt text on images
- ARIA labels on interactive elements
- Skip navigation link
- Keyboard navigation support

---

## Conclusion

The Azulita Holistics website demonstrates **solid security fundamentals** with no critical vulnerabilities. The codebase follows modern React and Next.js best practices, uses TypeScript for type safety, and has clean dependencies.

**Key Strengths:**

- No vulnerable dependencies
- No hardcoded secrets
- Proper use of Next.js security features
- Type-safe code with TypeScript
- Minimal attack surface (static site, no API)

**Areas Requiring Attention:**

- Missing Content Security Policy (most important)
- Third-party script integrity
- Security headers configuration
- Input validation hardening

**Overall Security Posture:** The application is **suitable for production** with the HIGH priority items addressed. The identified issues are typical for a new static website and can be resolved through configuration changes rather than architectural rewrites.

**Estimated Remediation Effort:**

- HIGH priority items: 4-8 hours
- MEDIUM priority items: 8-16 hours
- LOW priority items: 8-12 hours
- Total: 20-36 hours of development time

---

## Appendix A: Security Checklist

Use this checklist to track remediation progress:

### Configuration

- [ ] Add Content Security Policy headers
- [ ] Add X-Frame-Options header
- [ ] Add X-Content-Type-Options header
- [ ] Add Referrer-Policy header
- [ ] Add Permissions-Policy header

### Code Changes

- [ ] Add SRI to Cal.com script
- [ ] Validate pathname in useLanguageToggle
- [ ] Harden localStorage access with error handling
- [ ] Sanitize JSON in StructuredData component
- [ ] Implement production logger
- [ ] Add Error Boundaries

### Testing

- [ ] Run npm audit (verify 0 vulnerabilities)
- [ ] Test CSP with csp-evaluator
- [ ] Verify security headers with securityheaders.com
- [ ] Manual testing of all CTAs and navigation

### Documentation

- [ ] Update README with security considerations
- [ ] Document third-party dependencies and risks
- [ ] Add privacy policy for Cal.com integration
- [ ] Create incident response plan

---

## Appendix B: Contact & Resources

### Useful Security Resources

- **Next.js Security:** https://nextjs.org/docs/app/building-your-application/deploying/production-checklist#security
- **OWASP Top 10:** https://owasp.org/www-project-top-ten/
- **CSP Guide:** https://content-security-policy.com/
- **Security Headers:** https://securityheaders.com/
- **SRI Generator:** https://www.srihash.org/

### Security Monitoring

Consider implementing:

- **Sentry:** Error tracking and monitoring
- **LogRocket:** Session replay for debugging
- **Vercel Analytics:** If deployed on Vercel
- **Dependabot:** Automated dependency updates

---

**Report Prepared By:** Security Audit System
**Date:** December 10, 2025
**Version:** 1.0
**Next Review:** March 10, 2026 (Quarterly)
