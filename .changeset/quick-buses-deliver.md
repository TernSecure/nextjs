---
"@tern-secure/nextjs": patch
---

Improved type definitions and authentication workflow

- Rename UserInfo to User in server-side types
- Export TernSecureUser and TernSecureUserData types
- Update GitHub workflows to enhance PR and release processes
- Simplify authentication state management
- Remove auth state cookie and related middleware logic
- Update runtime configuration to use standard Edge runtime
- Improve error handling in middleware
