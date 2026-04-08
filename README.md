# Wall Calendar — Frontend Engineering Challenge

An interactive wall calendar built with **Next.js 14 (App Router)** and **TypeScript**, inspired by the physical wall calendar aesthetic.

![Wall Calendar Preview](public/preview.png)

## ✨ Features

### Core requirements
- **Wall calendar aesthetic** — two-panel layout with a mountain illustration hero section, spiral binding, and segmented grid — mirrors a physical calendar's visual hierarchy
- **Day range selector** — click a start date, then an end date; days in-between highlight with a distinct range fill; clear visual states for start, end, and in-between
- **Integrated notes** — notes saved per month, per single day, or per selected range; persisted to `localStorage` so they survive page reloads
- **Fully responsive** — desktop shows side-by-side panels; mobile stacks vertically with a compact hero image

### Creative additions
- **Holiday markers** — golden dot on major Indian public holidays with tooltip on hover
- **Today indicator** — subtle dot below the current date
- **Sunday highlights** — Sundays rendered in the accent color for visual rhythm
- **Keyboard accessible** — all days navigable and selectable via keyboard (Enter/Space)
- **Dynamic note placeholder** — placeholder text updates to reflect your current selection context

## 🏗 Tech choices

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 14 App Router | SSR-ready, fast, Vercel-native |
| Language | TypeScript | Type safety for date logic |
| Styling | CSS Modules + CSS variables | Scoped, no runtime overhead |
| Fonts | Playfair Display + DM Sans (via `next/font`) | Serif editorial display + clean sans body |
| Persistence | `localStorage` | No backend needed per spec |
| State | React `useState` / `useCallback` | Simple enough; no external state lib needed |

## 🚀 Running locally

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

## 📦 Build & deploy

```bash
# Production build
npm run build
npm start

# Deploy to Vercel (recommended)
npx vercel
```

## 📁 Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, font loading
│   ├── page.tsx            # Entry page
│   └── globals.css         # CSS variables, reset
├── components/
│   ├── WallCalendar.tsx    # Main calendar component
│   ├── WallCalendar.module.css
│   ├── CalendarDay.tsx     # Individual day cell
│   ├── MountainIllustration.tsx  # SVG hero art
│   └── constants.ts        # Months, holidays
└── hooks/
    └── useCalendarNotes.ts # localStorage notes hook
```

## 🎯 Design decisions

- **No external calendar library** — the date logic is simple enough to own directly; avoids bundle weight
- **CSS Modules over Tailwind for component styles** — gives fine-grained control over the calendar grid and day states without fighting utility class specificity
- **SVG mountain illustration** — avoids a stock photo dependency; loads instantly with zero network request; theme-coherent
- **`useCalendarNotes` hook** — keeps localStorage logic isolated and testable, separate from the visual component
