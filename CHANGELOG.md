# @tern-secure/nextjs

## 4.2.3

### Patch Changes

- b0e8300: refactor: Enhance authentication and session management

  - Improve token verification and error handling in JWT modules
  - Update authentication methods to use centralized error handling
  - Modify session verification to support more flexible token checks
  - Refactor middleware to handle authentication redirects more robustly
  - Add caching to authentication methods for improved performance

## 4.2.2

### Patch Changes

- 496c2a9: refactor: Centralize types and improve JWT token verification

  - Create new `types.ts` file to centralize shared type definitions
  - Enhance JWT verification with more robust error handling and logging
  - Add caching for JWKS using React cache
  - Improve token decoding and validation logic
  - Update import paths across authentication modules

## 4.2.1

### Patch Changes

- 942b66f: refactor: Restructure server authentication and session management

  - Move server-side authentication files to a new `admin` directory
  - Update package.json exports to reflect new file structure
  - Simplify ESLint configuration by removing unused variable rules
  - Update import paths in sign-in and sign-out components
  - Minor configuration adjustments in tsup config

## 4.2.0

### Minor Changes

- 1496d6e: chore: Enhance authentication middleware and session management

  - Update auth mechanism to support edge runtime
  - Implement flexible route matching for public paths
  - Add robust session verification using multiple methods
  - Improve error handling and user information extraction
  - Update session cookie and token management

## 4.1.0

### Minor Changes

- 1f4f6f0: feat: Enhance error handling and authentication flow

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

- 527515c: Fix EsLint

## 4.0.0

### Major Changes

- 403fc4d: feat: Add email verification and sign-out button, enhance authentication flow

## 3.4.3

### Patch Changes

- 686fb5c: chore: improve password input styling and interaction

## 3.4.2

### Patch Changes

- f4ddaa3: chore: remove name field from sign-up form state

## 3.4.1

### Patch Changes

- 9ad43a8: chore: add build step to release workflow

## 3.4.0

### Minor Changes

- 8f40361: feat: add sign-up functionality and email verification

  - Implement createUser function for user registration
  - Add resendEmailVerification function
  - Update TernSecureClientProvider to handle email state
  - Export SignUp component in index files
  - Modify sign-in component to link to correct sign-up route

## 3.3.5

### Patch Changes

- b6942c4: chore: add verbose logging to npm publish in release workflow

## 3.3.4

### Patch Changes

- a2c2a6c: chore: configure npm authentication for private registry

## 3.3.3

### Patch Changes

- a1fa601: fix: remove auth token and update sign-in signup link

  - Remove hardcoded NPM registry authentication token from .npmrc
  - Delete unused TypeScript declaration file in dist/types
  - Update sign-in component to link to signup page with '/signup' href

## 3.3.1

### Patch Changes

- ba72742: chore: enhance release workflow with NPM authentication

  - Add NPM authentication step to the GitHub Actions workflow for secure publishing.
  - Update the publish command to use 'npm publish --access public' instead of 'npm run release'.
  - Improve clarity and organization of the release process.

## 3.3.0

### Minor Changes

- 7335e8f: chore: update package-lock.json and enhance release workflow

  - Update multiple package versions in package-lock.json, including @esbuild and @eslint dependencies.
  - Remove outdated dependencies from package-lock.json to streamline the project.
  - Modify GitHub Actions release workflow to use 'npm run release' for publishing instead of direct npm publish command.
  - Clean up NPM authentication steps in the workflow for improved clarity.

## 3.3.0

### Minor Changes

- cf2af23: New authentication providers have been added:

  - Integration with Google sign-in
  - Integration with Microsoft sign-in
