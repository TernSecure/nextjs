# @tern-secure/nextjs

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
