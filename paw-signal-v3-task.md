# Task: Story Screen + About Screen Update + New Paw Logo

## Overview
Three changes:
1. Add the user's paw logo image throughout the app (replacing any existing paw SVG)
2. Add a full-screen "Our Story" page as the first thing new users see (before the signup form)
3. Update the About screen to be the permanent hub for story, feedback, sharing, and an expanded color guide

---

## PART 1: New Paw Logo

### Add logo asset
- The logo file is `IMG_8876.JPG` in the project root. It is a black paw silhouette on a white background.
- Copy it to `public/assets/paw-logo.jpg`
- Do NOT trace it as SVG. Do NOT recreate it. Use the actual image file.
- Create a reusable `PawIcon` component in `src/components/PawIcon.tsx` that renders an `<img>` tag pointing to the asset
- Props: `size` (number, default 48), `className` (optional)
- On dark backgrounds, apply CSS filter to invert to white: `filter: brightness(0) invert(1);`
- The image import path should work with Vite's asset handling (e.g. `import pawLogo from '/assets/paw-logo.jpg'` or reference from public folder)
- Replace ALL existing paw icons/logos throughout the app with this component

### Where the icon appears:
- StoryScreen (60px)
- HomeScreen (48px)
- AboutScreen (44px)
- PWA manifest icons — generate PNG versions at 192x192 and 512x512 if possible

---

## PART 2: New Story Screen (first-time users only)

### Create: `src/components/StoryScreen.tsx`

Full-screen page shown ONCE before SetupScreen.

**Layout (top to bottom, centered, dark background #111 to #1a1a1a):**

1. PawIcon (60px, white)
2. Four small color dots in a row: Red `#C62828`, Yellow `#F9A825`, Blue `#1565C0`, Green `#2E7D32` (9px each, 7px gap)
3. Title: "Our Story" — serif font (Lora or system serif), 26px, white, bold
4. Subtitle: "WHY PAW SIGNAL EXISTS" — 12px, uppercase, `#666`, letter-spacing 2px
5. Small gradient divider (36px wide, linear gradient using all 4 signal colors)
6. Story paragraphs — serif font, ~15px, `#cccccc`, centered, each as its own paragraph:

```
Paw Signal was **born from loss.**

The creator of this app lost his dog to a sudden dog‑on‑dog attack — no warning signs, no way to know.

**No one should ever experience that.**

This app exists so every walker can see what's coming and every dog gets the space they need.
```

(**bold** text = white #ffffff + font-weight 600)

7. Tagline (italic serif, 16px, white): "One color. One signal. / A safer walk for everyone."
8. Divider line (1px, `#2a2a2a`)
9. "HELP US SPREAD THE WORD" — 13px, uppercase, white, bold, letter-spacing 1.5px
10. Subtext (serif, 14px, `#999`): "Use it. Share it. Give us feedback. / Every person who sees a signal / is a dog that stays safe."
11. White "Continue" button at bottom — pill shape, full-width max 260px, white bg, dark text, 15px bold

**Behavior:**
- Tapping Continue → proceeds to SetupScreen
- Only shown on FIRST launch (before profile exists)
- Never shown again after that

### Update: `src/App.tsx`

Update the first-time user flow:
1. No profile → **StoryScreen** → SetupScreen → HomeScreen
2. Has profile → HomeScreen (same as current)

Add a state like `showStory` that starts `true` for new users. StoryScreen's Continue button sets it to `false`, revealing SetupScreen. Once SetupScreen saves the profile, user goes to HomeScreen as normal.

---

## PART 3: Update About Screen

### Update: `src/components/AboutScreen.tsx`

Reorganize into a hub. Full layout top to bottom:

**1. Back button** (existing — keep as-is)

**2. PawIcon** (44px, white, centered)

**3. "Our Story" section**
- Title: "Our Story" — serif, 22px, white, centered
- Same story text as StoryScreen but condensed into one flowing paragraph (serif, 14px, `#bbb`, centered)
- Same tagline (italic serif, 15px, white)

**4. Action card** — dark card (`#1e1e1e`, 1px border `#2a2a2a`, rounded 14px):
- Label: "HELP US SPREAD THE WORD" (12px, `#888`, uppercase)
- Two pill buttons side by side:
  - **Feedback** — envelope icon + "Feedback" — opens `mailto:charleygrippo@gmail.com?subject=Paw%20Signal%20Feedback`
  - **Share** — share icon + "Share" — triggers native share (reuse existing share logic) for URL `https://charliegrippo.github.io/paw-signal/landing/`

**5. Divider** (1px, `#2a2a2a`)

**6. "COLOR GUIDE" header** (12px, `#666`, uppercase, letter-spacing 1.5px, centered)

**7. Four color entries** — each has:
- Color swatch (40x40px, rounded 10px)
- Three text lines:
  - **Name** (14px, white, bold): "Green — Friendly"
  - **What it means** (12.5px, `#ccc`): what the approaching walker should know
  - **Why this color** (11.5px, `#777`, italic): reasoning behind the color choice

Exact text for each:

**Green — Friendly**
- Meaning: "Happy to meet other dogs and people. Come say hi!"
- Why: "Green means 'go' — just like a green light. It's the universal sign that everything is safe and welcoming."

**Yellow — Caution / Quirks**
- Meaning: "Nervous, unpredictable, or has quirks. Approach slowly and ask first."
- Why: "Yellow means 'slow down' — the same instinct you feel at a yellow traffic light. This dog might be fine, but read the room before approaching."

**Blue — Working / In Training**
- Meaning: "This dog is focused on a task. Please don't distract them."
- Why: "Blue signals calm, focus, and professionalism — think service vests and working dog gear. This dog has a job to do."

**Red — Do Not Approach**
- Meaning: "Reactive or aggressive. Give this dog wide space."
- Why: "Red means 'stop' — the most powerful warning color there is. No exceptions. Cross the street, change your path, give them room."

---

## Files to create:
1. `src/components/PawIcon.tsx` — reusable SVG icon component
2. `src/components/StoryScreen.tsx` — first-time story page

## Files to modify:
3. `src/components/AboutScreen.tsx` — full redesign as hub
4. `src/App.tsx` — add StoryScreen to first-time flow, import PawIcon
5. `src/components/HomeScreen.tsx` — replace any existing icon with PawIcon

## Files NOT to modify:
- SetupScreen.tsx — no changes
- SignalScreen.tsx — no changes
- ShareScreen.tsx — no changes (but reuse its share logic in About if needed)

---

## Verification:
- `npm run build` passes with no errors
- First launch: StoryScreen → (tap Continue) → SetupScreen → (fill form) → HomeScreen
- Returning user: straight to HomeScreen
- About screen shows: paw icon → story → action card (feedback + share) → color guide with expanded descriptions
- Feedback button opens device email client with pre-filled subject
- Share button triggers native share sheet (or copies link on desktop)
- New paw icon appears on ALL screens (Story, Home, About)
- All text matches EXACTLY what's specified above
- Deploy to gh-pages after verification
