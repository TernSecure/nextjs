---
"@tern-secure/nextjs": patch
---

refactor: Centralize types and improve JWT token verification

- Create new `types.ts` file to centralize shared type definitions
- Enhance JWT verification with more robust error handling and logging
- Add caching for JWKS using React cache
- Improve token decoding and validation logic
- Update import paths across authentication modules
