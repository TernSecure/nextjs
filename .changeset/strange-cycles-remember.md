---
"@tern-secure/nextjs": minor
---

chore: update package-lock.json and enhance release workflow

- Update multiple package versions in package-lock.json, including @esbuild and @eslint dependencies.
- Remove outdated dependencies from package-lock.json to streamline the project.
- Modify GitHub Actions release workflow to use 'npm run release' for publishing instead of direct npm publish command.
- Clean up NPM authentication steps in the workflow for improved clarity.
