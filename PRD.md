# PRD: Paw Signal
## Introduction
Paw Signal is a mobile-friendly web application that lets dog owners communicate their dog's temperament to other walkers at a distance using a full-screen color signal system.
## Strategy
### Phase 1: Prove Demand (Now → 90 Days)
- Launch free, razor-thin product: signal app + landing page + email capture + basic dog profiles
- Goal: 100-500 email signups, 1,000 active users
### Phase 2: Grow & Evolve (90 Days → 6 Months)
- Expand to full 8-color system
- Richer dog profiles, analytics dashboard, app store listing
## Goals
- Launch a free, shareable web app that works instantly on any phone
- Capture user emails from day one
- Allow basic dog profiles
- Make sharing effortless via link, text, email, and QR code
- Keep the codebase clean and sellable
## User Stories
### US-002: Core Signal App (4 Colors)
**Description:** As a dog walker, I want to tap a button and turn my entire phone screen into a color signal so other walkers can see my dog's status from a distance.
**Signal Definitions:**
GREEN — Friendly
- Hex: #2E7D32
- Meaning: Social and generally okay with people and dogs.
- Guidance: Ask, then friendly greeting is fine.
YELLOW — Caution / Quirks
- Hex: #F9A825
- Meaning: May react to big dogs, kids, fast movement, or has specific triggers.
- Guidance: Ask specifics. Slow intro. Avoid surprises.
BLUE — Working / In Training
- Hex: #1565C0
- Meaning: Service, police, military, or serious training focus.
- Guidance: Do not distract. No interaction.
RED — Do Not Approach
- Hex: #C62828
- Meaning: High arousal, reactive, or unsafe with strangers/dogs.
- Guidance: Give space. No petting. No greetings.
**Acceptance Criteria:**
- [ ] Home screen shows 4 color buttons: Green, Yellow, Blue, Red
- [ ] Tapping a color fills entire screen with that color, status label in large text, and guidance text
- [ ] Color is NOT the only identifier — each signal also displays the status label
- [ ] Tapping the signal screen returns to home view
- [ ] Works offline after first load
- [ ] Typecheck passes
- [ ] Verify changes work in browser
### US-003: Basic Dog Profile
**Description:** As a dog owner, I want to save my dog's name and default status.
**Acceptance Criteria:**
- [ ] Profile screen accessible from home view
- [ ] Fields: Dog name, Default status color
- [ ] Data persists in local storage
- [ ] Typecheck passes
- [ ] Verify changes work in browser
### US-004: About / Color Guide Screen
**Acceptance Criteria:**
- [ ] Lists all 4 statuses with color, label, meaning, guidance
- [ ] Ordered by urgency: Red, Yellow, Blue, Green
- [ ] Typecheck passes
- [ ] Verify changes work in browser
### US-005: Share Functionality
**Acceptance Criteria:**
- [ ] Share button triggers native Web Share API (Application Programming Interface)
- [ ] Fallback: copyable link and QR code
- [ ] Typecheck passes
- [ ] Verify changes work in browser
### US-007: PWA (Progressive Web App) Support
**Acceptance Criteria:**
- [ ] Web app manifest with icons and theme color
- [ ] Service worker for offline caching
- [ ] Launches in standalone mode when installed
- [ ] Typecheck passes
- [ ] Verify changes work in browser
## Non-Goals (Version 1)
- No social features
- No paid tier
- No physical products
- No location sharing
- No multi-dog support
- No app store listing
- No backend user accounts
