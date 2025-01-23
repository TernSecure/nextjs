---
"@tern-secure/nextjs": patch
---

fix: remove auth token and update sign-in signup link

- Remove hardcoded NPM registry authentication token from .npmrc
- Delete unused TypeScript declaration file in dist/types
- Update sign-in component to link to signup page with '/signup' href
