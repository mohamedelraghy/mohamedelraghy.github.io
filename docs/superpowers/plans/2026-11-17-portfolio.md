# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the one-page recruiter-facing portfolio (green F+E design) in React + MUI, with all text coming from `src/data/profile.ts`.

**Architecture:** A single MUI theme holds every design token and the custom breakpoints. One typed `profile` object holds every word on the page. Each page section is a feature folder (`src/features/<section>/`) that reads `profile` and renders with a few shared UI pieces (`Tile`, `SectionLabel`, `DrawLine`, `UnderlineLink`, `TechChips`, `Reveal`). All motion is CSS keyframes from one `motion.ts` file, disabled globally under `prefers-reduced-motion`.

**Tech Stack:** React 19, TypeScript (strict), Vite 8 + React Compiler, MUI 9 (`@mui/material`, `@emotion/react`, `@emotion/styled`), ESLint, GitHub Pages.

**Spec:** [docs/superpowers/specs/2026-11-17-portfolio-design.md](../specs/2026-11-17-portfolio-design.md). Visual reference: [docs/superpowers/specs/2026-11-17-portfolio-mockup.html](../specs/2026-11-17-portfolio-mockup.html). Open it in a browser, because spacing, sizes and tile layouts are read from it.

## Global Constraints

- **How each task runs (owner's decision, 2026-11-17, overrides the spec's teaching constraint):** this plan is executed subagent-driven, and the owner will learn React later on another project. **Skip every "Lesson" and "Walk through" step.** The "Lesson first" notes on each task only say which React idea the task uses. Implement, verify and commit.
- **No hard-coded content in components.** Every visible string (headline, rotating words, tile labels, nav labels, section titles, badges like "Now", "Present", "Menu", the CV path) comes from `profile`. The only exception is `index.html` `<title>`/`<meta>`, which must be static so link-preview crawlers (LinkedIn etc.) see it.
- **Keep the stack:** `@/` alias, `src/app/` for shell and shared pieces, `src/features/<name>/` for sections, `index.ts` barrel per folder, named exports, arrow-function components, 4-space indent, single quotes (match [main.tsx](../../../src/main.tsx)).
- **No abbreviations (owner's rule):** branch names, commit messages and every name we choose (variables, props, types, files) use full words: `feature/…` not `feat/…`, commit prefix `feature:` not `feat:`, `delaySeconds` not `delayS`, `button` not `btn`. Names fixed by outside APIs or HTML (`sx`, `href`, `xs`/`md`/`lg` breakpoint keys, `rel`) and standard acronyms (CV, URL, CSS) stay as they are.
- `react-refresh/only-export-components` is on, so hooks, theme and keyframes live in `.ts` files, and `.tsx` files export only components.
- **Colors:** bg `#fafaf9`, ink `#0c0a09`, muted `#78716c`, line `#e7e5e4`, tile `#ffffff`, accent `#059669`, status dot `#16a34a`, light text on accent `#d1fae5`, dark tile small text `#a8a29e`, chip text `#44403c`, hover border `#d6d3d1`.
- **Breakpoints (theme):** `xs: 0, sm: 360, md: 600, lg: 1024, xl: 1440`.
- **Content width:** max 1040px (`lg`), 1240px (`xl`). Side padding 16px below `md`, 24px `md`–`lg`, 40px `xl`.
- **Must not look like Material Design:** no elevation shadows (`shadows` all `'none'` except the hover shadow below), no ripple (`disableRipple` default on `ButtonBase`), no Material blue anywhere.
- **Motion values:** fade-up `0.7s cubic-bezier(.2,.7,.2,1)`, translateY 14px→0, stagger 0.15s. Draw-line 1.1s ease, width 0→100%. Rotating word 7.5s infinite, three steps of `1.08em`. Pulse 1.6s infinite, `0 0 0 0 → 0 0 0 9px` of `rgba(22,163,74,.55)→0`. Timeline fill 1.8s ease-out. Tile hover `translateY(-4px)`, shadow `0 12px 28px rgba(12,10,9,.07)`, only inside `@media (hover: hover)`.
- **Reduced motion:** under `prefers-reduced-motion: reduce`, all animations and transitions are off and every element shows in its final state (fully visible, lines full width, rotating word frozen on the first word).
- **No horizontal scroll at any width ≥ 320px.**
- **Never on the site:** phone number.
- **Verification (no test framework, per spec):** every task ends with `npm run lint` (0 problems) and `npm run build` (exit 0). Then do a visual check with `npm run dev` in Chrome DevTools device mode at **320, 375, 820, 1280, 1680 px**, plus DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce".

## Review Focus

1. **Content that only appears on scroll must never stay invisible.** If the IntersectionObserver never fires (reduced motion, print, very tall screens, anchor-jumping past a section), the content must still show. Pinned in Task 3: `useInView` returns `true` immediately under reduced motion and when `IntersectionObserver` is missing. Task 9 checks jumping to `#contact` straight from the nav.
2. **Real content is longer than the mockup.** A long company name, a 6-chip job, or a 5th project must wrap, not overflow, at 320px. Pinned in Task 9 with a temporary long entry checked at 320px and then removed.
3. **Data flags change the layout.** With `openToWork: false` the status tile disappears and the bento grid still has no holes. A project without `href` shows no link. Only jobs with `end: null` get the "Now" badge. Pinned in Tasks 6, 7 and 8 by flipping the value temporarily during the visual check.
4. **Mobile menu:** choosing a link closes the menu *and* lands on the section without the heading being hidden. The menu is reachable by keyboard and Escape closes it. Pinned in Task 4.
5. **Keyboard focus is visible** on every link and button (MUI's ripple is disabled, so nothing else shows focus). Pinned in Task 1 with a theme `:focus-visible` outline in the accent color.

---

## File Structure

```
index.html                                  modify: title + meta description (static)
src/main.tsx                                modify: drop index.css import
src/index.css                               delete (replaced by CssBaseline)
src/app/theme/theme.ts                      createTheme: tokens, breakpoints, component defaults
src/app/theme/motion.ts                     all keyframes + reducedMotion helper
src/app/theme/index.ts                      barrel
src/app/hooks/useInView.ts                  IntersectionObserver hook
src/app/hooks/index.ts                      barrel
src/app/components/layout/App.tsx           modify: ThemeProvider, CssBaseline, GlobalStyles, page sections
src/app/components/ui/Tile.tsx              rounded tile (variants: plain | dark | accent)
src/app/components/ui/SectionLabel.tsx      small uppercase label
src/app/components/ui/DrawLine.tsx          self-drawing divider
src/app/components/ui/UnderlineLink.tsx     link with sliding underline
src/app/components/ui/TechChips.tsx         row of outlined pill chips
src/app/components/ui/Reveal.tsx            fades children up when in view
src/app/components/ui/index.ts              barrel
src/app/components/index.ts                 modify: also export ui
src/data/types.ts                           Profile and nested types
src/data/profile.ts                         the content (single source of truth)
src/data/index.ts                           barrel
src/features/header/Header.tsx              brand + nav + mobile menu
src/features/hero/Hero.tsx                  headline with rotating word + sub-line
src/features/highlights/Highlights.tsx      bento tiles
src/features/experience/Experience.tsx      timeline
src/features/projects/Projects.tsx
src/features/skills/Skills.tsx
src/features/education/Education.tsx
src/features/contact/Contact.tsx            footer
src/features/<each>/index.ts                barrels
src/features/home/                          delete (replaced by sections)
```

---

### Task 1: MUI theme and app shell

**Lesson first:** "Providers and context": `ThemeProvider` is like a DI container. It registers the theme once at the top, and any component below can read it without it being passed by hand. Mention that MUI is only being used, not taught.

**Files:**
- Modify: `package.json` (via npm install)
- Create: `src/app/theme/theme.ts`, `src/app/theme/motion.ts`, `src/app/theme/index.ts`
- Modify: `src/app/components/layout/App.tsx`, `src/main.tsx`
- Delete: `src/index.css`

**Interfaces:**
- Produces: `theme` (MUI `Theme`) with custom palette keys available as `theme.palette.portfolio.{bg, ink, muted, line, tile, accent, statusDot, onAccent, darkMuted, chipText, hoverLine}` (declare via module augmentation of `Palette`/`PaletteOptions`). `palette.primary.main = '#059669'`, `palette.background.default = '#fafaf9'`, `palette.text.primary = '#0c0a09'`, `palette.text.secondary = '#78716c'`. `shape.borderRadius = 16`.
- Produces from `motion.ts`: `fadeUp`, `drawLine`, `rotateWord`, `pulse`, `fillDown` (Emotion `keyframes` from `@mui/material/styles`), `EASE_OUT = 'cubic-bezier(.2,.7,.2,1)'`, `STAGGER_SECONDS = 0.15`, and `reducedMotionStyles` (a `GlobalStyles` styles object).

- [ ] **Step 1: Lesson** (see above), as a message to the owner.
- [ ] **Step 2: Install** `npm install @mui/material @emotion/react @emotion/styled`. Expected: `@mui/material` `^9` in `dependencies`.
- [ ] **Step 3: Write `theme.ts`** with the Global Constraints colors and breakpoints. Typography: system font stack `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`, and an `h1` variant at weight 800, letterSpacing `-0.035em`, lineHeight 1.08, fontSize `clamp(34px, 7vw, 84px)`. `shadows`: an array of 25 `'none'`. `components.MuiButtonBase.defaultProps.disableRipple = true`. `components.MuiCssBaseline.styleOverrides`: `html { scroll-behavior: smooth }`, `[id] { scroll-margin-top: 24px }`, `:focus-visible { outline: 2px solid #059669; outline-offset: 3px }`.
- [ ] **Step 4: Write `motion.ts`** with the five keyframes using the Global Constraints values. `rotateWord` is 0–22% at `translateY(0)`, 33–55% at `-1.08em`, 66–88% at `-2.16em`, and 100% back at `0`. `reducedMotionStyles` sets `@media (prefers-reduced-motion: reduce)` to `*, *::before, *::after { animation: none !important; transition: none !important; }` and `html { scroll-behavior: auto }`. Elements must not rely on the animation to become visible, which Tasks 3 and 5 handle.
- [ ] **Step 5: Update `App.tsx`** to wrap `<HomePage />` in `ThemeProvider` + `CssBaseline` + `<GlobalStyles styles={reducedMotionStyles} />`. Delete `src/index.css` and remove its import from `main.tsx`.
- [ ] **Step 6: Walk through** `theme.ts`, `motion.ts` and `App.tsx` with the owner.
- [ ] **Step 7: Verify.** `npm run lint` shows 0 problems, and `npm run build` exits 0. `npm run dev` shows the existing name/title on a `#fafaf9` background in the system font. Tabbing to any focusable element shows a green outline (temporarily add a link if none exists, then remove it).
- [ ] **Step 8: Commit** `git add -A && git commit -m "feature: add MUI theme, motion tokens and app shell"`

---

### Task 2: Content data file

**Lesson first:** TypeScript types as a contract, like a DTO or schema. The type says what shape content must have, so a missing date fails the build instead of breaking the page. Mention that components will import this data and draw it.

**Files:**
- Create: `src/data/types.ts`, `src/data/profile.ts`, `src/data/index.ts`

**Interfaces:**
- Produces (exact types, `types.ts`):

```ts
export type LinkItem = { label: string; href: string };
export type SectionId = 'experience' | 'projects' | 'skills' | 'education' | 'contact';
export type Section = { id: SectionId; title: string };
export type Job = {
    company: string; role: string; location: string;
    start: string;            // display text, e.g. 'Sep 2024'
    end: string | null;       // null = current job → "Present" + Now badge
    summary: string; tech: string[];
};
export type Project = { name: string; description: string; tech: string[]; href?: string };
export type SkillGroup = { group: string; items: string[] };
export type Education = { school: string; degree: string; years: string };
export type Achievement = { title: string; detail: string };
export type Profile = {
    name: string; title: string; location: string; stack: string[];
    headline: { before: string; rotatingWords: [string, string, string]; after: string };
    nav: { sectionIds: SectionId[]; menuLabel: string; closeLabel: string };
    sections: Record<SectionId, Section>;
    highlights: {
        about: { label: string; text: string };
        status: { label: string; text: string; show: boolean };
        cv: { label: string; text: string };
        nowAt: { label: string; text: string };
        lately: { label: string; text: string };
    };
    cvHref: string;
    labels: { present: string; now: string; viewProject: string };
    jobs: Job[]; projects: Project[]; skills: SkillGroup[];
    education: Education[]; achievements: Achievement[];
    contact: { intro: string; email: string; links: LinkItem[] };
};
```

- Produces: `export const profile: Profile` (barrel exports `profile` and all types).

- [ ] **Step 1: Lesson**, as a message.
- [ ] **Step 2: Write `types.ts`** exactly as above.
- [ ] **Step 3: Write `profile.ts`** from [CONTENT.md](../../../CONTENT.md) and the mockup:
  - `headline`: `before: 'I build'`, `rotatingWords: ['secure', 'scalable', 'real-time']`, `after: 'backend systems.'`.
  - `nav.sectionIds: ['experience', 'projects', 'contact']`, `menuLabel: 'Menu'`, `closeLabel: 'Close'`.
  - `highlights` texts, job summaries and chips copied **verbatim from the mockup**. Job order: Burgan Bank (`end: null`), ConnectX, Pharaohsoft.
  - `cvHref: '/cv.pdf'` with `// TODO: add public/cv.pdf`.
  - `labels: { present: 'Present', now: 'Now', viewProject: 'View on GitHub' }`.
  - Projects: the four from CONTENT.md, with **no `href`** where CONTENT.md says TODO (add a `// TODO` comment). The elraghy.dev project gets `href: 'https://github.com/mohamedelraghy/mohamedelraghy.github.io'`.
  - Skills, education and achievements copied verbatim from CONTENT.md.
  - `contact.email: 'elraghy8@gmail.com'`. Links: GitHub, LinkedIn (URLs from CONTENT.md). No phone.
- [ ] **Step 4: Walk through** both files.
- [ ] **Step 5: Verify.** `npm run lint` and `npm run build` pass. Then temporarily delete `role` from one job and confirm `npm run build` fails with a type error naming `role`, and restore it.
- [ ] **Step 6: Commit** `git commit -m "feature: add typed profile data as single content source"`

---

### Task 3: Shared UI pieces and scroll reveal

**Lesson first, in two parts:** (a) components and props, including `children`, like a function with parameters that returns markup. (b) hooks: `useState`, `useEffect` and a custom hook. An effect is like a subscription you open on start and close on shutdown, and the cleanup is the shutdown.

**Files:**
- Create: `src/app/hooks/useInView.ts`, `src/app/hooks/index.ts`
- Create: `src/app/components/ui/{Tile,SectionLabel,DrawLine,UnderlineLink,TechChips,Reveal}.tsx`, `src/app/components/ui/index.ts`
- Modify: `src/app/components/index.ts` (add `export * from './ui';`)

**Interfaces:**
- Produces:
  - `useInView<T extends Element>(options?: { once?: boolean; rootMargin?: string }): { ref: React.RefObject<T | null>; inView: boolean }`. Default `once: true`, `rootMargin: '0px 0px -10% 0px'`. Returns `inView = true` immediately (initial state) when `matchMedia('(prefers-reduced-motion: reduce)').matches` or when `typeof IntersectionObserver === 'undefined'`. Disconnects on unmount.
  - `Tile(props: { variant?: 'plain' | 'dark' | 'accent'; label?: string; href?: string; sx?: SxProps<Theme>; children: ReactNode })`. Radius 16 (14 below `md`), padding 16px (22px at `xl`), white with a 1px `line` border. `dark` uses ink bg and bg text with label `darkMuted`. `accent` uses `#059669` bg, white text and label `onAccent`. Hover lift per Global Constraints. When `href` is set it renders as an `<a>`. `label` renders as a small 12px muted line above the children.
  - `SectionLabel(props: { children: ReactNode; id?: string })`: 12px, uppercase, letterSpacing `.12em`, muted, `component="h2"`.
  - `DrawLine(props: { delaySeconds?: number })`: 2px ink line with `drawLine` animation, margin 40px vertical (28px below `md`). It animates only once `useInView` is true, and before that it's width 0. Under reduced motion it's full width.
  - `UnderlineLink(props: { href: string; children: ReactNode; onClick?: () => void })`: weight 600, ink color, accent 2px underline scaling 0→1 from the left in 0.3s on hover and `:focus-visible`.
  - `TechChips(props: { items: string[] })`: wrapping row, gap 6px. Each item is an 11px pill with a 1px `line` border and `chipText` color (MUI `Chip`, `variant="outlined"`, `size="small"`, restyled).
  - `Reveal(props: { delaySeconds?: number; children: ReactNode; sx?: SxProps<Theme> })`: starts `opacity: 0; transform: translateY(14px)` and runs `fadeUp` with `animationDelay` once `inView`. **Under reduced motion it renders fully visible with no transform.** This pins Review Focus #1.

- [ ] **Step 1: Lesson (a)**, then write `Tile`, `SectionLabel`, `UnderlineLink`, `TechChips` and walk through them.
- [ ] **Step 2: Lesson (b)**, then write `useInView`, `Reveal`, `DrawLine` and walk through them.
- [ ] **Step 3: Temporarily render** in `HomePage` one of each Tile variant, a `TechChips`, an `UnderlineLink`, and a `DrawLine` placed below a 150vh spacer.
- [ ] **Step 4: Verify.** Lint and build pass. In the browser, the tiles match the mockup's tile, dark and accent looks. Hover lifts the tiles with a mouse, and in device mode (touch) nothing sticks. The `DrawLine` below the spacer draws only when scrolled to. With reduced motion emulated and a reload, everything is visible and still, and the line is full width without scrolling animation.
- [ ] **Step 5: Remove the temporary demo** and **commit** `git commit -m "feature: add shared tile, link, chip, divider and scroll-reveal pieces"`

---

### Task 4: Header with mobile menu

**Lesson first:** `useState` for UI state (menu open or closed), event handlers, and passing a callback down. It's like flipping a flag in memory and the UI re-rendering from it.

**Files:**
- Create: `src/features/header/Header.tsx`, `src/features/header/index.ts`
- Modify: `src/app/components/layout/App.tsx` (render `<Header />` first)

**Interfaces:**
- Consumes: `profile.name`, `profile.nav`, `profile.sections`, `UnderlineLink`.
- Produces: `Header()` with no props.

- [ ] **Step 1: Lesson.**
- [ ] **Step 2: Write `Header`.** Left: `profile.name` at 16px weight 700, letterSpacing `-.01em`. Right, at `md` and up: one `UnderlineLink` per `nav.sectionIds`, with `href="#<id>"` and text `sections[id].title`, gap 22px (14px at `md`). Below `md`: a pill button with `nav.menuLabel` + "☰" (1px `line` border, tile bg) that opens an MUI `Drawer` (`anchor="top"`) listing the same links. Choosing a link closes it, and Escape or backdrop closes it (Drawer default). The Drawer paper gets bg `#fafaf9` and no shadow. Bottom margin 56px (`lg`+), 44px (`md`), 36px (below `md`), 88px (`xl`). Wrapped in `Reveal`.
- [ ] **Step 3: Walk through.**
- [ ] **Step 4: Verify.** Lint and build pass. At 1280 the three links show with a sliding underline on hover. At 375 the Menu button shows. Open it, tap "Contact", and the drawer closes. At 375, Tab to the Menu button, press Enter, Tab through the links, and Escape closes it, with focus outlines visible throughout. (Section targets arrive later, so the URL hash changing is enough for now. Task 9 re-checks landing.)
- [ ] **Step 5: Commit** `git commit -m "feature: add header with responsive nav and mobile menu"`

---

### Task 5: Hero with rotating word

**Lesson first:** rendering a list with `.map()` and why each item needs a `key`, like a primary key that lets React tell rows apart between renders.

**Files:**
- Create: `src/features/hero/Hero.tsx`, `src/features/hero/index.ts`
- Modify: `App.tsx` (render after `Header`)

**Interfaces:**
- Consumes: `profile.headline`, `profile.name/title/stack/location`, `rotateWord`, `Reveal`, `DrawLine`.
- Produces: `Hero()` with no props.

- [ ] **Step 1: Lesson.**
- [ ] **Step 2: Write `Hero`.** An `h1` (theme `h1` variant) reading `{before} <rotator/>` `<br/>` `{after}`. The rotator is an inline-block, `height: 1.08em`, `overflow: hidden`, `verticalAlign: bottom`, containing a block whose children are the three `rotatingWords` mapped to `display: block; line-height: 1.08em`, in accent color, animated with `rotateWord 7.5s infinite`. Mark the visual rotator `aria-hidden` and add a visually-hidden span with the three words joined by ", " so screen readers read the sentence once. Sub-line: `name · title · stack.join(' & ') · location`, muted, 16px (15px below `md`, 18px at `xl`), margin-top 18px. Then `<DrawLine />`. Stagger with `Reveal delaySeconds` 0.2 and 0.35.
- [ ] **Step 3: Walk through.**
- [ ] **Step 4: Verify.** Lint and build pass. The word cycles secure → scalable → real-time with no clipping of descenders at 320, 375, 1280 and 1680. The headline never overflows at 320. With reduced motion, "secure" is shown and still.
- [ ] **Step 5: Commit** `git commit -m "feature: add hero headline with rotating word"`

---

### Task 6: Highlights bento

**Lesson first:** conditional rendering (`{flag && <X/>}`): the status tile exists only if `show` is true.

**Files:**
- Create: `src/features/highlights/Highlights.tsx`, `src/features/highlights/index.ts`
- Modify: `App.tsx`

**Interfaces:**
- Consumes: `profile.highlights`, `profile.cvHref`, `Tile`, `Reveal`, `pulse`.
- Produces: `Highlights()` with no props.

- [ ] **Step 1: Lesson.**
- [ ] **Step 2: Write `Highlights`.** A CSS grid with columns `xs: 1, sm: 2, md: 2, lg: 4` (repeat 1fr), gap 12px (10px below `md`, 16px at `xl`), and `gridAutoRows: minmax(96px, auto)` (84px below `md`, 120px at `xl`). Tiles in order: About (`dark`, spanning `1 / -1` below `lg`, and 2 columns × 2 rows at `lg`+, with text at 18px weight 600 lineHeight 1.4, 16px below `md`, 22px at `xl`), Status (shown only if `status.show`, with a 8px `#16a34a` dot running `pulse`), CV (`accent`, `href={cvHref}`, `download`, text 19px weight 800), Now at, Lately. Each is wrapped in `Reveal` with stagger 0.35, 0.5, 0.5, 0.65, 0.65. Then `<DrawLine delaySeconds={1.1} />`.
- [ ] **Step 3: Walk through.**
- [ ] **Step 4: Verify.** Lint and build pass. The layout matches the mockup at 320 (1 column), 375 and 820 (2 columns, About full width) and 1280/1680 (4 columns). The CV tile requests `/cv.pdf`. **Review Focus #3:** temporarily set `status.show: false`, and at 1280 and 375 the grid has no empty holes (it may reflow). Restore it.
- [ ] **Step 5: Commit** `git commit -m "feature: add highlight tiles"`

---

### Task 7: Experience timeline

**Lesson first:** passing an item to a child component as props (`<JobCard job={job} />`) and deriving display values from data (`end === null` → "Present" + Now badge) instead of storing them twice.

**Files:**
- Create: `src/features/experience/Experience.tsx`, `src/features/experience/JobCard.tsx`, `src/features/experience/index.ts`
- Modify: `App.tsx`

**Interfaces:**
- Consumes: `profile.jobs`, `profile.sections.experience`, `profile.labels`, `Tile`, `TechChips`, `SectionLabel`, `Reveal`, `useInView`, `fillDown`.
- Produces: `Experience()`, `JobCard(props: { job: Job })`.

- [ ] **Step 1: Lesson.**
- [ ] **Step 2: Write `JobCard`.** A `Tile` with an inner grid of `150px 1fr` (200px at `xl`, a single column below `md` with gap 4px). Left side: `start — (end ?? labels.present)`, 13px, weight 600, muted. Right side: `company` as `h3` 18px, plus a `labels.now` pill (11px, accent bg, white) **only if `end === null`**. Then `role · location` 13px muted, `summary` 14px lineHeight 1.55 (15px at `xl`), and `TechChips`.
- [ ] **Step 3: Write `Experience`.** A `<section id={sections.experience.id}>` with `SectionLabel` showing `sections.experience.title`. Below it a timeline container with `padding-left: 28px` (22px below `md`) and a 2px `line` rail at `left: 7px` (5px below `md`). An accent fill overlay grows with `fillDown 1.8s ease-out` once the container is `inView` (full height under reduced motion). Each job sits in a `Reveal` (stagger 0.15s), with a 12px circle dot (bg-colored fill, 2px accent border) at `left: -27px` (-22px below `md`), top 20px. Then `<DrawLine />`.
- [ ] **Step 4: Walk through.**
- [ ] **Step 5: Verify.** Lint and build pass. It matches the mockup at all five widths. The rail fills when scrolled into view, not before. Only Burgan Bank shows "Present" and "Now". **Review Focus #3:** temporarily set ConnectX `end: null`, check that it gets the badge, then restore it.
- [ ] **Step 6: Commit** `git commit -m "feature: add experience timeline"`

---

### Task 8: Projects, Skills, Education

**Lesson first:** reuse. Three new sections are built almost entirely from pieces that already exist, which is the payoff of small components.

**Files:**
- Create: `src/features/projects/{Projects.tsx,index.ts}`, `src/features/skills/{Skills.tsx,index.ts}`, `src/features/education/{Education.tsx,index.ts}`
- Modify: `App.tsx`

**Interfaces:**
- Consumes: `profile.projects/skills/education/achievements/sections/labels`, `Tile`, `TechChips`, `SectionLabel`, `UnderlineLink`, `Reveal`, `DrawLine`.
- Produces: `Projects()`, `Skills()`, `Education()`.

- [ ] **Step 1: Lesson.**
- [ ] **Step 2: Write `Projects`.** A section with its id and label, and a grid of columns `xs 1, md 2, lg 2` (`xl 4` if four fit at 1240; pick whichever reads better against the mockup's tile proportions). One `Tile` per project: name in 18px weight 700, description at 14px lineHeight 1.55, `TechChips`, then `UnderlineLink` with `labels.viewProject` **only if `href`** (`target="_blank" rel="noopener noreferrer"`).
- [ ] **Step 3: Write `Skills`.** One `Tile` per `SkillGroup` (grid `xs 1, md 2, lg 3`), with the group name as the tile `label` and `TechChips` for the items.
- [ ] **Step 4: Write `Education`.** A tile row (grid `xs 1, md 3`): one tile per education entry (label = years, text = school + degree) and one per achievement (label = title, text = detail).
- [ ] **Step 5: Walk through** all three.
- [ ] **Step 6: Verify.** Lint and build pass. All three sections show with the same tile, chip and label styling at all five widths, revealing on scroll. Only elraghy.dev shows a "View on GitHub" link, and it opens in a new tab (Review Focus #3).
- [ ] **Step 7: Commit** `git commit -m "feature: add projects, skills and education sections"`

---

### Task 9: Contact footer, page metadata, cleanup and final pass

**Lesson first:** a quick recap of how the page is assembled: `App` composes sections, each section reads `profile`, and nothing else holds text. Show this by changing one word in `profile.ts` live.

**Files:**
- Create: `src/features/contact/{Contact.tsx,index.ts}`
- Modify: `App.tsx` (final order: Header, Hero, Highlights, Experience, Projects, Skills, Education, Contact, inside a centered `Box` with the Global Constraints max-widths and padding, top padding 28px (20px below `md`, 44px at `xl`), bottom padding 80px (60px below `md`, 120px at `xl`))
- Modify: `index.html`: `<title>Mohamed EL-Raghy · Senior Backend Engineer</title>` and `<meta name="description" content="I build secure, scalable backend systems with Node.js and NestJS that solve real-world problems.">`
- Delete: `src/features/home/` (and its import)

**Interfaces:**
- Consumes: `profile.contact`, `profile.sections.contact`, `profile.cvHref`, `profile.highlights.cv.text`, `UnderlineLink`, `SectionLabel`, `Reveal`.
- Produces: `Contact()`.

- [ ] **Step 1: Lesson.**
- [ ] **Step 2: Write `Contact`.** A `<footer>` containing `<section id="contact">`, with the label, `contact.intro`, a large `mailto:` link for `contact.email` (UnderlineLink, 20px), and a row of `UnderlineLink`s for `contact.links` (new tab) plus the CV link.
- [ ] **Step 3: Assemble `App`, update `index.html`, delete `features/home`.**
- [ ] **Step 4: Walk through.**
- [ ] **Step 5: Verify, full pass:**
  - `npm run lint` shows 0 problems. `npm run build` exits 0. `npm run preview` serves the built site.
  - Run `grep -rnE "'[A-Z][a-z]+ [a-z]+" src/features src/app`, then read every hit and confirm no visible copy is hard-coded (MUI props and CSS values are fine).
  - At 320, 375, 820, 1280 and 1680: no horizontal scrollbar (`document.documentElement.scrollWidth === innerWidth` in the console), and the layout matches the mockup for sections 1–4.
  - **Review Focus #1:** from the top, click nav "Contact" at 1280 and use the mobile menu "Contact" at 375. The footer is visible, and its heading isn't cut off at the top.
  - **Review Focus #2:** temporarily add a job with company `'International Business Machines Corporation (Middle East)'` and 8 tech chips, plus a 5th project with a 300-character description. At 320 everything wraps with no horizontal scroll. Remove them.
  - Reduced motion on: every section is visible without scrolling animations, the word is frozen, and the lines are full.
  - On a laptop, without scrolling: title, open to work, current employer and CV are all visible (spec goal).
- [ ] **Step 6: Commit** `git commit -m "feature: add contact footer, page metadata and assemble page"`
- [ ] **Step 7: Push to deploy** only after the owner says so: `git push origin main`, then confirm the Actions run is green and <https://mohamedelraghy.github.io/> shows the site.
