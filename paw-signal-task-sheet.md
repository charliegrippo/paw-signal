# Paw Signal — Task Sheet for Claude Code

Read PRD.md and progress.txt first. These are the source of truth.

## Context

The app is live at https://charliegrippo.github.io/paw-signal/ but has usability issues from user testing. The following fixes and one new feature need to be implemented.

---

## FIX 1: Forced Profile Flow (Required Before Signals)

**Problem:** Users can skip the dog profile and go straight to the color signals. We need their dog name at minimum before they can use the app.

**Requirements:**
- On first launch (no profile saved in localStorage), the user MUST land on a setup/onboarding screen
- The setup screen collects: Dog Name (required), Breed (optional), and Default Status color (optional)
- The "Save" or "Continue" button is disabled/grayed out until Dog Name is filled in
- After saving, the user proceeds to the home screen with the 4 color buttons
- On subsequent launches, if a profile exists in localStorage, skip straight to the home screen
- The profile should still submit to Google Form in the background if the form integration exists
- There should be no way to reach the signal buttons without completing the profile

---

## FIX 2: Back Button Navigation

**Problem:** No consistent way to navigate back throughout the app.

**Requirements:**
- Every screen except the home screen (4 color buttons) needs a visible back arrow/button in the top-left corner
- The back button should be large enough to tap easily on mobile (minimum 44x44px touch target)
- From the full-screen signal view: tapping anywhere on the screen returns to home (this may already work — keep it). Also add a small "X" or back arrow in the top corner as a secondary option
- From the profile/settings screen: back arrow returns to home
- From the About/Color Guide screen: back arrow returns to home
- Navigation should feel instant — no loading delays

---

## FIX 3: Profile Save Validation

**Problem:** Users can save an empty profile with no dog name.

**Requirements:**
- Dog Name field is required — show a red border or error message if the user tries to save without it
- The Save/Continue button should be disabled until Dog Name has at least 1 character
- Breed remains optional
- After saving, show a brief confirmation (checkmark animation, toast message, or simply navigate to home screen)

---

## NEW FEATURE: Blinking Signal Mode

**Problem:** A static color screen is hard to notice from 50+ yards away. We need an attention-grabbing mode.

**How it works:**
1. User taps a color on the home screen (e.g., Green)
2. The full-screen signal IMMEDIATELY starts blinking: 1-second color on, 1-second color off (off = black or very dark screen)
3. Simultaneously, if the device supports it, the camera flash/LED (torch) blinks in sync — 1 second on, 1 second off. This is for when the user holds the phone facing away from the approaching walker. They see the flashing white light.
4. The user turns the phone screen toward the other walker
5. The blinking color is visible and eye-catching from a distance
6. A toggle button or single tap on the screen STOPS the blinking and LOCKS to the solid color
7. The signal stays as a solid, steady color until the user taps to go back to home

**Technical notes:**
- Use the MediaDevices API or Torch API to control the camera flash/LED: `navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })` then `track.applyConstraints({ advanced: [{ torch: true }] })`
- The app should request camera permission the first time blinking mode is used. Show a brief explanation like "Allow camera access to flash your light for visibility"
- If the user denies camera permission or the device doesn't support torch, the screen still blinks — just without the flash. Do not break the experience.
- The blink interval should be exactly 1 second on, 1 second off (1000ms intervals)
- The transition between blink states should be instant (no fade), for maximum visibility
- When locked to solid color, the torch turns off

**User flow summary:**
- Tap color → blinking starts (screen + flash)
- Tap screen once → blinking stops, solid color locks in, flash off
- Tap screen again → return to home screen

---

## Build Order

Complete these in this order:
1. FIX 1 (Forced Profile Flow)
2. FIX 3 (Profile Save Validation) — do this together with FIX 1 since they're related
3. FIX 2 (Back Button Navigation)
4. NEW FEATURE (Blinking Signal Mode)

After each fix, update progress.txt.

## Tech Reminders
- React + Vite + TypeScript + Tailwind CSS (Cascading Style Sheets)
- Progressive Web App (PWA) — must work on mobile
- No backend, no database, no paid services
- Only 4 signal colors: Green (#2E7D32), Yellow (#F9A825), Blue (#1565C0), Red (#C62828)
- Test on mobile viewport — this app is used by people walking dogs, holding a phone in one hand
- Deploy to GitHub Pages when complete: push to gh-pages branch
