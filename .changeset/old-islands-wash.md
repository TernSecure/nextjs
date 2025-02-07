---
"@tern-secure/nextjs": patch
---

refactor: Restructure server authentication and session management

- Move server-side authentication files to a new `admin` directory
- Update package.json exports to reflect new file structure
- Simplify ESLint configuration by removing unused variable rules
- Update import paths in sign-in and sign-out components
- Minor configuration adjustments in tsup config
