# elraghy.dev Portfolio: Design

Date: 2026-11-17
Owner: Mohamed EL-Raghy
Visual reference: [2026-11-17-portfolio-mockup.html](2026-11-17-portfolio-mockup.html). Open it in a browser and use the toolbar to switch between phone, tablet, laptop and big-screen widths.

## Intent

A one-page portfolio for **recruiters and hiring managers** looking for a senior backend engineer. In a few seconds a visitor should see who Mohamed is, that they're open to work, their strongest experience, and how to get the CV or make contact.

The project has a second goal. **Mohamed is a backend engineer learning React through this site**, so the way it gets built matters as much as the result (see Constraints).

Mohamed doesn't enjoy design work. The design below is settled, and adding content later must never require design decisions.

## Goals

- A recruiter can find the title, "open to work", current employer and a CV download without scrolling on a laptop.
- It looks modern and polished, with small, tasteful animations.
- It works well on phones, tablets, laptops and large monitors.
- All content comes from one typed data file (`src/data/profile.ts`), so updating the portfolio means editing data, never components.
- It deploys automatically to GitHub Pages on every push to `main`, which already works.

## Non-goals

- No blog, CMS, backend, contact form or analytics.
- No dark mode (not requested).
- No multiple pages or routing. It's one scrolling page with anchor links.
- No fetching data at runtime (no GitHub API).

## Anti-goals (fails even if it "works")

- Animations that feel flashy, slow, or keep moving content around while someone reads it. The only looping motion allowed is the rotating headline word and the "open to work" pulse.
- A layout that breaks or scrolls sideways at any width from 320px up.
- Mohamed ending up with **React** code they don't understand, for example a large generated scaffold dropped in at once. (MUI is used, but learning it is deferred. See Constraints.)
- Personal phone number on the site. It stays on the CV only.

## Constraints

- **Existing stack, keep it:** React 19, TypeScript (strict), Vite 8 with the React Compiler, ESLint, and the `@/` alias for `src/`. Folders: `src/app/` (app shell and layout) and `src/features/<name>/` (sections), each with an `index.ts` barrel. Named exports and arrow-function components (see [HomePage.tsx](../../../src/features/home/HomePage.tsx)).
- **Deploy:** [.github/workflows/deploy.yml](../../../.github/workflows/deploy.yml) runs `npm ci`, `npm run lint` and `npm run build`, then publishes `dist`. The GitHub repo is `mohamedelraghy/mohamedelraghy.github.io` (a user site, live at **<https://mohamedelraghy.github.io/>**). The local folder is named `elraghy.dev`. There's no custom domain, so there's no CNAME, and Vite's `base` stays `/`. Meta and preview URLs use the github.io address. Lint and type errors fail the deploy.
- **Teaching (decided by Mohamed):** **Claude writes all the code; Mohamed doesn't write code.** Build in small steps. Before each step, explain the React idea in a short lesson (with backend analogies where they help), then write one or two files, then walk through what was written. Check that Mohamed understands before moving on. Never bulk-generate a whole layer.
- **MUI (decided by Mohamed):** use MUI (`@mui/material` with `@emotion/react` and `@emotion/styled`). Mohamed will learn MUI *later*, not now. Lessons focus on React concepts, and MUI-specific code gets only a one-line "what this does" note, not a lesson.

## Approaches considered (content source)

1. **Typed TypeScript data file (chosen).** Content lives in `src/data/profile.ts` as typed objects and arrays, and components import it and `.map()` over it. TypeScript catches missing fields, it needs no runtime machinery, and it teaches props and lists. The cost is that content is edited in code, which is fine for this owner.
2. **Parse CONTENT.md at build time.** Keeps editing in a document, but needs parsing code, and a formatting slip silently breaks the page.
3. **Fetch from GitHub API or a headless CMS.** Projects could update themselves, but it adds outside dependencies, loading and error states, and slowness for content that changes a few times a year.

Mohamed picked option 1. `src/data/profile.ts` becomes the source of truth for **what the page shows**. *(My call, replacing the earlier "delete CONTENT.md":)* [CONTENT.md](../../../CONTENT.md) stays as long-form notes (the full About, full CV bullets, the TODOs), because it's the only written copy of that material outside the CV. The data file holds only fields a component renders.

**Decided by Mohamed: `profile.ts` is the single source of truth for every piece of text on the page.** That includes the headline ("I build … backend systems."), the rotating words (`secure`, `scalable`, `real-time`), the hero sub-line, every bento tile (About sentence, open-to-work flag, CV link, "Now at", "Lately"), the one-line job summaries, the nav labels, section titles, links and the CV path. Components contain **no hard-coded content**, only layout and styling. Changing any word on the site means editing `profile.ts` and nothing else. The mockup's short texts (About sentence, job summaries) are the starting values in that file.

## Design (decided)

### Look ("F's design system")

- Warm off-white page `#fafaf9`, near-black ink `#0c0a09`, muted text `#78716c`, borders `#e7e5e4`, white tiles.
- **One accent: emerald green `#059669`.** It's used for the rotating word, CV tile, timeline line and dots, "Now" badge and link underline. The "open to work" dot is `#16a34a`. Light text on green tiles is `#d1fae5`.
- System font stack. Big, heavy, tight headline (800 weight, negative letter-spacing).
- Thin black rules that draw themselves between sections.

### Page structure, top to bottom

1. **Header/nav:** "Mohamed EL-Raghy" on the left, anchor links (Experience · Projects · Contact) on the right. Links get an underline that slides in on hover. On phones the links collapse into a "Menu ☰" button.
2. **Hero:** "I build **secure / scalable / real-time** backend systems." The green word rotates through those three. Under it: name · title · stack · location.
3. **Bento tiles ("E's cards"):** a large dark About tile, plus Open to work (pulsing dot), Download CV (green, links to the PDF), Now at Burgan Bank, and Lately: AI voice agents + MCP.
4. **Experience timeline:** a vertical line that fills with green, with one card per job showing dates, company, role, a one-line summary and tech chips. The current job gets a "Now" badge. Order: Burgan Bank, ConnectX, Pharaohsoft (current job first; ConnectX overlaps because it was part-time). Cards show the short summary, not the full CV bullets.
5. **Projects:** the same tile style, one tile per project (uptime-monitoring, Book Shop, DN Wallet, elraghy.dev) with description, tech chips and a link.
6. **Skills:** grouped chips (Languages, Backend, Frontend, Databases, Integrations & Auth, AI, Tools).
7. **Education & achievements:** a small tile row (Suez Canal University BSc CS 2016–2020, ECPC 2018 9th, ECPC 2017 38th).
8. **Contact/footer:** email, GitHub, LinkedIn, CV download.

Sections 1–4 follow the mockup exactly. Sections 5–8 weren't drawn and reuse the same tile, chip and label styles.

### Responsive behavior

| Width | Behavior |
| --- | --- |
| < 360px | Tiles in 1 column. |
| 360–599px (phone) | Menu button replaces the nav links. Tiles in 2 columns, About full width. Job cards stack the date above the text. Tighter padding (16px side gutter). |
| 600–1023px (tablet) | Tiles in 2 columns, About full width. |
| 1024–1439px (laptop) | 4-column tiles, content max-width about 1040px. |
| ≥ 1440px (big screen) | Content max-width about 1240px, larger text, spacing and tiles. |

The headline scales fluidly with `clamp()`. There must be no horizontal scroll at any width ≥ 320px.

### Motion

- On load: header, hero and tiles fade up with a short stagger (about 0.7s each, 0.15s apart), and the divider lines draw in.
- Looping: the rotating headline word (7.5s cycle) and the "open to work" pulse.
- Sections below the first screen (timeline, projects, skills…) play their fade-up and the timeline fill **when they scroll into view**, not on page load, so the effect isn't wasted. *(My call: the mockup ran everything on load because it was a single screen.)*
- Hover lift on tiles only on devices with a mouse (`@media (hover: hover)`).
- `prefers-reduced-motion: reduce` turns off all animation and transitions, and the page shows its final state.
- All motion is CSS keyframes and transitions, defined with MUI/Emotion's `keyframes` and `sx`/`styled`. No animation library (no Framer Motion).

## Calls made in this design (not explicitly decided by Mohamed, who should check them)

- **How MUI is used:** a custom theme (`createTheme`) is the single home for the design tokens above: palette (accent as `primary`), typography (system font, the heavy headline), shape (16px tile radius), and **custom breakpoints matching the responsive table** (`xs: 0, sm: 360, md: 600, lg: 1024, xl: 1440`). `ThemeProvider` and `CssBaseline` replace the reset in `src/index.css`. Layout uses MUI primitives (`Box`, `Container`, `Stack`, CSS grid via `Box`/`sx`), plus `Typography`, `Chip`, `Link` and `Button` where they fit. The mobile menu may use MUI `Drawer` or `Menu`. The custom look (tiles, timeline, rotating word) is built with `sx`/`styled`. It must not look like default Material Design: no elevation shadows, no ripple-heavy buttons, no Material blue.
- **Scroll reveal** uses a small custom hook built on `IntersectionObserver` (it doubles as a React hooks lesson), not a library.
- **Mobile menu:** tapping "Menu ☰" opens a simple dropdown panel with the three links, and choosing a link closes it.
- **CV PDF** lives at `public/cv.pdf`. Until Mohamed adds it, the CV link stays in place (it will 404). The data file flags it with a TODO.
- **Project links** that are still TODO are hidden until a URL is filled in (the link is optional in the data type).
- **"Open to work"** is a boolean in the data file, so the tile can be switched off later.
- **CONTENT.md is kept** as long-form notes. `profile.ts` holds only what's displayed.
- **No test framework.** Each step is verified by `npm run lint` and `npm run build` (the same checks CI runs), plus a visual check in the browser at the five widths in the responsive table, with reduced motion on and off. Adding Vitest would add another tool for a small static page.
- **Page title and meta description** set in `index.html` (name and title) so links shared with recruiters show a proper preview.

## Left to the builder

- Exact file and component breakdown inside `src/features/` (one feature folder per section is expected).
- The exact TypeScript types for the data file.
- Lesson order and size, within the teaching constraint.
- Small spacing and size tweaks needed to match the mockup at each breakpoint.
- The breakpoints are MUI theme breakpoints (media queries). The mockup uses container queries only so its preview toolbar works, and the real site doesn't need them.
- Which MUI components to use for each piece, within "must not look like default Material Design".
