# /project:backend-audit

Verify completeness of all API routes and page coverage across the Phaigort application.

## Scope

### API Routes
- Enumerate all route handlers under `src/app/api/` (or `pages/api/` if applicable)
- Verify each route has: correct HTTP method handling, input validation, error response shape, and no exposed secrets
- Check that all routes consumed by the frontend (`fetch`, `axios`, `trpc`, or equivalent) have a corresponding handler
- Identify any dead routes (defined but never called) and flag for removal
- Confirm all environment variables referenced in API routes are declared in `.env.local.example`

### Page Completeness
- List all pages under `src/app/` (or `pages/`)
- Verify each page has: a valid `<title>` / metadata export, correct layout wrapper, loading and error boundaries
- Confirm no page returns an empty render or unhandled promise
- Check dynamic routes (`[slug]`, `[id]`) have `generateStaticParams` or equivalent fallback handling

## Output
- API route inventory with status (✅ complete / ⚠️ incomplete / ❌ missing)
- Page inventory with status
- List of all issues found with file paths
- Apply fixes where safe to do so automatically

## Run frequency
Run whenever the API surface changes — new routes added, existing routes modified, or new pages created.
