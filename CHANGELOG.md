# @tern-secure/nextjs

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
