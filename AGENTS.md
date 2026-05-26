<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->

## Project: Artisan Labs — Landing Page

A single-page agency landing site built with Next.js 16, Convex backend, and Tailwind CSS v4.

## Stack

| Layer         | Tech                                          |
| ------------- | --------------------------------------------- |
| Framework     | Next.js 16 (App Router)                       |
| Language      | TypeScript (strict)                           |
| Styling       | Tailwind CSS v4 + `@tailwindcss/postcss`      |
| Backend       | Convex (schema, queries, mutations, seeding)  |
| UI/Animation  | IntersectionObserver-based, CSS keyframes     |
| Lint          | ESLint 9 + `eslint-config-next` + tailwind-canonical-classes |
| Format        | Prettier 3 + `prettier-plugin-tailwindcss`    |
| Icons         | Inline SVGs (no icon library)                 |

## Directory Structure

```
app/                          # Next.js App Router
  layout.tsx                  # Root layout — ThemeProvider, ConvexClientProvider, Navbar, CustomCursor
  page.tsx                    # Home page — composes sections in order
  globals.css                 # Tailwind v4 import, @theme, CSS vars, @keyframes
components/
  layout/                     # Navbar.tsx, Footer.tsx
  sections/                   # One file per section: Hero, About, Services, Portfolio, Stack, Contact
  ui/                         # Shared: Section, SectionInner, SectionHeader, Reveal, StaggerGroup,
                              #   ServiceCard, PortfolioCard, CustomCursor
  Providers/                  # ConvexClientProvider
convex/                       # Convex backend
  schema.ts                   # Tables: services, portfolio, stack, phrases
  services.ts, portfolio.ts, stack.ts, phrases.ts  # Query + seed mutation per table
lib/
  utils.ts                    # cn() — clsx + tailwind-merge
  theme.tsx                   # ThemeProvider + useTheme hook (light/dark)
```

## Architecture Patterns

### Page Composition
`app/page.tsx` imports all section components and renders them sequentially. Each section is a `<section id="...">` with the Section wrapper.

### Section Pattern
Every section uses:
- `<Section id="...">` — wraps with `py-30 md:py-20`
- `<SectionInner>` — `mx-auto max-w-300 px-6`
- Decorative large section number overlaid on grid (absolute top-right, `color: var(--accent), opacity: 0.12`)

### Convex Data Seeding
Each data table has a `getAll` query and a `seed` mutation. The seed mutation checks `query('table').first()` — if empty, inserts defaults; otherwise returns no-op. The section component calls seed in a `useEffect` when data length is 0.

### Animation Patterns
- **Reveal** (`components/ui/Reveal.tsx`): IntersectionObserver toggles `.visible` class. Transitions: `translate-y-7.5 opacity-0 → translate-y-0 opacity-100`, 700ms, `cubic-bezier(0.16,1,0.3,1)`.
- **StaggerGroup** (`components/ui/StaggerGroup.tsx`): Observes container, iterates `.stagger-item` children with `staggerDelay` (default 140ms) between each. Items: `translate-y-5 opacity-0 → visible`.
- **Word animations**: `wordUp` keyframe — `translateY(50px), opacity: 0 → translateY(0), opacity: 1` with staggered `animationDelay`.
- **Typewriter**: Custom hook in Hero.tsx — cycles through phrases array, typing then deleting.
- **CustomCursor**: Lerped dot at mouse position, `mix-blend-mode: difference`.

### Theme System
- CSS custom properties on `:root` (light) and `.dark` (overrides)
- `lib/theme.tsx`: React context provider, reads localStorage + prefers-color-scheme
- `<html>` has `className="dark"` by default (server) with `suppressHydrationWarning`
- Theme toggle icons deferred behind `mounted` state to avoid hydration mismatch

### UI Conventions
- **cn()**: Always use `import { cn } from '@/lib/utils'` for conditional classes
- **CSS vars**: `var(--bg)`, `var(--fg)`, `var(--accent)`, `var(--fg-50)`, `var(--border)`, `var(--surface)`
- **Tailwind spacing**: Prefer `gap` over `margin` for layout gaps; avoid deep DOM nesting
- **Sizing**: `clamp()` for fluid typography: `text-[clamp(28px,4vw,48px)]`
- **Accent section numbers**: `text-[clamp(80px,12vw,180px)]`, opacity 0.12, overlaid absolute
- **SectionHeaders**: label in `text-[13px] tracking-[3px]` uppercase, title in `font-heading`
- **Interactivity**: `border border-(--accent-20)` resting → `hover:border-(--accent)`
- **Responsive**: Mobile-first with `max-sm:` breakpoints for nav drawer

## Code Style
- **Tabs** for indentation, 4 spaces wide
- **Single quotes**, trailing commas (es5)
- **Semicolons** required
- Tailwind classes auto-sorted by `prettier-plugin-tailwindcss`
- Tailwind canonical classes enforced by `eslint-plugin-tailwind-canonical-classes`

## Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint check
npm run format   # Prettier format all files
```

## Important Conventions
1. All section components use `'use client'` (Convex hooks require client)
2. Contact and Footer can be server components (no Convex hooks)
3. Defer theme-dependent rendering behind `mounted` state flag
4. Use `@/` absolute imports for all internal modules
5. Font: JetBrains Mono (variable `--font-jetbrains-mono`), heading: `--font-heading: 'Avenir'`
6. Logo path: `/images/logo/logo-transparent.png`
7. Environment: Convex deployment URL in `.env.local`
