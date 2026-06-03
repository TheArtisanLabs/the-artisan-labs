# Artisan Labs — Landing Page

A single-page agency landing site built with Next.js 16, Convex, and Tailwind CSS v4.

## Stack

| Layer        | Tech                                         |
| ------------ | -------------------------------------------- |
| Framework    | Next.js 16 (App Router)                      |
| Language     | TypeScript (strict)                          |
| Styling      | Tailwind CSS v4 + `@tailwindcss/postcss`     |
| Backend      | Convex (schema, queries, mutations, seeding) |
| UI/Animation | IntersectionObserver-based, CSS keyframes    |
| Lint         | ESLint 9 + eslint-config-next                |
| Format       | Prettier 3 + prettier-plugin-tailwindcss     |
| Icons        | Inline SVGs (no icon library)                |

## Getting Started

```bash
npm install
npm run dev

on a different terminal:
npx convex dev
```

Open [http://localhost:3000](http://localhost:3000).

## Data Seeding

On first load, each section seeds its Convex table with defaults if empty. Tables:

- **services** — web apps, mobile apps, UI/UX design, custom software
- **portfolio** — featured projects (Project Foundry, Sylva, Deck Chair)
- **stack** — technologies list (React, Next.js, TypeScript, etc.)
- **phrases** — typewriter phrases for Hero section

## Scripts

| Command             | Description             |
| ------------------- | ----------------------- |
| `npm run dev`       | Start dev server        |
| `npm run build`     | Production build        |
| `npm run lint`      | ESLint check            |
| `npm run format`    | Prettier format all     |
| `npx convex dev`    | Run Convex dev server   |
| `npx convex deploy` | Deploy Convex functions |

## Project Structure

```
app/               # Next.js App Router (layout, page, globals.css)
components/
  layout/          # Navbar, Footer
  sections/        # Hero, About, Services, Portfolio, Stack, Contact
  ui/              # Shared UI primitives
  Providers/       # ConvexClientProvider
convex/            # Schema, queries, mutations, seed data
lib/               # utils (cn), theme (ThemeProvider + useTheme)
```
