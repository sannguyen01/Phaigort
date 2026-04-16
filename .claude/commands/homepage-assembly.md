# /project:homepage-assembly

Mount all orphaned sections onto the homepage and fix hero height.

## Scope
- Identify all section components under `src/components/` and `src/sections/` that are not currently rendered in the homepage entry point
- Mount each orphaned section in the correct narrative order: Hero → Brand Premise → Material Categories → Featured Stones → Editorial/Story → Trust Signals → CTA
- Fix hero height: the hero must occupy `100dvh` on mobile and a minimum of `90vh` on desktop; verify this renders correctly at 375px, 768px, and 1280px breakpoints
- Ensure no section has orphaned props or missing data dependencies — wire up any placeholder data if real data is not yet available
- Verify scroll flow is unbroken from top to footer

## Output
- List all sections mounted and their render order
- Confirm hero height fix with breakpoint verification
- Flag any sections requiring real data before production

## Run frequency
Run whenever new section components are added to the project.
