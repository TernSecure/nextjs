---
"@tern-secure/nextjs": minor
---

feat: Enhance error handling and authentication flow

- Modify `getErrorAlertVariant` to handle undefined error cases and simplify error variant selection logic, removing redundant success checks.

- Enhance error code extraction and mapping mechanisms with comprehensive error pattern matching for Firebase authentication errors, improving error response generation with default messages.

- Rename `ErrorAlertVariant` to `getErrorAlertVariant` and update Turbo to version 2.4.0 in package.json and package-lock.json.

- Minor code formatting improvements, including the removal of redundant semicolons and extra blank lines.

- Add a password visibility toggle button and enhance error display with animation, refactoring input layout and error handling.

- Error handling in authentication components, adding comprehensive Firebase authentication error mapping and improving error display and variant selection.

- Update sign-in, sign-up, and sign-out components to use new error handling, enhancing URL redirect and validation utilities.

- Add explicit 'type="button"' to prevent unintended form submission and ensure email verification button behaves as a standalone interactive element.

- Add utility functions for route type checking and redirect prevention, enhancing sign-in and sign-out components with more robust redirect logic and improving URL construction and redirect parameter handling.

- Implement redirect loop prevention mechanisms and add new authentication status and error types, improving authentication state tracking and redirect handling for login and verification flows.
