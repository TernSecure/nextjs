---
"@tern-secure/nextjs": patch
---

refactor: Improve TernSecure middleware response handling

- Update middleware to return Response or undefined
- Modify authentication flow to use NextResponse.redirect
- Simplify error handling and callback processing
- Make callback parameter optional
- Streamline middleware return logic
