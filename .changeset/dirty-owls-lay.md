---
"@tern-secure/nextjs": patch
---

feat: Enhance authentication state management and middleware

- Add auth state cookie for server-side authentication tracking
- Update auth middleware to set secure auth state cookie
- Modify server-side auth check to validate auth state
- Remove unused import in sign-in component
- Update Edge runtime configuration in middleware
