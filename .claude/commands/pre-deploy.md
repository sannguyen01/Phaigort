# /project:pre-deploy

Final quality gate. Run this immediately before any deployment to production or staging.

## Checklist

### Design & Tokens
- [ ] Run `/project:design-audit` — zero regressions
- [ ] Light and dark mode render correctly at 375px, 768px, 1280px, and 1920px
- [ ] No placeholder images, lorem ipsum text, or `TODO` comments in rendered output

### Functionality
- [ ] All API routes return expected responses (spot-check critical paths: product listing, stone detail, contact/enquiry)
- [ ] No `console.error` or unhandled promise rejections in browser console
- [ ] All internal links resolve; no 404s
- [ ] Forms validate and submit correctly

### Performance
- [ ] Run Lighthouse CI (`pnpm lighthouse` or equivalent) — LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] All images have `alt`, `width`, `height`, and `loading="lazy"`
- [ ] No render-blocking scripts

### Security
- [ ] No secrets or API keys committed to the repository
- [ ] `.env.local` is in `.gitignore` and not staged
- [ ] All user inputs are validated and sanitised server-side

### Build
- [ ] `pnpm build` completes with zero errors and zero type errors
- [ ] `pnpm lint` passes with zero errors
- [ ] All tests pass: `pnpm test`

## Output
- Pass/fail status for each checklist item
- Block deployment if any item is ❌
- Log a deployment-ready confirmation if all items pass

## Run frequency
Run before every deployment. Non-negotiable.
