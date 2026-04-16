# /project:design-audit

Audit and fix all design token regressions across the Phaigort codebase.

## Scope
- Scan all files under `src/` for hardcoded color values, font sizes, spacing, and border-radius that bypass the design token system
- Check `tailwind.config.ts` for any overrides that contradict the established token hierarchy
- Verify light/dark mode parity — every token must resolve correctly under both `[data-theme="light"]` and `[data-theme="dark"]`
- Confirm WCAG AA contrast compliance (4.5:1 body text, 3:1 large text) on all surface/text pairings
- Validate the fluid type scale (`clamp()`) is applied consistently; no hardcoded `px` font sizes
- Check the 4px spacing system — all margins, paddings, and gaps must reference spacing tokens

## Output
- List every regression found with file path and line number
- Apply fixes directly
- Confirm zero regressions remain before exiting

## Run frequency
Run before every deployment and after any styling change.
