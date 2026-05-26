---
name: tailwind-design
description: >-
    Tailwind CSS design rules for Artisan Labs — spacing priority (gap > padding > margin),
    component architecture, DOM depth discipline, responsive patterns, typography, color
    tokens, and code cleanliness. Use whenever writing UI components, layouts, or pages.
---

# Tailwind Design Skill — Artisan Labs

**Stack:** Next.js · TypeScript (strict) · Pure Tailwind CSS · No component libraries

---

## 0. Before Writing Any Code

Ask yourself:

- Can this be a reusable component?
- Can I reduce wrapper depth by one?
- Am I reaching for `margin` when `gap` would do?
- Does every class have a reason to exist?

---

## 1. Spacing Priority (Non-Negotiable)

Always resolve spacing in this order:

```
gap  →  padding  →  margin
```

### Rules

- **`gap`** is the default for spacing between siblings inside flex/grid containers.
- **`padding`** is for internal breathing room within a single element.
- **`margin`** is a last resort — only when gap and padding cannot solve the problem (e.g. pushing a single element away from a flow, `mt-auto`, or external spacing from a parent you don't control).
- Never use `margin` between siblings inside a flex or grid parent. That's what `gap` is for.

### Examples

```tsx
// ✅ Correct
<div className="flex flex-col gap-4">
  <Card />
  <Card />
  <Card />
</div>

// ❌ Wrong — using margin between siblings
<div className="flex flex-col">
  <Card className="mb-4" />
  <Card className="mb-4" />
  <Card />
</div>

// ✅ Correct — padding for internal element spacing
<button className="px-6 py-3">Click me</button>

// ✅ Acceptable margin use — auto push
<div className="flex">
  <Logo />
  <NavLinks className="ml-auto" />
</div>
```

---

## 2. Component Architecture

### Reusability First

- If a UI pattern appears more than once — or is likely to — extract it as a component immediately.
- Components live in `/components/ui/` for primitives, `/components/` for feature-level.
- Every component must accept a `className?: string` prop for composability.

### Component Template

```tsx
// components/ui/Card.tsx
import { cn } from '@/lib/utils';

type CardProps = {
	children: React.ReactNode;
	className?: string;
};

export default function Card({ children, className }: CardProps) {
	return (
		<div
			className={cn(
				'bg-brand-dark rounded-xl border border-white/10 p-6',
				className
			)}
		>
			{children}
		</div>
	);
}
```

### `cn()` Utility (always use)

```ts
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
```

Use `cn()` everywhere classes are conditional or merged — never string concatenation.

---

## 3. DOM Depth — Avoid Wrapper Creep

### The Rule

Never add a wrapper `<div>` unless it is doing real layout work.

```tsx
// ❌ Wrong — unnecessary nesting
<section>
  <div className="container">
    <div className="wrapper">
      <div className="inner">
        <h2>Title</h2>
      </div>
    </div>
  </div>
</section>

// ✅ Correct — flat and purposeful
<section className="mx-auto max-w-6xl px-6 py-24">
  <h2>Title</h2>
</section>
```

### When a wrapper IS justified

- It establishes a flex/grid layout context for its children.
- It clips overflow or applies a visual boundary (border, background, rounded corners).
- It is a semantic HTML element (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).

---

## 4. Class Organization (Prettier Auto-Sort)

Use `prettier-plugin-tailwindcss` to auto-sort all class names. Never manually sort.

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

```json
// .prettierrc
{
	"plugins": ["prettier-plugin-tailwindcss"]
}
```

---

## 5. Strict Tailwind Rules

### Use Tailwind only — no inline styles

```tsx
// ❌ Never
<div style={{ backgroundColor: "#1C2321" }} />

// ✅ Always
<div className="bg-brand-dark" />
```

### Arbitrary values — acceptable but restrained

Use `[value]` syntax for brand-specific tokens only (colors, sizes not in the default scale). Do not use arbitrary values to work around layout problems.

```tsx
// ✅ Acceptable — brand color not in Tailwind palette
<div className="bg-[#1C2321] text-[#EEF1EF]" />

// ❌ Not acceptable — arbitrary margin to fix a layout smell
<div className="mt-[37px]" />
```

### Custom CSS — allowed only for

- Keyframe animations not achievable with Tailwind's `animate-*` utilities.
- Complex `clip-path`, `mask`, or SVG-related properties.
- Third-party library style overrides.

When writing custom CSS, scope it tightly and comment why Tailwind couldn't handle it:

```css
/* Custom: GSAP cursor trail — not achievable with Tailwind */
.cursor-dot {
	position: fixed;
	pointer-events: none;
	border-radius: 50%;
}
```

---

## 6. Responsive Design

### Desktop-first approach

Write base classes for desktop. Use `md:` and `sm:` to scale down.

```tsx
// ✅ Desktop-first
<div className="grid grid-cols-3 gap-8 sm:grid-cols-1 md:grid-cols-2" />
```

### Breakpoint Reference

| Prefix | Breakpoint               |
| ------ | ------------------------ |
| (none) | Desktop default ≥ 1280px |
| `lg:`  | ≤ 1024px                 |
| `md:`  | ≤ 768px                  |
| `sm:`  | ≤ 640px                  |

### Rules

- Never hard-code widths in `px` for layout columns — use `grid`, `flex`, and `max-w-*` instead.
- All touch targets on mobile: minimum `h-10 w-10` (40px).
- Text must remain readable — scale down heading sizes at `md:` and `sm:` breakpoints.

---

## 7. Typography Rules

- Set a base font in `layout.tsx` via `next/font` — never import fonts via CDN.
- Use Tailwind's type scale: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, etc.
- Line height: always pair with `leading-*` — default body `leading-relaxed` (1.625).
- Never set `font-size` in arbitrary values unless it is a display headline that truly needs it.

```tsx
// ✅ Clean typography
<h1 className="text-6xl font-bold leading-tight tracking-tight md:text-4xl sm:text-3xl">
  We build things that last.
</h1>
<p className="text-base leading-relaxed text-brand-light/70">
  Supporting copy goes here.
</p>
```

---

## 8. Color Usage

Define brand colors in `tailwind.config.ts`:

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      brand: {
        dark: "#1C2321",
        blue: "#4062BB",
        light: "#EEF1EF",
      },
    },
  },
}
```

```tsx
// ✅ After config
<div className="bg-brand-dark text-brand-light" />
<p className="text-brand-light/70" />
<div className="border border-brand-blue/30" />
```

---

## 9. Code Cleanliness Checklist

Before completing any component:

- [ ] No sibling elements separated by `margin` — use `gap` on the parent instead.
- [ ] No `<div>` wrappers that serve no layout purpose.
- [ ] No inline `style={{}}` attributes.
- [ ] All conditional classes use `cn()`.
- [ ] Component accepts and forwards `className` prop.
- [ ] Classes are sorted via Prettier plugin.
- [ ] Responsive breakpoints applied where layout breaks.
- [ ] No magic numbers in arbitrary values — use scale or brand tokens.
- [ ] TypeScript types are explicit — no `any`.

---

## 10. File & Folder Conventions

```
/app
  layout.tsx          ← font, metadata, global wrapper
  page.tsx            ← page composition only, no logic

/components
  /ui                 ← pure reusable primitives (Button, Card, Badge, Input)
  /sections           ← page-level sections (Hero, Services, Footer)
  /layout             ← Navbar, Sidebar, PageWrapper

/lib
  utils.ts            ← cn() and other helpers

/types
  index.ts            ← shared TypeScript types
```

### Naming

- Components: `PascalCase.tsx`
- Utilities / helpers: `camelCase.ts`
- One component per file — no barrel exports unless it's a UI index.

---

## 11. Quick Reference — Do / Don't

| Do ✅                                   | Don't ❌                             |
| --------------------------------------- | ------------------------------------ |
| Use `gap` between flex/grid children    | Use `mb-*` / `mt-*` between siblings |
| Extract repeated UI into components     | Copy-paste JSX blocks                |
| Use `cn()` for conditional classes      | Concatenate class strings            |
| Use `max-w-*` + `mx-auto` for centering | Use `width: 1200px` inline           |
| Keep DOM flat and purposeful            | Wrap in `<div>` without reason       |
| Desktop styles first, scale down        | Mix mobile-first and desktop-first   |
| Typed props with TypeScript strict      | Use `any` or untyped props           |
| Custom CSS only for animations          | Use custom CSS for layout/spacing    |
