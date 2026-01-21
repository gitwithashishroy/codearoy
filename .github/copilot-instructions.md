# Copilot Instructions — Codearoy

Quick summary

- Next.js 14 static-export site (next.config.js: `output: 'export'`), TypeScript, React 18, SCSS modules. Small personal portfolio/playground.

What matters (big picture)

- Pages Router in `src/pages/` — site is fully pre-rendered at build time; no runtime SSR or ISR.
- `src/components/` holds reusable components paired with `.module.scss` files (see `src/components/NameAnimation.tsx`).
- `@/` path alias points to project sources (configured in `tsconfig.json`) — prefer `@/` imports for components.

Critical constraints

- Do NOT rely on API routes or `getServerSideProps` — `src/pages/api/*` (e.g. `src/pages/api/hello.ts`) will not work in production under `output: 'export'`.
- Avoid changing `next.config.js`'s `output` unless you intend to switch to a Node deployment.

Project conventions (concrete, discoverable)

- Component + SCSS module pairing: component `X.tsx` imports `X.module.scss`. In SCSS use kebab-case class names; import as camelCase (e.g. `.name-animation-container` → `styles.nameAnimationContainer`).
- Keep global CSS minimal: `src/styles/globals.css` is for resets only; all component styles should be modules.
- TypeScript: strict mode enabled — use explicit prop types and Next.js types (`NextApiRequest`, `AppProps`, etc.).

Dev & release workflow (commands)

- `npm run dev` — development server (localhost:3000)
- `npm run build` — build static export into `out/`
- `npm run start` — serve production build locally
- `npm run lint` — run ESLint (project uses `next/core-web-vitals` rules)

CI / Deployment

- Vercel via GitHub Actions: see `.github/workflows/` (dev & prod workflows). Branches: `dev` → preview, `main` → production.

Agent guidance (how you should edit)

- Keep changes minimal and scoped — follow existing patterns (component + module.scss). Example edits: add a new component under `src/components/` and its `.module.scss`.
- If you need dynamic server behavior, open a brief PR proposing removal of `output: 'export'` and explain deployment implications.
- Test visually by running `npm run dev` and verifying pages; run `npm run build` to validate static export.

Key files to inspect when making changes

- `next.config.js` — export mode
- `tsconfig.json` — path aliases and TS settings
- `src/pages/` — routing and pages
- `src/components/NameAnimation.tsx` + `NameAnimation.module.scss` — canonical component+SCSS pattern

If unclear or you need fuller context, ask for which page or component I should run locally and I will run `npm run dev` and provide screenshots or build logs.

Please review and tell me which areas need more detail or examples.
