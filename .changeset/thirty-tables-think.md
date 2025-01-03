---
"@tern-secure/nextjs": patch
---

chore: enhance release workflow with NPM authentication

- Add NPM authentication step to the GitHub Actions workflow for secure publishing.
- Update the publish command to use 'npm publish --access public' instead of 'npm run release'.
- Improve clarity and organization of the release process.
